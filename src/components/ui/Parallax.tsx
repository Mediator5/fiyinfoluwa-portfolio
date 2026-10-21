"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = { src: string; alt: string; className?: string; amount?: number; sizes?: string; priority?: boolean; imgClassName?: string };

/** Image that drifts inside its frame while scrolling. */
export function ParallaxImage({ src, alt, className, amount = 12, sizes = "100vw", priority, imgClassName }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-[-14%]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imgClassName)} />
      </motion.div>
    </div>
  );
}
