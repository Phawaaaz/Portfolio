import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Work {
  role: string;
  company: string;
  period: string;
  description: string;
}

const workExperience: Work[] = [
  {
    role: "Software Engineer",
    company: "RTIG Inc",
    period: "Present",
    description:
      "Building scalable web applications and contributing to core product development",
  },
  {
    role: "Tech Intern",
    company: "Acemyx",
    period: "Jul 2024 – Mar 2025",
    description:
      "Developed full-stack features and collaborated on client projects",
  },
  {
    role: "Student Intern",
    company: "LCM",
    period: "2023",
    description:
      "Assisted in software development and learned industry best practices",
  },
];

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      data-section
      className="py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 bg-film-grain" />

      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 48 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-serif text-center mb-4 text-balance"
        >
          Experience
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 48 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-lg text-[#F5F3EF]/60 mb-16 text-pretty"
        >
          Where I've worked and learned
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-12"
        >
          {workExperience.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              className="group relative"
            >
              <motion.div variants={cardHoverVariants} className="relative">
                {/* Mobile Layout */}
                <div className="md:hidden border-l-2 border-[#8B7355]/30 pl-4 hover:border-[#8B7355] transition-colors duration-300">
                  <span className="text-xs font-mono text-[#8B7355] mb-2 block">
                    {item.period}
                  </span>
                  <motion.h3
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-serif text-[#F5F3EF] group-hover:text-[#8B7355] transition-colors duration-300 mb-1"
                  >
                    {item.role}
                  </motion.h3>
                  <p className="text-sm text-[#F5F3EF]/80 font-mono mb-2">
                    {item.company}
                  </p>
                  <p className="text-sm text-[#F5F3EF]/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-start gap-8 border-l-2 border-[#8B7355]/30 pl-6 hover:border-[#8B7355] transition-colors duration-300">
                  <div className="flex-shrink-0 w-32">
                    <span className="text-sm font-mono text-[#8B7355]">
                      {item.period}
                    </span>
                  </div>

                  <div className="flex-1">
                    <motion.h3
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl font-serif text-[#F5F3EF] group-hover:text-[#8B7355] transition-colors duration-300 mb-1"
                    >
                      {item.role}
                    </motion.h3>
                    <p className="text-base text-[#F5F3EF]/80 font-mono mb-2">
                      {item.company}
                    </p>
                    <p className="text-sm text-[#F5F3EF]/60 leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline decoration */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 pt-12 border-t border-[#F5F3EF]/10"
        >
          <div className="text-center">
            <p className="text-sm font-mono text-[#F5F3EF]/50">
              Currently open to new opportunities
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
