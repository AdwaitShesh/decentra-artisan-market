import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, BadgeCheck } from "lucide-react";

const artists = [
  {
    id: 1,
    name: "Amrita Patel",
    username: "@amrita_creates",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    coverImage: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=720&q=80",
    bio: "Contemporary digital artist specializing in Indian mythology and modern art fusion",
    followers: "12.5K",
    artworks: 42,
    rating: 4.9,
    verified: true,
    location: "Mumbai, India"
  },
  {
    id: 2,
    name: "Raj Malhotra",
    username: "@raj_digitalart",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    coverImage: "https://images.unsplash.com/photo-1618172193622-ae2d025f2c95?auto=format&fit=crop&w=720&q=80",
    bio: "Blending traditional Indian art with digital innovation",
    followers: "8.2K",
    artworks: 36,
    rating: 4.7,
    verified: true,
    location: "Delhi, India"
  },
  {
    id: 3,
    name: "Leela Krishnan",
    username: "@leela_art",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    coverImage: "https://images.unsplash.com/photo-1633218388467-539babe5f280?auto=format&fit=crop&w=720&q=80",
    bio: "Digital artist exploring traditional Bharatanatyam through NFTs",
    followers: "5.7K",
    artworks: 28,
    rating: 4.8,
    verified: false,
    location: "Chennai, India"
  },
  {
    id: 4,
    name: "Vikram Mehta",
    username: "@vikram_creates",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    coverImage: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=720&q=80",
    bio: "Bringing Rajasthani folk art to the digital realm",
    followers: "9.3K",
    artworks: 54,
    rating: 4.6,
    verified: true,
    location: "Jaipur, India"
  },
  {
    id: 5,
    name: "Priya Sharma",
    username: "@priya_digital",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80",
    coverImage: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=720&q=80",
    bio: "Creating digital Madhubani art and contemporary interpretations",
    followers: "15.1K",
    artworks: 67,
    rating: 4.9,
    verified: true,
    location: "Bihar, India"
  },
  {
    id: 6,
    name: "Arun Verma",
    username: "@arun_nftart",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    coverImage: "https://images.unsplash.com/photo-1618172193622-ae2d025f2c95?auto=format&fit=crop&w=720&q=80",
    bio: "Digital artist focusing on Kerala mural art style",
    followers: "7.8K",
    artworks: 31,
    rating: 4.7,
    verified: true,
    location: "Kochi, India"
  }
];

export function ArtistGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artists.map((artist) => (
        <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="h-32 relative">
            <img 
              src={artist.coverImage}
              alt={`${artist.name}'s cover`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
          </div>
          
          <CardContent className="pt-12 p-6 relative">
            <div className="absolute -top-8 left-6">
              <Avatar className="h-16 w-16 ring-4 ring-white">
                <AvatarImage src={artist.avatar} alt={artist.name} />
                <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {artist.verified && (
                <div className="absolute -right-1 -bottom-1 bg-bharat-teal text-white rounded-full p-1">
                  <BadgeCheck className="h-4 w-4" />
                </div>
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{artist.name}</h3>
                {artist.verified && (
                  <Badge variant="secondary" className="text-xs">Verified</Badge>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-3">{artist.username}</p>
              <p className="text-sm text-gray-600 mb-4">{artist.bio}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Followers</p>
                  <p className="font-semibold">{artist.followers}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Artworks</p>
                  <p className="font-semibold">{artist.artworks}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-semibold text-sm">{artist.location}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-bharat-saffron">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 font-medium">{artist.rating}</span>
                </div>
                <Button variant="outline" size="sm" className="rounded-full">
                  Follow
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
