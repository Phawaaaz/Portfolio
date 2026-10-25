import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, Github, MessageCircle } from "lucide-react";
import DitherField from "./DitherField";

const EASE = [0.22, 1, 0.36, 1] as const;

// Terminal-block CTA: flat square, faint fill, mono label with a leading icon.
// The ::after extends the hit area to 44px without changing the look.
const cta =
  "relative inline-flex items-center gap-2 bg-[#F5F3EF]/[0.06] px-2.5 py-1 font-mono text-sm text-[#A8906F] transition-[background-color,color] duration-150 ease-out after:absolute after:-inset-y-1.5 after:inset-x-0 hover:bg-[#A8906F] hover:text-[#0D0D0D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8906F]";

const links = [
  { label: "Resume", href: "/Fawaz_Akinola_CV.pdf", Icon: FileText },
  { label: "GitHub", href: "https://github.com/phawaaaz", Icon: Github },
  { label: "WhatsApp", href: "https://wa.me/2349012183194", Icon: MessageCircle },
];

// Wordmark hero in three planes: the name fills the back, the portrait stands
// in front of it, and the statement and actions sit on top.
const Hero = () => {
  const [pixelOpacity, setPixelOpacity] = useState(1);
  const [textVisible, setTextVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Scrolling away: the name drifts slower than the page, the portrait sinks, all fade.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Same timing as before: the dither clears as the preload screen leaves, then the intro plays.
  useEffect(() => {
    const timer1 = setTimeout(() => setPixelOpacity(0), 1500);
    const timer2 = setTimeout(() => setTextVisible(true), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Split and stagger: each group enters ~100ms after the previous one.
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: textVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section
      ref={ref}
      data-section
      className="relative flex min-h-screen flex-col overflow-hidden px-5 pb-28 pt-10 md:px-10 md:pb-10"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B7355]/20 to-transparent" />
      </div>

      <div
        className="absolute inset-0 bg-dither-pattern transition-opacity duration-500"
        style={{ opacity: pixelOpacity }}
      />

      {/* Interactive dither field: fades in once the intro has played. */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${textVisible ? "opacity-100" : "opacity-0"}`}
      >
        <DitherField />
      </div>

      <motion.div
        {...enter(0)}
        className="relative z-20 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#8B7355] md:text-sm"
      >
        <span>Full Stack Developer</span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 animate-pulse rounded-full bg-[#A8906F]" aria-hidden="true" />
          <span className="md:hidden">Open to work</span>
          <span className="hidden md:inline">Open to roles &amp; projects</span>
        </span>
      </motion.div>

      <motion.div style={{ opacity: fade }} className="relative mt-auto">
        <motion.h1
          style={{ y: nameY }}
          aria-label="Akinola Fawaz"
          className="relative z-0 mt-12 select-none text-center font-serif uppercase leading-[0.82] tracking-[-0.03em] text-[#F5F3EF]"
        >
          {["Akinola", "Fawaz"].map((word, i) => (
            <span key={word} className="block overflow-hidden" aria-hidden="true">
              <motion.span
                className="block text-[18.5vw] md:text-[15.5vw]"
                initial={{ y: "100%" }}
                animate={{ y: textVisible ? "0%" : "100%" }}
                transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <div className="relative z-10 grid items-end gap-8 md:grid-cols-12 md:gap-6">
          <motion.div {...enter(0.45)} className="order-2 md:order-1 md:col-span-4">
            <p className="max-w-sm text-lg leading-snug text-[#F5F3EF]/90 text-pretty md:text-xl">
              Building scalable web applications with React, Node.js, and TypeScript.
            </p>
            <p className="mt-2 max-w-sm text-lg leading-snug text-[#8B7355] text-pretty md:text-xl">
              Turning complex problems into elegant solutions.
            </p>
          </motion.div>

          <motion.div
            style={{ y: portraitY }}
            className="order-1 -mt-[9vw] flex justify-center md:order-2 md:col-span-4 md:-mt-[12vw]"
          >
            <motion.img
              src="/fawaz.png"
              alt=""
              width={447}
              height={559}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 40 }}
              transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
              // Toned for the dark theme: monochrome with a warm bronze cast, lower
              // exposure, and the bottom faded into the background.
              className="h-auto w-[62vw] max-w-[340px] [filter:grayscale(1)_sepia(0.35)_brightness(0.6)_contrast(1.15)] [mask-image:linear-gradient(to_bottom,black_60%,transparent_98%)] md:w-full md:max-w-[440px]"
            />
          </motion.div>

          <motion.div
            {...enter(0.55)}
            className="order-3 flex flex-wrap items-center justify-center gap-3 md:col-span-4 md:justify-end"
          >
            {links.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={cta}>
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-film-grain opacity-10" />
      </div>
    </section>
  );
};

export default Hero;
