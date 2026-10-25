import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";

interface PreloadProps {
  /** Called as the circle starts to open, so the hero can reveal underneath. */
  onReveal: () => void;
  /** Called once the preload screen is fully gone. */
  onDone: () => void;
}

const DURATION_MS = 1800; // the counter's run from 000 to 100
const MAX_MS = 2500; // if the page is slow, wait at most this long


// Resolves when web fonts and the page itself have finished loading.
const pageReady = () =>
  Promise.all([
    document.fonts?.ready ?? Promise.resolve(),
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true })),
  ]);

// Shown on every load: the "A." mark with a blinking bronze full stop and a
// timed counter. At 100 the screen opens through a circle that grows from the
// full stop, the same motion as the theme switch.
const Preload = ({ onReveal, onDone }: PreloadProps) => {
  const [count, setCount] = useState(0);
  const [lifting, setLifting] = useState(false);
  const reduced = useRef(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const dotRef = useRef<HTMLSpanElement>(null);

  // The hole in the screen: a circle centred on the dot, radius animated on exit.
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const r = useMotionValue(0);
  const mask = useMotionTemplate`radial-gradient(circle at ${cx}px ${cy}px, transparent ${r}px, black calc(${r}px + 1px))`;
  // A thin bronze ring rides the circle's edge so the opening reads on dark,
  // fading as it reaches the corners.
  const ringSize = useTransform(r, (v) => v * 2);
  const ringX = useTransform(() => cx.get() - r.get());
  const ringY = useTransform(() => cy.get() - r.get());
  const ringOpacity = useTransform(r, [0, Math.hypot(innerWidth, innerHeight) * 0.8], [0.9, 0]);

  useEffect(() => {
    if (!lifting) return;
    if (reduced.current || !dotRef.current) return; // the fade below handles it
    const { left, top, width, height } = dotRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height * 0.72; // the full stop sits low in the glyph box
    cx.set(x);
    cy.set(y);
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const controls = animate(r, radius, { duration: 0.9, ease: [0.65, 0, 0.35, 1], onComplete: onDone });
    return () => controls.stop();
  }, [lifting, cx, cy, r, onDone]);

  useEffect(() => {
    const start = performance.now();
    let loaded = false;
    let raf = 0;
    let liftTimer: ReturnType<typeof setTimeout> | undefined;

    pageReady().then(() => (loaded = true));

    // Timed run: the counter eases from 000 to 100 over DURATION_MS, then the
    // curtain lifts (waiting a little longer only if the page isn't ready yet).
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / DURATION_MS);
      setCount(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p >= 1 && (loaded || elapsed >= MAX_MS)) {
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
    <>
    {lifting && !reduced.current && (
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY, width: ringSize, height: ringSize, opacity: ringOpacity }}
        className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full border border-accent-light"
      />
    )}
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={lifting && reduced.current ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.25 }}
      onAnimationComplete={() => lifting && reduced.current && onDone()}
      style={lifting && !reduced.current ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-page"
    >
      <div className="absolute inset-0 bg-film-grain opacity-10" />

      <div className="relative text-center">
        <p className="font-serif text-8xl leading-none text-fg md:text-9xl">
          A
          <span ref={dotRef} className={`text-accent-light ${count < 100 ? "animate-pulse" : ""}`}>
            .
          </span>
        </p>
        <p className="mt-8 font-mono text-xs tracking-widest text-fg/40">
          <span className="tabular-nums text-fg/70">{String(count).padStart(3, "0")}</span>
          <span className="mx-2">/</span>
          100
        </p>
      </div>
    </motion.div>
    </>
  );
};

export default Preload;
