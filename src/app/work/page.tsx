import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { Booking } from "@/components/sections/Booking";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Website Design Portfolio",
  description: `${projects.length}+ live websites designed and developed by Fiyinfoluwa Ikuyajolu for finance, consulting, logistics, wellness and food brands.`,
};

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow={`Portfolio · ${projects.length} projects`} title={[{ t: "Websites I’ve" }, { t: "designed & built.", className: "serif-i" }]}>
        <p className="max-w-xl text-[17px] leading-relaxed text-muted">
          Every project below is live. Click any card for the story behind it — or visit the real site.
        </p>
      </PageHero>
      <section className="pb-24">
        <div className="container-x">
          <WorkGrid />
        </div>
      </section>
      <Booking />
    </>
  );
}
