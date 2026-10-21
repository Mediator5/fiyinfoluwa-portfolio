"use client";

import Image from "next/image";
import { CalendarDays, Mail } from "lucide-react";
import { site, unsplash } from "@/data/site";
import { BookingForm } from "@/components/work/BookingForm";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/Icons";

export function ContactOptions() {
  const options = [
    site.calendlyUrl
      ? { icon: CalendarDays, title: "Book a call", text: "Pick a time that suits you", href: site.calendlyUrl, external: true }
      : { icon: CalendarDays, title: "Book a free call", text: "Fill the form — I’ll send a time", href: "#booking-form", external: false },
    { icon: Mail, title: "Email me", text: site.email, href: site.mailto(), external: false },
    { icon: WhatsAppIcon, title: "WhatsApp me", text: site.phoneDisplay, href: site.whatsappLink(), external: true },
  ];
  return (
    <div className="grid gap-3">
      {options.map((o) => (
        <a
          key={o.title}
          href={o.href}
          target={o.external ? "_blank" : undefined}
          rel={o.external ? "noopener noreferrer" : undefined}
          data-cursor="hover"
          className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur transition-all duration-500 hover:border-accent hover:bg-accent hover:text-accent-ink"
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/10 transition-colors group-hover:bg-accent-ink group-hover:text-accent">
            <o.icon className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-semibold">{o.title}</span>
            <span className="block truncate text-sm opacity-70">{o.text}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export function Booking() {
  return (
    <section id="book" className="relative py-24 md:py-36">
      <div className="container-x grid gap-5 lg:grid-cols-12">
        <div className="relative overflow-hidden rounded-[2rem] text-white lg:col-span-5">
          <Image src={unsplash("1497366216548-37526070297c", 1400)} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/90" />
          <div className="relative flex h-full flex-col p-8 md:p-10">
            <Reveal y={16}><span className="eyebrow !text-white/70">Let&apos;s talk</span></Reveal>
            <RevealText
              className="display mt-5 text-[clamp(2.3rem,4.6vw,4rem)]"
              segments={[{ t: "Ready for a website that" }, { t: "brings in clients?", className: "serif-i text-accent" }]}
            />
            <Reveal delay={0.1} className="mt-6 text-[16px] leading-relaxed text-white/75">
              Book a free 20-minute strategy call. We&apos;ll talk goals, I&apos;ll share ideas for your site — and you&apos;ll leave with a clear plan, whether you hire me or not.
            </Reveal>
            <ul className="mt-8 space-y-3 text-sm text-white/80">
              {["Free consultation, zero pressure", "Fixed quote within 24–48 hours", "Remote-friendly across time zones"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="size-1.5 rounded-full bg-accent" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 lg:mt-auto lg:pt-10">
              <ContactOptions />
            </div>
          </div>
        </div>
        <div id="booking-form" className="lg:col-span-7">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
