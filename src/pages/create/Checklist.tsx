import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CreateNav } from "@/components/CreateNav";
import { 
  ArrowRight,
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  Image as ImageIcon,
  FileText,
  HelpCircle,
  Info,
  AlertCircle,
  Lock,
  Lightbulb
} from "lucide-react";

interface ChecklistItem {
  id: string;
  category: string;
  label: string;
  description: string;
  checked: boolean;
}

const Checklist = () => {
  const navigate = useNavigate();
  const [artistInfo, setArtistInfo] = useState<any>(null);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    // Retrieve artist info from local storage
    const storedInfo = localStorage.getItem('artistInfo');
    if (storedInfo) {
      const parsedInfo = JSON.parse(storedInfo);
      setArtistInfo(parsedInfo);
      
      // Load category-specific checklist items based on the artist's chosen category
      generateChecklist(parsedInfo.category || "digital_art");
    } else {
      // If no artist info is found, redirect back to artist info page
      navigate('/create/artist-info');
    }
  }, [navigate]);

  const generateChecklist = (category: string) => {
    // Base checklist items that apply to all categories
    const baseChecklist: ChecklistItem[] = [
      {
        id: "file_format",
        category: "technical",
        label: "Proper file format",
        description: "Ensure your NFT is in the right format (JPG, PNG, GIF for images, MP4 for videos, MP3 for audio, GLB for 3D models)",
        checked: false
      },
      {
        id: "resolution",
        category: "technical",
        label: "High resolution",
        description: "Use high resolution for your artwork (at least 1500x1500px for images, 4K for videos)",
        checked: false
      },
      {
        id: "file_size",
        category: "technical",
        label: "Appropriate file size",
        description: "Keep file size under 100MB for faster uploading and better marketplace compatibility",
        checked: false
      },
      {
        id: "color_profile",
        category: "technical",
        label: "sRGB color profile",
        description: "Save images in sRGB color profile for consistent display across devices",
        checked: false
      },
      {
        id: "preview",
        category: "technical",
        label: "Create a preview image",
        description: "For non-image NFTs (audio, 3D, etc.), create an attractive cover image",
        checked: false
      },
      {
        id: "metadata",
        category: "metadata",
        label: "Prepare detailed metadata",
        description: "Create a compelling title, description, and relevant tags to increase discoverability",
        checked: false
      },
      {
        id: "ip_rights",
        category: "legal",
        label: "Verify IP rights",
        description: "Ensure you own all intellectual property rights to the content you're minting",
        checked: false
      },
      {
        id: "original",
        category: "legal",
        label: "Confirm originality",
        description: "Verify your work is original and does not contain copyrighted material you don't own",
        checked: false
      },
      {
        id: "royalties",
        category: "business",
        label: "Set royalty percentage",
        description: "Decide on the royalty percentage you'll receive from secondary sales (typically 5-10%)",
        checked: false
      },
      {
        id: "pricing",
        category: "business",
        label: "Determine pricing strategy",
        description: "Research similar NFTs to determine appropriate pricing for your artwork",
        checked: false
      },
      {
        id: "wallet",
        category: "technical",
        label: "Set up cryptocurrency wallet",
        description: "Ensure you have a secure wallet set up to receive payments (e.g., MetaMask)",
        checked: false
      }
    ];

    // Category-specific checklist items
    const categoryChecklists: { [key: string]: ChecklistItem[] } = {
      "digital_art": [
        {
          id: "digital_art_layers",
          category: "technical",
          label: "Properly organized layers",
          description: "Ensure your artwork has properly organized layers for better quality",
          checked: false
        },
        {
          id: "digital_art_signature",
          category: "branding",
          label: "Include digital signature or watermark",
          description: "Consider adding your signature or watermark in a non-intrusive manner",
          checked: false
        }
      ],
      "generative": [
        {
          id: "generative_algorithm",
          category: "technical",
          label: "Verify algorithm functionality",
          description: "Ensure your generative algorithm produces consistent and high-quality outputs",
          checked: false
        },
        {
          id: "generative_variety",
          category: "technical",
          label: "Check for sufficient variety",
          description: "Make sure your generative system creates enough variety in outputs",
          checked: false
        }
      ],
      "music": [
        {
          id: "music_quality",
          category: "technical",
          label: "High-quality audio mastering",
          description: "Ensure your audio is professionally mastered for optimal listening experience",
          checked: false
        },
        {
          id: "music_thumbnail",
          category: "technical",
          label: "Eye-catching audio thumbnail",
          description: "Create an attractive cover image that represents your audio NFT",
          checked: false
        }
      ],
      "3d": [
        {
          id: "3d_textures",
          category: "technical",
          label: "Optimized textures",
          description: "Make sure textures are optimized for web viewing and compatible with NFT platforms",
          checked: false
        },
        {
          id: "3d_poly_count",
          category: "technical",
          label: "Appropriate polygon count",
          description: "Balance polygon count for quality while maintaining reasonable file size",
          checked: false
        }
      ],
      "gaming": [
        {
          id: "gaming_compatibility",
          category: "technical",
          label: "Game compatibility",
          description: "Verify your NFT is compatible with intended game platforms",
          checked: false
        },
        {
          id: "gaming_utility",
          category: "technical",
          label: "In-game utility defined",
          description: "Clearly define what utility your NFT will have in-game",
          checked: false
        }
      ]
    };

    // Combine base checklist with category-specific items
    let fullChecklist = [...baseChecklist];
    
    // If category exists in our mapping, add those items
    if (category in categoryChecklists) {
      fullChecklist = [...fullChecklist, ...categoryChecklists[category]];
    }
    
    setChecklistItems(fullChecklist);
  };

  const toggleChecklistItem = (id: string) => {
    setChecklistItems(
      checklistItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const getCompletionPercentage = () => {
    if (checklistItems.length === 0) return 0;
    const checkedCount = checklistItems.filter(item => item.checked).length;
    return Math.round((checkedCount / checklistItems.length) * 100);
  };

  const handleContinue = () => {
    // Store checklist progress in local storage
    localStorage.setItem('checklist', JSON.stringify(checklistItems));
    // Navigate to the next step
    navigate('/create/mint');
  };

  const categoryName = artistInfo?.category ? 
    {
      "digital_art": "Digital Art",
      "generative": "Generative Art",
      "pixel_art": "Pixel Art",
      "3d": "3D Art",
      "illustration": "Illustration",
      "photography": "Photography",
      "animation": "Animation",
      "music": "Music",
      "gaming": "Gaming",
      "collectibles": "Collectibles",
      "virtual_worlds": "Virtual Worlds",
      "other": "Other"
    }[artistInfo.category] : "Art";

  // Group checklist items by category
  const groupedChecklist: { [key: string]: ChecklistItem[] } = checklistItems.reduce((groups, item) => {
    const group = groups[item.category] || [];
    group.push(item);
    groups[item.category] = group;
    return groups;
  }, {} as { [key: string]: ChecklistItem[] });

  const categoryLabels: { [key: string]: { label: string, icon: JSX.Element } } = {
    "technical": { label: "Technical Requirements", icon: <ImageIcon className="h-5 w-5 text-purple-400" /> },
    "metadata": { label: "Metadata & Description", icon: <FileText className="h-5 w-5 text-blue-400" /> },
    "legal": { label: "Legal & Copyright", icon: <Lock className="h-5 w-5 text-red-400" /> },
    "business": { label: "Business & Pricing", icon: <FileCheck className="h-5 w-5 text-green-400" /> },
    "branding": { label: "Branding & Marketing", icon: <Lightbulb className="h-5 w-5 text-yellow-400" /> }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <CreateNav currentStep={2} />
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {categoryName} Checklist
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Review this optional checklist to prepare your artwork for minting as an NFT. Check off the items that apply to your project - you can proceed at any time.
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-400">Items Selected</span>
                <span className="text-sm font-medium text-purple-400">{getCompletionPercentage()}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full">
                <div 
                  className="h-full bg-purple-600 rounded-full transition-all duration-500"
                  style={{ width: `${getCompletionPercentage()}%` }}
                ></div>
              </div>
            </div>
            
            {/* Tips */}
            <div className="mb-10 bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-yellow-500">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-yellow-400">Tips for successful NFTs</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    High-quality NFTs stand out in the marketplace. This checklist is a helpful guide, but you're free to select only the items that apply to your specific NFT project.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Checklist Sections */}
            <div className="space-y-8">
              {Object.keys(groupedChecklist).map(category => (
                <div key={category} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    {categoryLabels[category]?.icon || <HelpCircle className="h-5 w-5 text-purple-400" />}
                    <span className="ml-2">{categoryLabels[category]?.label || category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  </h2>
                  
                  <div className="space-y-5">
                    {groupedChecklist[category].map((item) => (
                      <div key={item.id} className="flex items-start gap-3">
                        <Checkbox
                          id={item.id}
                          checked={item.checked}
                          onCheckedChange={() => toggleChecklistItem(item.id)}
                          className="mt-1 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                        <div className="flex-1">
                          <Label htmlFor={item.id} className="font-medium cursor-pointer">
                            {item.label}
                          </Label>
                          <p className="text-sm text-gray-400 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Replace warning with info message */}
            {getCompletionPercentage() < 70 && (
              <div className="mt-8 bg-blue-900/20 border border-blue-800/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-blue-500">
                    <Info className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-400">Ready When You Are</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      You can continue at any time - this checklist is purely to help you prepare your NFT. Select only the items that are relevant to your project.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Continue Button */}
            <div className="flex justify-end mt-10">
              <Button 
                onClick={handleContinue}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
              >
                Continue to NFT Creation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checklist; 