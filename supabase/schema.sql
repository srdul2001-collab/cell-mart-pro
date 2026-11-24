-- Cell Mart Pro: initial commerce schema
-- Run in Supabase SQL Editor. RLS is enabled on all customer-facing tables.

create extension if not exists pgcrypto;

create type public.user_role as enum ('customer', 'admin');
create type public.order_status as enum (
  'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
);
create type public.payment_status as enum (
  'pending', 'paid', 'failed', 'refunded'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role public.user_role not null default 'customer',
  preferred_language text not null default 'en'
    check (preferred_language in ('en', 'si', 'ta')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_si text,
  name_ta text,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  brand text,
  description_en text,
  description_si text,
  description_ta text,
  price_lkr numeric(12,2) not null check (price_lkr >= 0),
  compare_at_price_lkr numeric(12,2) check (compare_at_price_lkr is null or compare_at_price_lkr >= 0),
  is_active boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  sort_order integer not null default 0
);

create table public.inventory (
  product_id uuid primary key references public.products(id) on delete cascade,
  quantity integer not null default 0 check (quantity >= 0),
  low_stock_threshold integer not null default 3 check (low_stock_threshold >= 0),
  updated_at timestamptz not null default now()
);

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  recipient_name text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  city text not null,
  district text not null,
  postal_code text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid not null references public.profiles(id),
  address_id uuid references public.addresses(id) on delete set null,
  status public.order_status not null default 'pending',
  subtotal_lkr numeric(12,2) not null check (subtotal_lkr >= 0),
  delivery_fee_lkr numeric(12,2) not null default 0 check (delivery_fee_lkr >= 0),
  total_lkr numeric(12,2) not null check (total_lkr >= 0),
  customer_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  unit_price_lkr numeric(12,2) not null check (unit_price_lkr >= 0),
  quantity integer not null check (quantity > 0),
  line_total_lkr numeric(12,2) not null check (line_total_lkr >= 0)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null check (provider in ('payhere', 'onepay', 'cash_on_delivery')),
  provider_reference text,
  status public.payment_status not null default 'pending',
  amount_lkr numeric(12,2) not null check (amount_lkr >= 0),
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.promotions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text,
  discount_percent numeric(5,2) check (discount_percent between 0 and 100),
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default false
);

-- Create a profile automatically when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Use this helper in policies. Only a trusted project owner should promote admins.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.inventory enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.promotions enable row level security;

-- Public catalogue reads; writes are admin-only.
create policy "Active categories are public"
on public.categories for select using (true);
create policy "Admins manage categories"
on public.categories for all using (public.is_admin()) with check (public.is_admin());

create policy "Active products are public"
on public.products for select using (is_active = true or public.is_admin());
create policy "Admins manage products"
on public.products for all using (public.is_admin()) with check (public.is_admin());

create policy "Product images are public"
on public.product_images for select using (
  exists (select 1 from public.products p where p.id = product_id and p.is_active = true)
  or public.is_admin()
);
create policy "Admins manage product images"
on public.product_images for all using (public.is_admin()) with check (public.is_admin());

create policy "Inventory public read"
on public.inventory for select using (true);
create policy "Admins manage inventory"
on public.inventory for all using (public.is_admin()) with check (public.is_admin());

create policy "Users view own profile"
on public.profiles for select using (id = (select auth.uid()) or public.is_admin());
create policy "Users update own profile"
on public.profiles for update using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "Admins manage profiles"
on public.profiles for all using (public.is_admin()) with check (public.is_admin());

create policy "Users manage own addresses"
on public.addresses for all using (user_id = (select auth.uid()) or public.is_admin())
with check (user_id = (select auth.uid()) or public.is_admin());

create policy "Users view own orders"
on public.orders for select using (user_id = (select auth.uid()) or public.is_admin());
create policy "Users create own orders"
on public.orders for insert with check (user_id = (select auth.uid()));
create policy "Admins update orders"
on public.orders for update using (public.is_admin()) with check (public.is_admin());

create policy "Users view own order items"
on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = (select auth.uid()))
  or public.is_admin()
);
create policy "Users create own order items"
on public.order_items for insert with check (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = (select auth.uid()))
);

create policy "Users view own payments"
on public.payments for select using (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = (select auth.uid()))
  or public.is_admin()
);
-- Payment records should be created/updated by trusted server-side code only.
create policy "Admins manage payments"
on public.payments for all using (public.is_admin()) with check (public.is_admin());

create policy "Active promotions are public"
on public.promotions for select using (is_active = true or public.is_admin());
create policy "Admins manage promotions"
on public.promotions for all using (public.is_admin()) with check (public.is_admin());

create index products_category_id_idx on public.products(category_id);
create index products_active_featured_idx on public.products(is_active, is_featured);
create index orders_user_created_idx on public.orders(user_id, created_at desc);
create index order_items_order_id_idx on public.order_items(order_id);
create index addresses_user_id_idx on public.addresses(user_id);
