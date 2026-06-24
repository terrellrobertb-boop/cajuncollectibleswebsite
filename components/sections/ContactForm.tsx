"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertTriangle, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Please enter your name.").max(120),
  email: z.email("Please enter a valid email address."),
  subject: z
    .string()
    .min(2, "Add a short subject so we know what it's about.")
    .max(160),
  message: z
    .string()
    .min(10, "Tell us a little more — at least 10 characters.")
    .max(4000),
  // Honeypot: should remain empty.
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-live="polite"
    >
      {/* Honeypot field for spam bots — hidden from humans */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <Field label="Name" error={errors.name?.message} htmlFor="name">
        <input
          id="name"
          type="text"
          autoComplete="name"
          {...register("name")}
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field label="Email" error={errors.email?.message} htmlFor="email">
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className={inputClass(!!errors.email)}
        />
      </Field>

      <Field label="Subject" error={errors.subject?.message} htmlFor="subject">
        <input
          id="subject"
          type="text"
          {...register("subject")}
          className={inputClass(!!errors.subject)}
        />
      </Field>

      <Field label="Message" error={errors.message?.message} htmlFor="message">
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          className={cn(inputClass(!!errors.message), "resize-y min-h-[140px]")}
        />
      </Field>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send Message
            </>
          )}
        </Button>

        {status === "success" && (
          <p className="flex items-center gap-2 text-swamp font-semibold text-sm">
            <CheckCircle2 className="h-5 w-5" />
            Thanks! Your message is on its way.
          </p>
        )}

        {status === "error" && (
          <p className="flex items-center gap-2 text-orange font-semibold text-sm">
            <AlertTriangle className="h-5 w-5" />
            {errorMsg ?? "Something went wrong."}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-semibold uppercase tracking-wider text-charcoal/80 mb-1.5"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-orange font-medium">{error}</p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    // `rounded-md` (6px) matches the Send Message button baseline
    // (`Button` uses `rounded-md`) — tighter than the old `rounded-lg`.
    "w-full rounded-md border-2 bg-cream px-4 py-3 text-charcoal placeholder:text-charcoal/40 transition-colors",
    "focus:outline-none focus:ring-0",
    hasError
      ? "border-orange focus:border-orange"
      : "border-charcoal/15 focus:border-bayou",
  );
}
