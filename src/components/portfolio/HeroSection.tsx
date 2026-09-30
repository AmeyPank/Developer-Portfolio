import Link from "next/link";
import { ArrowDown, ArrowUpRight, Braces, Layers3, Sparkles } from "lucide-react";
import { PROFILE } from "@/features/portfolio/content";

export function HeroSection() {
  return (
    <section id="home" className="relative isolate overflow-hidden px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28">
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute -right-40 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.25fr_.75fr]">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.07] px-3.5 py-2 text-xs font-medium text-emerald-200">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-50" /><span className="relative inline-flex size-2 rounded-full bg-emerald-300" /></span>
            {PROFILE.availability}
          </div>
          <p className="mb-4 font-mono text-sm tracking-wide text-cyan-300">{PROFILE.eyebrow}</p>
          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            {PROFILE.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-base leading-8 text-slate-300 sm:text-lg">
            {PROFILE.introduction}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="#projects" className="inline-flex h-12 items-center gap-2 rounded-lg bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
              Explore projects <ArrowUpRight className="size-4" />
            </Link>
            <Link href="#contact" className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.06]">
              Let’s talk <ArrowDown className="size-4" />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:ml-auto">
          <div className="absolute -inset-5 rounded-[2rem] border border-cyan-200/10" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c1525]/90 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-rose-400/80" /><span className="size-2.5 rounded-full bg-amber-300/80" /><span className="size-2.5 rounded-full bg-emerald-300/80" /></div>
              <span className="font-mono text-[11px] text-slate-500">engineering-principles.ts</span>
            </div>
            <div className="space-y-5 py-6 font-mono text-sm">
              <div className="flex gap-3"><span className="text-slate-600">01</span><p><span className="text-fuchsia-300">const</span> <span className="text-cyan-200">approach</span> = &#123;</p></div>
              <div className="-mt-4 space-y-3 pl-10 text-slate-300">
                <p><span className="text-amber-200">reliable</span>: <span className="text-emerald-200">&quot;by design&quot;</span>,</p>
                <p><span className="text-amber-200">architecture</span>: <span className="text-emerald-200">&quot;clear boundaries&quot;</span>,</p>
                <p><span className="text-amber-200">delivery</span>: <span className="text-emerald-200">&quot;small, steady steps&quot;</span>,</p>
                <p><span className="text-amber-200">product</span>: <span className="text-emerald-200">&quot;people first&quot;</span></p>
              </div>
              <div className="-mt-3 flex gap-3"><span className="text-slate-600">07</span><p>&#125;;</p></div>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-4">
              <div className="rounded-lg bg-white/[0.04] p-3"><Braces className="mb-2 size-4 text-cyan-300" /><span className="text-[11px] text-slate-400">Backend</span></div>
              <div className="rounded-lg bg-white/[0.04] p-3"><Layers3 className="mb-2 size-4 text-violet-300" /><span className="text-[11px] text-slate-400">Architecture</span></div>
              <div className="rounded-lg bg-white/[0.04] p-3"><Sparkles className="mb-2 size-4 text-amber-200" /><span className="text-[11px] text-slate-400">Product</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
