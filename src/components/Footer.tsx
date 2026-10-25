import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, FileText, GitBranch, Mail } from "lucide-react";
import DitherField from "./DitherField";

const EASE = [0.22, 1, 0.36, 1] as const;

// Same order as the sections in App.tsx (Reviews renders only once it has entries).
const navigate = [
  { label: "About", match: "About" },
  { label: "Projects", match: "Projects" },
  { label: "Experience", match: "Experience" },
  { label: "Tech Stack", match: "Tech Stack" },
  { label: "Contact", match: "Get In Touch" },
];

const connect = [
  { label: "WhatsApp", url: "https://wa.me/2349012183194" },
  { label: "GitHub", url: "https://github.com/phawaaaz" },
  { label: "LinkedIn", url: "https://linkedin.com/in/phawaz/" },
  { label: "Twitter", url: "https://twitter.com/No_lolade" },
  { label: "Instagram", url: "https://instagram.com/phawaaz_" },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Find a section by its heading text, so the links survive sections being reordered.
const scrollToSection = (heading: string) => {
  const target = [...document.querySelectorAll("section[data-section]")].find(
    (s) => s.querySelector("h2")?.textContent?.trim() === heading
  );
  target?.scrollIntoView({ behavior: prefersReducedMotion() ? "instant" : "smooth" });
};

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

const linkClass =
  "inline-flex min-h-8 items-center font-mono text-sm text-[#F5F3EF]/60 transition-colors duration-150 hover:text-[#A8906F]";

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
          className="relative select-none px-4 pt-20 text-center font-serif uppercase leading-[0.82] tracking-[-0.03em] text-[#F5F3EF] md:pt-28"
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

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3">
        <div>
          <h3 className="mb-4 font-mono text-sm text-[#8B7355]">Navigate</h3>
          <ul className="space-y-1">
            {navigate.map((item) => (
              <li key={item.label}>
                <button type="button" onClick={() => scrollToSection(item.match)} className={linkClass}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-sm text-[#8B7355]">Connect</h3>
          <ul className="space-y-1">
            {connect.map((item) => (
              <li key={item.label}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-mono text-sm text-[#8B7355]">Say hello</h3>
          <p className="mb-5 max-w-xs text-base leading-relaxed text-[#F5F3EF]/70 text-pretty">
            Have a role or a project in mind? Send me a message.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:phawaazakin@gmail.com"
              className="relative inline-flex items-center gap-2 bg-[#F5F3EF]/[0.06] px-2.5 py-1 font-mono text-sm text-[#A8906F] transition-[background-color,color] duration-150 ease-out after:absolute after:-inset-y-1.5 after:inset-x-0 hover:bg-[#A8906F] hover:text-[#0D0D0D]"
            >
              <Mail className="size-4" aria-hidden="true" />
              Email
            </a>
            <a
              href="/Fawaz_Akinola_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 bg-[#F5F3EF]/[0.06] px-2.5 py-1 font-mono text-sm text-[#A8906F] transition-[background-color,color] duration-150 ease-out after:absolute after:-inset-y-1.5 after:inset-x-0 hover:bg-[#A8906F] hover:text-[#0D0D0D]"
            >
              <FileText className="size-4" aria-hidden="true" />
              Resume
            </a>
          </div>
        </div>
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
