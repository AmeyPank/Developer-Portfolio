"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname === "/login") return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#080d16]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="#home" className="group flex items-center gap-2.5 font-semibold tracking-tight text-white">
          <span className="flex size-8 items-center justify-center rounded-lg border border-cyan-200/20 bg-cyan-200/[0.08] font-mono text-xs text-cyan-200">&lt;/&gt;</span>
          <span>Portfolio<span className="text-cyan-300">.dev</span></span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-4 text-xs font-medium sm:gap-7 sm:text-sm">
          <Link href="#expertise" className="hidden text-slate-400 transition hover:text-white sm:block">Expertise</Link>
          <Link href="#projects" className="text-slate-400 transition hover:text-white">Projects</Link>
          <Link href="#contact" className="rounded-lg border border-cyan-200/20 bg-cyan-200/[0.08] px-3.5 py-2 text-cyan-100 transition hover:bg-cyan-200/[0.14] sm:px-4">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
