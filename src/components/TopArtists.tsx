import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";

// Mock data for top artists
const artists = [
  {
    id: 1,
    name: "Amrita Patel",
    username: "@amrita_creates",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    coverImage: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=720&q=80",
    followers: "12.5K",
    artworks: 42,
    rating: 4.9,
    verified: true
  },
  {
    id: 2,
    name: "Raj Malhotra",
    username: "@raj_digitalart",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    coverImage: "https://images.unsplash.com/photo-1618172193622-ae2d025f2c95?auto=format&fit=crop&w=720&q=80", 
    followers: "8.2K",
    artworks: 36,
    rating: 4.7,
    verified: true
  },
  {
    id: 3,
    name: "Leela Krishnan",
    username: "@leela_art",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    coverImage: "https://images.unsplash.com/photo-1633218388467-539babe5f280?auto=format&fit=crop&w=720&q=80",
    followers: "5.7K",
    artworks: 28,
    rating: 4.8,
    verified: false
  },
  {
    id: 4,
    name: "Vikram Mehta",
    username: "@vikram_creates",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    coverImage: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=720&q=80",
    followers: "9.3K",
    artworks: 54,
    rating: 4.6,
    verified: true
  }
];

export function TopArtists() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-foreground">Top Creators</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Discover talented artists who are making waves in the digital art world
            </p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0 text-foreground hover:bg-muted">
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.map((artist) => (
            <div key={artist.id} className="rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition group bg-card">
              <div className="h-32 relative">
                <img 
                  src={artist.coverImage} 
                  alt={`${artist.name}'s cover`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              
              <div className="pt-12 p-6 relative">
                <div className="absolute -top-8 left-6">
                  <Avatar className="h-16 w-16 ring-4 ring-card">
                    <AvatarImage src={artist.avatar} alt={artist.name} />
                    <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {artist.verified && (
                    <div className="absolute -right-1 -bottom-1 bg-bharat-teal text-white rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{artist.name}</h3>
                  <p className="text-sm text-muted-foreground">{artist.username}</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Followers</p>
                      <p className="font-semibold text-foreground">{artist.followers}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Artworks</p>
                      <p className="font-semibold text-foreground">{artist.artworks}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <div className="flex items-center text-bharat-saffron">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 font-medium">{artist.rating}</span>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto rounded-full border-border text-foreground hover:bg-muted">
                      Follow
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
