import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Focus Areas", href: "#why" },
  { label: "Speakers", href: "#speakers" },
  { label: "Venues", href: "#venues" },
  { label: "Partners", href: "#partners" },
  { label: "Register", href: "#register" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-3 pointer-events-none">
      {/* Left: sticky title */}
      <span
        className={`pointer-events-auto font-serif text-sm tracking-tight text-foreground/80 transition-all duration-300 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        XXV US–Poland Science & Technology Symposium
      </span>

      {/* Right: nav */}
      <div className="pointer-events-auto relative">
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1 rounded-full border border-black/10 bg-white/70 backdrop-blur-xl px-2 py-1.5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-full hover:bg-black/5 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-black/10 bg-white/70 backdrop-blur-xl text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden absolute top-14 right-0 flex flex-col gap-1 rounded-2xl border border-black/10 bg-white/70 backdrop-blur-xl p-2 min-w-[180px]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground rounded-xl hover:bg-black/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
