import { Badge } from "@/components/ui/badge";

const steps = [
  {
    number: "01",
    title: "Connect Your Wallet",
    description: "Connect your crypto wallet to seamlessly interact with the BharatNFT marketplace."
  },
  {
    number: "02",
    title: "Create Your Collection",
    description: "Set up your artist profile and create unique collections to showcase your creative work."
  },
  {
    number: "03",
    title: "Add Your NFTs",
    description: "Upload your digital creations and mint them as NFTs with our easy-to-use interface."
  },
  {
    number: "04",
    title: "List For Sale",
    description: "Set your price and list your NFTs for sale on the marketplace with flexible options."
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="text-bharat-teal border-bharat-teal mb-4">
            How It Works
          </Badge>
          <h2 className="text-3xl font-bold mb-10 dark:text-white">
            How BharatNFT Works
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our platform makes it easy for artists and creators to mint, 
            showcase and sell their digital creations as NFTs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card rounded-xl p-8 border border-border shadow-sm h-full">
                <div className="text-5xl font-bold text-muted/30 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-border" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
