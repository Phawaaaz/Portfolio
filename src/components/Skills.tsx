import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// Tools used across the projects and roles on this site.
const skillGroups: { label: string; items: string[] }[] = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion"] },
  { label: "Backend", items: ["Node.js", "Express", "REST APIs", "GraphQL", "Socket.IO", "Zod"] },
  { label: "Data", items: ["PostgreSQL", "Prisma", "MongoDB", "Redis"] },
  { label: "Cloud & DevOps", items: ["Linux", "Bash scripting", "Cron jobs", "AWS (IAM)", "GCP (IAM)", "Docker", "GitHub Actions", "Vercel", "Cloudflare R2"] },
  { label: "Tools", items: ["Git", "Postman"] },
  { label: "Principles", items: ["Clean Architecture", "System Thinking", "Scalable Design", "TDD", "OOP"] },
  { label: "Learning now", items: ["Go", "Java"] },
];

const Skills = () => (
  <section data-section className="relative overflow-hidden px-6 py-24">
    <div className="absolute inset-0 opacity-5 bg-film-grain" />

    <div className="relative mx-auto w-full max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.45, ease: EASE }}
        className="mb-16 text-center"
      >
        <h2 className="mb-4 font-serif text-5xl text-balance md:text-7xl">Tech Stack</h2>
        <p className="text-lg text-[#F5F3EF]/60 text-pretty">Tools I use to build</p>
      </motion.div>

      {skillGroups.map((group, i) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.05, ease: EASE }}
          className="grid gap-3 border-t border-[#F5F3EF]/10 py-6 md:grid-cols-[11rem_1fr] md:gap-8"
        >
          <h3 className="font-mono text-sm text-[#8B7355] md:pt-1.5">{group.label}</h3>
          <ul className="flex flex-wrap gap-x-2 gap-y-3">
            {group.items.map((item) => (
              <li
                key={item}
                className="bg-[#F5F3EF]/[0.04] px-2.5 py-1 font-mono text-sm text-[#F5F3EF]/75"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Skills;
