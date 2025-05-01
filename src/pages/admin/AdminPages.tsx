import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileEdit, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link as RouterLink } from "react-router-dom";

const AdminPages = () => {
  const [currentTab, setCurrentTab] = useState("home");

  // Hero banner images state (start empty)
  const [heroImages, setHeroImages] = useState<any[]>([]);
  // For previewing selected image before adding
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  // Add image handler (file input for local upload)
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
      fileInputRef.current.click();
    }
  };

  // Validate and preview image before adding
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setPendingFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Confirm adding the previewed image
  const handleConfirmAdd = () => {
    if (previewImage) {
      const newImage = { url: previewImage, alt: `Hero banner ${heroImages.length + 1}` };
      setHeroImages((prev) => [...prev, newImage]);
      // Save to localStorage
      localStorage.setItem('hero_images', JSON.stringify([...heroImages, newImage]));
      setPreviewImage(null);
      setPendingFile(null);
      toast.success("Image added successfully!");
    }
  };

  // Cancel preview
  const handleCancelPreview = () => {
    setPreviewImage(null);
    setPendingFile(null);
  };

  // Delete image handler
  const handleDeleteImage = (index: number) => {
    setHeroImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      // Update localStorage
      localStorage.setItem('hero_images', JSON.stringify(newImages));
      return newImages;
    });
    toast.success("Image deleted successfully!");
  };

  // Mock save function
  const handleSave = () => {
    toast.success("Page content saved successfully!");
  };

  // Product categories with subcategories/products and images
  const [categories, setCategories] = useState([
    {
      id: "admixtures",
      name: "Admixtures",
      description: "High-performance admixtures designed to enhance concrete properties, including workability, strength, and durability. Our range includes plasticizers, superplasticizers, and specialty admixtures for various concrete applications.",
      products: [
        { id: "apconex-ultra-lw", name: "APCONEX ULTRA LW", description: "Lightweight concrete admixture for improved workability.", images: [] },
        { id: "apconex-ultra-plast-expert", name: "APCONEX ULTRA PLAST EXPERT", description: "High-range water reducer for concrete.", images: [] },
        { id: "apconex-ultra-sp110-snf", name: "APCONEX ULTRA SP110 SNF", description: "Superplasticizer for enhanced strength.", images: [] },
        { id: "apconex-ultra-sp111-pc", name: "APCONEX ULTRA SP111 PC", description: "Polycarboxylate-based admixture.", images: [] },
        { id: "apconex-ultra-sp220-hipc", name: "APCONEX ULTRA SP220 HIPC", description: "High initial performance concrete admixture.", images: [] },
        { id: "apconex-ultra-sp330-srv", name: "APCONEX ULTRA SP330 SRV", description: "Specialty admixture for durability.", images: [] },
      ]
    },
    {
      id: "bonding-agents",
      name: "Bonding Agents",
      description: "Specialized adhesives that ensure strong bonds between old and new concrete, or between different construction materials. Our bonding agents provide excellent adhesion and durability in various applications.",
      products: [
        { id: "apconex-bond-acr", name: "APCONEX BOND ACR", images: [] },
        { id: "apconex-bond-sbr-latex-32", name: "APCONEX BOND SBR Latex 32", images: [] },
        { id: "apconex-bond-sbr-42", name: "APCONEX BOND SBR 42", images: [] },
        { id: "apconex-hack-free", name: "APCONEX HACK FREE", images: [] },
        { id: "apconex-plasto-bond", name: "APCONEX PLASTO BOND", images: [] },
        { id: "apconex-gypsofix", name: "APCONEX GYPSOFIX", images: [] },
      ]
    },
    {
      id: "dry-mix",
      name: "Dry Mix Products",
      description: "Pre-mixed cementitious products ready for on-site use after adding water. These include precision grouts, repair mortars, and specialized fixing compounds for various construction applications.",
      products: [
        { id: "apconex-block-fixx", name: "APCONEX BLOCK FIXX", images: [] },
        { id: "apconex-ready-plast", name: "APCONEX READY PLAST", images: [] },
        { id: "apconex-grout-precision-ii", name: "APCONEX GROUT PRECISION II", images: [] },
        { id: "apconex-repair-pro-micro", name: "APCONEX REPAIR PRO-MICRO", images: [] },
      ]
    },
    {
      id: "joint-sealants",
      name: "Joint Sealants",
      description: "High-performance sealants for sealing joints in buildings and civil engineering structures. Our range offers excellent adhesion, movement capability, and durability under various environmental conditions.",
      products: [
        { id: "apconex-seal-pu-40", name: "APCONEX SEAL PU 40", images: [] },
        { id: "apconex-seal-poly-pg", name: "APCONEX SEAL POLY-PG", images: [] },
        { id: "apconex-seal-poly-gg", name: "APCONEX SEAL POLY-GG", images: [] },
      ]
    },
    {
      id: "surface-treatment",
      name: "Surface Treatment",
      description: "Specialized products for concrete surface treatment, including curing compounds and release agents. These products help protect concrete surfaces and enhance their appearance and durability.",
      products: [
        { id: "apconex-crete-cure-cc-white", name: "APCONEX CRETE CURE-CC WHITE", images: [] },
        { id: "apconex-mra-eml-extra", name: "APCONEX MRA EML EXTRA", images: [] },
        { id: "apconex-mra-al", name: "APCONEX MRA –AL", images: [] },
      ]
    },
    {
      id: "tile-adhesives",
      name: "Tile Adhesives and Grout",
      description: "Premium-quality tile adhesives and grouts for secure, long-lasting tile installations. Our range caters to various tile types and installation environments, from standard residential to challenging industrial applications.",
      products: [
        { id: "apconex-ultra-ft-1001", name: "APCONEX ULTRA FT 1001", images: [] },
        { id: "apconex-ultra-wt-1002", name: "APCONEX ULTRA WT 1002", images: [] },
        { id: "apconex-ultra-ut-1003", name: "APCONEX ULTRA UT 1003", images: [] },
        { id: "apconex-ultra-st-1004", name: "APCONEX ULTRA ST 1004", images: [] },
        { id: "apconex-ultra-multi-flex-pu", name: "APCONEX ULTRA MULTI FLEX--PU", images: [] },
        { id: "apconex-ultra-joint-tg", name: "APCONEX ULTRA JOINT-TG", images: [] },
        { id: "apconex-ultra-grout-ep-2k", name: "APCONEX ULTRA GROUT EP 2K", images: [] },
        { id: "apconex-ultra-grout-ep-3k", name: "APCONEX ULTRA GROUT EP 3K", images: [] },
        { id: "apconex-ultra-sparkle", name: "APCONEX ULTRA SPARKLE", images: [] },
        { id: "apconex-ultra-tile-spacers", name: "APCONEX ULTRA TILE SPACERS", images: [] },
        { id: "apconex-ultrashine-tc", name: "APCONEX ULTRASHINE TC", images: [] },
      ]
    },
    {
      id: "waterproofing",
      name: "Waterproofing Systems",
      description: "Comprehensive waterproofing solutions for roofs, basements, foundations, and other structures. Our systems provide reliable protection against water ingress, extending the lifespan of buildings and infrastructure.",
      products: [
        { id: "apconex-ultra-acrycoat-1k", name: "APCONEX ULTRA ACRYCOAT 1K", images: [] },
        { id: "apconex-ultra-2k", name: "APCONEX ULTRA 2K", images: [] },
        { id: "apconex-ulta-flex-200", name: "APCONEX ULTA FLEX 200", images: [] },
        { id: "apconex-ulta-flex-200-seal-n-cool", name: "APCONEX ULTA FLEX 200 SEAL N COOL", images: [] },
        { id: "apconex-uttra-pu-400", name: "APCONEX UTTRA PU 400", images: [] },
        { id: "apconex-ultra-root-protect-900", name: "APCONEX ULTRA ROOT PROTECT 900", images: [] },
        { id: "apconex-ultra-bitukoat", name: "APCONEX ULTRA BITUKOAT", images: [] },
      ]
    },
  ]);

  // File input refs for each product
  const productFileInputRefs = React.useRef({});

  // Handle image upload for a product
  const handleProductImageChange = (catIdx, prodIdx, e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategories(prev => prev.map((cat, i) =>
          i === catIdx
            ? {
                ...cat,
                products: cat.products.map((prod, j) =>
                  j === prodIdx
                    ? { ...prod, images: [...prod.images, reader.result] }
                    : prod
                )
              }
            : cat
        ));
        // Save to localStorage for public page
        const prod = categories[catIdx].products[prodIdx];
        const key = `public_product_images_${prod.id}`;
        const prevImages = JSON.parse(localStorage.getItem(key) || "[]");
        localStorage.setItem(key, JSON.stringify([...prevImages, reader.result]));
        toast.success("Image added to product!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Delete an image from a product
  const handleDeleteProductImage = (catIdx, prodIdx, imgIdx) => {
    setCategories(prev => prev.map((cat, i) =>
      i === catIdx
        ? {
            ...cat,
            products: cat.products.map((prod, j) =>
              j === prodIdx
                ? { ...prod, images: prod.images.filter((_, k) => k !== imgIdx) }
                : prod
            )
          }
        : cat
    ));
  };

  // Persist categories to localStorage on change
  React.useEffect(() => {
    localStorage.setItem("admin_categories", JSON.stringify(categories));
  }, [categories]);

  // Featured Projects images state
  const [featuredImages, setFeaturedImages] = useState<any[]>([]);
  const [previewFeaturedImage, setPreviewFeaturedImage] = useState<string | null>(null);
  const [pendingFeaturedFile, setPendingFeaturedFile] = useState<File | null>(null);
  const featuredFileInputRef = React.useRef<HTMLInputElement>(null);

  // Load featured images from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('featured_project_images');
    if (saved) setFeaturedImages(JSON.parse(saved));
  }, []);

  // Add featured image handler
  const handleAddFeaturedImage = () => {
    if (featuredFileInputRef.current) {
      featuredFileInputRef.current.value = "";
      featuredFileInputRef.current.click();
    }
  };

  // Validate and preview featured image before adding
  const handleFeaturedFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFeaturedImage(reader.result as string);
        setPendingFeaturedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Confirm adding the previewed featured image
  const handleConfirmAddFeatured = () => {
    if (previewFeaturedImage) {
      const newImage = { url: previewFeaturedImage, alt: `Featured project ${featuredImages.length + 1}` };
      const updated = [...featuredImages, newImage];
      setFeaturedImages(updated);
      localStorage.setItem('featured_project_images', JSON.stringify(updated));
      setPreviewFeaturedImage(null);
      setPendingFeaturedFile(null);
      toast.success("Featured project image added successfully!");
    }
  };

  // Cancel preview for featured image
  const handleCancelPreviewFeatured = () => {
    setPreviewFeaturedImage(null);
    setPendingFeaturedFile(null);
  };

  // Delete featured image handler
  const handleDeleteFeaturedImage = (index: number) => {
    setFeaturedImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      localStorage.setItem('featured_project_images', JSON.stringify(newImages));
      return newImages;
    });
    toast.success("Featured project image deleted successfully!");
  };

  // Featured Projects background image state
  const [featuredBg, setFeaturedBg] = useState<string | null>(null);
  const [previewFeaturedBg, setPreviewFeaturedBg] = useState<string | null>(null);
  const [pendingFeaturedBgFile, setPendingFeaturedBgFile] = useState<File | null>(null);
  const featuredBgFileInputRef = React.useRef<HTMLInputElement>(null);

  // Load featured bg from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('featured_project_bg');
    if (saved) setFeaturedBg(saved);
  }, []);

  // Add featured bg handler
  const handleAddFeaturedBg = () => {
    if (featuredBgFileInputRef.current) {
      featuredBgFileInputRef.current.value = "";
      featuredBgFileInputRef.current.click();
    }
  };

  // Validate and preview featured bg before adding
  const handleFeaturedBgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFeaturedBg(reader.result as string);
        setPendingFeaturedBgFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Confirm adding the previewed featured bg
  const handleConfirmAddFeaturedBg = () => {
    if (previewFeaturedBg) {
      setFeaturedBg(previewFeaturedBg);
      localStorage.setItem('featured_project_bg', previewFeaturedBg);
      setPreviewFeaturedBg(null);
      setPendingFeaturedBgFile(null);
      toast.success("Featured project background image set successfully!");
    }
  };

  // Cancel preview for featured bg
  const handleCancelPreviewFeaturedBg = () => {
    setPreviewFeaturedBg(null);
    setPendingFeaturedBgFile(null);
  };

  // Delete featured bg handler
  const handleDeleteFeaturedBg = () => {
    setFeaturedBg(null);
    localStorage.removeItem('featured_project_bg');
    toast.success("Featured project background image removed!");
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Page Management</h1>
          <p className="text-muted-foreground">
            Update content for the main pages of your website.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Page
        </Button>
      </div>

      <Tabs defaultValue="home" onValueChange={setCurrentTab} value={currentTab}>
        <TabsList className="mb-8 w-full overflow-x-auto flex-nowrap">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="about">About Us</TabsTrigger>
          <TabsTrigger value="mission">Mission & Vision</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="featured">Featured Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="home">
          <Card>
            <CardHeader>
              <CardTitle>Home Page</CardTitle>
              <CardDescription>
                Edit the main landing page content and hero section.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Hero Banner Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {heroImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                        <img 
                          src={img.url}
                          alt={img.alt}
                          className="w-full h-full object-cover transition-opacity"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                        <Button variant="secondary" size="sm">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteImage(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800 rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center p-4">
                    <Button variant="outline" size="sm" onClick={handleAddImage}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                {/* Preview modal for image before adding */}
                {previewImage && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                      <img src={previewImage} alt="Preview" className="max-w-xs max-h-60 mb-4 rounded" />
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancelPreview}>Cancel</Button>
                        <Button onClick={handleConfirmAdd}>Add</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Hero Content</h3>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="hero-title" className="text-sm font-medium">
                      Hero Title
                    </label>
                    <input
                      id="hero-title"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="High-Performance Construction Chemical Solutions"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="hero-subtitle" className="text-sm font-medium">
                      Hero Subtitle
                    </label>
                    <textarea
                      id="hero-subtitle"
                      rows={3}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="Saint Woven Saver delivers industry-leading construction chemicals that enhance durability, strength, and performance for your projects."
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Highlight Sections</h3>
                {/* This would be a more complex component in a real app */}
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    [Highlight section editor would go here]
                  </p>
                </div>
              </div>

              {/* Product Summary Cards (like image 2) */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category =>
                  category.products.map(product => (
                    <RouterLink
                      key={product.id}
                      to={`/admin/pages/products/${product.id}`}
                      state={{ categories }}
                      className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
                    >
                      {product.images[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-24 h-24 object-cover rounded mb-2" />
                      ) : (
                        <div className="w-24 h-24 bg-gray-200 rounded mb-2 flex items-center justify-center text-gray-400">No Image</div>
                      )}
                      <div className="font-semibold text-center mb-1">{product.name}</div>
                      <div className="text-sm text-muted-foreground text-center mb-2">{product.description}</div>
                    </RouterLink>
                  ))
                )}
              </div>

              {/* Products Section (Accordion) */}
              <div>
                <h3 className="text-lg font-medium mb-4">Products</h3>
                <Accordion type="multiple" className="mb-6">
                  {categories.map((category, catIdx) => (
                    <AccordionItem value={category.id} key={category.id}>
                      <AccordionTrigger>
                        <div>
                          <div className="font-semibold text-xl">{category.name}</div>
                          <div className="text-muted-foreground text-sm">{category.products.length} Products</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="mb-4 text-muted-foreground">{category.description}</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {category.products.map((product, prodIdx) => (
                            <div key={product.id} className="border rounded-lg p-4 bg-gray-50 flex flex-col">
                              <RouterLink
                                to={`/admin/pages/products/${product.id}`}
                                state={{ categories }}
                                className="font-medium mb-2 hover:underline block"
                              >
                                {product.name}
                              </RouterLink>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {product.images.map((img, imgIdx) => (
                                  <div key={imgIdx} className="relative inline-block">
                                    <img src={img} alt="Product" className="w-16 h-16 object-cover rounded" />
                                    <button
                                      type="button"
                                      className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-red-100"
                                      onClick={() => handleDeleteProductImage(catIdx, prodIdx, imgIdx)}
                                    >
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => productFileInputRefs.current[`${catIdx}-${prodIdx}`]?.click()}
                              >
                                <Plus className="h-4 w-4 mr-2" /> Add Image
                              </Button>
                              <input
                                type="file"
                                accept="image/*"
                                ref={el => (productFileInputRefs.current[`${catIdx}-${prodIdx}`] = el)}
                                style={{ display: "none" }}
                                onChange={e => handleProductImageChange(catIdx, prodIdx, e)}
                              />
                              <div className="flex gap-2 mt-2">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    // Delete all images for this product
                                    setCategories(prev => prev.map((cat, i) =>
                                      i === catIdx
                                        ? {
                                            ...cat,
                                            products: cat.products.map((prod, j) =>
                                              j === prodIdx ? { ...prod, images: [] } : prod
                                            )
                                          }
                                        : cat
                                    ));
                                    // Remove from localStorage for public page
                                    const prod = categories[catIdx].products[prodIdx];
                                    if (prod) {
                                      localStorage.removeItem(`public_product_images_${prod.id}`);
                                    }
                                  }}
                                >
                                  Delete All Images
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    // Delete description for this product
                                    setCategories(prev => prev.map((cat, i) =>
                                      i === catIdx
                                        ? {
                                            ...cat,
                                            products: cat.products.map((prod, j) =>
                                              j === prodIdx ? { ...prod, description: "" } : prod
                                            )
                                          }
                                        : cat
                                    ));
                                    // Remove from localStorage for public page
                                    const prod = categories[catIdx].products[prodIdx];
                                    if (prod) {
                                      localStorage.removeItem(`public_product_description_${prod.id}`);
                                    }
                                  }}
                                >
                                  Delete Description
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Us Page</CardTitle>
              <CardDescription>
                Edit company information and team details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Content editor for About Us page would appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mission">
          <Card>
            <CardHeader>
              <CardTitle>Mission & Vision Page</CardTitle>
              <CardDescription>
                Edit your company's mission and vision statements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Content editor for Mission & Vision page would appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Page</CardTitle>
              <CardDescription>
                Update contact information and form settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Content editor for Contact page would appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="featured">
          <Card>
            <CardHeader>
              <CardTitle>Featured Projects Images</CardTitle>
              <CardDescription>
                Upload and manage images for the Featured Projects section on the main website.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Featured Project Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {featuredImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                        <img 
                          src={img.url}
                          alt={img.alt}
                          className="w-full h-full object-cover transition-opacity"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteFeaturedImage(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800 rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center p-4">
                    <Button variant="outline" size="sm" onClick={handleAddFeaturedImage}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={featuredFileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFeaturedFileChange}
                    />
                  </div>
                </div>
                {/* Preview modal for image before adding */}
                {previewFeaturedImage && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                      <img src={previewFeaturedImage} alt="Preview" className="max-w-xs max-h-60 mb-4 rounded" />
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancelPreviewFeatured}>Cancel</Button>
                        <Button onClick={handleConfirmAddFeatured}>Add</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Background Image</h3>
                {featuredBg ? (
                  <div className="relative group w-full max-w-md">
                    <img src={featuredBg} alt="Featured Projects Background" className="rounded-lg shadow w-full object-cover" />
                    <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={handleDeleteFeaturedBg}>
                      <Trash2 className="h-4 w-4" /> Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                    <Button variant="outline" size="sm" onClick={handleAddFeaturedBg}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Background Image
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={featuredBgFileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFeaturedBgFileChange}
                    />
                  </div>
                )}
                {/* Preview modal for bg image before adding */}
                {previewFeaturedBg && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                      <img src={previewFeaturedBg} alt="Preview" className="max-w-xs max-h-60 mb-4 rounded" />
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancelPreviewFeaturedBg}>Cancel</Button>
                        <Button onClick={handleConfirmAddFeaturedBg}>Add</Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPages;
