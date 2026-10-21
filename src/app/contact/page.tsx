import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Booking } from "@/components/sections/Booking";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Book a Project",
  description: "Book a free strategy call with Fiyinfoluwa Ikuyajolu — or reach out by email or WhatsApp to start your new website.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title={[{ t: "Let’s build your" }, { t: "next website.", className: "serif-i" }]}>
        <p className="max-w-xl text-[17px] leading-relaxed text-muted">Fill in the form, send an email or message me on WhatsApp — whichever is easiest for you.</p>
      </PageHero>
      <div className="-mt-16 md:-mt-24">
        <Booking />
      </div>
      <FAQ />
    </>
  );
}
