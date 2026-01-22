import { useState, useEffect } from "react";
import Preload from "./components/Preload";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from './components/Achievements';
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Navigation from "./components/Navigation";
import { SEO } from "./components/SEO";
import { SEO_CONFIG } from "./config/seo";

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [preloadComplete, setPreloadComplete] = useState(false);

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
        title="Full Stack Developer | React, Node.js, TypeScript"
        description="Akinola Fawaz - Full Stack Developer specializing in React, Next.js, Node.js, and TypeScript. Building scalable web applications with clean code."
        url={SEO_CONFIG.siteUrl}
      />
      {!preloadComplete && (
        <Preload onComplete={() => setPreloadComplete(true)} />
      )}
      <div className="bg-[#0D0D0D] text-[#F5F3EF]">
        <Navigation activeSection={activeSection} />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Achievements />
        <Skills />
        <Contact />
      </div>
    </>
  );
}

export default App;
