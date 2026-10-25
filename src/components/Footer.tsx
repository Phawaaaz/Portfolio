import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, GitBranch } from "lucide-react";
import AsciiRain from "./AsciiRain";

const EASE = [0.16, 1, 0.3, 1] as const;

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

      {/* Sign-off, echoing the hero: the name rises letter by letter over the same ASCII rain. */}
      <div className="relative px-6 py-24 text-center md:py-32">
        <AsciiRain />
        <motion.p
          aria-label="Akinola Fawaz"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: false, amount: 0.6 }}
          className="relative font-serif text-6xl leading-[0.95] tracking-tight text-[#F5F3EF] md:text-8xl"
        >
          {["Akinola", "Fawaz"].map((word, w) => (
            <Fragment key={word}>
              <span className="inline-block whitespace-nowrap">
                {[...word].map((ch, i) => (
                  <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                    <motion.span
                      className="inline-block"
                      variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
                      transition={{ duration: 0.5, delay: (w * 8 + i) * 0.03, ease: EASE }}
                    >
                      {ch}
                    </motion.span>
                  </span>
                ))}
              </span>
              {w === 0 && " "}
            </Fragment>
          ))}
        </motion.p>
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
