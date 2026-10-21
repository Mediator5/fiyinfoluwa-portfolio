"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { process } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ease } from "@/lib/utils";

function Step({ item, i, onActive }: { item: (typeof process)[number]; i: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  return (
    <div ref={ref} className="relative pb-16 pl-14 md:pb-28 md:pl-20">
      <span
        className={
          "absolute left-0 top-0 grid size-10 place-items-center rounded-full border font-mono text-sm transition-all duration-500 md:size-12 " +
          (inView ? "border-accent bg-accent text-accent-ink" : "border-line bg-bg text-muted")
        }
      >
        {item.step}
      </span>
      <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">{item.title}</h3>
      <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-muted">{item.text}</p>
      <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl lg:hidden">
        <Image src={item.image} alt={item.title} fill sizes="100vw" className="object-cover" />
      </div>
    </div>
  );
}

export function Process() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative bg-bg-2/50 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title={[{ t: "From first call to" }, { t: "launch day", className: "serif-i" }, { t: "in four steps." }]}
          description="A simple, transparent process so you always know what’s happening, what’s next and when your site goes live."
        />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative hidden lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[2rem] bg-bg-2">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={active}
                  initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.15 }}
                  animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease }}
                  className="absolute inset-0"
                >
                  <Image src={process[active].image} alt={process[active].title} fill sizes="50vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl bg-bg/80 px-5 py-4 backdrop-blur">
                <span className="font-mono text-sm text-muted">Step {process[active].step}</span>
                <span className="font-semibold">{process[active].title}</span>
              </div>
            </div>
          </div>
          <div ref={listRef} className="relative">
            <div className="absolute bottom-16 left-5 top-2 w-px bg-line md:left-6">
              <motion.div style={{ height: line }} className="w-px bg-accent" />
            </div>
            {process.map((item, i) => (
              <Step key={item.step} item={item} i={i} onActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
