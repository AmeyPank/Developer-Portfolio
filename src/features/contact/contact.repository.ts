import { prisma } from "@/lib/prisma";
import type { ContactSubmissionDto } from "./contact.dto";

export function createContactMessage(data: ContactSubmissionDto) {
  return prisma.contactMessage.create({ data });
}
