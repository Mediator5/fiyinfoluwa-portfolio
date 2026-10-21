import type { ReactNode } from "react";
import { RevealText, type Segment } from "./RevealText";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  center,
}: {
  eyebrow: string;
  title: Segment[];
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between", center && "items-center text-center md:flex-col md:items-center", className)}>
      <div className={cn("max-w-3xl", center && "mx-auto")}>
        <Reveal y={16}>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <RevealText className="display mt-5 text-[clamp(2.3rem,5.4vw,4.6rem)]" segments={title} />
        {description && (
          <Reveal delay={0.15} className={cn("mt-6 max-w-xl text-[17px] leading-relaxed text-muted", center && "mx-auto")}>
            {description}
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={0.2} className="shrink-0">{action}</Reveal>}
    </div>
  );
}
