import { Braces, Database, PanelsTopLeft } from "lucide-react";
import { SKILL_GROUPS } from "@/features/portfolio/content";
import { SectionHeading } from "./SectionHeading";

const icons = [Braces, PanelsTopLeft, Database];

export function SkillsSection() {
  return (
    <section id="expertise" className="border-y border-white/[0.07] bg-white/[0.015] px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="How I work" title="Strong foundations. Thoughtful details." description="I bring product thinking and engineering discipline together across the stack—from data models and APIs to the interface people use every day." />
        <div className="grid gap-4 md:grid-cols-3">
          {SKILL_GROUPS.map((group, index) => {
            const Icon = icons[index];
            return <article key={group.title} className="rounded-2xl border border-white/[0.08] bg-[#0b1423] p-6 transition hover:-translate-y-1 hover:border-cyan-200/25">
              <Icon className="mb-5 size-5 text-cyan-300" />
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{group.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} technologies`}>
                {group.skills.map((skill) => <li key={skill} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 font-mono text-[11px] text-slate-300">{skill}</li>)}
              </ul>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
