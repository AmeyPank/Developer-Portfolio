import type { ProjectDto, ProjectRecord } from "./project.dto";
import type { ProjectInputDto } from "./project.schema";

export function mapProjectRecord(record: ProjectRecord): ProjectDto {
  return {
    id: record.id,
    title: record.title,
    description: record.description,
    tags: (record.tags ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    githubUrl: record.githubUrl,
    liveUrl: record.liveUrl,
    featured: record.featured,
    order: record.order,
  };
}

export function mapProjectFormData(formData: FormData): Record<string, unknown> {
  return {
    title: formData.get("title"),
    description: formData.get("description"),
    tags: formData.get("tags"),
    githubUrl: formData.get("githubUrl") ?? "",
    liveUrl: formData.get("liveUrl") ?? "",
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") || 0),
  } satisfies Record<keyof ProjectInputDto, unknown>;
}
