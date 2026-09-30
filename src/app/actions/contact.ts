"use server";

import type { ContactFormState } from "@/features/contact/contact.dto";
import { mapContactToEmailHtml } from "@/features/contact/contact.mapper";
import { createContactMessage } from "@/features/contact/contact.repository";
import { contactSubmissionSchema } from "@/features/contact/contact.schema";
import { sendContactNotification } from "@/lib/mail";

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // The hidden field is a low-cost spam trap. Treat a filled trap as handled so
  // bots do not learn that they were filtered.
  if (String(formData.get("website") ?? "").trim()) {
    return { success: true, message: "Thank you! Your message has been sent." };
  }

  const validated = contactSubmissionSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validated.success) {
    return {
      success: false,
      message: "Please check the highlighted fields.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const contact = validated.data;
    await createContactMessage(contact);

    try {
      const notification = await sendContactNotification({
        ...contact,
        html: mapContactToEmailHtml(contact),
      });
      if (notification && "error" in notification && notification.error) {
        console.error("Contact notification provider returned an error.", notification.error);
      }
    } catch (error) {
      // Saving the inquiry is the core action; email is a best-effort alert.
      console.error("Contact notification delivery failed.", error);
    }

    return {
      success: true,
      message: "Thanks for reaching out. Your message has been received.",
    };
  } catch (error) {
    console.error("Unable to save contact message.", error);
    return {
      success: false,
      message: "We couldn’t save your message right now. Please try again later.",
    };
  }
}
