"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { pricing, showPrices } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn, ease } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-bg-2/50 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Packages"
          title={[{ t: "Simple packages," }, { t: "serious results.", className: "serif-i" }]}
          description="Pick a starting point. Every project gets a fixed quote after a free call — no surprises, no hidden fees."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {pricing.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease, delay: i * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-[2rem] border p-8 md:p-10",
                p.popular ? "border-transparent bg-invert-bg text-invert-fg shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] lg:-my-4 lg:py-14" : "border-line bg-surface",
              )}
            >
              {p.popular && (
                <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink">
                  <Sparkles className="size-3.5" /> Most popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className={cn("mt-2 text-sm", p.popular ? "opacity-70" : "text-muted")}>{p.desc}</p>
              {showPrices && (
                <p className="mt-8 flex items-baseline gap-2">
                  <span className={cn("text-xs uppercase tracking-wider", p.popular ? "opacity-60" : "text-muted")}>{p.note}</span>
                  <span className="text-5xl font-semibold tracking-tight">{p.price}</span>
                </p>
              )}
              <ul className="mt-8 space-y-3.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px]">
                    <Check className={cn("mt-0.5 size-4 shrink-0", p.popular ? "text-accent" : "")} strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?package=${encodeURIComponent(p.name)}`}
                data-cursor="hover"
                className={cn(
                  "mt-10 inline-flex h-13 items-center justify-center rounded-full px-6 py-4 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 md:mt-auto",
                  p.popular ? "bg-accent text-accent-ink" : "bg-invert-bg text-invert-fg",
                )}
              >
                Book the {p.name} package
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted">
          Need something custom — a store, portal or redesign? <Link href="/contact" className="font-medium text-fg underline underline-offset-4">Tell me about it</Link>.
        </p>
      </div>
    </section>
  );
}
