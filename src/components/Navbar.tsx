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
    <nav className="fixed top-4 right-4 sm:top-6 sm:right-6 md:right-12 md:left-12 z-50">
      <div className="hidden md:flex items-center rounded-full border border-black/10 bg-white/70 backdrop-blur-xl px-4 py-1.5">
        {/* Symposium title — fades in on scroll */}
        <span
          className={`font-serif text-base font-semibold tracking-tight text-foreground mr-auto transition-all duration-300 whitespace-nowrap ${
            scrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0 mr-0 overflow-hidden"
          }`}
        >
          XXV US–Poland Science & Technology Symposium
        </span>

        <div className="flex items-center gap-1">
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
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center gap-3">
        <span
          className={`font-serif text-sm font-semibold tracking-tight text-foreground transition-all duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          XXV US–Poland
        </span>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-black/10 bg-white/70 backdrop-blur-xl text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

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
    </nav>
  );
};
