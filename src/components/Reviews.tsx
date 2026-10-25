import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface Review {
  quote: string;
  name: string;
  /** Their role, and company if they're happy to be named. */
  role: string;
}

// Only real reviews, with the person's permission. While this list is empty the
// section doesn't render at all, so nothing placeholder ever reaches the live site.
//
// When you add the first one, also add "Reviews" after "Experience" in the
// sections list in Navigation.tsx so the side dots stay in step.
//
// To add one:
//   { quote: "…", name: "Ada Obi", role: "Founder, Example Ltd" },
const reviews: Review[] = [];

const Reviews = () => {
  if (reviews.length === 0) return null;

  return (
    <section data-section className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 opacity-5 bg-film-grain" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-serif text-5xl text-balance md:text-7xl">Kind words</h2>
          <p className="text-lg text-[#F5F3EF]/60 text-pretty">From people I've built with</p>
        </motion.div>

        <div className={`grid gap-x-12 gap-y-14 ${reviews.length > 1 ? "md:grid-cols-2" : "mx-auto max-w-3xl"}`}>
          {reviews.map((review, i) => (
            <motion.figure
              key={review.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: EASE }}
              className="border-l-2 border-[#8B7355]/40 pl-6"
            >
              <blockquote className="font-serif text-xl leading-relaxed text-[#F5F3EF] text-pretty md:text-2xl">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-5">
                <p className="text-base text-[#F5F3EF]/85">{review.name}</p>
                <p className="mt-0.5 font-mono text-sm text-[#8B7355]">{review.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
