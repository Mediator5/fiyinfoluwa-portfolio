"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/ui/Parallax";
import { Marquee } from "@/components/ui/Marquee";
import { ease } from "@/lib/utils";

const skills = ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Figma", "WordPress", "Excel & Power BI", "Photoshop", "Canva", "SEO", "Google Analytics", "Meta Ads"];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}>
            <motion.div
              variants={{ hidden: { clipPath: "inset(0 0 100% 0 round 2rem)" }, show: { clipPath: "inset(0 0 0% 0 round 2rem)", transition: { duration: 1.3, ease } } }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem]"
            >
              <motion.div variants={{ hidden: { scale: 1.2 }, show: { scale: 1, transition: { duration: 1.6, ease } } }} className="absolute inset-0">
                <Image src={site.portraitAbout} alt={site.fullName} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-[center_20%]" />
              </motion.div>
            </motion.div>
          </motion.div>
          <div className="absolute -bottom-10 -right-4 hidden w-44 overflow-hidden rounded-2xl border-4 border-bg shadow-2xl sm:block md:-right-10 md:w-56">
            <ParallaxImage
              src={site.portraitStudio}
              alt={`${site.firstName} ${site.lastName}`}
              imgClassName="object-[center_20%]"
              className="aspect-[4/5] w-full"
              sizes="224px"
              amount={8}
            />
          </div>
          <div className="absolute -left-3 top-6 rounded-2xl bg-accent px-4 py-3 text-accent-ink shadow-xl md:-left-8">
            <p className="text-xs font-medium uppercase tracking-wider">Based in</p>
            <p className="font-semibold">{site.location}</p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <Reveal y={16}><span className="eyebrow">About me</span></Reveal>
          <RevealText
            className="display mt-5 text-[clamp(2.2rem,4.8vw,4.2rem)]"
            segments={[{ t: "Design, data &" }, { t: "marketing", className: "serif-i" }, { t: "— working together for your growth." }]}
          />
          <Reveal delay={0.1} className="mt-8 space-y-5 text-[17px] leading-relaxed text-muted">
            <p>
              I&apos;m <span className="font-semibold text-fg">{site.fullName}</span>, a web designer and developer from Nigeria working with clients worldwide.
              I build websites with modern tools like Next.js so they look premium, feel smooth and load fast.
            </p>
            <p>
              What makes me different? I don&apos;t stop at “pretty.” My background in <span className="text-fg">data analysis</span>, <span className="text-fg">graphic design</span> and{" "}
              <span className="text-fg">digital marketing</span> means every page is planned around one goal: getting your business more customers.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <Button href="/#book">Work with me</Button>
            <Button href="/work" variant="outline" icon={false}>Browse my work</Button>
          </Reveal>
        </div>
      </div>

      <div className="mt-24 md:mt-32">
        <Marquee duration={35} reverse>
          {skills.map((s) => (
            <span key={s} className="mx-2 rounded-full border border-line bg-surface px-6 py-3 text-lg font-medium md:text-xl">{s}</span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
