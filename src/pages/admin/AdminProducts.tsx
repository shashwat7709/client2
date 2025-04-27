
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, FileText, Trash2, Edit, Upload } from "lucide-react";
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
}

const mockProducts: Product[] = [
  { 
    id: "1", 
    name: "APCONEX ULTRA LW", 
    category: "Admixtures", 
    description: "High-performance lightweight concrete admixture",
    hasTechnicalSheet: true,
    imageCount: 3
  },
  { 
    id: "2", 
    name: "APCONEX ULTRA PLAST EXPERT", 
    category: "Admixtures", 
    description: "Advanced plasticizing admixture for improved workability",
    hasTechnicalSheet: true,
    imageCount: 2
  },
  { 
    id: "3", 
    name: "APCONEX BOND ACR", 
    category: "Bonding Agents", 
    description: "Premium acrylic bonding agent for enhanced adhesion",
    hasTechnicalSheet: false,
    imageCount: 1
  },
  { 
    id: "4", 
    name: "APCONEX BLOCK FIXX", 
    category: "Dry Mix Products", 
    description: "Ready-to-use structural repair mortar",
    hasTechnicalSheet: true,
    imageCount: 4
  },
  { 
    id: "5", 
    name: "APCONEX SEAL PU 40", 
    category: "Joint Sealants", 
    description: "High-grade polyurethane sealant for construction joints",
    hasTechnicalSheet: true,
    imageCount: 2
  },
];

const AdminProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Filter products based on search and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
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
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {productCategories.map((category) => (
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
              <TableHead className="hidden md:table-cell">Assets</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
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
