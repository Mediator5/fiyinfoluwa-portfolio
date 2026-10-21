"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { comparison } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ease } from "@/lib/utils";

function Mark({ ok, strong }: { ok: boolean; strong?: boolean }) {
  return ok ? (
    <span className={"mx-auto grid size-7 place-items-center rounded-full " + (strong ? "bg-accent text-accent-ink" : "bg-fg/10 text-fg")}>
      <Check className="size-4" strokeWidth={3} />
    </span>
  ) : (
    <span className="mx-auto grid size-7 place-items-center rounded-full bg-red-500/10 text-red-500">
      <X className="size-4" strokeWidth={3} />
    </span>
  );
}

export function Comparison() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Why work with me"
          title={[{ t: "Agency quality," }, { t: "freelancer care.", className: "serif-i" }]}
          description="Get the polish of a big studio with the speed, flexibility and personal attention of working directly with the designer."
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease }}
          className="card mx-auto max-w-4xl p-1.5 md:p-2"
        >
          <table className="w-full table-fixed text-left">
            <thead>
              <tr className="text-sm">
                <th className="w-[46%] p-3 font-medium text-muted md:p-5">What you get</th>
                <th className="p-2 text-center text-xs font-medium text-muted md:p-5 md:text-sm">DIY<span className="hidden md:inline"> builder</span></th>
                <th className="p-2 text-center text-xs font-medium text-muted md:p-5 md:text-sm"><span className="hidden md:inline">Big </span>agency</th>
                <th className="rounded-t-2xl bg-invert-bg p-2 text-center text-xs font-semibold text-invert-fg md:p-5 md:text-sm"><span className="hidden md:inline">Working with </span>me</th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, i) => (
                <tr key={row} className="border-t border-line">
                  <td className="p-3 text-[13px] font-medium md:p-5 md:text-[15px]">{row}</td>
                  <td className="p-2 md:p-5"><Mark ok={comparison.diy[i]} /></td>
                  <td className="p-2 md:p-5"><Mark ok={comparison.agency[i]} /></td>
                  <td className="bg-invert-bg p-2 md:p-5"><Mark ok={comparison.me[i]} strong /></td>
                </tr>
              ))}
              <tr className="border-t border-line">
                <td className="p-3 text-[13px] font-medium md:p-5 md:text-[15px]">Typical investment</td>
                <td className="p-2 text-center text-xs text-muted md:p-5 md:text-sm">Your time</td>
                <td className="p-2 text-center text-xs text-muted md:p-5 md:text-sm">$$$$</td>
                <td className="rounded-b-2xl bg-invert-bg p-2 text-center text-xs font-semibold text-invert-fg md:p-5 md:text-sm">Fixed quote</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
