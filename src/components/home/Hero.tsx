import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const Hero = () => {
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Fetch all hero images from Supabase
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("hero_images")
        .select("url")
        .order("created_at", { ascending: false });
      if (data) {
        setImages(data.map((img: any) => img.url));
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const mainImage = images[current] || null;

  return (
    <div
      className="relative bg-gradient-to-br from-primary to-primary/90 text-white"
      style={mainImage ? {
        backgroundImage: `url(${mainImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.5s ease-in-out',
      } : {}}
    >
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
        </div>
      </div>
    </div>
  );
};

export default Hero;
