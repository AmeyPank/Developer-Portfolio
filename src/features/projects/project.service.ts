import { PORTFOLIO_PROJECTS } from "@/features/portfolio/content";
import { mapProjectRecord } from "./project.mapper";
import { findProjects } from "./project.repository";
import { createProjectRecord, findProjectById, updateProjectRecord } from "./project.repository";
import type { ProjectDto, ProjectFormState } from "./project.dto";
import type { ProjectInputDto } from "./project.schema";

export async function listPortfolioProjects(): Promise<ProjectDto[]> {
  try {
    const records = await findProjects();
    if (records.length > 0) {
      const projects = records.map(mapProjectRecord);
      const publicFeaturedDefaults = PORTFOLIO_PROJECTS.filter((project) =>
        project.featured && !projects.some(
          (savedProject) => savedProject.title.toLowerCase() === project.title.toLowerCase(),
        ),
      );
      return [...projects, ...publicFeaturedDefaults].sort(
        (left, right) => Number(right.featured) - Number(left.featured) || left.order - right.order,
      );
    }
  } catch (error) {
    // The public portfolio can still render its curated projects during a DB outage.
    console.error("Unable to load projects from the database; using portfolio defaults.", error);
  }

  return PORTFOLIO_PROJECTS;
}

export async function getProjectById(id: string): Promise<ProjectDto | null> {
  const record = await findProjectById(id);
  return record ? mapProjectRecord(record) : null;
}

export async function saveProject(
  input: ProjectInputDto,
  id?: string,
): Promise<ProjectFormState> {
  const values = {
    ...input,
    githubUrl: input.githubUrl || null,
    liveUrl: input.liveUrl || null,
  };

  try {
    if (id) await updateProjectRecord(id, values);
    else await createProjectRecord(values);
    return {
      success: true,
      message: id ? "Project updated successfully." : "Project created successfully.",
    };
  } catch (error) {
    console.error("Unable to save project.", error);
    return { success: false, message: "Project could not be saved. Please try again." };
  }
}
