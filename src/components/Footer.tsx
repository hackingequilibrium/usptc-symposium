import { ContactDialog } from "@/components/ContactDialog";
import { Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container max-w-6xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs text-muted-foreground tracking-wide">
            © 2026 Polsko Amerykańska Rada Współpracy / US–Polish Trade Council. All rights reserved.
          </p>
          <a
            href="/USPTC_RODO.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground tracking-wide hover:text-foreground transition-colors"
          >
            Privacy Policy / Polityka prywatności (RODO)
          </a>
        </div>
        <div className="flex items-center gap-4">
          <ContactDialog description="Have a question or want to get in touch? Send us a message.">
            <button className="font-mono text-xs text-muted-foreground tracking-wide hover:text-foreground transition-colors text-left sm:text-right">
              Contact Us
            </button>
          </ContactDialog>
          <a
            href="https://www.linkedin.com/company/us-polish-trade-council/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin size={16} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
};
