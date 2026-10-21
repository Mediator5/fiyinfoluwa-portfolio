"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { budgets, timelines, pricing } from "@/data/content";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { cn, ease } from "@/lib/utils";

const serviceOptions = [
  "Website Design & Development",
  "Website Redesign",
  "Landing Page",
  "E-commerce Website",
  "Data Analysis",
  "Graphic Design",
  "Digital Marketing",
  "Not sure yet",
];
const contactMethods = ["Email", "WhatsApp", "Phone call"];

type Status = "idle" | "sending" | "success" | "error";

function Chips({ name, options, value, onChange }: { name: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(value === o ? "" : o)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition-all duration-300",
            value === o ? "border-fg bg-fg text-bg" : "border-line bg-bg text-muted hover:border-fg/40 hover:text-fg",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    website: "",
    service: serviceOptions[0],
    pkg: "",
    budget: "",
    timeline: "",
    contactMethod: "Email",
    message: "",
    hp: "", // honeypot
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const pkg = params.get("package");
    setForm((f) => ({
      ...f,
      service: service && serviceOptions.includes(service) ? service : f.service,
      pkg: pkg && pricing.some((p) => p.name === pkg) ? pkg : f.pkg,
    }));
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const summary = `Hi Fiyinfoluwa! I'm ${form.name || "…"}${form.business ? ` from ${form.business}` : ""}. I'm interested in: ${form.service}${form.pkg ? ` (${form.pkg} package)` : ""}. ${form.message}`;

  return (
    <div className="card relative overflow-hidden p-6 md:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex min-h-[32rem] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
              className="grid size-20 place-items-center rounded-full bg-accent text-accent-ink"
            >
              <Check className="size-9" strokeWidth={3} />
            </motion.span>
            <h3 className="mt-8 text-3xl font-semibold tracking-tight">Request received!</h3>
            <p className="mt-3 max-w-sm text-muted">
              Thanks {form.name.split(" ")[0] || "there"} — a confirmation is on its way to your inbox. I&apos;ll get back to you within 24 hours.
            </p>
            <a
              href={site.whatsappLink(summary)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white"
            >
              <WhatsAppIcon className="size-4" /> Want a faster reply? WhatsApp me
            </a>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} className="space-y-7" noValidate={false}>
            {!compact && (
              <div>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">Tell me about your project</h3>
                <p className="mt-2 text-sm text-muted">Takes about 60 seconds. I reply within 24 hours.</p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Your name *</span>
                <input required className="input" placeholder="Jane Doe" value={form.name} onChange={set("name")} autoComplete="name" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Email *</span>
                <input required type="email" className="input" placeholder="jane@business.com" value={form.email} onChange={set("email")} autoComplete="email" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Phone / WhatsApp</span>
                <input className="input" placeholder="+1 555 000 0000" value={form.phone} onChange={set("phone")} autoComplete="tel" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Business name</span>
                <input className="input" placeholder="Acme Inc." value={form.business} onChange={set("business")} autoComplete="organization" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Service</span>
                <select className="input appearance-none" value={form.service} onChange={set("service")}>
                  {serviceOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium">Current website (if any)</span>
                <input className="input" placeholder="www.yoursite.com" value={form.website} onChange={set("website")} />
              </label>
            </div>

            <div>
              <span className="mb-3 block text-sm font-medium">Package</span>
              <Chips name="Package" options={[...pricing.map((p) => p.name), "Custom"]} value={form.pkg} onChange={(v) => setForm((f) => ({ ...f, pkg: v }))} />
            </div>
            <div>
              <span className="mb-3 block text-sm font-medium">Budget</span>
              <Chips name="Budget" options={budgets} value={form.budget} onChange={(v) => setForm((f) => ({ ...f, budget: v }))} />
            </div>
            <div>
              <span className="mb-3 block text-sm font-medium">Timeline</span>
              <Chips name="Timeline" options={timelines} value={form.timeline} onChange={(v) => setForm((f) => ({ ...f, timeline: v }))} />
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Project details *</span>
              <textarea
                required
                rows={5}
                className="input resize-none"
                placeholder="What does your business do, and what should the new website help you achieve?"
                value={form.message}
                onChange={set("message")}
              />
            </label>

            <div>
              <span className="mb-3 block text-sm font-medium">Best way to reach you</span>
              <Chips name="Contact method" options={contactMethods} value={form.contactMethod} onChange={(v) => setForm((f) => ({ ...f, contactMethod: v || "Email" }))} />
            </div>

            {/* Honeypot — hidden from humans */}
            <input type="text" tabIndex={-1} autoComplete="off" value={form.hp} onChange={set("hp")} className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />

            {status === "error" && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm">
                <p className="font-medium text-red-600 dark:text-red-400">{error}</p>
                <p className="mt-1 text-muted">You can also reach me directly:</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a href={site.whatsappLink(summary)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 font-medium text-white">
                    <WhatsAppIcon className="size-4" /> WhatsApp
                  </a>
                  <a href={`mailto:${site.email}?subject=${encodeURIComponent("New website project")}&body=${encodeURIComponent(summary)}`} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-medium">
                    <Mail className="size-4" /> Email
                  </a>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                data-cursor="hover"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-accent pl-7 pr-2 text-[15px] font-semibold text-accent-ink transition-all hover:shadow-[0_10px_40px_-10px_var(--accent)] disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : "Send my request"}
                <span className="grid size-10 place-items-center rounded-full bg-accent-ink text-accent transition-transform duration-500 group-hover:rotate-45">
                  {status === "sending" ? <Loader2 className="size-4 animate-spin" /> : <ArrowUpRight className="size-4" />}
                </span>
              </button>
              <p className="text-xs text-muted">No spam. Your details stay private.</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
