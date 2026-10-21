"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { type Project, projectImage } from "@/data/projects";

function Card({ p, i }: { p: Project; i: number }) {
  return (
    <Link href={`/work/${p.slug}`} data-cursor="view" className="group block w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[38vw] xl:w-[34vw]">
      <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem] border border-line bg-bg-2">
        <Image src={projectImage(p.slug)} alt={`${p.name} website`} fill sizes="(min-width:1024px) 38vw, 82vw" className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]" />
        <span className="absolute left-4 top-4 rounded-full bg-bg/85 px-3 py-1 font-mono text-xs backdrop-blur">{String(i + 1).padStart(2, "0")}</span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h4 className="text-xl font-semibold tracking-tight md:text-2xl">{p.name}</h4>
          <p className="mt-1 text-sm text-muted">{p.industry}</p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}

/** Pinned horizontal-scroll gallery on desktop, swipeable row on mobile. */
export function HorizontalWork({ items, title }: { items: Project[]; title: React.ReactNode }) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <>
      {/* Desktop: pinned */}
      <div ref={section} className="relative hidden lg:block" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-x mb-10 flex items-end justify-between gap-6">{title}</div>
          <motion.div ref={track} style={{ x, paddingLeft: "max(1rem, calc((100vw - 1320px) / 2 + 2.5rem))", paddingRight: "8vw" }} className="flex w-max gap-6">
            {items.map((p, i) => (
              <Card key={p.slug} p={p} i={i} />
            ))}
          </motion.div>
          <div className="container-x mt-10">
            <div className="h-px w-full bg-line">
              <motion.div style={{ width: bar }} className="h-px bg-fg" />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile / tablet: swipe */}
      <div className="py-16 lg:hidden">
        <div className="container-x mb-8 flex items-end justify-between gap-6">{title}</div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none]" data-lenis-prevent-touch>
          {items.map((p, i) => (
            <Card key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </>
  );
}
