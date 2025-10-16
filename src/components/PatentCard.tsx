import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Calendar, User } from "lucide-react";

type PatentStatus = "Verified" | "Pending" | "Under Review" | "Rejected";

interface Patent {
  id: number;
  title: string;
  description: string;
  owner: string;
  createdAt: string;
  status: PatentStatus;
  category: string;
  image: string;
}

interface PatentCardProps {
  patent: Patent;
}

export function PatentCard({ patent }: PatentCardProps) {
  const getStatusColor = (status: PatentStatus) => {
    switch (status) {
      case "Verified":
        return "bg-green-500 hover:bg-green-600";
      case "Pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Under Review":
        return "bg-blue-500 hover:bg-blue-600";
      case "Rejected":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="h-48 relative">
        <img
          src={patent.image}
          alt={patent.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge 
          className={`absolute top-3 right-3 ${getStatusColor(patent.status)} text-white`}
        >
          {patent.status}
        </Badge>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{patent.title}</h3>
          <p className="text-gray-600 text-sm">{patent.description}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-2" />
            <span>{patent.owner}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Filed: {formatDate(patent.createdAt)}</span>
          </div>
          <div className="flex items-center text-sm">
            <Shield className="h-4 w-4 mr-2 text-bharat-teal" />
            <Badge variant="outline" className="bg-gray-50">
              {patent.category}
            </Badge>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
