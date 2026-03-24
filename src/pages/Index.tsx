import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { WhySection } from "@/components/WhySection";
import { SpeakersSection } from "@/components/SpeakersSection";
import { TracksSection } from "@/components/TracksSection";
import { VenueSection } from "@/components/VenueSection";
import { PartnersSection } from "@/components/PartnersSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <WhySection />
      <SpeakersSection />
      <VenueSection />
      <PartnersSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
