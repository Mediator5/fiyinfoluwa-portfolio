"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Code2, BarChart3, Palette, Megaphone } from "lucide-react";
import { services } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/ui/Parallax";
import { ease } from "@/lib/utils";

const icons = { web: Code2, data: BarChart3, graphics: Palette, marketing: Megaphone } as const;

export function Services() {
  const [main, ...others] = services;
  const MainIcon = icons.web;
  return (
    <section id="services" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title={[{ t: "One partner for" }, { t: "your whole", className: "serif-i" }, { t: "online presence." }]}
          description="Website design & development is my speciality. When you need more, I’ve got you covered with data, design and marketing too."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {/* Primary service */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease }}
            className="card relative overflow-hidden p-3 lg:col-span-2 lg:row-span-3"
          >
            <div className="grid h-full gap-3 md:grid-cols-2">
              <div className="flex flex-col p-5 md:p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-ink">
                  <MainIcon className="size-5" />
                </span>
                <span className="mt-6 inline-flex w-fit rounded-full bg-fg px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-bg">Main service</span>
                <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{main.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{main.blurb}</p>
                <ul className="mt-6 space-y-3">
                  {main.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-[15px]">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-accent-ink">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3 pt-2 md:mt-auto">
                  <Button href="/#book">Start my website</Button>
                  <Button href="/#pricing" variant="outline" icon={false}>See packages</Button>
                </div>
              </div>
              <ParallaxImage src={main.image} alt="Designing a website on a laptop" className="min-h-[22rem] rounded-[1.4rem]" sizes="(min-width:1024px) 33vw, 100vw" />
            </div>
          </motion.div>

          {others.map((s, i) => {
            const Icon = icons[s.id as keyof typeof icons];
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease, delay: 0.1 * (i + 1) }}
                className="group card relative flex min-h-[15rem] overflow-hidden"
              >
                <Image src={s.image} alt={s.title} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="relative flex w-full flex-col p-6 transition-colors duration-500 group-hover:text-white">
                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-2xl border border-line bg-bg transition-colors group-hover:border-white/20 group-hover:bg-white/10">
                      <Icon className="size-5" />
                    </span>
                    <span className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted transition-colors group-hover:border-white/30 group-hover:text-white/80">
                      Portfolio coming soon
                    </span>
                  </div>
                  <h3 className="mt-auto pt-8 text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted transition-colors group-hover:text-white/80">{s.blurb}</p>
                  <Link href={`/contact?service=${encodeURIComponent(s.title)}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                    Enquire <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
