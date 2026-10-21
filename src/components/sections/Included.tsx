"use client";

import { motion } from "framer-motion";
import { Gauge, Smartphone, MousePointerClick, Search, Sparkles, Inbox, LineChart, Rocket } from "lucide-react";
import { included } from "@/data/content";
import { Counter } from "@/components/ui/Counter";
import { projects } from "@/data/projects";
import { ParallaxImage } from "@/components/ui/Parallax";
import { unsplash } from "@/data/site";
import { RevealText } from "@/components/ui/RevealText";
import { Stagger, staggerItem } from "@/components/ui/Reveal";

const icons = [Smartphone, MousePointerClick, Gauge, Search, Sparkles, Inbox, LineChart, Rocket];

export function Included() {
  const stats = [
    { n: projects.length, s: "+", l: "Websites launched" },
    { n: 8, s: "+", l: "Industries served" },
    { n: 4, s: "", l: "Services under one roof" },
    { n: 24, s: "h", l: "Reply time, usually sooner" },
  ];
  return (
    <section className="relative overflow-hidden bg-invert-bg py-24 text-invert-fg md:py-36">
      <div className="absolute inset-0 opacity-25">
        <ParallaxImage src={unsplash("1517694712202-14dd9538aa97", 2000)} alt="" className="size-full" amount={8} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-invert-bg via-invert-bg/85 to-invert-bg" />

      <div className="container-x relative">
        <div className="grid grid-cols-2 gap-6 border-b border-current/15 pb-16 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="text-[clamp(3rem,7vw,6rem)] font-semibold leading-none tracking-[-0.05em]">
                <Counter to={s.n} suffix={s.s} />
              </p>
              <p className="mt-3 text-sm opacity-60">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-12 pt-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="eyebrow !text-current/60">Every website includes</span>
            <RevealText
              className="display mt-5 text-[clamp(2.2rem,4.6vw,4rem)]"
              segments={[{ t: "Everything you need to" }, { t: "win online", className: "serif-i text-accent" }, { t: "— built in." }]}
            />
            <p className="mt-6 max-w-md text-[17px] leading-relaxed opacity-70">
              No hidden extras. Each build ships with the essentials that make a website actually bring in business.
            </p>
          </div>
          <Stagger className="grid gap-px overflow-hidden rounded-[1.75rem] border border-current/15 bg-current/15 sm:grid-cols-2 lg:col-span-7">
            {included.map((item, i) => {
              const Icon = icons[i];
              return (
                <motion.div key={item.title} variants={staggerItem} className="group bg-invert-bg p-6 transition-colors duration-500 hover:bg-accent hover:text-accent-ink">
                  <Icon className="size-5 opacity-80" />
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm opacity-60 group-hover:opacity-80">{item.text}</p>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
