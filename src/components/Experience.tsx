import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Work {
  role: string;
  company: string;
  period: string;
  description: string;
}

// Newest first. Dates match the CV (Oct 2026).
const workExperience: Work[] = [
  {
    role: "Backend Engineer",
    company: "AMEN",
    period: "Oct 2026",
    description: "API for the AMEN Awards: judging, voting, case handling, roles and photo uploads.",
  },
  {
    role: "Frontend Engineer",
    company: "Floowpay",
    period: "Apr 2026 – Present",
    description: "Merchant app for an e-invoicing platform: Mandarin localization, mobile dashboard, support centre.",
  },
  {
    role: "Software Engineer (NYSC)",
    company: "ETech",
    period: "Jan 2026 – Present",
    description: "An AI-powered learning platform, and the front end of an ECG analysis tool for clinicians.",
  },
  {
    role: "Freelance & contract",
    company: "ASOL · Chicly · LandNest",
    period: "Jan 2026 – Present",
    description: "Company websites, commerce APIs and admin portals for clients.",
  },
  {
    role: "Software Engineer",
    company: "RTIG Inc",
    period: "Jun 2025 – Jun 2026",
    description: "Client web applications with reusable components and Paystack payments.",
  },
  {
    role: "Tech Intern",
    company: "AcemyX",
    period: "Jul 2024 – Mar 2025",
    description: "Front-end development, turning Figma designs into production interfaces.",
  },
  {
    role: "Student Intern (SIWES)",
    company: "Lagos Channel Management",
    period: "May 2024 – Nov 2024",
    description: "IT support, network infrastructure and SQL databases.",
  },
];

// Deliberately plain: a quiet list, one line each, no hover effects.
const Experience = () => (
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
        <h2 className="mb-4 font-serif text-5xl text-balance md:text-7xl">Experience</h2>
        <p className="text-lg text-fg/60 text-pretty">Where I've worked and learned</p>
      </motion.div>

      <ol>
        {workExperience.map((item, i) => (
          <motion.li
            key={`${item.company}-${item.period}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.05, ease: EASE }}
            className="grid gap-1 py-6 md:grid-cols-[11rem_1fr] md:gap-8"
          >
            <p className="font-mono text-sm text-accent md:pt-1">{item.period}</p>
            <div>
              <h3 className="font-serif text-xl text-fg md:text-2xl">
                {item.role}
                <span className="ml-3 font-mono text-sm text-fg/50">{item.company}</span>
              </h3>
              <p className="mt-2 text-base leading-relaxed text-fg/65 text-pretty">{item.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

export default Experience;
