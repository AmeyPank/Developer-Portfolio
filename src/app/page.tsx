import { ContactSection } from "@/components/portfolio/ContactSection";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { PortfolioFooter } from "@/components/portfolio/PortfolioFooter";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { listPortfolioProjects } from "@/features/projects/project.service";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await listPortfolioProjects();

  return (
    <>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection projects={projects} />
      <ContactSection />
      <PortfolioFooter />
    </>
  );
}
