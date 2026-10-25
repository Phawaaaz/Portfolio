import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Mail } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const statement =
  "I build web products end to end, from the database to the last pixel: fintech tools, AI products, and the websites that sell them.";

// From GitHub activity, checked 13 Oct 2026.
const proof = [
  { value: 182, label: "commits last year" },
  { value: 62, label: "pull requests last year" },
];

// Each word brightens as the statement scrolls through the screen.
const Word = ({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
};

const CountUp = ({ to }: { to: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, { duration: 1.6, ease: EASE, onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
};

const rise = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
};

const About = () => {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: statementRef, offset: ["start 0.85", "end 0.5"] });
  const words = statement.split(" ");

  return (
    <section data-section className="relative overflow-hidden px-6 py-24 md:px-12 md:py-36">
      <div className="absolute inset-0 opacity-5 bg-film-grain" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div {...rise} transition={{ duration: 0.8, ease: EASE }} className="flex items-baseline justify-between gap-6">
          <h2 className="font-serif text-4xl text-[#8B7355] md:text-5xl">About</h2>
          <p className="font-mono text-sm text-[#F5F3EF]/50">Lagos, Nigeria</p>
        </motion.div>

        <p
          ref={statementRef}
          aria-label={statement}
          className="relative mt-10 font-serif text-3xl leading-[1.25] text-[#F5F3EF] md:mt-14 md:text-5xl"
        >
          {words.map((word, i) => (
            <Word key={i} word={word} range={[i / words.length, (i + 1) / words.length]} progress={scrollYProgress} />
          ))}
        </p>

        <div className="mt-14 md:mt-20">
          <motion.dl
            {...rise}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="grid max-w-md grid-cols-2 gap-4"
          >
            {proof.map((item) => (
              <div key={item.label}>
                <dd className="font-serif text-5xl text-[#F5F3EF] md:text-6xl">
                  <CountUp to={item.value} />
                </dd>
                <dt className="mt-2 font-mono text-xs leading-snug text-[#A8906F] md:text-sm">{item.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div {...rise} transition={{ duration: 0.8, delay: 0.15, ease: EASE }} className="mt-12">
          <a
            href="mailto:phawaazakin@gmail.com"
            className="relative inline-flex items-center gap-2 bg-[#F5F3EF]/[0.06] px-2.5 py-1 font-mono text-sm text-[#A8906F] transition-[background-color,color] duration-150 ease-out after:absolute after:-inset-y-1.5 after:inset-x-0 hover:bg-[#A8906F] hover:text-[#0D0D0D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8906F]"
          >
            <Mail className="size-4" aria-hidden="true" />
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
