import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHeroImages } from "@/lib/supabaseImages";

const Hero = () => {
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the first hero image from Supabase
    const loadImage = async () => {
      try {
        const images = await fetchHeroImages();
        const url = images[0]?.url || null;
        if (url && !url.includes('/public/')) {
          console.warn('Hero image URL is missing /public/:', url);
        }
        setMainImage(url);
      } catch {
        setMainImage(null);
      }
    };
    loadImage();
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-primary to-primary/90 text-white">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-white/10 rounded-tl-full" />
        <div className="absolute left-0 top-0 w-1/3 h-1/3 bg-white/10 rounded-br-full" />
        <div className="absolute right-1/4 top-1/4 w-16 h-16 bg-white/10 rounded-full" />
        <div className="absolute left-1/3 bottom-1/4 w-24 h-24 bg-white/10 rounded-full" />
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              High-Performance Construction Chemical Solutions
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Saint Woven Saver delivers industry-leading construction chemicals that enhance durability, strength, and performance for your projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products" 
                className="inline-flex items-center justify-center bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Explore Products
                <ChevronRight size={18} className="ml-2" />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-full h-full bg-accent/20 rounded-lg transform rotate-3"></div>
              {mainImage ? (
                <img 
                  src={mainImage} 
                  alt="Hero banner" 
                  className="rounded-lg shadow-xl relative z-10 w-full h-auto object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg shadow-xl relative z-10 flex items-center justify-center text-gray-400">
                  No hero image available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Highlight boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">Quality Assurance</h3>
            <p className="text-white/80">All products undergo rigorous testing to meet international standards.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">Technical Support</h3>
            <p className="text-white/80">Expert consultation and support throughout your project lifecycle.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">Sustainable Solutions</h3>
            <p className="text-white/80">Environmentally conscious products for modern construction needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
