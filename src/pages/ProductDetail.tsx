import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productCategories } from "./Products";
import { Button } from "@/components/ui/button";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  let product = null;
  let category = null;
  for (const cat of productCategories) {
    const found = cat.products.find((p) => p.id === productId);
    if (found) {
      product = found;
      category = cat;
      break;
    }
  }

  let images = [];
  try {
    images = JSON.parse(localStorage.getItem(`public_product_images_${product.id}`) || "[]");
  } catch {
    images = [];
  }

  if (!product) {
    return (
      <div className="p-8 text-center">
        <div className="mb-4">Product not found.</div>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Button variant="outline" className="mb-4" onClick={() => navigate(-1)}>
        Back
      </Button>
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <div className="text-muted-foreground mb-4">Category: {category?.title}</div>
      <div className="flex flex-col md:flex-row md:items-start md:gap-8 mb-8">
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt={product.name}
            className="w-full max-w-md h-auto rounded mb-4 md:mb-0"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="w-full max-w-md h-64 bg-gray-200 rounded mb-4 md:mb-0 flex items-center justify-center text-gray-400">No Image</div>
        )}
        <div className="flex-1 text-lg text-gray-700">
          {/* Description from admin, if available */}
          {(() => {
            let desc = "";
            try {
              desc = localStorage.getItem(`public_product_description_${product.id}`) || "";
            } catch {}
            return desc ? <div>{desc}</div> : <div className="italic text-gray-400">No description available.</div>;
          })()}
        </div>
      </div>
      {/* Show all images below if more than one */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-4 mt-8">
          {images.slice(1).map((img, idx) => (
            <img key={idx} src={img} alt={product.name} className="w-40 h-40 object-cover rounded" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetail; 