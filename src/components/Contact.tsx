import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const EMAIL = "phawaazakin@gmail.com";

// Terminal-block CTA, same as the hero and projects.
const cta =
  "relative inline-flex items-center gap-2 bg-[#F5F3EF]/[0.06] px-2.5 py-1 font-mono text-sm text-[#A8906F] transition-[background-color,color] duration-150 ease-out after:absolute after:-inset-y-1.5 after:inset-x-0 hover:bg-[#A8906F] hover:text-[#0D0D0D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8906F]";

type Field = "name" | "email" | "message";
const steps: { key: Field; prompt: string }[] = [
  { key: "name", prompt: "name" },
  { key: "email", prompt: "email" },
  { key: "message", prompt: "message" },
];

const elsewhere = [
  { label: "GitHub", url: "https://github.com/phawaaaz" },
  { label: "LinkedIn", url: "https://linkedin.com/in/phawaz/" },
  { label: "Twitter", url: "https://twitter.com/No_lolade" },
  { label: "Instagram", url: "https://instagram.com/phawaaz_" },
];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

// A contact form dressed as a terminal: one prompt at a time, Enter moves on,
// and the last Enter opens the visitor's mail app with everything filled in.
const Contact = () => {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const inputs = useRef<Partial<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  const focusStep = (i: number) => requestAnimationFrame(() => inputs.current[steps[i]?.key]?.focus());

  const send = () => {
    const subject = encodeURIComponent(`Portfolio Contact: ${values.name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\nMessage:\n${values.message.trim()}`
    );
    setSent(true);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  // Enter validates the current line, then moves to the next one or sends.
  const advance = () => {
    const { key } = steps[step];
    const value = values[key].trim();
    if (!value) return setError(`${key} can't be empty`);
    if (key === "email" && !isEmail(value)) return setError("that email doesn't look right");
    setError("");
    if (step < steps.length - 1) {
      setStep(step + 1);
      focusStep(step + 1);
    } else {
      send();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    // Shift+Enter keeps a new line in the message. Phones have no Shift, so on
    // touch screens Enter in the message is a new line and the button sends.
    const touchMessage = steps[i].key === "message" && window.matchMedia("(pointer: coarse)").matches;
    if (e.key === "Enter" && !e.shiftKey && !touchMessage) {
      e.preventDefault();
      if (i === step) advance();
    }
  };

  const reset = () => {
    setValues({ name: "", email: "", message: "" });
    setStep(0);
    setSent(false);
    setError("");
    focusStep(0);
  };

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -10% 0px" },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section data-section className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 opacity-5 bg-film-grain" />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <motion.div {...rise(0)} className="mb-14 text-center">
          <h2 className="mb-4 font-serif text-5xl md:text-7xl">Get In Touch</h2>
          <p className="text-lg text-[#F5F3EF]/60">Have a project in mind? Let's talk</p>
        </motion.div>

        <motion.form
          {...rise(0.1)}
          onSubmit={(e) => {
            e.preventDefault();
            advance();
          }}
          // Clicking anywhere in the window puts the cursor on the current prompt.
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("input, textarea, button, a")) return;
            focusStep(step);
          }}
          className="bg-[#F5F3EF]/[0.03] font-mono text-sm shadow-[var(--shadow-border)] md:text-base"
        >
          <div className="flex items-center justify-between border-b border-[#F5F3EF]/10 px-4 py-2.5 text-xs text-[#F5F3EF]/40">
            <span className="text-[#A8906F]">contact.sh</span>
            <span>zsh</span>
          </div>

          <div className="space-y-2 px-4 py-5 md:px-6 md:py-6">
            <p className="text-[#F5F3EF]/40">
              <span className="text-[#A8906F]">~/phawaaz</span> $ ./contact.sh
            </p>
            <p className="pb-2 text-[#F5F3EF]/40"># Press Enter after each answer.</p>

            {steps.slice(0, step + 1).map(({ key, prompt }, i) => (
              <div key={key} className="flex items-start gap-2">
                <label htmlFor={`contact-${key}`} className="shrink-0 text-[#A8906F]">
                  &gt; {prompt}:
                </label>
                {key === "message" ? (
                  <textarea
                    id={`contact-${key}`}
                    ref={(el) => (inputs.current[key] = el)}
                    rows={3}
                    value={values[key]}
                    onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    disabled={sent}
                    className="min-w-0 flex-1 resize-none bg-transparent text-[#F5F3EF] caret-[#A8906F] outline-none"
                  />
                ) : (
                  <input
                    id={`contact-${key}`}
                    ref={(el) => (inputs.current[key] = el)}
                    type={key === "email" ? "email" : "text"}
                    autoComplete={key}
                    value={values[key]}
                    onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    disabled={sent}
                    className="min-w-0 flex-1 bg-transparent text-[#F5F3EF] caret-[#A8906F] outline-none"
                  />
                )}
              </div>
            ))}

            <p role="status" aria-live="polite" className="min-h-6 pt-1">
              {error && <span className="text-[#D98C6B]">! {error}</span>}
              {sent && <span className="text-[#A8906F]">✓ opening your mail app…</span>}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {!sent ? (
                <button type="submit" className={cta}>
                  ↵ {step < steps.length - 1 ? "next" : "send"}
                </button>
              ) : (
                <button type="button" onClick={reset} className={cta}>
                  ↺ start over
                </button>
              )}
              <span className="text-xs text-[#F5F3EF]/30">
                step {Math.min(step + 1, steps.length)}/{steps.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-[#F5F3EF]/10 px-4 py-2.5 text-xs text-[#F5F3EF]/40">
            <span className="size-1.5 animate-pulse rounded-full bg-[#A8906F]" aria-hidden="true" />
            Open to new opportunities
          </div>
        </motion.form>

        <motion.div {...rise(0.2)} className="mt-8 flex flex-wrap items-center justify-center gap-3 font-mono text-sm text-[#F5F3EF]/40">
          <span>or:</span>
          <a href="https://wa.me/2349012183194" target="_blank" rel="noopener noreferrer" className={cta}>
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className={cta}>
            <Mail className="size-4" aria-hidden="true" />
            {EMAIL}
          </a>
        </motion.div>

        <motion.p {...rise(0.25)} className="mt-6 text-center font-mono text-sm text-[#F5F3EF]/40">
          elsewhere:{" "}
          {elsewhere.map((link, i) => (
            <span key={link.label}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-8 items-center text-[#F5F3EF]/60 underline-offset-4 transition-colors duration-150 hover:text-[#A8906F] hover:underline"
              >
                {link.label}
              </a>
              {i < elsewhere.length - 1 && <span className="mx-2">·</span>}
            </span>
          ))}
        </motion.p>
      </div>
    </section>
  );
};

export default Contact;
