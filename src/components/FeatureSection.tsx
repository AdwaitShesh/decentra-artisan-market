import { Badge } from "@/components/ui/badge";
import { Palette, Award, ShieldCheck, Wallet, Layers, Users } from "lucide-react";

const features = [
  {
    id: "1",
    icon: <Palette className="h-6 w-6 text-bharat-teal" />,
    title: "Creator-First Approach",
    description: "Higher royalty percentages, lower fees, and multi-chain support give artists more control."
  },
  {
    id: "2",
    icon: <Award className="h-6 w-6 text-bharat-saffron" />,
    title: "Community Curation",
    description: "Discover trending and high-quality NFTs curated by our passionate community."
  },
  {
    id: "3",
    icon: <Users className="h-6 w-6 text-bharat-purple" />,
    title: "Decentralized Reputation",
    description: "Transparent verification system that builds trust between creators and collectors."
  },
  {
    id: "4",
    icon: <ShieldCheck className="h-6 w-6 text-bharat-blue" />,
    title: "Secure Smart Contracts",
    description: "Audited, gas-optimized smart contracts with reentrancy protection and role-based access."
  },
  {
    id: "5",
    icon: <Wallet className="h-6 w-6 text-bharat-purple" />,
    title: "User-Friendly Interface",
    description: "Intuitive interface for non-technical users with IPFS for decentralized storage and wallet integrations."
  },
  {
    id: "6",
    icon: <Layers className="h-6 w-6 text-bharat-teal" />,
    title: "Multi-Chain Support",
    description: "Support for Ethereum, Solana, Polygon, and other leading blockchain networks."
  }
];

export function FeatureSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="text-bharat-purple border-bharat-purple mb-4">
            Key Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">
            Empowering Creators with Cutting-Edge Technology
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our platform combines artist-centric design with blockchain security to create a vibrant ecosystem for digital creators and collectors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition bg-card group"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
