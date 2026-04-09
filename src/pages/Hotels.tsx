import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import usptcFlag from "@/assets/usptc-flag.png";
import { MapPin, Calendar, Bus, Hotel, Users, CheckCircle } from "lucide-react";

const Hotels = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            Accommodation & Travel
          </h1>
          <p className="text-navy-foreground/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            We've secured a preferred hotel option for symposium attendees to make your stay convenient and connected to the program.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-6 md:px-12 py-16 space-y-16">
        {/* Recommended Hotel */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Hotel className="w-5 h-5 text-accent-blue" />
            <span className="inline-block bg-navy text-navy-foreground font-mono text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm">
              Recommended Hotel
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-foreground mb-6">
            The Westin San Francisco Airport
          </h2>

          <div className="rounded-lg border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <a
                href="https://app.marriott.com/reslink?id=1775603346644&key=GRP&app=resvlink"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-navy text-navy-foreground font-sans text-sm font-semibold tracking-wide uppercase hover:bg-navy/90 transition-colors shadow-lg shadow-navy/20"
              >
                👉 Book Your Room
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Rate</p>
                    <p className="text-sm text-muted-foreground">$219 per night</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Valid for stays</p>
                    <p className="text-sm text-muted-foreground">May 30 – June 4, 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Check-in / Check-out</p>
                    <p className="text-sm text-muted-foreground">May 30 → June 4</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    1 Old Bayshore Hwy<br />
                    Millbrae, CA 94030<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transportation */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Bus className="w-5 h-5 text-accent-blue" />
            <span className="inline-block bg-navy text-navy-foreground font-mono text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm">
              Transportation
            </span>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-sans text-base font-semibold text-foreground mb-2">
                Airport → Hotel
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A complimentary 24/7 shuttle is available between San Francisco International Airport (SFO) and the hotel.
              </p>
            </div>

            <div>
              <h3 className="font-sans text-base font-semibold text-foreground mb-2">
                Hotel → Symposium Venues
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Transportation will be provided for attendees staying at the Westin to and from each day's venue:
              </p>
              <div className="relative pl-6 border-l border-border space-y-4">
                {[
                  { day: "Monday", venue: "Stanford University" },
                  { day: "Tuesday", venue: "UC Berkeley" },
                  { day: "Wednesday", venue: "UCSF" },
                ].map((item) => (
                  <div key={item.day} className="relative">
                    <div className="absolute -left-[calc(1.5rem+4.5px)] top-1.5 w-[9px] h-[9px] rounded-full bg-muted-foreground/30" />
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">{item.day}:</span>{" "}
                      <span className="text-muted-foreground">{item.venue}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why stay */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-accent-blue" />
            <span className="inline-block bg-navy text-navy-foreground font-mono text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm">
              Why Stay at the Recommended Hotel
            </span>
          </div>

          <ul className="space-y-3">
            {[
              "Stay alongside speakers, organizers, and attendees",
              "Simplified transportation logistics",
              "Easy access to all symposium activities",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent-blue mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Hotels;
