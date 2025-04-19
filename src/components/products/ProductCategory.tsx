
import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCategoryProps {
  id: string;
  title: string;
  description: string;
  products: {
    id: string;
    name: string;
  }[];
  isOpen?: boolean;
}

const ProductCategory = ({ id, title, description, products, isOpen = false }: ProductCategoryProps) => {
  const [expanded, setExpanded] = useState(isOpen);

  return (
    <div id={id} className="scroll-mt-24">
      <div className="border border-border rounded-lg overflow-hidden">
        <div 
          className="flex justify-between items-center p-6 bg-muted cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-muted-foreground mt-1">{products.length} Products</p>
          </div>
          <div className="flex items-center">
            <span className="bg-white/50 p-2 rounded-full">
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </div>
        </div>

        {expanded && (
          <div className="p-6">
            <p className="text-muted-foreground mb-6">{description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="flex items-center p-4 border border-border rounded-md hover:bg-muted transition-colors group"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:bg-secondary transition-colors"></div>
                  <span className="flex-grow">{product.name}</span>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:text-secondary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategory;
