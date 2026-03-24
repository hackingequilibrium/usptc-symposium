import { HeroSection } from "@/components/HeroSection";
import { TracksSection } from "@/components/TracksSection";
import { VenueSection } from "@/components/VenueSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <TracksSection />
      <VenueSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
