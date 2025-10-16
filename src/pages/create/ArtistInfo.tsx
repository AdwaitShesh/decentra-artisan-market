import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Label 
} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateNav } from "@/components/CreateNav";
import { 
  Upload,
  ImageIcon,
  AtSign,
  User,
  Briefcase,
  ArrowRight,
  Link as LinkIcon
} from "lucide-react";

const artCategories = [
  { id: "digital_art", name: "Digital Art" },
  { id: "generative", name: "Generative Art" },
  { id: "pixel_art", name: "Pixel Art" },
  { id: "3d", name: "3D Art" },
  { id: "illustration", name: "Illustration" },
  { id: "photography", name: "Photography" },
  { id: "animation", name: "Animation" },
  { id: "music", name: "Music" },
  { id: "gaming", name: "Gaming" },
  { id: "collectibles", name: "Collectibles" },
  { id: "virtual_worlds", name: "Virtual Worlds" },
  { id: "other", name: "Other" }
];

const ArtistInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    category: "",
    website: "",
    twitter: "",
    instagram: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save form data to session/local storage 
    localStorage.setItem('artistInfo', JSON.stringify(formData));
    // Navigate to the next step
    navigate('/create/checklist');
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <CreateNav currentStep={1} />
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Tell Us About Yourself
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Let's set up your creator profile. This information will be displayed alongside your NFTs in the marketplace.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Image Upload */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center overflow-hidden">
                    <ImageIcon className="h-12 w-12 text-gray-500" />
                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                      <Upload className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Basic Info */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <User className="mr-2 h-5 w-5 text-purple-400" />
                  Basic Information
                </h2>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <AtSign className="h-4 w-4" />
                      </div>
                      <Input
                        id="username"
                        name="username"
                        placeholder="username"
                        className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500 pl-10"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell collectors about yourself and your art..."
                      className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500 min-h-[120px]"
                      value={formData.bio}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.bio.length}/500 characters
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Art Category */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-purple-400" />
                  Art Category
                </h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Primary Art Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {artCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-400 mt-2">
                      Choose the category that best represents your art. This will help collectors discover your work.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <LinkIcon className="mr-2 h-5 w-5 text-purple-400" />
                  Social Links (Optional)
                </h2>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://yourwebsite.com"
                      className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      placeholder="@username"
                      className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500"
                      value={formData.twitter}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      placeholder="@username"
                      className="bg-gray-800 border-gray-700 text-white focus:ring-purple-500"
                      value={formData.instagram}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
                >
                  Continue to Art Checklist <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArtistInfo; 