// Types for category items
export type CategoryItem = {
  id: string;
  name: string;
  image: string;
  artist?: string;
  price: number;
  floorPrice?: number;
  verified?: boolean;
};

// Art items data
export const artItems: CategoryItem[] = [
  {
    id: "art-1",
    name: "Abstract Dreams",
    image: "https://images.unsplash.com/photo-1482160549825-59d1b23f2d24",
    artist: "Refik Anadol",
    price: 1.5,
    floorPrice: 1.2,
    verified: true
  },
  {
    id: "art-2",
    name: "Digital Oasis",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42",
    artist: "ArtBlocks",
    price: 2.8,
    floorPrice: 2.2,
    verified: true
  },
  {
    id: "art-3",
    name: "Neon Genesis",
    image: "https://images.unsplash.com/photo-1579548122080-c35fd6820ecb",
    artist: "XCOPY",
    price: 3.2,
    floorPrice: 2.8
  },
  {
    id: "art-4",
    name: "Colorful Chaos",
    image: "https://images.unsplash.com/photo-1575995872537-3793d29d972c",
    artist: "Pak",
    price: 4.5,
    floorPrice: 3.9,
    verified: true
  }
];

// Gaming items data
export const gamingItems: CategoryItem[] = [
  {
    id: "gaming-1",
    name: "MapleStory Universe",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    artist: "Nexon",
    price: 1.2,
    floorPrice: 0.9,
    verified: true
  },
  {
    id: "gaming-2",
    name: "Axie Infinity",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    artist: "Sky Mavis",
    price: 0.8,
    floorPrice: 0.6,
    verified: true
  },
  {
    id: "gaming-3",
    name: "Decentraland",
    image: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf",
    artist: "Decentraland Foundation",
    price: 2.5,
    floorPrice: 2.1
  },
  {
    id: "gaming-4",
    name: "The Sandbox",
    image: "https://images.unsplash.com/photo-1563212034-a3c52118cce9",
    artist: "Animoca Brands",
    price: 3.1,
    floorPrice: 2.7,
    verified: true
  }
];

// PFP items data
export const pfpItems: CategoryItem[] = [
  {
    id: "pfp-1",
    name: "Bored Ape Yacht Club",
    image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9",
    artist: "Yuga Labs",
    price: 75.5,
    floorPrice: 70.2,
    verified: true
  },
  {
    id: "pfp-2",
    name: "CryptoPunks",
    image: "https://images.unsplash.com/photo-1543622748-5ee7237e8565",
    artist: "Larva Labs",
    price: 68.8,
    floorPrice: 65.4,
    verified: true
  },
  {
    id: "pfp-3",
    name: "Doodles",
    image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc",
    artist: "Doodles",
    price: 8.2,
    floorPrice: 7.8
  },
  {
    id: "pfp-4",
    name: "Azuki",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5",
    artist: "Chiru Labs",
    price: 15.5,
    floorPrice: 14.2,
    verified: true
  }
];

// Photography items data
export const photographyItems: CategoryItem[] = [
  {
    id: "photo-1",
    name: "Urban Visions",
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e",
    artist: "Justin Aversano",
    price: 1.8,
    floorPrice: 1.5,
    verified: true
  },
  {
    id: "photo-2",
    name: "Nature's Call",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    artist: "Isaac Hernandez",
    price: 2.1,
    floorPrice: 1.9
  },
  {
    id: "photo-3",
    name: "Portraits of Time",
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be",
    artist: "Twin Flames",
    price: 4.2,
    floorPrice: 3.8,
    verified: true
  },
  {
    id: "photo-4",
    name: "Cosmic Wonders",
    image: "https://images.unsplash.com/photo-1524161905015-45ed76885a0e",
    artist: "Space Collective",
    price: 2.9,
    floorPrice: 2.6
  }
];

// Music items data
export const musicItems: CategoryItem[] = [
  {
    id: "music-1",
    name: "Harmony's Echo",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    artist: "3LAU",
    price: 1.2,
    floorPrice: 1.0,
    verified: true
  },
  {
    id: "music-2",
    name: "Digital Beats",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
    artist: "Deadmau5",
    price: 3.5,
    floorPrice: 3.2,
    verified: true
  },
  {
    id: "music-3",
    name: "Sound Waves",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
    artist: "RAC",
    price: 2.7,
    floorPrice: 2.5
  },
  {
    id: "music-4",
    name: "Sonic Revolution",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    artist: "Grimes",
    price: 5.5,
    floorPrice: 5.0,
    verified: true
  }
];

// Membership items data
export const membershipItems: CategoryItem[] = [
  {
    id: "member-1",
    name: "ZenCommunity",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
    artist: "Zen Collective",
    price: 2.4,
    floorPrice: 2.1,
    verified: true
  },
  {
    id: "member-2",
    name: "Creator Pass",
    image: "https://images.unsplash.com/photo-1550305080-4e029753abcf",
    artist: "Creator DAO",
    price: 1.8,
    floorPrice: 1.6
  },
  {
    id: "member-3",
    name: "Moonbirds",
    image: "https://images.unsplash.com/photo-1518723151228-1442944db600",
    artist: "Proof Collective",
    price: 8.9,
    floorPrice: 8.2,
    verified: true
  },
  {
    id: "member-4",
    name: "Alpha Pass",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    artist: "Alpha Group",
    price: 3.7,
    floorPrice: 3.3,
    verified: true
  }
]; 