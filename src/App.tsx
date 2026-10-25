import { useState, useEffect, useCallback } from "react";
import Preload from "./components/Preload";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Reviews from "./components/Reviews";
import Projects from "./components/Projects";
import Achievements from './components/Achievements';
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import ThemeToggle from "./components/ThemeToggle";
import { SEO } from "./components/SEO";
import { SEO_CONFIG } from "./config/seo";

function App() {
  const [activeSection, setActiveSection] = useState(0);
  // The preload screen shows once per visit; a refresh in the same tab skips it.
  const [seenPreload] = useState(() => {
    try {
      return sessionStorage.getItem("preloaded") === "1";
    } catch {
      return false;
    }
  });
  const [revealed, setRevealed] = useState(seenPreload);
  const [preloadGone, setPreloadGone] = useState(seenPreload);
  const handleReveal = useCallback(() => {
    setRevealed(true);
    try {
      sessionStorage.setItem("preloaded", "1");
    } catch {
      // Storage blocked: the preload just shows again next time.
    }
  }, []);
  const handleDone = useCallback(() => setPreloadGone(true), []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[data-section]");
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        if (
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <SEO
        title="Software Developer | React, Node.js, TypeScript"
        description="Akinola Fawaz - Software Developer specializing in React, Next.js, Node.js, and TypeScript. Building scalable web applications with clean code."
        url={SEO_CONFIG.siteUrl}
      />
      {!preloadGone && (
        <Preload onReveal={handleReveal} onDone={handleDone} />
      )}
      <div className="bg-page text-fg">
        <Navigation activeSection={activeSection} />
        <ThemeToggle />
        <Hero ready={revealed} />
        <About />
        <Projects />
        <Experience />
        <Reviews />
        <Achievements />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
