import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileEdit, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link as RouterLink } from "react-router-dom";
import { uploadHeroImage, fetchHeroImages, deleteHeroImage } from "@/lib/supabaseImages";

const AdminPages = () => {
  const [currentTab, setCurrentTab] = useState("home");

  // Hero banner images state (start empty)
  const [heroImages, setHeroImages] = useState<any[]>([]);
  // For previewing selected image before adding
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add image handler (file input for local upload)
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Fetch hero images from Supabase on mount
  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const images = await fetchHeroImages();
        setHeroImages(images);
      } catch (err: any) {
        setError("Failed to load images");
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

  const MAX_HERO_IMAGES = 11;

  // Confirm adding the previewed image (upload to Supabase)
  const handleConfirmAdd = async () => {
    if (pendingFile) {
      if (heroImages.length >= MAX_HERO_IMAGES) {
        toast.error(`Maximum image limit of ${MAX_HERO_IMAGES} reached. Please remove an image before adding a new one.`);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        await uploadHeroImage(pendingFile, `Hero banner ${heroImages.length + 1}`);
        toast.success("Image added successfully!");
        // Reload images
        const images = await fetchHeroImages();
        setHeroImages(images);
        setPreviewImage(null);
        setPendingFile(null);
      } catch (err: any) {
        setError("Failed to upload image");
        toast.error("Failed to upload image");
      } finally {
        setLoading(false);
      }
    }
  };

  // Cancel preview
  const handleCancelPreview = () => {
    setPreviewImage(null);
    setPendingFile(null);
  };

  // Delete image handler (Supabase)
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const handleDeleteImage = async (index: number) => {
    setDeleteError(null);
    const img = heroImages[index];
    // Optimistically remove from UI
    const newImages = heroImages.filter((image) => image.id !== img.id);
    setHeroImages(newImages);
    setDeletingId(img.id);

    try {
      await deleteHeroImage(img.id, img.url);
      toast.success("Image deleted successfully!");
    } catch (err) {
      // Restore the image if deletion fails
      setHeroImages((prev) => [
        ...prev.slice(0, index),
        img,
        ...prev.slice(index),
      ]);
      setDeleteError("Failed to delete image");
      toast.error("Failed to delete image");
    } finally {
      setDeletingId(null);
    }
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
    try {
      localStorage.setItem("admin_categories", JSON.stringify(categories));
    } catch (error) {
      console.warn("Failed to save categories to localStorage:", error);
      // Clear some space if needed
      try {
        localStorage.removeItem("admin_categories");
        localStorage.setItem("admin_categories", JSON.stringify(categories));
      } catch (e) {
        console.error("Failed to clear and save categories:", e);
      }
    }
  }, [categories]);

  // Add state for About Us company text
  const [aboutUsCompanyText, setAboutUsCompanyText] = useState(() => {
    return localStorage.getItem('about_us_company_text') || '';
  });

  const handleSaveAboutUsCompanyText = () => {
    localStorage.setItem('about_us_company_text', aboutUsCompanyText);
    toast.success('About Us company description saved!');
  };

  // Add state for Mission and Vision text
  const [missionText, setMissionText] = useState(() => localStorage.getItem('mission_text') || '');
  const [visionText, setVisionText] = useState(() => localStorage.getItem('vision_text') || '');

  const handleSaveMissionVision = () => {
    localStorage.setItem('mission_text', missionText);
    localStorage.setItem('vision_text', visionText);
    toast.success('Mission and Vision statements saved!');
  };

  // Add state for Contact page fields
  const [contactHeadquarters, setContactHeadquarters] = useState(() => localStorage.getItem('contact_headquarters') || 'Saint Woven Saver Industries LLC');
  const [contactAddress, setContactAddress] = useState(() => localStorage.getItem('contact_address') || 'Industrial Zone 3, Building A12\nP.O. Box 12345\nDubai, United Arab Emirates');
  const [contactPhone, setContactPhone] = useState(() => localStorage.getItem('contact_phone') || 'Main: +971 4 123 4567\nTechnical Support: +971 4 123 4568\nSales: +971 4 123 4569');
  const [contactEmail, setContactEmail] = useState(() => localStorage.getItem('contact_email') || 'General Inquiries: info@saintwovensaver.com\nTechnical Support: support@saintwovensaver.com\nSales: sales@saintwovensaver.com');
  const [contactHours, setContactHours] = useState(() => localStorage.getItem('contact_hours') || 'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed');

  const handleSaveContact = () => {
    localStorage.setItem('contact_headquarters', contactHeadquarters);
    localStorage.setItem('contact_address', contactAddress);
    localStorage.setItem('contact_phone', contactPhone);
    localStorage.setItem('contact_email', contactEmail);
    localStorage.setItem('contact_hours', contactHours);
    toast.success('Contact information saved!');
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
                <div className="mb-2 text-sm text-muted-foreground">
                  To set featured project images, upload them in order in the Home section. The 6th image onward will be used for featured projects.
                </div>
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
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteImage(index)} disabled={deletingId === img.id}>
                          {deletingId === img.id ? (
                            <span className="flex items-center">
                              <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                              </svg>
                              Deleting...
                            </span>
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
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
                              <textarea
                                className="mt-3 p-2 border rounded text-sm resize-vertical min-h-[60px]"
                                placeholder="Enter product description..."
                                value={product.description || ""}
                                onChange={e => {
                                  const newDesc = e.target.value;
                                  setCategories(prev => prev.map((cat, i) =>
                                    i === catIdx
                                      ? {
                                          ...cat,
                                          products: cat.products.map((prod, j) =>
                                            j === prodIdx ? { ...prod, description: newDesc } : prod
                                          )
                                        }
                                      : cat
                                  ));
                                }}
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
              <div className="mb-6">
                <label htmlFor="about-us-company-text" className="block font-medium mb-2">Our Company Description</label>
                <textarea
                  id="about-us-company-text"
                  className="w-full min-h-[120px] border rounded p-2 text-sm"
                  value={aboutUsCompanyText}
                  onChange={e => setAboutUsCompanyText(e.target.value)}
                  placeholder="Enter the company description to show in the About Us section on the website."
                />
                <Button className="mt-2" onClick={handleSaveAboutUsCompanyText}>Save</Button>
              </div>
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
              <div className="mb-6">
                <label htmlFor="mission-text" className="block font-medium mb-2">Mission Statement</label>
                <textarea
                  id="mission-text"
                  className="w-full min-h-[80px] border rounded p-2 text-sm mb-4"
                  value={missionText}
                  onChange={e => setMissionText(e.target.value)}
                  placeholder="Enter your company's mission statement."
                />
                <label htmlFor="vision-text" className="block font-medium mb-2">Vision Statement</label>
                <textarea
                  id="vision-text"
                  className="w-full min-h-[80px] border rounded p-2 text-sm mb-4"
                  value={visionText}
                  onChange={e => setVisionText(e.target.value)}
                  placeholder="Enter your company's vision statement."
                />
                <Button className="mt-2" onClick={handleSaveMissionVision}>Save</Button>
              </div>
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
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-headquarters" className="block font-medium mb-2">Headquarters</label>
                  <input
                    id="contact-headquarters"
                    className="w-full border rounded p-2 text-sm mb-4"
                    value={contactHeadquarters}
                    onChange={e => setContactHeadquarters(e.target.value)}
                    placeholder="Enter headquarters name"
                  />
                  <label htmlFor="contact-address" className="block font-medium mb-2">Address</label>
                  <textarea
                    id="contact-address"
                    className="w-full min-h-[60px] border rounded p-2 text-sm mb-4"
                    value={contactAddress}
                    onChange={e => setContactAddress(e.target.value)}
                    placeholder="Enter address"
                  />
                  <label htmlFor="contact-phone" className="block font-medium mb-2">Phone</label>
                  <textarea
                    id="contact-phone"
                    className="w-full min-h-[60px] border rounded p-2 text-sm mb-4"
                    value={contactPhone}
                    onChange={e => setContactPhone(e.target.value)}
                    placeholder="Enter phone numbers"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-medium mb-2">Email</label>
                  <textarea
                    id="contact-email"
                    className="w-full min-h-[60px] border rounded p-2 text-sm mb-4"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    placeholder="Enter email addresses"
                  />
                  <label htmlFor="contact-hours" className="block font-medium mb-2">Business Hours</label>
                  <textarea
                    id="contact-hours"
                    className="w-full min-h-[60px] border rounded p-2 text-sm mb-4"
                    value={contactHours}
                    onChange={e => setContactHours(e.target.value)}
                    placeholder="Enter business hours"
                  />
                </div>
              </div>
              <Button className="mt-2" onClick={handleSaveContact}>Save</Button>
              <p className="text-center text-muted-foreground py-8">
                Content editor for Contact page would appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPages;
