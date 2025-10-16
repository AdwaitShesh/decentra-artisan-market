import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatentCard } from "@/components/PatentCard";
import { CreatePatentForm } from "@/components/CreatePatentForm";
import { PatentProcess } from "@/components/PatentProcess";
import { Shield, FilePlus, FileText } from "lucide-react";

const patents = [
  {
    id: 1,
    title: "Digital Art Preservation System",
    description: "A method for preserving digital art through blockchain verification and metadata retention",
    owner: "Bharat NFT",
    createdAt: "2025-01-15",
    status: "Verified",
    category: "Digital Art",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=720&q=80",
  },
  {
    id: 2,
    title: "NFT Authentication Protocol",
    description: "Secure protocol for authenticating and verifying ownership of digital assets on blockchain",
    owner: "Blockchain Innovations Ltd",
    createdAt: "2025-02-22",
    status: "Pending",
    category: "Protocol",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=720&q=80",
  },
  {
    id: 3,
    title: "Digital Asset Rights Management System",
    description: "A comprehensive system for managing and enforcing digital rights for NFT creators",
    owner: "Priya Sharma",
    createdAt: "2025-03-05",
    status: "Verified",
    category: "Rights Management",
    image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=720&q=80",
  },
  {
    id: 4,
    title: "Smart Contract-Based Royalty Distribution",
    description: "Method for automatic distribution of royalties to content creators through smart contracts",
    owner: "Raj Malhotra",
    createdAt: "2025-03-19",
    status: "Under Review",
    category: "Smart Contracts",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=720&q=80",
  },
];

const Patents = () => {
  const [activeTab, setActiveTab] = useState("explore");

  return (
    <div className="min-h-screen bg-white dark:bg-black font-inter">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 dark:text-white">NFT Patents</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Secure ownership of your original products and innovations with NFT-based patents.
                Protect your intellectual property on the blockchain.
              </p>
            </div>
            <Button 
              onClick={() => setActiveTab("create")}
              className="bg-bharat-teal hover:bg-bharat-teal/90 text-white"
              size="lg"
            >
              <FilePlus className="mr-2 h-5 w-5" />
              Create New Patent
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 flex justify-center dark:bg-gray-900 dark:text-gray-300">
              <TabsTrigger value="explore" className="flex items-center dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white">
                <FileText className="mr-2 h-4 w-4" />
                Explore Patents
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white">
                <FilePlus className="mr-2 h-4 w-4" />
                Create Patent
              </TabsTrigger>
              <TabsTrigger value="process" className="flex items-center dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white">
                <Shield className="mr-2 h-4 w-4" />
                Patent Process
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="explore" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patents.map((patent) => (
                  <PatentCard key={patent.id} patent={patent} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="create">
              <CreatePatentForm />
            </TabsContent>
            
            <TabsContent value="process">
              <PatentProcess />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Patents;
