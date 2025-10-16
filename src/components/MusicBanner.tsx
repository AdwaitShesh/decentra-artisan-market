import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MusicBanner() {
  return (
    <div className="mb-8 relative overflow-hidden rounded-2xl">
      {/* Background with patterns */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-black">
          {/* Circular pattern overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="circleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0099ff" />
                <stop offset="100%" stopColor="#6a11cb" />
              </linearGradient>
              <linearGradient id="circleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
            {/* Center pattern */}
            <g transform="translate(500, 200)">
              {[...Array(15)].map((_, i) => (
                <circle
                  key={i}
                  cx="0"
                  cy="0"
                  r={15 + i * 15}
                  fill="none"
                  stroke={i % 2 === 0 ? "url(#circleGradient1)" : "url(#circleGradient2)"}
                  strokeWidth="1"
                />
              ))}
            </g>
            {/* Left pattern */}
            <g transform="translate(150, 200)">
              {[...Array(12)].map((_, i) => (
                <circle
                  key={i}
                  cx="0"
                  cy="0"
                  r={10 + i * 12}
                  fill="none"
                  stroke="url(#circleGradient1)"
                  strokeWidth="1"
                />
              ))}
            </g>
            {/* Right pattern */}
            <g transform="translate(850, 200)">
              {[...Array(12)].map((_, i) => (
                <circle
                  key={i}
                  cx="0"
                  cy="0"
                  r={10 + i * 12}
                  fill="none"
                  stroke="url(#circleGradient2)"
                  strokeWidth="1"
                />
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800">
              <img 
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=120&q=80" 
                alt="Music NFTs" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              Audioglyphs
              <CheckCircle className="h-5 w-5 text-blue-400" fill="#60a5fa" />
            </h1>
          </div>
          <p className="mt-2 text-gray-300 text-sm">by Dr388</p>
          <p className="mt-4 text-gray-300 text-sm">5,989 items · CLOSED ETH</p>
        </div>
        <Button 
          className="bg-white text-black hover:bg-gray-200 transition"
        >
          View collection
        </Button>
      </div>
    </div>
  );
} 