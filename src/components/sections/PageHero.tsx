"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { RevealText, type Segment } from "@/components/ui/RevealText";
import { ease } from "@/lib/utils";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: Segment[]; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-36 md:pb-20 md:pt-48">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_65%)]" />
      <div aria-hidden className="absolute right-0 top-0 -z-10 size-[36rem] rounded-full bg-accent/20 blur-[120px]" />
      <div className="container-x">
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="eyebrow">
          {eyebrow}
        </motion.span>
        <RevealText as="h1" inView={false} delay={0.1} className="display mt-6 max-w-5xl text-[clamp(2.8rem,7vw,6.6rem)]" segments={title} />
        {children && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.6 }} className="mt-8">
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
