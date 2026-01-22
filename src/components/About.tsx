import { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section
      className="py-24 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 bg-film-grain" />

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative aspect-square max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B7355]/30 to-[#2D9596]/30 rounded-lg transform rotate-3" />
              <div className="absolute inset-0 bg-[#1A1A1A] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B7355]/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="./fawaz.png"
                    alt="Akinola Fawaz"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div
            className={`transition-all duration-1000`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
            }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#8B7355] mb-4">
              About
            </h2>
            <p className="text-lg text-[#F5F3EF]/90 leading-relaxed">
              Full-stack developer building scalable web applications with
              React, Node.js, and TypeScript. I focus on clean code and
              practical solutions.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-200`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
            }}
          >
            <a
              href="mailto:phawaazakin@gmail.com"
              className="group inline-flex items-center text-base font-mono text-[#8B7355] hover:text-[#F5F3EF] transition-colors duration-300"
            >
              Get in touch
              <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
