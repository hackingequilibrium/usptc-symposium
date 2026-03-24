import { useState } from "react";
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

  return (
    <nav className="fixed top-4 right-4 sm:top-6 sm:right-6 md:right-12 z-50">
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
    </nav>
  );
};
