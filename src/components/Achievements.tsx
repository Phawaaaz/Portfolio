import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Credential {
  title: string;
  issuer: string;
}

// Matches the CV (Oct 2026). Grouped and plain, same rhythm as Experience.
const groups: { label: string; items: Credential[]; columns?: boolean }[] = [
  {
    label: 'Education',
    items: [{ title: 'BSc Computer Science', issuer: 'University of Ilorin, 2021 – 2025' }],
  },
  {
    label: 'Leadership',
    items: [{ title: 'Welfare Secretary & PRO', issuer: 'NACOSS, University of Ilorin' }],
  },
  {
    label: 'Community',
    items: [
      { title: 'Google Developer Student Club', issuer: 'Google Developers' },
      { title: 'Microsoft Learn Student Ambassador', issuer: 'Microsoft' },
    ],
  },
  {
    label: 'Certificates',
    columns: true,
    items: [
      { title: 'Programming in JavaScript', issuer: 'Meta' },
      { title: 'Frontend Development', issuer: 'Meta' },
      { title: 'React: The Complete Guide', issuer: 'Jonas Schmedtmann' },
      { title: 'Node.js Bootcamp', issuer: 'Jonas Schmedtmann' },
      { title: 'HTML & CSS Mastery', issuer: 'Jonas Schmedtmann' },
      { title: 'Responsive Web Design', issuer: 'freeCodeCamp' },
      { title: 'Software Engineering', issuer: 'ALX' },
      { title: 'AI Prompt Engineering', issuer: 'ALX' },
      { title: 'Machine Learning Mathematics', issuer: 'Duke University' },
    ],
  },
];

const Achievements = () => (
  <section data-section className="relative overflow-hidden px-6 py-24">
    <div className="absolute inset-0 opacity-5 bg-film-grain" />

    <div className="relative mx-auto w-full max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
        className="mb-16 text-center"
      >
        <h2 className="mb-4 font-serif text-5xl text-balance md:text-7xl">Credentials</h2>
        <p className="text-lg text-[#F5F3EF]/60 text-pretty">Study, roles and certificates</p>
      </motion.div>

      {groups.map((group, i) => (
        <motion.div
          key={group.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.6, delay: Math.min(i, 3) * 0.05, ease: EASE }}
          className="grid gap-3 border-t border-[#F5F3EF]/10 py-6 md:grid-cols-[11rem_1fr] md:gap-8"
        >
          <h3 className="font-mono text-sm text-[#8B7355] md:pt-1">{group.label}</h3>
          <ul className={`grid gap-4 ${group.columns ? 'sm:grid-cols-2 sm:gap-x-8' : ''}`}>
            {group.items.map((item) => (
              <li key={item.title}>
                <p className="font-serif text-xl text-[#F5F3EF]">{item.title}</p>
                <p className="mt-0.5 font-mono text-sm text-[#F5F3EF]/50">{item.issuer}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Achievements;
