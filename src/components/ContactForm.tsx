"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContactForm } from "@/app/actions/contact";
import type { ContactFormState } from "@/features/contact/contact.dto";
import { Button } from "@/components/ui/button";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Clear input fields once the message is saved successfully
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      {state?.message && (
        <div
          role={state.success ? "status" : "alert"}
          aria-live="polite"
          className={`p-3 rounded-md text-sm ${
            state.success
              ? "border border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-200"
              : "border border-rose-300/20 bg-rose-300/[0.08] text-rose-200"
          }`}
        >
          {state.message}
        </div>
      )}

      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={80}
          required
          disabled={isPending}
          aria-invalid={Boolean(state?.errors?.name)}
          aria-describedby={state?.errors?.name ? "name-error" : undefined}
          className="w-full rounded-lg border border-white/10 bg-[#080d16] px-3.5 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-200/20 disabled:opacity-60"
        />
        {state?.errors?.name && (
          <p id="name-error" className="mt-1 text-xs text-rose-300">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
          disabled={isPending}
          aria-invalid={Boolean(state?.errors?.email)}
          aria-describedby={state?.errors?.email ? "email-error" : undefined}
          className="w-full rounded-lg border border-white/10 bg-[#080d16] px-3.5 py-3 text-sm text-white placeholder:text-slate-600 focus:border-cyan-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-200/20 disabled:opacity-60"
        />
        {state?.errors?.email && (
          <p id="email-error" className="mt-1 text-xs text-rose-300">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={4000}
          required
          disabled={isPending}
          aria-invalid={Boolean(state?.errors?.message)}
          aria-describedby={state?.errors?.message ? "message-error" : undefined}
          className="w-full resize-y rounded-lg border border-white/10 bg-[#080d16] px-3.5 py-3 text-sm leading-6 text-white placeholder:text-slate-600 focus:border-cyan-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-200/20 disabled:opacity-60"
        />
        {state?.errors?.message && (
          <p id="message-error" className="mt-1 text-xs text-rose-300">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="h-11 w-full rounded-lg bg-cyan-300 text-sm font-semibold text-slate-950 hover:bg-cyan-200">
        {isPending ? "Sending message…" : "Send message"}
      </Button>
    </form>
  );
}
