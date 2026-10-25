import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Github, MessageCircle } from "lucide-react";
import AsciiRain from "./AsciiRain";

const EASE = [0.16, 1, 0.3, 1] as const;

const name = "Akinola Fawaz";
const line = "I build web products end to end, from the database to the last pixel.";

// Terminal-block CTA: flat square, faint fill, mono label with a leading icon.
// The ::after extends the hit area to 44px without changing the look.
const cta =
  "relative inline-flex items-center gap-2 bg-[#F5F3EF]/[0.06] px-2.5 py-1 font-mono text-sm text-[#A8906F] transition-[background-color,color] duration-150 ease-out after:absolute after:-inset-y-1.5 after:inset-x-0 hover:bg-[#A8906F] hover:text-[#0D0D0D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8906F]";

const links = [
  { label: "Resume", href: "/Fawaz_Akinola_CV.pdf", Icon: FileText },
  { label: "GitHub", href: "https://github.com/phawaaaz", Icon: Github },
  { label: "WhatsApp", href: "https://wa.me/2349012183194", Icon: MessageCircle },
];

// One piece of text sliding up from behind a mask.
const Masked = ({ children, show, delay }: { children: string; show: boolean; delay: number }) => (
  <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] align-bottom">
    <motion.span
      className="inline-block"
      initial={{ y: "110%" }}
      animate={{ y: show ? "0%" : "110%" }}
      transition={{ duration: 0.5, delay: show ? delay : 0, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

// Quiet wordmark hero. The name rises letter by letter, the line word by word,
// and it all replays whenever the hero scrolls back into view.
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  // Wait for the preload screen to leave before the first reveal.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(t);
  }, []);
  const show = loaded && inView;

  const letters = [...name];
  const words = line.split(" ");
  const lineStart = 0.15 + letters.length * 0.03;
  const buttonsStart = lineStart + words.length * 0.025 + 0.1;

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    transition: { duration: 0.4, delay: show ? delay : 0, ease: EASE },
  });

  return (
    <section
      ref={ref}
      data-section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-24 pt-10"
    >
      <AsciiRain />
      <div className="pointer-events-none absolute inset-0 bg-film-grain opacity-5" />

      <div className="relative z-10 text-center">
        <motion.p {...fade(0)} className="font-mono text-sm uppercase tracking-widest text-[#8B7355]">
          Full Stack Developer · Lagos
        </motion.p>

        <h1
          aria-label={name}
          className="mt-6 font-serif text-6xl leading-[0.95] tracking-tight text-[#F5F3EF] md:text-8xl"
        >
          {name.split(" ").map((word, w, all) => {
            // Letters before this word, so the stagger runs across the whole name.
            const offset = all.slice(0, w).join(" ").length + (w > 0 ? 1 : 0);
            return (
              <Fragment key={word}>
                {/* Keep each word together; the space between words can wrap on phones. */}
                <span className="inline-block whitespace-nowrap">
                  {[...word].map((ch, i) => (
                    <Masked key={i} show={show} delay={0.15 + (offset + i) * 0.03}>
                      {ch}
                    </Masked>
                  ))}
                </span>
                {w < all.length - 1 && " "}
              </Fragment>
            );
          })}
        </h1>

        <p
          aria-label={line}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#F5F3EF]/70 text-pretty md:text-xl"
        >
          {words.map((word, i) => (
            <Fragment key={i}>
              <Masked show={show} delay={lineStart + i * 0.025}>
                {word}
              </Masked>
              {i < words.length - 1 && " "}
            </Fragment>
          ))}
        </p>

        <motion.div {...fade(buttonsStart)} className="mt-10 flex flex-wrap justify-center gap-3">
          {links.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={cta}>
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
