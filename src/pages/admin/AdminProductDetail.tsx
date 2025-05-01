import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminProductDetail = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Try to get categories from location.state or localStorage
  let categories = location.state?.categories;
  if (!categories) {
    try {
      categories = JSON.parse(localStorage.getItem("admin_categories") || "[]");
    } catch {
      categories = [];
    }
  }

  // Loading state if categories are not yet loaded
  if (!categories) {
    return (
      <div className="p-8 text-center">
        <div className="mb-4">Loading product details...</div>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>
    );
  }

  let product = null;
  let category = null;
  for (const cat of categories) {
    if (cat.products && Array.isArray(cat.products)) {
      const found = cat.products.find((p) => p.id === productId);
      if (found) {
        product = found;
        category = cat;
        break;
      }
    }
  }

  if (!product) {
    return (
      <div className="p-8 text-center">
        <div className="mb-4">Product not found. Please return to the previous page.</div>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <Button variant="outline" className="mb-4" onClick={() => navigate(-1)}>
        Back
      </Button>
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <div className="text-muted-foreground mb-4">Category: {category?.name}</div>
      {product.images && product.images.length > 0 ? (
        <div className="flex flex-wrap gap-4 mb-4">
          {product.images.map((img, idx) => (
            <img key={idx} src={img} alt={product.name} className="w-32 h-32 object-cover rounded" />
          ))}
        </div>
      ) : (
        <div className="w-32 h-32 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">No Image</div>
      )}
      <div className="text-base mb-2">{product.description}</div>
    </div>
  );
};

export default AdminProductDetail; 