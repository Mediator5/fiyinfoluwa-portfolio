"use client";

import { AnimatePresence, motion, useScroll, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { ease } from "@/lib/utils";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent" />;
}

export function FloatingWhatsApp() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 500));
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={site.whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_16px_40px_-12px_rgba(37,211,102,0.7)] md:bottom-8 md:right-8"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] [animation:pulse-ring_2.4s_ease-out_infinite]" />
          <WhatsAppIcon className="relative size-6" />
          <span className="relative hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-500 group-hover:max-w-[12rem] group-hover:pr-2 md:block">
            Chat with me
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/** Small dot + ring cursor for desktop (hidden on touch devices). */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [mode, setMode] = useState<"default" | "hover" | "view">("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      const m = t?.dataset.cursor;
      setMode(m === "view" ? "view" : m || (e.target as HTMLElement)?.closest?.("a,button") ? "hover" : "default");
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;
  const size = mode === "view" ? 96 : mode === "hover" ? 44 : 12;
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
    >
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ duration: 0.35, ease }}
        className={
          "-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full " +
          (mode === "view" ? "bg-accent text-accent-ink" : mode === "hover" ? "border border-fg/40 bg-fg/5 backdrop-blur-[2px]" : "bg-white mix-blend-difference")
        }
      >
        {mode === "view" && <span className="text-[13px] font-semibold">View ↗</span>}
      </motion.div>
    </motion.div>
  );
}

/** Quick intro curtain on first visit of the session. */
export function Preloader() {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1100);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setShow(false), 180);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="pre"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease }}
          className="preloader fixed inset-0 z-[200] flex flex-col justify-between bg-invert-bg p-6 text-invert-fg md:p-10"
          style={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div className="flex justify-between text-xs uppercase tracking-[0.25em] opacity-60">
            <span>{site.fullName}</span>
            <span>Portfolio ©{new Date().getFullYear()}</span>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-none tracking-[-0.05em]"
            >
              Design <span className="serif-i font-normal text-accent">that converts.</span>
            </motion.p>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-sm opacity-60">Loading experience</span>
            <span className="text-[clamp(3rem,10vw,9rem)] font-semibold leading-none tabular-nums tracking-tighter">{count}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
