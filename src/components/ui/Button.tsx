"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "accent" | "dark" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  accent: "bg-accent text-accent-ink hover:shadow-[0_10px_40px_-10px_var(--accent)]",
  dark: "bg-invert-bg text-invert-fg",
  outline: "border border-line text-fg hover:border-fg/40 bg-transparent",
  ghost: "text-fg bg-transparent",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode | false;
  external?: boolean;
  size?: "md" | "lg";
  magnetic?: boolean;
  onClick?: () => void;
};

export function Button({ href, children, variant = "accent", className, icon, external, size = "md", magnetic = true, onClick }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-medium transition-[box-shadow,border-color,background-color] duration-300",
        size === "lg" ? "h-14 pl-7 pr-2 text-[15px]" : "h-12 pl-6 pr-1.5 text-sm",
        icon === false && (size === "lg" ? "pr-7" : "pr-6"),
        styles[variant],
        className,
      )}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0">
          {children}
        </span>
      </span>
      {icon !== false && (
        <span
          className={cn(
            "relative grid place-items-center overflow-hidden rounded-full transition-transform duration-500 group-hover:rotate-45",
            size === "lg" ? "size-10" : "size-9",
            variant === "accent" ? "bg-accent-ink text-accent" : variant === "dark" ? "bg-accent text-accent-ink" : "bg-fg text-bg",
          )}
        >
          {icon ?? <ArrowUpRight className="size-4" />}
        </span>
      )}
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block" onClick={onClick} data-cursor="hover">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className="inline-block" onClick={onClick} data-cursor="hover">
      {content}
    </Link>
  );
}
