export interface ProjectDto {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  order: number;
}

export interface ProjectRecord {
  id: string;
  title: string;
  description: string;
  tags: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  order: number;
}

export interface ProjectFormState {
  success?: boolean;
  message?: string;
  errors?: {
    title?: string[];
    description?: string[];
    tags?: string[];
    githubUrl?: string[];
    liveUrl?: string[];
    featured?: string[];
    order?: string[];
  };
}
