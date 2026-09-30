import type { ProjectDto } from "@/features/projects/project.dto";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";

export function ProjectsSection({ projects }: { projects: ProjectDto[] }) {
  return (
    <section id="projects" className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Selected work" title="Projects built to solve real problems." description="A few examples of product ideas brought to life through considered architecture, useful features, and modern tools." />
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
      </div>
    </section>
  );
}
