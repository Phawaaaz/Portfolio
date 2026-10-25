import { useEffect, useRef } from "react";

// Hero background: slow columns of faint bronze terminal characters, inspired by
// digitalmeadow.studio. Fades out behind the text, pauses off screen and in
// hidden tabs, and stands still with reduced motion.

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Fade every background out towards the middle, where the text sits.
const calmCenter =
  "[mask-image:radial-gradient(ellipse_55%_50%_at_50%_50%,transparent_20%,black_95%)]";

// Shared canvas loop: sizes to the section, pauses off screen and in hidden tabs.
const useCanvasLoop = (draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, visible = true;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const frame = (now: number) => {
      draw(ctx, w, h, now / 1000);
      if (visible && !document.hidden && !reducedMotion()) raf = requestAnimationFrame(frame);
    };
    const ro = new ResizeObserver(() => {
      resize();
      draw(ctx, w, h, performance.now() / 1000);
    });
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(frame);
    };
    resize();
    ro.observe(canvas);
    io.observe(canvas);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [draw]);

  return ref;
};

// ASCII rain: slow columns of terminal characters, like the Digital Meadow reference.
const GLYPHS = "|/\\:.-_|||";
const asciiState: { drops: number[] } = { drops: [] };
const drawAscii = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
  const size = 16;
  const cols = Math.ceil(w / size);
  if (asciiState.drops.length !== cols) {
    asciiState.drops = Array.from({ length: cols }, (_, i) => ((i * 7919) % 97) / 97);
  }
  ctx.clearRect(0, 0, w, h);
  ctx.font = `${size - 2}px ui-monospace, Menlo, monospace`;
  // Follow the theme's bronze (deeper in light mode).
  const rgb = getComputedStyle(document.documentElement).getPropertyValue("--accent-light").trim().split(/\s+/).join(",") || "168,144,111";
  for (let c = 0; c < cols; c++) {
    const speed = 0.02 + (((c * 31) % 13) / 13) * 0.04;
    const head = ((asciiState.drops[c] + t * speed) % 1.4) * h;
    for (let k = 0; k < 7; k++) {
      const y = head - k * size;
      if (y < 0 || y > h) continue;
      const g = GLYPHS[(c + k + Math.floor(t * 2)) % GLYPHS.length];
      ctx.fillStyle = `rgba(${rgb},${0.32 * (1 - k / 7)})`;
      ctx.fillText(g, c * size, y);
    }
  }
};
const AsciiRain = () => {
  const ref = useCanvasLoop(drawAscii);
  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${calmCenter}`} />;
};

export default AsciiRain;
