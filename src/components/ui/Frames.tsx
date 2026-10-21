import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  src,
  alt,
  url,
  className,
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  src: string;
  alt: string;
  url?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
  return (
    <div className={cn("overflow-hidden rounded-[1.1rem] border border-line bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]", className)}>
      <div className="flex items-center gap-2 border-b border-line bg-bg-2 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        {host && (
          <span className="mx-auto max-w-[70%] truncate rounded-full bg-surface px-3 py-0.5 text-[11px] text-muted">{host}</span>
        )}
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    </div>
  );
}

export function PhoneFrame({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn("relative rounded-[2.4rem] border border-white/10 bg-[#0d0d0d] p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]", className)}>
      <div className="relative aspect-[1/2] overflow-hidden rounded-[1.9rem]">
        <Image src={src} alt={alt} fill sizes="320px" className="object-cover object-top" />
        <span className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
