import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const projects = [
  {
    title: "Dubai Sky Tower",
    category: "Commercial Construction",
    description: "Supplied high-performance concrete admixtures for this iconic 70-story skyscraper",
    products: ["APCONEX ULTRA SP220 HIPC", "APCONEX ULTRA ACRYCOAT 1K"]
  },
  {
    title: "Coastal Highway Project",
    category: "Infrastructure",
    description: "Provided durable waterproofing solutions for this major coastal infrastructure development",
    products: ["APCONEX ULTRA FLEX 200", "APCONEX ULTRA 2K"]
  },
  {
    title: "Azure Residential Complex",
    category: "Residential Construction",
    description: "Complete suite of tile adhesives and waterproofing solutions for 500+ luxury apartments",
    products: ["APCONEX ULTRA FT 1001", "APCONEX ULTRA JOINT-TG"]
  }
];

const NUM_CATEGORIES = 4; // This should match the number of categories in ProductCategories

const FeaturedProjects = () => {
  const [featuredImages, setFeaturedImages] = useState<any[]>([]);
  const [featuredBg, setFeaturedBg] = useState<string | null>(null);

  useEffect(() => {
    const savedImages = localStorage.getItem('featured_project_images');
    if (savedImages) {
      setFeaturedImages(JSON.parse(savedImages));
    }
    const savedBg = localStorage.getItem('featured_project_bg');
    if (savedBg) setFeaturedBg(savedBg);
  }, []);

  // Use all featured images directly
  const projectImages = featuredImages;

  return (
    <section
      className={featuredBg ? 'py-16 md:py-24 relative' : 'py-16 md:py-24 bg-gradient-to-br from-white to-muted'}
      style={featuredBg ? { backgroundImage: `url(${featuredBg})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className={featuredBg ? 'absolute inset-0 bg-black/30 pointer-events-none' : ''} style={{ zIndex: 0 }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-white drop-shadow" style={featuredBg ? { color: 'white', textShadow: '0 2px 8px #000' } : {}}>Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl" style={featuredBg ? { color: 'white', textShadow: '0 2px 8px #000' } : {}}>
              Our products have contributed to the success of these landmark construction projects
            </p>
          </div>
          <Link
            to="/about"
            className={featuredBg ? 'inline-flex items-center mt-4 md:mt-0 text-white hover:text-secondary/80 font-medium transition-colors' : 'inline-flex items-center mt-4 md:mt-0 text-secondary hover:text-secondary/80 font-medium transition-colors'}
          >
            View Our Portfolio
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 overflow-hidden">
                {projectImages[index] ? (
                  <img
                    src={projectImages[index].url}
                    alt={projectImages[index].alt || project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="text-xs font-medium text-secondary uppercase tracking-wider mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="border-t border-border pt-4">
                  <h4 className="text-sm font-semibold mb-2">Products Used:</h4>
                  <ul className="space-y-1">
                    {project.products.map((product, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1 h-1 bg-secondary rounded-full mr-2"></div>
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
