"use client";

import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/data/site";
import { Marquee } from "@/components/ui/Marquee";
import { WhatsAppIcon, Logo } from "@/components/ui/Icons";
import { useLenis } from "@/components/providers/SmoothScroll";

function LagosClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const f = () =>
      setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: site.timezone }).format(new Date()));
    f();
    const id = setInterval(f, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || "--:--"}</span>;
}

export function Footer() {
  const lenis = useLenis();
  const socials = site.socials.filter((s) => s.href);
  return (
    <footer className="relative overflow-hidden bg-invert-bg text-invert-fg">
      <div className="border-b border-white/10 py-8 dark:border-black/10">
        <Marquee duration={30}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 pr-8 text-[clamp(3rem,9vw,8rem)] font-semibold leading-none tracking-[-0.05em]">
              Let&apos;s build something
              <span className="serif-i font-normal text-accent">that sells</span>
              <span className="inline-block size-[0.5em] rounded-full bg-accent" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="size-11 text-invert-fg [--bg:var(--invert-bg)]" />
            <span>
              <span className="block text-lg font-semibold">{site.fullName}</span>
              <span className="block text-sm opacity-60">{site.role}</span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed opacity-70">
            I design and build modern, high-converting websites for ambitious businesses — and back them with data, design and marketing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.mailto()} className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-ink">
              <Mail className="size-4" /> {site.email}
            </a>
            <a href={site.whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-current/20 px-5 py-3 text-sm font-medium">
              <WhatsAppIcon className="size-4" /> {site.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] opacity-50">Explore</p>
            <ul className="space-y-2.5 text-[15px]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="opacity-80 transition-opacity hover:opacity-100">{l.label}</Link>
                </li>
              ))}
              <li><Link href="/work" className="opacity-80 hover:opacity-100">All projects</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] opacity-50">Services</p>
            <ul className="space-y-2.5 text-[15px] opacity-80">
              <li>Website Design</li>
              <li>Web Development</li>
              <li>Data Analysis</li>
              <li>Graphic Design</li>
              <li>Digital Marketing</li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] opacity-50">Say hello</p>
            <ul className="space-y-2.5 text-[15px]">
              <li><Link href="/contact" className="inline-flex items-center gap-1 opacity-80 hover:opacity-100">Book a project <ArrowUpRight className="size-3.5" /></Link></li>
              <li><a href={site.whatsappLink()} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100">WhatsApp</a></li>
              <li><a href={site.mailto()} className="opacity-80 hover:opacity-100">Email</a></li>
              {socials.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100">{s.label}</a></li>
              ))}
            </ul>
            <p className="mt-6 text-sm opacity-60">
              {site.location} · <LagosClock /> WAT
            </p>
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col items-start justify-between gap-4 border-t border-white/10 py-6 text-sm opacity-60 dark:border-black/10 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</p>
        <button
          type="button"
          onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
          className="inline-flex items-center gap-2 hover:opacity-100"
        >
          Back to top <ArrowUp className="size-4" />
        </button>
      </div>

      <div aria-hidden className="pointer-events-none select-none px-2 pb-2 text-center text-[16.5vw] font-semibold leading-[0.78] tracking-[-0.07em] opacity-[0.07]">
        {site.lastName}
      </div>
    </footer>
  );
}
