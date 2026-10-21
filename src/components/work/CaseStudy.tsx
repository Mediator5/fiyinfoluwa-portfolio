"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { type Project, projectImage, projectMobileImage } from "@/data/projects";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal, Stagger, staggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BrowserFrame, PhoneFrame } from "@/components/ui/Frames";
import { ease } from "@/lib/utils";

export function CaseStudy({ project, next }: { project: Project; next: Project }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.45], [48, 20]);

  const meta = [
    { k: "Client", v: project.name },
    { k: "Industry", v: project.industry },
    { k: "Location", v: project.location || "United States" },
    { k: "Services", v: "Web design · Development" },
  ];

  return (
    <article>
      <section className="relative overflow-hidden pb-12 pt-32 md:pt-44">
        <div aria-hidden className="absolute -right-40 top-0 -z-10 size-[40rem] rounded-full opacity-25 blur-[140px]" style={{ background: project.accent }} />
        <div className="container-x">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
              <ArrowLeft className="size-4" /> All projects
            </Link>
          </motion.div>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <span className="eyebrow">Case study · {project.industry}</span>
              <RevealText as="h1" inView={false} delay={0.1} className="display mt-5 text-[clamp(2.8rem,7vw,6.4rem)]" segments={[{ t: project.name }]} />
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.5 }} className="serif-i mt-5 text-2xl text-muted md:text-3xl">
                “{project.headline}”
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.7 }} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Button href={project.url} external>Visit live site</Button>
              <Button href="/#book" variant="outline" icon={false}>Get a site like this</Button>
            </motion.div>
          </div>
          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }} className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-8 md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.k}>
                <dt className="text-xs uppercase tracking-[0.18em] text-muted">{m.k}</dt>
                <dd className="mt-2 font-medium">{m.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      <section ref={heroRef} className="container-x">
        <motion.a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          style={{ scale, borderRadius: radius }}
          className="relative block aspect-[16/10] overflow-hidden border border-line bg-bg-2 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.5)]"
        >
          <Image src={projectImage(project.slug)} alt={`${project.name} homepage`} fill priority sizes="100vw" className="object-cover object-top" />
        </motion.a>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal y={16}><span className="eyebrow">Overview</span></Reveal>
            <Reveal delay={0.1} className="mt-5 text-2xl font-medium leading-snug tracking-tight md:text-3xl">{project.summary}</Reveal>
            <ul className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-3 py-1 text-sm text-muted">{s}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-10 md:grid-cols-2 lg:col-span-8">
            <Reveal className="card p-8">
              <span className="font-mono text-sm text-muted">01 — The challenge</span>
              <p className="mt-5 text-[17px] leading-relaxed">{project.challenge}</p>
            </Reveal>
            <Reveal delay={0.1} className="card p-8" style={{ boxShadow: `inset 0 0 0 1px ${project.accent}55` }}>
              <span className="font-mono text-sm text-muted">02 — The solution</span>
              <p className="mt-5 text-[17px] leading-relaxed">{project.solution}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-bg-2/60 py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal y={16}><span className="eyebrow">What I built</span></Reveal>
            <RevealText className="display mt-5 text-[clamp(2.2rem,4.6vw,4rem)]" segments={[{ t: "Features that" }, { t: "drive action.", className: "serif-i" }]} />
            <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
              {project.features.map((f) => (
                <motion.div key={f} variants={staggerItem} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full" style={{ background: project.accent, color: "#0e0e0c" }}>
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <span className="text-[15px] font-medium">{f}</span>
                </motion.div>
              ))}
            </Stagger>
          </div>
          <div className="relative lg:col-span-6">
            {project.mobile ? (
              <div className="relative mx-auto flex max-w-xl items-end justify-center gap-5">
                <Reveal className="w-[70%]"><BrowserFrame src={projectImage(project.slug)} alt={`${project.name} desktop`} url={project.url} sizes="40vw" /></Reveal>
                <Reveal delay={0.15} y={80} className="-ml-16 w-[34%] translate-y-8"><PhoneFrame src={projectMobileImage(project.slug)} alt={`${project.name} on mobile`} /></Reveal>
              </div>
            ) : (
              <Reveal><BrowserFrame src={projectImage(project.slug)} alt={`${project.name} desktop`} url={project.url} sizes="50vw" /></Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-invert-bg px-8 py-16 text-center text-invert-fg md:py-24">
            <div aria-hidden className="absolute left-1/2 top-0 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-[100px]" />
            <p className="relative text-sm uppercase tracking-[0.2em] opacity-60">Like what you see?</p>
            <h2 className="display relative mx-auto mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)]">
              Let&apos;s build something <span className="serif-i text-accent">just as good</span> for you.
            </h2>
            <div className="relative mt-10 flex flex-wrap justify-center gap-3">
              <Button href="/#book" size="lg">Book a free call</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line">
        <Link href={`/work/${next.slug}`} data-cursor="view" className="group block">
          <div className="container-x flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-24">
            <div>
              <span className="text-sm uppercase tracking-[0.2em] text-muted">Next project</span>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.05em] transition-transform duration-700 group-hover:translate-x-4">
                <span>{next.name}</span>
                <ArrowUpRight className="size-[0.6em] shrink-0 transition-transform duration-700 group-hover:rotate-45" />
              </p>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line md:w-[28rem]">
              <Image src={projectImage(next.slug)} alt={next.name} fill sizes="28rem" className="object-cover object-top transition-transform duration-[1.2s] group-hover:scale-105" />
            </div>
          </div>
        </Link>
      </section>
    </article>
  );
}
