import { useState, useEffect } from "react";

const Hero = () => {
  const [pixelOpacity, setPixelOpacity] = useState(1);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPixelOpacity(0);
    }, 1500);

    const timer2 = setTimeout(() => {
      setTextVisible(true);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section
      data-section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B7355]/20 to-transparent" />
      </div>

      <div
        className="absolute inset-0 bg-dither-pattern transition-opacity "
        style={{ opacity: pixelOpacity }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div
          className={`transition-[opacity,transform] duration-1000 ${
            textVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`} 
        >
          <div className="text-sm font-mono text-[#8B7355] tracking-widest mb-4 animate-pulse">
            AKINOLA FAWAZ
          </div>

          <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight text-balance">
            <span className="inline-block hover:text-[#8B7355] transition-colors duration-500">
              Full Stack Developer
            </span>
          </h1>

          <div className="h-px w-48 bg-gradient-to-r from-transparent via-[#8B7355] to-transparent mx-auto my-8" />

          <p className="text-xl md:text-2xl text-[#F5F3EF]/80 font-light max-w-3xl mx-auto leading-relaxed text-pretty">
            <span className="inline-block hover:scale-105 transition-transform duration-300">
              Building scalable web applications with React, Node.js, and
              TypeScript.
            </span>
            <span className="block mt-2 text-[#8B7355] animate-pulse">
              Turning complex problems into elegant solutions.
            </span>
          </p>
        </div>

        <div
          className={`mt-12 flex items-center justify-center gap-8 transition-[opacity,transform] duration-1000 delay-500 ${
            textVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="/Fawaz_Akinola_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative text-[#8B7355] font-mono text-sm tracking-wider transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            <span className="relative z-10 group-hover:text-[#F5F3EF] transition-colors duration-300">
              Resume
              <span className="inline-block ml-1 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                ↗
              </span>
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[#8B7355] group-hover:w-full transition-[width] duration-300" />
          </a>

          <span className="text-[#F5F3EF]/20 animate-pulse">|</span>

          <a
            href="https://github.com/phawaaaz"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative text-[#8B7355] font-mono text-sm tracking-wider transition-transform duration-150 ease-out active:scale-[0.96]"
          >
            <span className="relative z-10 group-hover:text-[#F5F3EF] transition-colors duration-300">
              GitHub
              <span className="inline-block ml-1 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                ↗
              </span>
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[#8B7355] group-hover:w-full transition-[width] duration-300" />
          </a>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10 bg-film-grain " />
        {/* animate-grain */}
      </div>
    </section>
  );
};

export default Hero;
