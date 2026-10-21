"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      data-cursor="hover"
      className={cn(
        "relative grid size-11 place-items-center overflow-hidden rounded-full border border-line bg-surface/70 text-fg backdrop-blur transition-colors hover:border-fg/30",
        className,
      )}
    >
      <Sun className={cn("absolute size-[18px] transition-all duration-500", dark ? "translate-y-0 rotate-0 opacity-100" : "translate-y-6 rotate-90 opacity-0")} />
      <Moon className={cn("absolute size-[18px] transition-all duration-500", dark ? "-translate-y-6 -rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100")} />
    </button>
  );
}
