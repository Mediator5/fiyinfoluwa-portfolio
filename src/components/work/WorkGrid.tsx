"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { projects, projectFilters } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

export function WorkGrid() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const list = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.filter === filter)), [filter]);
  return (
    <LayoutGroup>
      <div className="mb-12 flex flex-wrap gap-2">
        {projectFilters.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.filter === f).length;
          if (!count) return null;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              data-cursor="hover"
              className={cn("relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors", filter === f ? "text-bg" : "text-muted hover:text-fg")}
            >
              {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">
                {f} <sup className="ml-0.5 text-[10px] opacity-60">{count}</sup>
              </span>
            </button>
          );
        })}
      </div>
      <motion.div layout className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
