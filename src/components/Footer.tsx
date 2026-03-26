import { ContactDialog } from "@/components/ContactDialog";

export const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container max-w-6xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="font-mono text-xs text-muted-foreground tracking-wide">
          © 2026 Polsko Amerykańska Rada Współpracy / US–Polish Trade Council. All rights reserved.
        </p>
        <ContactDialog description="Have a question or want to get in touch? Send us a message.">
          <button className="font-mono text-xs text-muted-foreground tracking-wide hover:text-foreground transition-colors text-left sm:text-right">
            Contact Us
          </button>
        </ContactDialog>
      </div>
    </footer>
  );
};
