# Cell Mart Pro

Premium black + blue technology storefront starter for a Sri Lankan mobile phone retailer.

## Included in this Phase 2 foundation

- Next.js App Router + TypeScript
- Tailwind CSS v4
- Supabase browser/server client helpers
- Supabase SQL schema for profiles, products, inventory, orders, payments and addresses
- Row Level Security (RLS) policies and admin-role helper
- Responsive black + blue starter homepage
- Environment variable template

## Requirements

- Node.js 20.9+
- A Supabase project

## Run locally

```bash
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run dev
```

Open http://localhost:3000.

## Set up Supabase

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy the Project URL and anon/publishable key into `.env.local`.
5. In Supabase Authentication settings, configure your site URL and allowed redirect URLs.

## Important security notes

- The SQL schema enables RLS on customer and commerce tables.
- Admin privileges are assigned by changing `profiles.role` from `customer` to `admin` in the Supabase dashboard using a trusted project owner account.
- Never put the Supabase service-role key, PayHere secret, or OnePay secret in browser code or any `NEXT_PUBLIC_` variable.
- Payment success must only be recorded after a server-side provider signature/notification verification. Do not trust a success redirect in the browser.
- This is the Phase 2 foundation, not yet a live store. Product management, cart persistence, order processing, shipping rates, payment callbacks and multilingual content are subsequent phases.

## Project structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  lib/
    supabase/
      client.ts
      server.ts
supabase/
  schema.sql
```
