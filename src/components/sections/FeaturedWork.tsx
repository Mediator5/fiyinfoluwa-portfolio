"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, projectImage, type Project } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HorizontalWork } from "@/components/work/HorizontalWork";

function StackCard({ project, i, total, progress }: { project: Project; i: number; total: number; progress: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const targetScale = 1 - (total - i) * 0.04;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div ref={ref} className="sticky top-0 flex h-[100svh] items-center justify-center">
      <motion.div
        style={{ scale, top: `calc(-4vh + ${i * 22}px)` }}
        className="relative w-full origin-top overflow-hidden rounded-[2rem] border border-line bg-surface p-4 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.35)] md:p-6"
      >
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full opacity-25 blur-[100px]" style={{ background: project.accent }} />
        <div className="relative grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between gap-6 p-2 lg:col-span-4 lg:p-4">
            <div>
              <div className="flex items-center justify-between text-sm text-muted">
                <span className="font-mono">{String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
                <span>{project.industry}</span>
              </div>
              <h3 className="mt-6 text-3xl font-semibold tracking-tight md:text-[2.6rem] md:leading-[1.02]">{project.name}</h3>
              <p className="serif-i mt-3 text-xl text-muted md:text-2xl">“{project.headline}”</p>
              <p className="mt-4 hidden text-[15px] leading-relaxed text-muted md:block">{project.summary}</p>
            </div>
            <div>
              <ul className="mb-6 hidden flex-wrap gap-2 md:flex">
                {project.features.slice(0, 4).map((f) => (
                  <li key={f} className="rounded-full border border-line px-3 py-1 text-xs text-muted">{f}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                <Button href={`/work/${project.slug}`} variant="dark">Case study</Button>
                <a href={project.url} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium transition-colors hover:border-fg/40">
                  Live site <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
          <Link href={`/work/${project.slug}`} data-cursor="view" className="group relative block overflow-hidden rounded-[1.4rem] border border-line bg-bg-2 lg:col-span-8">
            <div className="relative aspect-[16/10] w-full">
              <motion.div style={{ scale: imgScale }} className="absolute inset-0">
                <Image src={projectImage(project.slug)} alt={`${project.name} website`} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover object-top transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
              </motion.div>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export function FeaturedWork() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <section id="work" className="relative pt-24 md:pt-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Selected work"
          title={[{ t: "Websites that" }, { t: "work as hard", className: "serif-i" }, { t: "as my clients do." }]}
          description="Real, live projects for real businesses — tax firms, consultancies, logistics companies, wellness brands and more."
          action={<Button href="/work" variant="outline">View all {projects.length} projects</Button>}
        />
        <div ref={container} className="relative -mt-[10vh]">
          {featured.map((p, i) => (
            <StackCard key={p.slug} project={p} i={i} total={featured.length} progress={scrollYProgress} />
          ))}
        </div>

      </div>
      <HorizontalWork
        items={rest}
        title={
          <>
            <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">
              More <span className="serif-i font-normal">projects</span>
            </h3>
            <Link href="/work" className="text-sm font-medium text-muted underline-offset-4 hover:text-fg hover:underline">See everything →</Link>
          </>
        }
      />
    </section>
  );
}
