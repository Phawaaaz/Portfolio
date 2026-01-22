import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Instagram, MessageCircle } from "lucide-react";
// import { label } from "framer-motion/client";  

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);
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

  const handleInputClick = (
    e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields");
      return;
    }

    const mailtoLink = `mailto:phawaazakinola@gmail.com?subject=Portfolio Contact: ${encodeURIComponent(
      formData.name
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const socialLinks = [
    { icon: Github, url: "https://github.com/phawaaaz", label: "GitHub" },
    {
      icon: Linkedin,
      url: "https://linkedin.com/in/phawaz/",
      label: "LinkedIn",
    },
    { icon: Twitter, url: "https://twitter.com/No_lolade", label: "Twitter" },
    {
      icon: Instagram,
      url: "https://instagram.com/phawaaz_",
      label: "Instagram",
    },
    {
      icon: MessageCircle,
      url: "https://api.whatsapp.com/send/?phone=09012183194&text&type=phone_number&app_absent=0",
      label: "Whatsapp"
    },
  ];

  return (
    <section
      ref={sectionRef}
      data-section
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Static background */}
      <div className="absolute inset-0 opacity-5 bg-film-grain" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B7355]/5 via-transparent to-[#2D9596]/5" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-serif mb-4">Get In Touch</h2>
          <p className="text-lg text-[#F5F3EF]/60">
            Have a project in mind? Let's talk
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-mono text-[#8B7355] mb-2">
                  Name
                </label>
                <div className="relative overflow-hidden rounded">
                  {ripples.map((ripple) => (
                    <motion.div
                      key={ripple.id}
                      className="absolute w-2 h-2 bg-[#8B7355]/30 rounded-full pointer-events-none"
                      style={{ left: ripple.x, top: ripple.y }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 40, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  ))}
                  <motion.input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onClick={handleInputClick}
                    whileFocus={{ scale: 1.01 }}
                    className="w-full bg-[#1A1A1A] border border-[#F5F3EF]/10 rounded px-4 py-3 text-[#F5F3EF] focus:border-[#8B7355] focus:outline-none transition-all duration-300 relative"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-mono text-[#8B7355] mb-2">
                  Email
                </label>
                <div className="relative overflow-hidden rounded">
                  <motion.input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onClick={handleInputClick}
                    whileFocus={{ scale: 1.01 }}
                    className="w-full bg-[#1A1A1A] border border-[#F5F3EF]/10 rounded px-4 py-3 text-[#F5F3EF] focus:border-[#8B7355] focus:outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-mono text-[#8B7355] mb-2">
                  Message
                </label>
                <div className="relative overflow-hidden rounded">
                  <motion.textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onClick={handleInputClick}
                    whileFocus={{ scale: 1.01 }}
                    rows={5}
                    className="w-full bg-[#1A1A1A] border border-[#F5F3EF]/10 rounded px-4 py-3 text-[#F5F3EF] focus:border-[#8B7355] focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>
              </div>

              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-[#8B7355] text-[#0D0D0D] rounded font-mono text-sm hover:bg-[#A68A6F] transition-colors duration-300 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10">Send Message</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-8">
              {/* Email */}
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <h3 className="text-sm font-mono text-[#8B7355] mb-3">EMAIL</h3>
                <a
                  href="mailto:phawaazakin@gmail.com"
                  className="flex items-center gap-3 text-[#F5F3EF]/80 hover:text-[#8B7355] transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-mono text-sm">
                    phawaazakinola@gmail.com
                  </span>
                </a>
              </motion.div>

              {/* Social Links */}
              <div>
                <h3 className="text-sm font-mono text-[#8B7355] mb-4">
                  CONNECT
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-2 px-4 py-2 border border-[#F5F3EF]/10 rounded hover:border-[#8B7355]/30 transition-colors duration-300"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5 text-[#F5F3EF]/60 group-hover:text-[#8B7355] transition-colors duration-300" />
                        <span className="text-sm font-mono text-[#F5F3EF]/60 group-hover:text-[#F5F3EF] transition-colors duration-300">
                          {social.label}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Location */}
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <h3 className="text-sm font-mono text-[#8B7355] mb-3">
                  LOCATION
                </h3>
                <p className="text-[#F5F3EF]/60 font-mono text-sm">Anywhere</p>
              </motion.div>

              {/* Availability */}
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <h3 className="text-sm font-mono text-[#8B7355] mb-3">
                  AVAILABILITY
                </h3>
                <p className="text-[#F5F3EF]/60 font-mono text-sm">
                  Open to new opportunities
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 pt-8 border-t border-[#F5F3EF]/10 text-center"
        >
          <p className="text-sm font-mono text-[#F5F3EF]/40">
            © 2025 Akinola Fawaz.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
