import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Instagram, MessageCircle, Send } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const EMAIL = "phawaazakin@gmail.com";

// Terminal-block CTA, same as the hero and projects.
const cta =
  "relative inline-flex items-center gap-2 bg-[#F5F3EF]/[0.06] px-2.5 py-1 font-mono text-sm text-[#A8906F] transition-[background-color,color] duration-150 ease-out after:absolute after:-inset-y-1.5 after:inset-x-0 hover:bg-[#A8906F] hover:text-[#0D0D0D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8906F]";

const field =
  "w-full bg-[#F5F3EF]/[0.04] px-4 py-3 text-[#F5F3EF] outline-none transition-[box-shadow,background-color] duration-150 focus:bg-[#F5F3EF]/[0.06] focus:shadow-[inset_0_0_0_1px_#8B7355]";

const socialLinks = [
  { icon: MessageCircle, url: "https://wa.me/2349012183194", label: "WhatsApp" },
  { icon: Github, url: "https://github.com/phawaaaz", label: "GitHub" },
  { icon: Linkedin, url: "https://linkedin.com/in/phawaz/", label: "LinkedIn" },
  { icon: Twitter, url: "https://twitter.com/No_lolade", label: "Twitter" },
  { icon: Instagram, url: "https://instagram.com/phawaaz_", label: "Instagram" },
];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.7, delay, ease: EASE },
});

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // Opens the visitor's email app with the message filled in.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(
      `Portfolio Contact: ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <section data-section className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 opacity-5 bg-film-grain" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <motion.div {...rise(0)} className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-5xl md:text-7xl">Get In Touch</h2>
          <p className="text-lg text-[#F5F3EF]/60">Have a project in mind? Let's talk</p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.form {...rise(0.1)} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="contact-name" className="mb-2 block font-mono text-sm text-[#8B7355]">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block font-mono text-sm text-[#8B7355]">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block font-mono text-sm text-[#8B7355]">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${field} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="relative inline-flex w-full items-center justify-center gap-2 bg-[#F5F3EF]/[0.06] px-4 py-3 font-mono text-sm text-[#A8906F] transition-[background-color,color] duration-150 ease-out hover:bg-[#A8906F] hover:text-[#0D0D0D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8906F]"
            >
              <Send className="size-4" aria-hidden="true" />
              Send Message
            </button>
          </motion.form>

          <motion.div {...rise(0.2)} className="space-y-10">
            <div>
              <h3 className="mb-3 font-mono text-sm text-[#8B7355]">Email</h3>
              <a href={`mailto:${EMAIL}`} className={cta}>
                <Mail className="size-4" aria-hidden="true" />
                {EMAIL}
              </a>
            </div>

            <div>
              <h3 className="mb-3 font-mono text-sm text-[#8B7355]">Connect</h3>
              <ul className="flex flex-wrap gap-3">
                {socialLinks.map(({ icon: Icon, url, label }) => (
                  <li key={label}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className={cta}>
                      <Icon className="size-4" aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-mono text-sm text-[#8B7355]">Location</h3>
              <p className="font-mono text-sm text-[#F5F3EF]/60">Anywhere</p>
            </div>

            <div>
              <h3 className="mb-2 font-mono text-sm text-[#8B7355]">Availability</h3>
              <p className="flex items-center gap-2 font-mono text-sm text-[#F5F3EF]/60">
                <span className="size-1.5 animate-pulse rounded-full bg-[#A8906F]" aria-hidden="true" />
                Open to new opportunities
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
