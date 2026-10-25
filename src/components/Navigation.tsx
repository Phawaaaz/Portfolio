interface NavigationProps {
  activeSection: number;
}

// Must match the order of the sections rendered in App.tsx.
const sections = [
  "Hero",
  "About",
  "Projects",
  "Experience",
  "Credentials",
  "Skills",
  "Contact",
];

const Navigation = ({ activeSection }: NavigationProps) => {
  const scrollToSection = (index: number) => {
    const sectionElements = document.querySelectorAll("section[data-section]");
    sectionElements[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col gap-4">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className="group relative flex items-center"
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === index
                    ? "bg-accent scale-150 shadow-lg shadow-accent/50"
                    : "bg-fg/30 hover:bg-fg/50"
                }`}
              />
              <span
                className={`absolute right-full mr-4 px-3 py-1 bg-raised border border-accent/30 rounded text-sm font-mono whitespace-nowrap transition-all duration-300 ${
                  activeSection === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {section}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <div className="flex gap-3 px-4 py-3 bg-raised/80 backdrop-blur-sm border border-fg/10 rounded-full">
          {sections.map((_section, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className="group relative"
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === index
                    ? "bg-accent scale-150 shadow-lg shadow-accent/50"
                    : "bg-fg/30"
                }`}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-raised z-50">
        <div
          className="h-full bg-gradient-to-r from-accent to-[#2D9596] transition-all duration-300"
          style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
        />
      </div>
    </>
  );
};

export default Navigation;
