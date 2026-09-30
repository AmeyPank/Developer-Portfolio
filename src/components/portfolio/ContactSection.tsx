import { Mail, MessageSquareText } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { SectionHeading } from "./SectionHeading";

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-white/[0.07] bg-white/[0.015] px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="Get in touch" title="Have a good problem to solve?" description="I’m open to conversations about engineering roles, interesting products, and opportunities to build reliable software with a thoughtful team." />
          <div className="flex items-center gap-3 text-sm text-slate-400"><MessageSquareText className="size-4 text-cyan-300" /> Messages go directly to my portfolio inbox.</div>
          <div className="mt-3 flex items-center gap-3 text-sm text-slate-400"><Mail className="size-4 text-cyan-300" /> I’ll follow up using the email you provide.</div>
        </div>
        <div className="rounded-2xl border border-white/[0.09] bg-[#0b1423] p-5 sm:p-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
