import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, GitBranch } from "lucide-react";
import DitherField from "./DitherField";

const EASE = [0.22, 1, 0.36, 1] as const;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Live time in Lagos, ticking every 10 seconds.
const useLagosTime = () => {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 10_000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const Footer = () => {
  const time = useLagosTime();

  return (
    <footer className="relative overflow-hidden border-t border-[#F5F3EF]/10">
      <div className="absolute inset-0 opacity-5 bg-film-grain" />

      {/* Wordmark, echoing the hero, over the same interactive dither. */}
      <div className="relative">
        <DitherField />
        <p
          aria-hidden="true"
          className="relative select-none px-4 pb-12 pt-20 text-center font-serif uppercase leading-[0.82] tracking-[-0.03em] text-[#F5F3EF] md:pt-28"
        >
          {["Akinola", "Fawaz"].map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="block text-[18.5vw] md:text-[13vw]"
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: i * 0.12, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
      </div>

      {/* Terminal-style status bar. Extra bottom padding on phones clears the dot nav. */}
      <div className="relative border-t border-[#F5F3EF]/10 bg-[#F5F3EF]/[0.03] pb-20 md:pb-0">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-3 font-mono text-xs text-[#F5F3EF]/50">
          <div className="flex items-center gap-4">
            <span className="text-[#A8906F]">~/phawaaz/portfolio</span>
            <span className="flex items-center gap-1">
              <GitBranch className="size-3.5" aria-hidden="true" />
              main
            </span>
            <span>
              Lagos <span className="tabular-nums text-[#F5F3EF]/70">{time}</span> WAT
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>© 2026 Akinola Fawaz</span>
            <button
              type="button"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "instant" : "smooth" })
              }
              className="inline-flex min-h-8 items-center gap-1 text-[#A8906F] transition-colors duration-150 hover:text-[#F5F3EF]"
            >
              <ArrowUp className="size-3.5" aria-hidden="true" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
