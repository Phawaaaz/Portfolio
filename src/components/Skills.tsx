import { useEffect, useRef, useState } from "react";

const skillGroups = {
  Frontend: ["React", "Next.js", "Tailwind CSS", "Redux Toolkit"],
  Backend: ["Node.js", "Express", "GraphQL", "REST API", "WebSockets"],
  Database: ["PostgreSQL", "MongoDB", "Redis"],
  Tools: ["Git", "VsCode", "Vercel", "Postman"],
  Principles: [
    "Clean Architecture",
    "System Thinking",
    "Scalable Design",
    "Agile Methodologies",
    "TDD",
    "OOP",
  ],
};

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section
      className="min-h-screen py-24 px-6 relative flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 opacity-5 bg-film-grain" />

      <h2
        className={`text-5xl md:text-7xl font-serif text-center mb-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        Tech Stack
      </h2>

      <p
        className={`text-center text-lg text-[#F5F3EF]/60 mb-16 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        Tools I use to build
      </p>

      <div className="max-w-7xl w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
        {Object.entries(skillGroups).map(([category, skills], i) => (
          <div
            key={category}
            className={`transition-all duration-1000 ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <h3 className="text-[#8B7355] font-mono text-sm mb-4 tracking-wider uppercase">
              {category}
            </h3>
            <ul className="space-y-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="text-[#F5F3EF]/70 text-sm border-l-2 border-[#8B7355]/30 pl-3 hover:border-[#8B7355] hover:text-[#F5F3EF] transition-all duration-300"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
