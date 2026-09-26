"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/mail";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    message: z.string().min(10, "Message must be at least 10 characters long."),
});

export type ContactFormState = {
    success?: boolean;
    message?: string;
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
    };
};

export async function submitContactForm(
    prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    };

    const validated = contactSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            message: "Please correct the errors below.",
            errors: validated.error.flatten().fieldErrors,
        };
    }

    try {
        // 1. Save directly into MySQL database
        const savedMessage = await prisma.contactMessage.create({
            data: {
                name: validated.data.name,
                email: validated.data.email,
                message: validated.data.message,
            },
        });

        // 2. Dispatch real-time email notification via Resend
        const recipient = process.env.NOTIFICATION_RECIPIENT_EMAIL;

        if (process.env.RESEND_API_KEY && recipient) {
            try {
                await resend.emails.send({
                    from: "Portfolio Alert <onboarding@resend.dev>",
                    to: recipient,
                    subject: `✨ New Inquiry from ${savedMessage.name}`,
                    replyTo: savedMessage.email,
                    html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 10px; background-color: #ffffff;">
              <h2 style="color: #111827; margin-top: 0; font-size: 20px;">New Portfolio Contact Message</h2>
              <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">You received a new submission from your website's contact form.</p>
              
              <div style="background-color: #f9fafb; border: 1px solid #f3f4f6; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #374151;"><strong>Name:</strong> ${savedMessage.name}</p>
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #374151;"><strong>Email:</strong> <a href="mailto:${savedMessage.email}" style="color: #2563eb; text-decoration: none;">${savedMessage.email}</a></p>
                <p style="margin: 0; font-size: 14px; color: #6b7280;"><strong>Received:</strong> ${new Date(savedMessage.createdAt).toLocaleString()}</p>
              </div>

              <div style="background-color: #f3f4f6; border-left: 4px solid #111827; padding: 14px; border-radius: 4px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 14px; color: #1f2937; line-height: 1.6; white-space: pre-wrap;">${savedMessage.message}</p>
              </div>

              <a href="mailto:${savedMessage.email}" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 10px 20px; font-size: 14px; font-weight: 500; text-decoration: none; border-radius: 6px;">
                Reply Directly
              </a>
            </div>
          `,
                });
            } catch (emailErr) {
                // Log notification error so the user's form submission still succeeds
                console.error("Resend delivery failed:", emailErr);
            }
        }

        return {
            success: true,
            message: "Thank you! Your message has been sent successfully.",
        };
    } catch (error) {
        console.error("Database save error:", error);
        return {
            success: false,
            message: "Failed to save message. Please try again later.",
        };
    }
}