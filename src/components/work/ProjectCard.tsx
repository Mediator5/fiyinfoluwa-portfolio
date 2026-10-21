"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { projectImage } from "@/data/projects";
import { ease } from "@/lib/utils";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease, delay: (index % 3) * 0.08 }}
      className="group"
    >
      <Link href={`/work/${project.slug}`} data-cursor="view" className="block">
        <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem] border border-line bg-bg-2">
          <Image
            src={projectImage(project.slug)}
            alt={`${project.name} website design`}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 rounded-full bg-bg/85 px-3 py-1 text-xs font-medium backdrop-blur">{project.filter}</span>
          <span className="absolute bottom-4 right-4 grid size-11 translate-y-3 place-items-center rounded-full bg-accent text-accent-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
            <p className="mt-1 text-sm text-muted">{project.industry}{project.location ? ` · ${project.location}` : ""}</p>
          </div>
          <span className="mt-1 size-3 shrink-0 rounded-full" style={{ background: project.accent }} />
        </div>
      </Link>
    </motion.article>
  );
}
