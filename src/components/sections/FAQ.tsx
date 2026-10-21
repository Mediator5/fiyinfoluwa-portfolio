"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/data/content";
import { site } from "@/data/site";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { cn, ease } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal y={16}><span className="eyebrow">FAQ</span></Reveal>
            <RevealText className="display mt-5 text-[clamp(2.3rem,5vw,4.4rem)]" segments={[{ t: "Questions?" }, { t: "Answers.", className: "serif-i" }]} />
            <Reveal delay={0.1} className="mt-6 max-w-sm text-[17px] leading-relaxed text-muted">
              Can&apos;t find what you&apos;re looking for? Send me a quick message — I reply fast.
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <Button href={site.whatsappLink("Hi Fiyinfoluwa, I have a question about a website.")} external variant="dark" icon={<WhatsAppIcon className="size-4" />}>
                Ask on WhatsApp
              </Button>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04} y={20} blur={false} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
                >
                  <span className="text-lg font-medium tracking-tight md:text-xl">{f.q}</span>
                  <span className={cn("grid size-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-500", isOpen && "rotate-45 border-accent bg-accent text-accent-ink")}>
                    <Plus className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-[16px] leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
