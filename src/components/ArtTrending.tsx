import { useState } from "react";

type TrendingItem = {
  id: number;
  position: number;
  name: string;
  creator?: string;
  price: string;
  priceChange?: string;
  volume: string;
  verified: boolean;
  image: string;
};

const trendingData: TrendingItem[] = [
  {
    id: 1,
    position: 1,
    name: "SAPA ART",
    price: "+0.03 ETH",
    volume: "0.85 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 2,
    position: 2,
    name: "Cromie Art Blocks",
    price: "+0.015 ETH",
    volume: "0.30 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 3,
    position: 3,
    name: "Dreams are Things...",
    price: "0.05 ETH",
    volume: "0.66 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 4,
    position: 4,
    name: "WXRP",
    price: "0.16 ETH",
    volume: "0.78 ETH",
    verified: false,
    image: "https://images.unsplash.com/photo-1578321272698-e0dc125b92e5?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 5,
    position: 5,
    name: "re:mograph:ed",
    price: "+0.2 ETH",
    volume: "1.9 APE",
    verified: true,
    image: "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 6,
    position: 6,
    name: "FVCKRENDERX",
    price: "0.75 ETH",
    volume: "2.0 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1492037766660-2a56f9eb3fcb?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 7,
    position: 7,
    name: "BITBLCK EVERDEEP...",
    price: "10.0 ETH",
    volume: "0.39 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 8,
    position: 8,
    name: "The Memes by 9GAG",
    price: "0.04 ETH",
    volume: "0.37 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 9,
    position: 9,
    name: "DeadFellaz",
    price: "7.88 ETH",
    volume: "7.66 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1528111029373-01919ffaf96c?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 10,
    position: 10,
    name: "Milady by 2019",
    price: "0.74 ETH",
    volume: "0.94 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=60&q=80",
  }
];

const tabs = ["Trending", "Top"];
const timeRanges = ["1h", "6h", "24h", "7d", "All chains"];

export function ArtTrending() {
  const [activeTab, setActiveTab] = useState("Trending");
  const [activeTimeRange, setActiveTimeRange] = useState("24h");

  return (
    <div className="mb-12 bg-card dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 text-sm font-medium ${
                activeTab === tab
                  ? "text-foreground dark:text-white"
                  : "text-muted-foreground hover:text-foreground dark:hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center bg-background dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveTimeRange(range)}
              className={`px-3 py-1 text-xs font-medium ${
                activeTimeRange === range
                  ? "bg-gray-200 dark:bg-gray-700 text-foreground dark:text-white"
                  : "text-muted-foreground hover:text-foreground dark:hover:text-gray-300"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-gray-200 dark:border-gray-800">
              <th className="pb-2 font-medium">#</th>
              <th className="pb-2 font-medium">Collection</th>
              <th className="pb-2 font-medium text-right">Floor Price</th>
              <th className="pb-2 font-medium text-right">Volume</th>
            </tr>
          </thead>
          <tbody>
            {trendingData.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="py-4 pr-4 align-middle text-sm font-medium">{item.position}</td>
                <td className="py-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-foreground dark:text-white flex items-center">
                        {item.name}
                        {item.verified && (
                          <span className="ml-1 text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </h4>
                      {item.creator && <p className="text-xs text-muted-foreground">{item.creator}</p>}
                    </div>
                  </div>
                </td>
                <td className="py-4 text-right align-middle text-sm">{item.price}</td>
                <td className="py-4 text-right align-middle text-sm">{item.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 