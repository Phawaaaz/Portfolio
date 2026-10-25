import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

// The inline script in index.html sets data-theme before first paint; this
// reads it back so the button starts in the right state.
const currentTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "light" ? "#F5F3EF" : "#0D0D0D");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Private mode or blocked storage: the choice just won't be remembered.
  }
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(currentTheme);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const swap = () =>
      flushSync(() => {
        applyTheme(next);
        setTheme(next);
      });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduced || !buttonRef.current) {
      swap();
      return;
    }

    // Grow a circle from the button's centre until it covers the farthest corner.
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(swap);
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 bg-fg/[0.06] px-2.5 py-1 font-mono text-sm text-accent-light backdrop-blur transition-[background-color,color] duration-150 ease-out after:absolute after:-inset-1.5 hover:bg-accent-light hover:text-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light md:right-6 md:top-6"
    >
      <Icon className="size-4" aria-hidden="true" />
      {theme === "dark" ? "light" : "dark"}
    </button>
  );
};

export default ThemeToggle;
