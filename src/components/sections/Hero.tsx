"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { site } from "@/data/site";
import { projects, projectImage } from "@/data/projects";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { ease } from "@/lib/utils";

function SpinningBadge() {
  const text = "BOOK A FREE STRATEGY CALL • BOOK A FREE STRATEGY CALL • ";
  return (
    <Link href="/#book" data-cursor="hover" aria-label="Book a free strategy call" className="group relative grid size-28 place-items-center rounded-full bg-accent text-accent-ink shadow-xl md:size-32">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current text-[8.4px] font-semibold tracking-[0.16em]">
          <textPath href="#circle">{text}</textPath>
        </text>
      </svg>
      <span className="relative grid size-11 place-items-center rounded-full bg-accent-ink text-accent transition-transform duration-500 group-hover:rotate-45">
        <ArrowDown className="size-5 -rotate-45" />
      </span>
    </Link>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yImg = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse tilt for the portrait stack
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });

  const thumbs = projects.slice(0, 5);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_30%,black_10%,transparent_70%)]" />
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10%] top-[5%] size-[42rem] rounded-full bg-accent/30 blur-[120px] dark:bg-accent/15"
        />
        <div className="absolute bottom-0 left-[-10%] size-[30rem] rounded-full bg-[#7c5cff]/15 blur-[120px]" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <motion.div style={{ y: yText, opacity: fade }} className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-2 pr-4 text-[13px] font-medium backdrop-blur"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            {site.availability} — limited spots this month
          </motion.div>

          <RevealText
            as="h1"
            inView={false}
            delay={0.25}
            className="display text-[clamp(2.7rem,6.1vw,6.3rem)]"
            segments={[
              { t: "I design & build", br: true },
              { t: "websites that", br: true },
              { t: "turn visitors", className: "serif-i text-[1.08em]", br: true },
              { t: "into clients." },
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease, delay: 0.9 }}
            className="mt-7 max-w-xl text-[17px] leading-relaxed text-muted md:text-lg"
          >
            Hi, I&apos;m <strong className="font-semibold text-fg">{site.firstName} {site.lastName}</strong> — a web designer & Next.js
            developer. I help service businesses look premium online, load in a blink and turn more visitors into calls, quotes and sales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.05 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="/#book" size="lg">
              Book a free strategy call
            </Button>
            <Button href={site.whatsappLink()} external size="lg" variant="outline" icon={<WhatsAppIcon className="size-4" />}>
              WhatsApp me
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <div className="flex -space-x-3">
              {thumbs.map((p) => (
                <span key={p.slug} className="relative size-11 overflow-hidden rounded-full border-2 border-bg">
                  <Image src={projectImage(p.slug)} alt={p.name} fill sizes="44px" className="object-cover object-left-top" />
                </span>
              ))}
            </div>
            <div className="text-sm leading-tight">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Trusted by</p>
              <p className="mt-1 text-muted">
                <span className="font-semibold text-fg">{projects.length}+ websites</span> launched for brands from Detroit to Houston
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div style={{ y: yImg }} className="relative mx-auto w-full max-w-[30rem] lg:col-span-5 [perspective:1200px]">
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative [transform-style:preserve-3d]">
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0 round 2rem)", scale: 1.1 }}
              animate={{ clipPath: "inset(0% 0 0 0 round 2rem)", scale: 1 }}
              transition={{ duration: 1.4, ease, delay: 0.4 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-bg-2"
            >
              <Image src={site.portrait} alt={`${site.fullName}, web designer`} fill priority sizes="(min-width:1024px) 30rem, 90vw" className="object-cover object-[center_18%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
              <span className="absolute right-4 top-4 rounded-full bg-black/35 px-3 py-1 text-xs text-white backdrop-blur">{site.location}</span>
              <div className="absolute inset-x-5 bottom-5 text-white">
                <p className="text-lg font-semibold leading-tight">{site.firstName} Tomiwa {site.lastName}</p>
                <p className="text-sm text-white/75">{site.role}</p>
              </div>
            </motion.div>

            {/* floating project preview */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: -6 }}
              transition={{ duration: 1.2, ease, delay: 1 }}
              className="absolute -left-10 top-10 hidden w-56 overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-2xl sm:block md:-left-20 [transform:translateZ(60px)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <Image src={projectImage("quantum-district")} alt="Quantum District website" fill sizes="224px" className="object-cover object-top" />
              </div>
              <p className="px-2 pb-1 pt-2 text-[11px] font-medium">Quantum District · Consulting</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease, delay: 1.15 }}
              className="absolute -right-4 top-[38%] rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-xl backdrop-blur md:-right-10 [transform:translateZ(80px)]"
            >
              <p className="text-2xl font-semibold tracking-tight">4-in-1</p>
              <p className="text-xs text-muted">Web · Data · Design · Marketing</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease, delay: 1.3 }}
              className="absolute -bottom-12 -right-4 md:-right-10 [transform:translateZ(100px)]"
            >
              <SpinningBadge />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
