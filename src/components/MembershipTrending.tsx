import { useState } from "react";

type TrendingItem = {
  id: number;
  position: number;
  name: string;
  artist?: string;
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
    name: "Blur Bar Genesis",
    price: "< 0.01 WETH",
    volume: "10 WETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1639803931666-e66f3da04904?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 2,
    position: 2,
    name: "Azukis",
    price: "2.00 APE",
    volume: "1,144 APE",
    verified: true,
    image: "https://images.unsplash.com/photo-1616161560197-e155722acf81?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 3,
    position: 3,
    name: "FreePunk by Draft",
    price: "< 0.01 ETH",
    volume: "0.20 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1618172193622-ae2d025f2c95?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 4,
    position: 4,
    name: "Genesis ⓧ",
    price: "0.04 ETH",
    volume: "127 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1561130374-86102c565012?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 5,
    position: 5,
    name: "Killa Genesis",
    price: "1.01 ETH",
    volume: "19 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 6,
    position: 6,
    name: "HyFish Club",
    price: "1.57 ETH",
    volume: "8 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 7,
    position: 7,
    name: "Swamp Stars",
    price: "0.22 ETH",
    volume: "4 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1592492152545-9695d3f473f4?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 8,
    position: 8,
    name: "RC Styles",
    price: "0.06 ETH",
    volume: "3 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1633101446616-ef028ddc1b9e?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 9,
    position: 9,
    name: "DogCoaster",
    price: "0.12 ETH",
    volume: "3 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1626635133221-cc7f0bce36c9?auto=format&fit=crop&w=60&q=80",
  },
  {
    id: 10,
    position: 10,
    name: "PROOF Collective",
    price: "0.37 ETH",
    volume: "2 ETH",
    verified: true,
    image: "https://images.unsplash.com/photo-1573152958734-1922c188fba3?auto=format&fit=crop&w=60&q=80",
  }
];

const tabs = ["Trending", "Top"];
const timeRanges = ["1h", "6h", "24h", "7d", "All chains"];

export function MembershipTrending() {
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
                      {item.artist && <p className="text-xs text-muted-foreground">{item.artist}</p>}
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