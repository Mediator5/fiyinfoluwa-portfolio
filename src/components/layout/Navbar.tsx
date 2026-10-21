"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Logo, WhatsAppIcon } from "@/components/ui/Icons";
import { cn, ease } from "@/lib/utils";
import { useLenis } from "@/components/providers/SmoothScroll";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev && !open);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="container-x pt-3 md:pt-4">
          <nav
            className={cn(
              "flex h-16 items-center justify-between rounded-full pl-3 pr-2 transition-all duration-500 md:pl-4",
              scrolled || open ? "border border-line bg-bg/75 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)] backdrop-blur-xl" : "border border-transparent",
            )}
          >
            <Link href="/" className="flex items-center gap-2.5" data-cursor="hover" aria-label={`${site.fullName} — home`}>
              <Logo className="size-9 text-fg" />
              <span className="leading-none">
                <span className="block text-[15px] font-semibold tracking-tight">{site.firstName}</span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-muted">{site.lastName}</span>
              </span>
            </Link>

            <ul className="hidden items-center gap-1 rounded-full border border-line bg-surface/60 p-1 backdrop-blur lg:flex">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    data-cursor="hover"
                    className="block rounded-full px-4 py-2 text-[13.5px] font-medium text-muted transition-colors hover:bg-bg-2 hover:text-fg"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="hidden sm:block">
                <Button href="/#book" variant="dark">
                  Book a call
                </Button>
              </div>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="relative grid size-11 place-items-center rounded-full bg-invert-bg text-invert-fg lg:hidden"
              >
                <span className={cn("absolute h-[1.5px] w-4 bg-current transition-all duration-300", open ? "rotate-45" : "-translate-y-[4px]")} />
                <span className={cn("absolute h-[1.5px] w-4 bg-current transition-all duration-300", open ? "-rotate-45" : "translate-y-[4px]")} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-bg px-6 pb-8 pt-28 lg:hidden"
            data-lenis-prevent
          >
            <ul className="space-y-1">
              {[{ label: "Home", href: "/" }, ...navLinks, { label: "Contact", href: "/contact" }].map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.05 }}>
                    <Link href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-3 py-1 text-[2.6rem] font-semibold leading-tight tracking-tight">
                      <span className="text-xs font-medium text-muted">0{i + 1}</span>
                      {l.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="mt-auto space-y-3">
              <Button href="/#book" size="lg" className="w-full justify-between" onClick={() => setOpen(false)}>
                Book a free strategy call
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <a href={site.whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-line py-3.5 text-sm font-medium">
                  <WhatsAppIcon className="size-4 text-[#25D366]" /> WhatsApp
                </a>
                <a href={site.mailto()} className="flex items-center justify-center gap-2 rounded-full border border-line py-3.5 text-sm font-medium">
                  <Mail className="size-4" /> Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
