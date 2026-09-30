import { ArrowUpRight, Layers3 } from "lucide-react";
import type { ProjectDto } from "@/features/projects/project.dto";
import { GithubIcon } from "@/components/icons/Github";

export function ProjectCard({ project, index }: { project: ProjectDto; index: number }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b1423] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/25 hover:shadow-xl hover:shadow-cyan-950/20">
      <div className="relative flex min-h-48 items-end overflow-hidden border-b border-white/[0.07] bg-[radial-gradient(ellipse_at_70%_15%,rgba(34,211,238,.16),transparent_55%),linear-gradient(135deg,#101c31,#0a111e)] p-6">
        <span className="absolute right-5 top-3 font-mono text-7xl font-semibold tracking-tighter text-white/[0.045]">0{index + 1}</span>
        <div className="relative flex size-12 items-center justify-center rounded-xl border border-cyan-200/20 bg-cyan-200/[0.08] text-cyan-200"><Layers3 className="size-5" /></div>
        {project.featured && <span className="absolute right-5 bottom-5 rounded-full border border-cyan-200/20 bg-cyan-200/[0.07] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan-200">Featured</span>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight text-white">{project.title}</h3>
          <span className="shrink-0 font-mono text-xs text-slate-600">PROJECT / {String(index + 1).padStart(2, "0")}</span>
        </div>
        <p className="text-sm leading-7 text-slate-400">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => <li key={tag} className="rounded-md border border-white/[0.08] px-2.5 py-1.5 font-mono text-[10px] text-slate-300">{tag}</li>)}
        </ul>
        <div className="mt-auto flex gap-3 pt-7">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-cyan-300 px-3.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200">View live project <ArrowUpRight className="size-3.5" /></a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3.5 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.06]"><GithubIcon className="size-3.5" /> Source</a>}
        </div>
      </div>
    </article>
  );
}
