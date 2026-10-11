/**
 * @file components/forms/ContactForm.tsx
 * @description Contact inquiry form. Client validation shares contactSchema
 * with the API route (zodResolver) ~ identical rules both sides. Designed
 * states: submitting (no shift), success panel (focused), error banner with
 * server-mapped field errors. Honeypot field traps bots.
 */

"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { BUDGET_OPTIONS, contactSchema, type ContactValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER = ["name", "email", "company", "budget", "message"] as const;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="font-mono text-xs text-destructive">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [serverMessage, setServerMessage] = React.useState<string>("");
  const successRef = React.useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", company: "", budget: undefined, message: "", website: "" },
  });

  React.useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const focusFirstInvalid = () => {
    for (const field of FIELD_ORDER) {
      if (errors[field]) {
        setFocus(field);
        break;
      }
    }
  };

  const onInvalid = () => {
    // Wait a tick so error messages render before moving focus.
    requestAnimationFrame(focusFirstInvalid);
  };

  const onSubmit = async (data: ContactValues) => {
    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as
        | { ok: true }
        | { ok: false; message?: string; errors?: Record<string, string> };

      if (response.ok && result.ok) {
        setStatus("success");
        return;
      }

      if (response.status === 422 && !result.ok && result.errors) {
        for (const [field, message] of Object.entries(result.errors)) {
          if (FIELD_ORDER.includes(field as (typeof FIELD_ORDER)[number])) {
            setError(field as (typeof FIELD_ORDER)[number], { type: "server", message });
          }
        }
        setServerMessage("Check the highlighted fields and try again.");
        requestAnimationFrame(focusFirstInvalid);
      } else {
        setServerMessage(
          (!result.ok && result.message) ||
          `Something went wrong. Email us directly at ${siteConfig.contactEmail}.`,
        );
      }
      setStatus("error");
    } catch {
      setServerMessage(`Network error. Email us directly at ${siteConfig.contactEmail}.`);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        aria-labelledby="contact-success-heading"
        className="w-full space-y-4 rounded-xl border border-success/40 bg-success/10 p-8 outline-none sm:p-10"
      >
        <CheckCircle2 className="h-8 w-8 text-success" aria-hidden="true" />
        <h3 id="contact-success-heading" className="font-heading text-2xl font-bold text-foreground">
          Received.
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We&rsquo;ll reply within one business day. If it&rsquo;s urgent, email us directly:{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-mono text-xs text-primary underline underline-offset-4"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
      </div>
    );
  }

  const describedBy = (field: string, hasError: boolean) => (hasError ? `${field}-error` : undefined);

  return (
    <div className="relative w-full rounded-xl border border-border bg-card p-6 sm:p-10">
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6" noValidate>
        {/* Honeypot ~ invisible to humans, irresistible to bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0">
          <label htmlFor="website">Website</label>
          <input id="website" type="text" autoComplete="off" tabIndex={-1} {...register("website")} />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span aria-hidden="true" className="text-primary">*</span>
            </Label>
            <Input
              id="name"
              autoComplete="name"
              placeholder="Ada Lovelace"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={describedBy("name", !!errors.name)}
              {...register("name")}
            />
            <FieldError id="name-error" message={errors.name?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span aria-hidden="true" className="text-primary">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="ada@company.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={describedBy("email", !!errors.email)}
              {...register("email")}
            />
            <FieldError id="email-error" message={errors.email?.message} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company">Company (optional)</Label>
            <Input
              id="company"
              autoComplete="organization"
              placeholder="Analytical Engines Inc."
              aria-invalid={!!errors.company}
              aria-describedby={describedBy("company", !!errors.company)}
              {...register("company")}
            />
            <FieldError id="company-error" message={errors.company?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">
              Budget <span aria-hidden="true" className="text-primary">*</span>
            </Label>
            <Controller
              name="budget"
              control={control}
              render={({ field }) => (
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="budget"
                    aria-required="true"
                    aria-invalid={!!errors.budget}
                    aria-describedby={describedBy("budget", !!errors.budget)}
                    className={cn(errors.budget && "border-destructive/60")}
                  >
                    <SelectValue placeholder="Select a range" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUDGET_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError id="budget-error" message={errors.budget?.message} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            Message <span aria-hidden="true" className="text-primary">*</span>
          </Label>
          <Textarea
            id="message"
            rows={5}
            placeholder="Where does the pipeline hurt? What have you tried? What does done look like?"
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message", !!errors.message)}
            {...register("message")}
          />
          <FieldError id="message-error" message={errors.message?.message} />
        </div>

        <div aria-live="polite">
          {status === "error" && serverMessage && (
            <div className="flex items-start gap-3 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold">Couldn&rsquo;t send that.</p>
                <p className="mt-1 text-xs">{serverMessage}</p>
                <button
                  type="submit"
                  className="mt-2 font-mono text-xs underline underline-offset-4 hover:no-underline"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>

        <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full gap-2 font-semibold">
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Sending…</span>
            </>
          ) : (
            <>
              <span>Send inquiry</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>

        <p className="text-center font-mono text-[11px] text-muted-foreground">
          One business day reply. No brochure, no spam.
        </p>
      </form>
    </div>
  );
}
