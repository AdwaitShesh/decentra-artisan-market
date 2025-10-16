import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-inter">
      <Navbar />
      <main className="pt-24 pb-16 px-4 flex flex-col items-center justify-center text-center">
        <div className="container mx-auto max-w-lg">
          <h1 className="text-8xl font-bold text-bharat-purple dark:text-bharat-teal mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-4 dark:text-white">Page Not Found</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/">
              <Home className="h-5 w-5" /> Return Home
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
