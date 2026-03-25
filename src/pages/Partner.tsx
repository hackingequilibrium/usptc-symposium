import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import usptcFlag from "@/assets/usptc-flag.png";

const ORG_TYPES = [
  "University / Research",
  "Corporate / Industry",
  "Government / Public",
  "Media",
  "Foundation / Program",
  "Other",
];

const INTEREST_AREAS = [
  "Speaking / contributing to the program",
  "Research collaboration",
  "Commercialization / startups",
  "Policy / institutional cooperation",
  "Media / communication",
  "Other",
];

const Partner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({
    name: "",
    organization: "",
    role_title: "",
    email: "",
    org_type: "",
    areas_of_interest: [] as string[],
    description: "",
    website: "",
    linkedin: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (area: string) => {
    setForm((prev) => ({
      ...prev,
      areas_of_interest: prev.areas_of_interest.includes(area)
        ? prev.areas_of_interest.filter((a) => a !== area)
        : [...prev.areas_of_interest, area],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.organization || !form.email || !form.org_type) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (form.areas_of_interest.length === 0) {
      toast.error("Please select at least one area of interest.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("partnership_inquiries").insert({
      name: form.name.trim(),
      organization: form.organization.trim(),
      role_title: form.role_title.trim() || null,
      email: form.email.trim(),
      org_type: form.org_type,
      areas_of_interest: form.areas_of_interest,
      description: form.description.trim() || null,
      website: form.website.trim() || null,
      linkedin: form.linkedin.trim() || null,
    });

    setSubmitting(false);

    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="bg-navy py-20 sm:py-28">
        <div className="container max-w-7xl mx-auto px-6 md:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-navy-foreground/60 hover:text-navy-foreground text-sm font-mono tracking-wide mb-8 transition-colors"
          >
            ← Back to home
          </Link>
          <img src={usptcFlag} alt="USPTC" className="w-28 h-28 object-contain mb-6" />
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-navy-foreground/50 mb-4">
            XXV US–Poland Science & Technology Symposium
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight text-navy-foreground mb-4">
            Partner with the Symposium
          </h1>
          <p className="text-navy-foreground/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            Join a cross-sector initiative connecting research, industry, and institutions across the US–Poland innovation ecosystem.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-3xl mx-auto px-6 md:px-12 py-16">
        {/* Intro copy */}
        <div className="mb-12">
          <p className="text-muted-foreground text-base leading-relaxed">
            We work with partners who contribute to advancing research, commercialization, and transatlantic cooperation — from universities and companies to public institutions, media, and ecosystem organizations.
          </p>
        </div>

        {submitted ? (
          <div className="py-16 text-center space-y-4">
            <h2 className="font-serif text-2xl text-foreground">Thank you for your interest</h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
              Your inquiry has been submitted. We'll review it and get back to you soon.
            </p>
            <Link
              to="/"
              className="inline-block mt-4 text-sm font-mono text-foreground/60 hover:text-foreground transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        ) : (
        <div>
          <h2 className="font-serif text-2xl text-foreground mb-8"><h2 className="font-serif text-2xl text-foreground mb-8">Partner with Us</h2></h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-sm border border-foreground/30 bg-background text-foreground text-sm"
              />
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Organization <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                className="w-full px-4 py-3 rounded-sm border border-foreground/30 bg-background text-foreground text-sm"
              />
            </div>

            {/* Role / Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Role / Title
              </label>
              <input
                type="text"
                value={form.role_title}
                onChange={(e) => setForm({ ...form, role_title: e.target.value })}
                className="w-full px-4 py-3 rounded-sm border border-foreground/30 bg-background text-foreground text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-sm border border-foreground/30 bg-background text-foreground text-sm"
              />
            </div>

            {/* Type of organization */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Type of organization <span className="text-destructive">*</span>
              </label>
              <select
                required
                value={form.org_type}
                onChange={(e) => setForm({ ...form, org_type: e.target.value })}
                className="w-full px-4 py-3 rounded-sm border border-foreground/30 bg-background text-foreground text-sm"
              >
                <option value="" disabled>Select…</option>
                {ORG_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Areas of interest */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Area of interest <span className="text-destructive">*</span>
              </label>
              <div className="space-y-2">
                {INTEREST_AREAS.map((area) => (
                  <div
                    key={area}
                    onClick={() => toggleInterest(area)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                        form.areas_of_interest.includes(area)
                          ? "bg-foreground border-foreground"
                          : "border-foreground/30 group-hover:border-foreground/50"
                      }`}
                    >
                      {form.areas_of_interest.includes(area) && (
                        <svg className="w-3 h-3 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-foreground/80 select-none">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Short description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                What kind of collaboration are you interested in?
              </label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 rounded-sm border border-foreground/30 bg-background text-foreground text-sm resize-y"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Website <span className="text-muted-foreground text-xs">(optional)</span>
              </label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://"
                className="w-full px-4 py-3 rounded-sm border border-foreground/30 bg-background text-foreground text-sm"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                LinkedIn <span className="text-muted-foreground text-xs">(optional)</span>
              </label>
              <input
                type="url"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/…"
                className="w-full px-4 py-3 rounded-sm border border-foreground/30 bg-background text-foreground text-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full py-6 rounded-sm bg-foreground text-background hover:bg-foreground/90 text-sm font-medium tracking-wide uppercase"
            >
              {submitting ? "Submitting…" : "Submit Inquiry"}
            </Button>
          </form>
        </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Partner;
