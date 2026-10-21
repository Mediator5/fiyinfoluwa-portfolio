import { projects } from "@/data/projects";
import { Marquee } from "@/components/ui/Marquee";

export function ClientMarquee() {
  return (
    <section aria-label="Brands I've built websites for" className="border-y border-line bg-bg-2/60 py-7">
      <Marquee duration={45}>
        {projects.map((p) => (
          <span key={p.slug} className="flex items-center gap-10 pr-10 text-xl font-semibold tracking-tight text-fg/70 md:text-2xl">
            {p.name}
            <span className="serif-i text-2xl text-muted">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
