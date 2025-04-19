
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "admixtures",
    name: "Admixtures",
    description: "Advanced concrete admixtures for enhanced durability and performance",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    products: 6
  },
  {
    id: "bonding-agents",
    name: "Bonding Agents",
    description: "Specialized adhesives for strong, reliable substrate bonding",
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544",
    products: 6
  },
  {
    id: "dry-mix",
    name: "Dry Mix Products",
    description: "Ready-to-use cementitious solutions for various applications",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    products: 4
  },
  {
    id: "joint-sealants",
    name: "Joint Sealants",
    description: "Premium sealants for durable expansion and construction joints",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    products: 3
  },
];

const ProductCategories = () => {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Product Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of construction chemical solutions designed for superior performance in various applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary font-medium">
                    {category.products} Products
                  </span>
                  <Link 
                    to={`/products#${category.id}`}
                    className="flex items-center text-primary hover:text-secondary transition-colors"
                  >
                    View All
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* View All Categories */}
          <Link 
            to="/products" 
            className="flex flex-col justify-center items-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-lg border-2 border-dashed border-secondary/50 hover:border-secondary transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
              <ArrowRight size={24} className="text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-1">Explore More</h3>
            <p className="text-muted-foreground text-center">
              View our complete product range
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
