import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedNFTs } from "@/components/FeaturedNFTs";
import { FeatureSection } from "@/components/FeatureSection";
import { HowItWorks } from "@/components/HowItWorks";
import { TopArtists } from "@/components/TopArtists";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedNFTs />
        <FeatureSection />
        <HowItWorks />
        <TopArtists />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
