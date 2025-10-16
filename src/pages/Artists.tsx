import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArtistGrid } from "@/components/ArtistGrid";

const Artists = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-inter">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">Artist Directory</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover talented Indian artists creating unique digital art and NFTs
            </p>
          </div>
          <ArtistGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Artists;
