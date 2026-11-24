import { ArrowRight, ArrowUpRight, BatteryCharging, Check, Headphones, Menu, Search, ShieldCheck, Smartphone, Truck, Zap } from "lucide-react";

const highlights = [
  { icon: ShieldCheck, title: "Trusted quality", copy: "Carefully selected devices" },
  { icon: Truck, title: "Islandwide delivery", copy: "Delivery across Sri Lanka" },
  { icon: Headphones, title: "Customer support", copy: "Here when you need us" }
];

const categories = ["Smartphones", "Tablets", "Smart Watches", "Accessories"];

export default function Home() {
  return (
    <main className="page-shell overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="flex h-20 items-center justify-between border-b border-white/10">
          <a href="#" className="flex items-center gap-3" aria-label="Cell Mart Pro home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/30">
              <Smartphone size={22} />
            </span>
            <span className="text-lg font-black tracking-tight">CELL MART <span className="text-blue-400">PRO</span></span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a className="transition hover:text-white" href="#shop">Shop</a>
            <a className="transition hover:text-white" href="#categories">Categories</a>
            <a className="transition hover:text-white" href="#why-us">Why Cell Mart</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden rounded-full border border-white/15 p-2.5 text-slate-300 transition hover:border-blue-400 hover:text-white sm:block" aria-label="Search">
              <Search size={18} />
            </button>
            <a href="#shop" className="hidden rounded-full bg-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 sm:inline-flex">
              Explore store <ArrowUpRight className="ml-2" size={16} />
            </a>
            <button className="rounded-lg border border-white/15 p-2 md:hidden" aria-label="Open menu"><Menu size={20}/></button>
          </div>
        </header>

        <section className="grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_12px_#60a5fa]"/> Your next upgrade starts here
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.06] tracking-[-.055em] sm:text-6xl xl:text-7xl">
              Technology that moves <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-cyan-300 bg-clip-text text-transparent">you forward.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Discover smartphones and everyday tech essentials at Cell Mart Pro. A smarter way to find your next device, wherever you are in Sri Lanka.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#shop" className="inline-flex items-center rounded-full bg-blue-500 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-500/25 transition hover:-translate-y-0.5 hover:bg-blue-400">
                Explore products <ArrowRight className="ml-3" size={17}/>
              </a>
              <a href="#categories" className="inline-flex items-center rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-slate-200 transition hover:border-blue-400/60">
                Browse categories
              </a>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 text-xs text-slate-400">
              <span className="flex items-center gap-2"><Check size={15} className="text-blue-400"/> Premium device selection</span>
              <span className="flex items-center gap-2"><Check size={15} className="text-blue-400"/> Islandwide delivery</span>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center">
            <div className="absolute inset-8 rounded-full bg-blue-500/20 blur-[90px]"/>
            <div className="grid-lines blue-glow relative aspect-square w-full overflow-hidden rounded-[2.5rem] border border-blue-300/15 bg-[#0b1425]/80">
              <div className="absolute left-8 top-8 rounded-full border border-blue-300/20 bg-blue-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-blue-200">Next-gen collection</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute h-[72%] w-[72%] rounded-full border border-blue-400/15"/>
                <div className="absolute h-[58%] w-[58%] rounded-full border border-blue-400/20"/>
                <div className="absolute h-[44%] w-[44%] rounded-full bg-blue-500/10 blur-2xl"/>
                <div className="relative h-[72%] w-[35%] rotate-[-12deg] rounded-[2.7rem] border-[5px] border-slate-500/80 bg-gradient-to-br from-slate-700 via-slate-950 to-black p-2 shadow-[25px_35px_70px_rgba(0,0,0,.7)]">
                  <div className="relative h-full overflow-hidden rounded-[2.1rem] border border-white/10 bg-gradient-to-br from-[#143b73] via-[#07152c] to-black">
                    <div className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-blue-400/40 blur-3xl"/>
                    <div className="absolute -bottom-8 -left-10 h-48 w-48 rounded-full bg-cyan-500/25 blur-3xl"/>
                    <div className="absolute left-1/2 top-3 h-4 w-20 -translate-x-1/2 rounded-full bg-black"/>
                    <div className="absolute inset-x-3 top-1/3 text-center">
                      <Zap className="mx-auto text-cyan-200" size={35}/>
                      <p className="mt-3 text-[9px] font-bold uppercase tracking-[.35em] text-blue-100/80">Power your world</p>
                    </div>
                    <div className="absolute bottom-8 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-white/60"/>
                  </div>
                </div>
              </div>
              <div className="glass absolute bottom-7 left-6 rounded-2xl px-4 py-3">
                <p className="text-[10px] uppercase tracking-[.18em] text-slate-400">The upgrade</p>
                <p className="mt-1 text-sm font-bold">Starts with you.</p>
              </div>
              <div className="glass absolute right-6 top-24 rounded-2xl p-3">
                <BatteryCharging className="text-blue-300" size={22}/>
              </div>
            </div>
          </div>
        </section>

        <section id="why-us" className="grid gap-3 border-y border-white/10 py-7 md:grid-cols-3">
          {highlights.map(({icon: Icon, title, copy}) => (
            <div key={title} className="flex items-center gap-4 px-3 py-2">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-300"><Icon size={21}/></span>
              <div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs text-slate-400">{copy}</p></div>
            </div>
          ))}
        </section>

        <section id="categories" className="py-20">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-xs font-bold uppercase tracking-[.22em] text-blue-400">Find your next favourite</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Explore categories</h2></div>
            <span className="text-sm text-slate-400">More tech. More possibilities.</span>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((name, index) => (
              <a href="#shop" key={name} className="group glass rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40">
                <div className="flex h-28 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-400/5">
                  <Smartphone className="text-blue-300 transition duration-300 group-hover:scale-110" size={index === 0 ? 43 : 36}/>
                </div>
                <div className="mt-5 flex items-center justify-between"><span className="font-bold">{name}</span><ArrowUpRight className="text-slate-500 transition group-hover:text-blue-300" size={18}/></div>
              </a>
            ))}
          </div>
        </section>

        <section id="shop" className="mb-20 overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-r from-blue-600/20 via-[#10213c] to-cyan-500/10 p-8 sm:p-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-blue-300">Cell Mart Pro</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Your next device is waiting.</h2>
            <p className="mt-4 leading-7 text-slate-300">Our online catalogue is being prepared. Product discovery, secure checkout and customer accounts are coming in the next development phases.</p>
            <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-blue-300/10 px-4 py-2 text-xs font-semibold text-blue-200">Store setup in progress <span className="h-1.5 w-1.5 rounded-full bg-blue-300"/></span>
          </div>
        </section>

        <footer className="flex flex-col justify-between gap-4 border-t border-white/10 py-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Cell Mart Pro. All rights reserved.</p>
          <p>Premium technology. Islandwide.</p>
        </footer>
      </div>
    </main>
  );
}
