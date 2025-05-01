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

  if (!product) {
    return (
      <div className="p-8 text-center">
        <div className="mb-4">Product not found.</div>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <Button variant="outline" className="mb-4" onClick={() => navigate(-1)}>
        Back
      </Button>
      <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
        <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center items-start">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-64 h-64 object-contain rounded shadow bg-white"
            />
          ) : (
            <div className="w-64 h-64 bg-gray-200 rounded flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>
        <div className="flex-1 w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-2 text-neutral-800">{product.name}</h1>
          <div className="text-muted-foreground mb-2 text-lg">{product.subtitle || product.category || (category && category.title)}</div>
          <p className="mb-4 text-base text-neutral-700">{product.description || <span className="italic text-gray-400">No description available.</span>}</p>
          <div className="mb-4">
            <span className="font-medium text-neutral-600">Downloads:</span>
            <div className="mt-2">
              {product.tdsUrl ? (
                <a href={product.tdsUrl} download target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="default" 
                    className="font-bold border-blue-600 text-white bg-blue-600 hover:bg-blue-700"
                  >
                    TDS
                  </Button>
                </a>
              ) : (
                <Button 
                  variant="default" 
                  className="font-bold border-blue-600 text-white bg-blue-400 cursor-not-allowed"
                  disabled
                >
                  TDS
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            {product.msdsUrl && (
              <a href={product.msdsUrl} download target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="font-bold border-neutral-400 text-neutral-800 hover:bg-neutral-100">MSDS</Button>
              </a>
            )}
          </div>
        </div>
      </div>

      {product.applications && product.applications.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-blue-800">Area of Applications :</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {product.applications.map((app, idx) => (
              <div key={idx} className="text-center">
                {app.imageUrl ? (
                  <img src={app.imageUrl} alt={app.title} className="w-32 h-32 object-cover mx-auto rounded" />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400 mx-auto">No Image</div>
                )}
                <div className="font-bold text-blue-900 mt-2">{app.title}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {product.benefits && product.benefits.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Benefits of {product.name} :</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {product.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-green-700">👍</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail; 