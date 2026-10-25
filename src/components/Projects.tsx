import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Project {
  title: string;
  role: string;
  description: string;
  tech: string[];
  live?: string;
  github?: string;
  /** File in public/projects/ */
  image?: string;
}

// Screenshots taken from each live site on 25 Oct 2026.
const featured: Project[] = [
  {
    title: "AMEN Awards",
    role: "Backend engineer",
    description:
      "The awards platform for AMEN, the home of African Christian creatives. I built much of the API behind nominations, judging and voting: the judge's desk with conflict declarations and scoring, held-vote review, case handling, role-based access, nominee photo uploads to R2 and double opt-in email.",
    tech: ["Node.js", "Express", "PostgreSQL", "Prisma", "Redis", "Zod"],
    live: "https://awards.amen.africa",
    image: "amen.jpg",
  },
  {
    title: "CardioEcg",
    role: "Full stack",
    description:
      "AI-assisted ECG analysis for clinical review: upload an ECG export and get an interpretation back from a prediction model, with a clear upload, analysis and results flow.",
    tech: ["Next.js", "React", "TypeScript", "Framer Motion"],
    live: "https://ecgcardio.vercel.app",
    github: "https://github.com/phawaaaz/ECG-",
    image: "cardio.jpg",
  },
  {
    title: "Triage Engine",
    role: "Design & frontend",
    description:
      "The website for AgendaX's Triage Engine, which spots the early signals of a reputational crisis, scores them and drafts the response. Five visual directions were explored before this one.",
    tech: ["Next.js", "TypeScript", "CSS"],
    live: "https://triage-engine-azure.vercel.app",
    github: "https://github.com/phawaaaz/triage-engine",
    image: "triage.jpg",
  },
  {
    title: "Oneday",
    role: "Design & frontend",
    description:
      "A shared list for your people that turns into the story of what you did together. Landing page with an early-access sign-up.",
    tech: ["React", "TypeScript", "Vite"],
    live: "https://oneday-iota.vercel.app",
    github: "https://github.com/phawaaaz/Oneday",
    image: "oneday.jpg",
  },
  {
    title: "WatchParty",
    role: "Full stack",
    description:
      "Watch videos together with synced playback: host or join a room, chat while you watch, and discover what others are watching.",
    tech: ["React", "TypeScript", "Socket.IO", "Zustand"],
    live: "https://watchwhatev.vercel.app",
    github: "https://github.com/phawaaaz/watchparty",
    image: "watchparty.jpg",
  },
  {
    title: "AgentArch",
    role: "Architecture",
    description:
      "Architecture, data model and technology stack for an internal AI agent management platform: agents, tools, skills, memory, sessions and deployments in one control plane.",
    tech: ["System design", "LLMs", "HTML"],
    live: "https://agentarch.vercel.app",
    github: "https://github.com/phawaaaz/agentic",
    image: "agentarch.jpg",
  },
];

const more: Project[] = [
  {
    title: "ASOL Business Solutions",
    role: "Client site",
    description: "Company website for a Nigerian firm offering micro-credit and business advisory.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    live: "https://asol-ecru.vercel.app",
    github: "https://github.com/phawaaaz/Asolbss",
    image: "asol.jpg",
  },
  {
    title: "AcemyX Revamp",
    role: "Frontend",
    description: "Redesigned landing page for AcemyX, an exam-prep platform, with mobile scroll animations.",
    tech: ["React", "TypeScript", "Tailwind"],
    live: "https://acemyxrevamp.vercel.app",
    github: "https://github.com/phawaaaz/Acemyxrevamp",
    image: "acemyx.jpg",
  },
  {
    title: "Visitor Management",
    role: "Full stack",
    description: "Visitor registration and management, with separate frontend and backend services.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    live: "https://project-demo-cyan.vercel.app",
    github: "https://github.com/phawaaaz/backendRevamp",
    image: "vms.jpg",
  },
  {
    title: "Easybank",
    role: "Frontend",
    description: "Responsive landing page for a digital bank.",
    tech: ["HTML", "CSS"],
    live: "https://easybank-kappa-eight.vercel.app",
    github: "https://github.com/phawaaaz/easybank",
    image: "easybank.jpg",
  },
];

const codeOnly: Project[] = [
  {
    title: "Agentic Harness",
    role: "AI tooling",
    description: "Wraps any LLM in a tool-use loop to read and write files, run commands and finish real tasks.",
    tech: ["Python", "Docker", "MCP"],
    github: "https://github.com/phawaaaz/agentpy",
  },
  {
    title: "PurseFlow",
    role: "Full stack",
    description: "Reads bank alert emails from UBA, Kuda, OPay and Paystack through Gmail and turns them into tracked transactions.",
    tech: ["Next.js", "Express", "PostgreSQL", "Gmail API"],
    github: "https://github.com/phawaaaz/budget-client",
  },
  {
    title: "StarterPack Auth API",
    role: "Backend",
    description: "Auth starter with refresh-token rotation and reuse detection, argon2id hashing and Swagger docs from Zod.",
    tech: ["TypeScript", "Express", "PostgreSQL", "Prisma"],
    github: "https://github.com/phawaaaz/backendtemplate",
  },
  {
    title: "Smart Campus Map",
    role: "Frontend",
    description: "Campus navigation for the University of Ilorin with building information and route planning.",
    tech: ["React", "TypeScript", "Leaflet"],
    live: "https://csc420-fe.vercel.app",
    github: "https://github.com/phawaaaz/Csc420_fe",
  },
];

// Terminal-block CTA, same as the hero.
const cta =
  "relative inline-flex items-center gap-2 bg-fg/[0.06] px-2.5 py-1 font-mono text-sm text-accent-light transition-[background-color,color] duration-150 ease-out after:absolute after:-inset-y-1.5 after:inset-x-0 hover:bg-accent-light hover:text-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light";

const Links = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap gap-3">
    {project.live && (
      <a href={project.live} target="_blank" rel="noopener noreferrer" className={cta}>
        <ArrowUpRight className="size-4" aria-hidden="true" />
        Live site
      </a>
    )}
    {project.github && (
      <a href={project.github} target="_blank" rel="noopener noreferrer" className={cta}>
        <Github className="size-4" aria-hidden="true" />
        Code
      </a>
    )}
  </div>
);

// Screenshot toned to the dark theme at rest; full colour on hover.
const Shot = ({ project, className = "" }: { project: Project; className?: string }) => (
  <a
    href={project.live}
    target="_blank"
    rel="noopener noreferrer"
    tabIndex={-1}
    aria-hidden="true"
    className={`group/shot block overflow-hidden rounded-lg bg-raised shadow-[var(--shadow-border)] ${className}`}
  >
    <img
      src={`/projects/${project.image}`}
      alt=""
      loading="lazy"
      width={1280}
      height={800}
      className="aspect-[16/10] w-full object-cover object-top outline outline-1 -outline-offset-1 outline-white/10 [[data-theme=light]_&]:outline-black/10 transition-[filter,transform] duration-700 ease-out [filter:grayscale(0.85)_sepia(0.25)_brightness(0.72)] [[data-theme=light]_&]:[filter:grayscale(0.85)_sepia(0.15)] group-hover/shot:scale-[1.03] group-hover/shot:[filter:none]"
    />
  </a>
);

const FeaturedRow = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // The screenshot drifts a little against the scroll.
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const flip = index % 2 === 1;

  return (
    <article ref={ref} className="relative grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <motion.div
        style={{ y }}
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: false, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.45, ease: EASE }}
        className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}
      >
        <Shot project={project} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
        className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}
      >
        <p className="font-mono text-sm text-accent">
          <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-fg/30">/</span>
          {project.role}
        </p>
        <h3 className="mt-3 font-serif text-4xl text-fg md:text-5xl">{project.title}</h3>
        <p className="mt-4 text-base leading-relaxed text-fg/70 text-pretty md:text-lg">
          {project.description}
        </p>
        <p className="mt-4 font-mono text-xs text-fg/45 md:text-sm">{project.tech.join("  ·  ")}</p>
        <div className="mt-6">
          <Links project={project} />
        </div>
      </motion.div>
    </article>
  );
};

const Projects = () => (
  <section data-section className="relative overflow-hidden px-6 py-24">
    <div className="absolute inset-0 opacity-5 bg-film-grain" />

    <div className="relative z-10 mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.45, ease: EASE }}
        className="mb-20 text-center md:mb-28"
      >
        <h2 className="mb-4 font-serif text-5xl text-balance md:text-7xl">Projects</h2>
        <p className="text-lg text-fg/60 text-pretty">Recent work and experiments</p>
      </motion.div>

      <div className="space-y-24 md:space-y-36">
        {featured.map((project, i) => (
          <FeaturedRow key={project.title} project={project} index={i} />
        ))}
      </div>

      <h3 className="mb-10 mt-32 font-serif text-3xl md:mt-44 md:text-4xl">More shipped work</h3>
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {more.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.1, ease: EASE }}
          >
            <Shot project={project} />
            <p className="mt-5 font-mono text-sm text-accent">{project.role}</p>
            <h4 className="mt-1 font-serif text-2xl text-fg">{project.title}</h4>
            <p className="mt-2 text-base leading-relaxed text-fg/65 text-pretty">{project.description}</p>
            <div className="mt-4">
              <Links project={project} />
            </div>
          </motion.article>
        ))}
      </div>

      <h3 className="mb-6 mt-28 font-serif text-3xl md:text-4xl">In the code</h3>
      <ul>
        {codeOnly.map((project) => (
          <li
            key={project.title}
            className="grid gap-3 py-6 md:grid-cols-12 md:items-baseline md:gap-6"
          >
            <div className="md:col-span-4">
              <p className="font-serif text-xl text-fg">{project.title}</p>
              <p className="mt-1 font-mono text-sm text-accent">{project.role}</p>
            </div>
            <p className="text-base leading-relaxed text-fg/65 text-pretty md:col-span-5">
              {project.description}
            </p>
            <div className="md:col-span-3 md:flex md:justify-end">
              <Links project={project} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-16 text-center">
        <a href="https://github.com/phawaaaz" target="_blank" rel="noopener noreferrer" className={cta}>
          <Github className="size-4" aria-hidden="true" />
          All projects on GitHub
        </a>
      </div>
    </div>
  </section>
);

export default Projects;
