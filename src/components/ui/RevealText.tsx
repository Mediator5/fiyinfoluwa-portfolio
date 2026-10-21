"use client";

import { motion } from "framer-motion";
import { Fragment, type ElementType } from "react";
import { cn, ease } from "@/lib/utils";

export type Segment = { t: string; className?: string; br?: boolean };

type Props = {
  segments: Segment[];
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
};

/** Word-by-word masked slide-up reveal — the classic Webflow headline effect. */
export function RevealText({ segments, as: Tag = "h2", className, delay = 0, stagger = 0.06, inView = true }: Props) {
  let i = 0;
  const anim = inView
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { initial: "hidden", animate: "show" };
  return (
    <Tag className={className}>
      <motion.span className="block" {...anim} aria-label={segments.map((s) => s.t).join(" ")}>
        {segments.map((seg, si) => (
          <Fragment key={si}>
            {seg.t.split(" ").filter(Boolean).map((word, wi) => {
              const idx = i++;
              return (
                <span key={wi} aria-hidden className="relative inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                  <motion.span
                    className={cn("inline-block will-change-transform", seg.className)}
                    variants={{
                      hidden: { y: "110%", rotate: 4 },
                      show: { y: "0%", rotate: 0, transition: { duration: 1.05, ease, delay: delay + idx * stagger } },
                    }}
                  >
                    {word}
                  </motion.span>
                  {" "}
                </span>
              );
            })}
            {seg.br && <br />}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
