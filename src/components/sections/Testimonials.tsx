"use client";

import { testimonials } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Renders only when you add real client quotes in src/data/content.ts */
export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading eyebrow="Kind words" title={[{ t: "What clients" }, { t: "say.", className: "serif-i" }]} />
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08} className="card mb-5 break-inside-avoid p-8">
              <p className="serif-i text-2xl leading-snug">“{t.quote}”</p>
              <p className="mt-6 font-semibold">{t.name}</p>
              <p className="text-sm text-muted">{t.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
