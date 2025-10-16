import { Card, CardContent } from "@/components/ui/card";
import { Shield, FilePlus, FileText, Key, Lock } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Creation & Documentation",
    description: "Document your innovation completely with descriptions, visuals, and supporting materials that establish ownership.",
    icon: FileText,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    title: "Digital Asset Preparation",
    description: "Prepare your digital assets including any images, code, designs, or other files that represent your innovation.",
    icon: FilePlus,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 3,
    title: "Smart Contract Creation",
    description: "A smart contract is created that contains all the details of your patent, including ownership rights and licensing terms.",
    icon: Key,
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: 4,
    title: "Blockchain Registration",
    description: "Your patent is registered on the blockchain with a unique identifier, creating an immutable record of your innovation.",
    icon: Lock,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 5,
    title: "Verification & Authentication",
    description: "Your patent undergoes a verification process to ensure it meets all necessary criteria for blockchain authentication.",
    icon: Shield,
    color: "bg-red-100 text-red-700",
  },
];

export function PatentProcess() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-3xl font-bold mb-4">NFT Patent Process</h2>
          <p className="text-gray-600 mb-4">
            Our standardized NFT patent system provides creators with a secure, transparent, and 
            immutable way to protect their intellectual property on the blockchain. Follow these 
            steps to create and secure your NFT patent.
          </p>
          
          <h3 className="text-xl font-semibold mb-2">Benefits</h3>
          <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
            <li>Immutable proof of creation date and ownership</li>
            <li>Global recognition and verification without central authorities</li>
            <li>Automated royalty distribution through smart contracts</li>
            <li>Transparent licensing and usage terms</li>
            <li>Protection against intellectual property theft</li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="relative">
        <div className="absolute left-9 top-0 h-full w-0.5 bg-gray-200 z-0"></div>
        
        <div className="space-y-12 relative z-10">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start">
              <div className={`flex-shrink-0 rounded-full p-3 ${step.color} shadow-sm`}>
                <step.icon className="h-6 w-6" />
              </div>
              
              <div className="ml-6">
                <h3 className="text-xl font-semibold mb-1">
                  {step.id}. {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Card className="mt-12">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-2">Legal Considerations</h3>
          <p className="text-gray-600 mb-4">
            While NFT patents provide excellent protection for intellectual property on the blockchain, 
            they complement rather than replace traditional legal protections. Consider 
            consulting with a legal professional for comprehensive IP protection.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Important Note</h4>
            <p className="text-blue-700 text-sm">
              BharatNFT provides the technological infrastructure for NFT patents but does not 
              provide legal advice. The information provided here is for educational purposes only.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
