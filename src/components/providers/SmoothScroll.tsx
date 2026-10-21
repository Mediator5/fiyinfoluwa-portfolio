"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const raf = useRef<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const instance = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    setLenis(instance);
    const loop = (time: number) => {
      instance.raf(time);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    // Smooth-scroll same-page anchor links (e.g. "/#work" or "#book")
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const el = document.querySelector(url.hash);
      if (!el) return;
      e.preventDefault();
      instance.scrollTo(el as HTMLElement, { offset: -80 });
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf.current);
      document.removeEventListener("click", onClick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Scroll to top (or hash) on route change
  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    const el = hash ? document.querySelector(hash) : null;
    if (el) setTimeout(() => lenis.scrollTo(el as HTMLElement, { offset: -80, immediate: false }), 120);
    else lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
}
