import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(80, "Name must be 80 characters or fewer."),
  email: z.string().trim().email("Please enter a valid email address.").max(254, "Email address is too long."),
  message: z.string().trim().min(10, "Message must be at least 10 characters long.").max(4000, "Message must be 4,000 characters or fewer."),
});
