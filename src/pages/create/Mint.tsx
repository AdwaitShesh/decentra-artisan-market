import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NFTMintForm } from "@/components/NFTMintForm";
import { CreateNav } from "@/components/CreateNav";
import { useLocation } from "react-router-dom";

const CreateNFT = () => {
  const location = useLocation();
  const { file, preview } = (location.state as { file?: File; preview?: string }) || {};

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navbar />
      <CreateNav />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Create Your NFT</h1>
          <p className="text-muted-foreground mb-8">
            Mint your digital artwork as an NFT on the Decentra Artisan Market
          </p>
          
          <NFTMintForm initialFile={file} initialPreview={preview} />
          
          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Connect your wallet to get started</li>
              <li>Enter the recipient address (where the NFT will be sent)</li>
              <li>Provide the IPFS URI for your NFT metadata</li>
              <li>Set your desired royalty percentage (up to 10%)</li>
              <li>Click "Mint NFT" and confirm the transaction in your wallet</li>
            </ol>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">What is an IPFS URI?</h3>
              <p className="text-muted-foreground">
                An IPFS URI is a unique identifier for your NFT's metadata stored on the InterPlanetary File System.
                It should point to a JSON file containing information about your NFT, such as name, description, and image URL.
                Example: ipfs://QmYourMetadataHash
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateNFT; 