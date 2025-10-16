import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="rounded-3xl overflow-hidden relative bg-gradient-to-r from-bharat-blue to-bharat-purple animate-gradient-flow bg-[length:400%_400%]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634986666663-414c8e3fb5e2?auto=format&fit=crop&w=1920&q=80')] opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10 py-16 px-8 md:p-16 text-center md:text-left md:flex items-center justify-between">
            <div className="mb-8 md:mb-0 md:max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to start your NFT journey?</h2>
              <p className="text-blue-100 text-lg">Connect your wallet and start exploring or creating your first NFT today.</p>
            </div>
            <Button size="lg" className="bg-white text-bharat-purple hover:bg-gray-100 transition">
              Create an Account
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
