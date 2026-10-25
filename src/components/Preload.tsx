import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface PreloadProps {
  /** Called as the curtain starts to lift, so the hero can reveal underneath. */
  onReveal: () => void;
  /** Called once the curtain is fully gone. */
  onDone: () => void;
}

const MIN_MS = 700; // never flash for a split second
const MAX_MS = 2500; // never hold a visitor longer than this

const EASE = [0.76, 0, 0.24, 1] as const;

// Resolves when web fonts and the page itself have finished loading.
const pageReady = () =>
  Promise.all([
    document.fonts?.ready ?? Promise.resolve(),
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true })),
  ]);

// Shown once per visit: the "A." mark with a blinking bronze full stop and a
// counter that tracks real loading, then a curtain that lifts off the hero.
const Preload = ({ onReveal, onDone }: PreloadProps) => {
  const [count, setCount] = useState(0);
  const [lifting, setLifting] = useState(false);
  const reduced = useRef(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const start = performance.now();
    let loaded = false;
    let raf = 0;
    let liftTimer: ReturnType<typeof setTimeout> | undefined;

    pageReady().then(() => (loaded = true));

    // The counter eases towards 90% while loading, runs to 100 once ready,
    // and the curtain lifts only after it has shown 100.
    let value = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const done = (loaded && elapsed >= MIN_MS) || elapsed >= MAX_MS;
      const target = done ? 100 : 90;
      value = Math.min(target, value + Math.max(1, (target - value) * (done ? 0.25 : 0.06)));
      setCount(Math.round(value));
      if (Math.round(value) >= 100) {
        liftTimer = setTimeout(() => {
          setLifting(true);
          onReveal();
        }, 180);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(liftTimer);
    };
  }, [onReveal]);

  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={lifting ? (reduced.current ? { opacity: 0 } : { y: "-100%" }) : { y: "0%", opacity: 1 }}
      transition={{ duration: reduced.current ? 0.25 : 0.7, ease: EASE }}
      onAnimationComplete={() => lifting && onDone()}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-page"
    >
      <div className="absolute inset-0 bg-film-grain opacity-10" />

      <div className="relative text-center">
        <p className="font-serif text-8xl leading-none text-fg md:text-9xl">
          A<span className="animate-pulse text-accent-light">.</span>
        </p>
        <p className="mt-8 font-mono text-xs tracking-widest text-fg/40">
          <span className="tabular-nums text-fg/70">{String(count).padStart(3, "0")}</span>
          <span className="mx-2">/</span>
          100
        </p>
      </div>
    </motion.div>
  );
};

export default Preload;
