import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, FileText, Trash2, Edit, Upload, Image as ImageIcon } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AboutUs from "@/pages/admin/AboutUs";
import ContactUs from "@/pages/admin/ContactUs";
import MissionsAndServices from "@/pages/admin/MissionsAndServices";

const productCategories = [
  "Admixtures",
  "Bonding Agents",
  "Dry Mix Products",
  "Joint Sealants",
  "Surface Treatment",
  "Tile Adhesives and Grout",
  "Waterproofing Systems"
];

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  hasTechnicalSheet: boolean;
  imageCount: number;
  images?: string[];
  imageUrl: string;
  tdsUrl: string;
  msdsUrl: string;
  applications: { imageUrl: string; title: string }[];
  benefits: string[];
}

interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  created_at: string;
}

const AdminProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // All products from AdminPages.tsx categories
      const allProducts = [
        // Admixtures
        { id: "apconex-ultra-lw", name: "APCONEX ULTRA LW", category: "Admixtures", description: "Lightweight concrete admixture for improved workability." },
        { id: "apconex-ultra-plast-expert", name: "APCONEX ULTRA PLAST EXPERT", category: "Admixtures", description: "High-range water reducer for concrete." },
        { id: "apconex-ultra-sp110-snf", name: "APCONEX ULTRA SP110 SNF", category: "Admixtures", description: "Superplasticizer for enhanced strength." },
        { id: "apconex-ultra-sp111-pc", name: "APCONEX ULTRA SP111 PC", category: "Admixtures", description: "Polycarboxylate-based admixture." },
        { id: "apconex-ultra-sp220-hipc", name: "APCONEX ULTRA SP220 HIPC", category: "Admixtures", description: "High initial performance concrete admixture." },
        { id: "apconex-ultra-sp330-srv", name: "APCONEX ULTRA SP330 SRV", category: "Admixtures", description: "Specialty admixture for durability." },
        // Bonding Agents
        { id: "apconex-bond-acr", name: "APCONEX BOND ACR", category: "Bonding Agents", description: "" },
        { id: "apconex-bond-sbr-latex-32", name: "APCONEX BOND SBR Latex 32", category: "Bonding Agents", description: "" },
        { id: "apconex-bond-sbr-42", name: "APCONEX BOND SBR 42", category: "Bonding Agents", description: "" },
        { id: "apconex-hack-free", name: "APCONEX HACK FREE", category: "Bonding Agents", description: "" },
        { id: "apconex-plasto-bond", name: "APCONEX PLASTO BOND", category: "Bonding Agents", description: "" },
        { id: "apconex-gypsofix", name: "APCONEX GYPSOFIX", category: "Bonding Agents", description: "" },
        // Dry Mix Products
        { id: "apconex-block-fixx", name: "APCONEX BLOCK FIXX", category: "Dry Mix Products", description: "" },
        { id: "apconex-ready-plast", name: "APCONEX READY PLAST", category: "Dry Mix Products", description: "" },
        { id: "apconex-grout-precision-ii", name: "APCONEX GROUT PRECISION II", category: "Dry Mix Products", description: "" },
        { id: "apconex-repair-pro-micro", name: "APCONEX REPAIR PRO-MICRO", category: "Dry Mix Products", description: "" },
        // Joint Sealants
        { id: "apconex-seal-pu-40", name: "APCONEX SEAL PU 40", category: "Joint Sealants", description: "" },
        { id: "apconex-seal-poly-pg", name: "APCONEX SEAL POLY-PG", category: "Joint Sealants", description: "" },
        { id: "apconex-seal-poly-gg", name: "APCONEX SEAL POLY-GG", category: "Joint Sealants", description: "" },
        // Surface Treatment
        { id: "apconex-crete-cure-cc-white", name: "APCONEX CRETE CURE-CC WHITE", category: "Surface Treatment", description: "" },
        { id: "apconex-mra-eml-extra", name: "APCONEX MRA EML EXTRA", category: "Surface Treatment", description: "" },
        { id: "apconex-mra-al", name: "APCONEX MRA –AL", category: "Surface Treatment", description: "" },
        // Tile Adhesives and Grout
        { id: "apconex-ultra-ft-1001", name: "APCONEX ULTRA FT 1001", category: "Tile Adhesives and Grout", description: "" },
        { id: "apconex-ultra-wt-1002", name: "APCONEX ULTRA WT 1002", category: "Tile Adhesives and Grout", description: "" },
        { id: "apconex-ultra-ut-1003", name: "APCONEX ULTRA UT 1003", category: "Tile Adhesives and Grout", description: "" },
        { id: "apconex-ultra-st-1004", name: "APCONEX ULTRA ST 1004", category: "Tile Adhesives and Grout", description: "" },
        { id: "apconex-ultra-multi-flex-pu", name: "APCONEX ULTRA MULTI FLEX--PU", category: "Tile Adhesives and Grout", description: "" },
        { id: "apconex-ultra-joint-tg", name: "APCONEX ULTRA JOINT-TG", category: "Tile Adhesives and Grout", description: "" },
        { id: "apconex-ultra-grout-ep-2k", name: "APCONEX ULTRA GROUT EP 2K", category: "Tile Adhesives and Grout", description: "" },
        { id: "apconex-ultra-grout-ep-3k", name: "APCONEX ULTRA GROUT EP 3K", category: "Tile Adhesives and Grout", description: "" },
        { id: "apconex-ultra-sparkle", name: "APCONEX ULTRA SPARKLE", category: "Tile Adhesives and Grout", description: "" },
        { id: "apconex-ultra-tile-spacers", name: "APCONEX ULTRA TILE SPACERS", category: "Tile Adhesives and Grout", description: "" },
        { id: "apconex-ultrashine-tc", name: "APCONEX ULTRASHINE TC", category: "Tile Adhesives and Grout", description: "" },
        // Waterproofing Systems
        { id: "apconex-ultra-acrycoat-1k", name: "APCONEX ULTRA ACRYCOAT 1K", category: "Waterproofing Systems", description: "" },
        { id: "apconex-ultra-2k", name: "APCONEX ULTRA 2K", category: "Waterproofing Systems", description: "" },
        { id: "apconex-ulta-flex-200", name: "APCONEX ULTA FLEX 200", category: "Waterproofing Systems", description: "" },
        { id: "apconex-ulta-flex-200-seal-n-cool", name: "APCONEX ULTA FLEX 200 SEAL N COOL", category: "Waterproofing Systems", description: "" },
        { id: "apconex-uttra-pu-400", name: "APCONEX UTTRA PU 400", category: "Waterproofing Systems", description: "" },
        { id: "apconex-ultra-root-protect-900", name: "APCONEX ULTRA ROOT PROTECT 900", category: "Waterproofing Systems", description: "" },
        { id: "apconex-ultra-bitukoat", name: "APCONEX ULTRA BITUKOAT", category: "Waterproofing Systems", description: "" },
      ];
      setProducts(allProducts);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File, productId: string) => {
    try {
      setUploading(true);
      // TODO: Replace with your actual image upload logic
      toast.success("Image uploaded successfully!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string, imageUrl: string) => {
    try {
      // TODO: Replace with your actual image deletion logic
      toast.success("Image deleted successfully!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete image");
      console.error(error);
    }
  };

  const handleTdsUpload = async (file: File, productId: string) => {
    try {
      setUploading(true);
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // Store in localStorage
        const adminCategories = JSON.parse(localStorage.getItem('admin_categories') || '[]');
        for (const cat of adminCategories) {
          for (const prod of cat.products) {
            if (prod.id === productId) {
              prod.tdsUrl = base64String;
            }
          }
        }
        localStorage.setItem('admin_categories', JSON.stringify(adminCategories));
        fetchProducts();
        toast.success("TDS uploaded successfully!");
      };
    } catch (error) {
      toast.error("Failed to upload TDS");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = (id: string) => {
    // In a real app, this would make an API call
    toast.success("Product deleted successfully!");
  };

  const handleEditProduct = (id: string) => {
    // In a real app, this would navigate to an edit form
    toast.info("Product edit functionality would open here.");
  };

  const validCategoryValues = ["all", ...productCategories.filter(category => category && category !== "")];
  const safeSelectedCategory = validCategoryValues.includes(selectedCategory) ? selectedCategory : "all";

  console.log("selectedCategory:", selectedCategory, "validCategoryValues:", validCategoryValues);

  // Add mock subproducts to each product for demonstration
  const getSubproducts = (productId: string) => {
    const subproductsMap: Record<string, string[]> = {
      "1": ["AquaArm IC Mini", "AquaArm IC Pro"],
      "apconex-ultra-lw": ["ULTRA LW 1L", "ULTRA LW 5L"],
      "apconex-bond-acr": ["BOND ACR 500ml", "BOND ACR 1L"],
    };
    return subproductsMap[productId] || [];
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage all product listings and categories.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={safeSelectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {productCategories.filter(category => category && category !== "").map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden md:table-cell">Subproducts</TableHead>
              <TableHead className="hidden md:table-cell">Assets</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                    {product.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                    {getSubproducts(product.id).length > 0 ? getSubproducts(product.id).join(", ") : "—"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center text-sm">
                        <FileText className="h-4 w-4 mr-1 text-blue-500" />
                        {product.hasTechnicalSheet ? "Yes" : "No"}
                      </span>
                      <span className="flex items-center text-sm">
                        <Upload className="h-4 w-4 mr-1 text-green-500" />
                        {product.imageCount}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedProduct(product);
                              setIsImageDialogOpen(true);
                            }}
                          >
                            <ImageIcon className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Manage Images for {product.name}</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              {product.images?.map((imageUrl, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={imageUrl}
                                    alt={`${product.name} - Image ${index + 1}`}
                                    className="w-full h-32 object-cover rounded"
                                  />
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => handleDeleteImage(product.id, imageUrl)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-col gap-2">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleImageUpload(file, product.id);
                                  }
                                }}
                                disabled={uploading}
                              />
                              {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {product.tdsUrl && (
                        <a
                          href={product.tdsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                        >
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Download TDS
                          </Button>
                        </a>
                      )}
                      <label htmlFor={`tds-upload-${product.id}`} className="flex items-center cursor-pointer">
                        <Input
                          id={`tds-upload-${product.id}`}
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleTdsUpload(file, product.id);
                            }
                          }}
                          disabled={uploading}
                        />
                        <Button variant="outline" size="sm" className="ml-2">
                          <Upload className="h-4 w-4 mr-1" /> Upload TDS
                        </Button>
                      </label>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminProducts;
