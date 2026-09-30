export interface ContactSubmissionDto {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormState {
  success?: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
}
