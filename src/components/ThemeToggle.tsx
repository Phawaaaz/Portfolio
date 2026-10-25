import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

// The inline script in index.html sets data-theme before first paint; this
// reads it back so the button starts in the right state.
const currentTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#F5F3EF" : "#0D0D0D");
  }, [theme]);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the choice just won't be remembered.
    }
  };

  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
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
