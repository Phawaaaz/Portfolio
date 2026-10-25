import { useState, useEffect } from "react";

interface PreloadProps {
  onComplete: () => void;
}

const Preload = ({ onComplete }: PreloadProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }, 400);

      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-page z-[9999] flex items-center justify-center transition-all duration-700 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 opacity-30 bg-film-grain" />

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Initials/Logo */}
        <div
          className={`transition-all duration-1000 ${
            progress > 20 ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="text-6xl md:text-8xl font-serif text-accent mb-8 tracking-tight">
            AF
          </div>
          
          <div className="text-sm font-mono text-fg/50 tracking-widest mb-8">
            AKINOLA FAWAZ
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 mx-auto">
          <div className="h-px bg-fg/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-fg transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="mt-4 text-xs font-mono text-fg/40 tracking-wider">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preload;