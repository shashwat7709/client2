import { Activity, AlertCircle, CheckCircle, Edit, File, Image, Mail, Package, Settings, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useWebsiteStats } from "@/hooks/useWebsiteStats";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const AdminDashboard = () => {
  const { visitsToday, pendingMessages, lastChecked } = useWebsiteStats();
  const [mainImage, setMainImage] = useState("");
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  // Product categories state (localStorage)
  const defaultCategories = [
    {
      id: "admixtures",
      name: "Admixtures",
      description: "Advanced concrete admixtures for enhanced durability and performance",
      image: ""
    },
    {
      id: "bonding-agents",
      name: "Bonding Agents",
      description: "Specialized adhesives for strong, reliable substrate bonding",
      image: ""
    },
    {
      id: "dry-mix",
      name: "Dry Mix Products",
      description: "Ready-to-use cementitious solutions for various applications",
      image: ""
    },
    {
      id: "joint-sealants",
      name: "Joint Sealants",
      description: "Premium sealants for durable expansion and construction joints",
      image: ""
    },
    {
      id: "surface-treatment",
      name: "Surface Treatment",
      description: "Products for concrete surface treatment, curing, and release agents",
      image: ""
    },
    {
      id: "tile-adhesives",
      name: "Tile Adhesives and Grout",
      description: "Tile adhesives and grouts for secure, long-lasting installations",
      image: ""
    },
    {
      id: "waterproofing",
      name: "Waterproofing Systems",
      description: "Comprehensive waterproofing solutions for all structures",
      image: ""
    }
  ];
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('admin_product_categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  // Save categories to localStorage on change
  useEffect(() => {
    localStorage.setItem('admin_product_categories', JSON.stringify(categories));
  }, [categories]);

  const handleCategoryImage = (idx: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCategories((prev: any[]) => {
        const updated = [...prev];
        updated[idx].image = reader.result as string;
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = (idx: number, field: string, value: string) => {
    setCategories((prev: any[]) => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  };

  // Fetch the most recent hero image from Supabase
  useEffect(() => {
    const fetchHeroImage = async () => {
      const { data, error } = await supabase
        .from("hero_images")
        .select("url, alt")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      if (data && data.url) {
        setMainImage(data.url);
        setPreview(data.url);
      } else {
        setMainImage("");
        setPreview("");
      }
    };
    fetchHeroImage();
  }, []);

  // Upload image to Supabase Storage and insert into hero_images table
  const handleMainImageUpload = async (file: File) => {
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `hero_${Date.now()}.${fileExt}`;
    const filePath = `hero_images/${fileName}`;

    console.log('Uploading to storage:', filePath);
    // Upload to storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from("hero-images")
      .upload(filePath, file);
    console.log('Storage upload result:', { storageData, storageError });
    if (storageError) {
      setUploading(false);
      alert("Failed to upload image: " + storageError.message);
      return;
    }
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("hero-images")
      .getPublicUrl(filePath);
    const url = publicUrlData?.publicUrl;
    console.log('Public URL:', url);
    if (!url) {
      setUploading(false);
      alert("Failed to get public URL for image.");
      return;
    }
    setPreview(url);
    // Insert into hero_images table
    const { error: insertError, data: insertData } = await supabase.from("hero_images").insert([
      { url, alt: "Main Page Image" }
    ]);
    console.log('Insert result:', { insertError, insertData });
    if (insertError) {
      setUploading(false);
      alert("Failed to save image info: " + insertError.message);
      return;
    }
    setMainImage(url);
    setUploading(false);
  };

  const quickAccessModules = [
    { name: "Pages", icon: File, link: "/admin/pages", description: "Manage website pages" },
    { name: "Products", icon: Package, link: "/admin/products", description: "Update product listings" },
    { name: "Settings", icon: Settings, link: "/admin/settings", description: "Configure website settings" },
  ];

  const formattedLastUpdated = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(lastChecked);

  return (
    <div>
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Saint Woven Saver admin panel.
        </p>
      </div>

      {/* Website Status Card */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Website Status
          </CardTitle>
          <CardDescription>Current status of your website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center">
                <span className="font-medium mr-2">Status:</span>
                <Badge className="bg-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" /> Online
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Last system check: {formattedLastUpdated}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                <p className="text-2xl font-bold">{visitsToday}</p>
                <p className="text-xs text-muted-foreground">Visits Today</p>
              </div>
              <div className="text-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                <p className="text-2xl font-bold">{pendingMessages}</p>
                <p className="text-xs text-muted-foreground">New Messages</p>
              </div>
            </div>
          </div>

          {pendingMessages > 0 && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 rounded-md text-sm flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">System Notice:</span> You have {pendingMessages} unread message{pendingMessages !== 1 ? 's' : ''}. Please review when ready.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Access Grid */}
      <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickAccessModules.map((module) => (
          <Card key={module.name} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <module.icon className="h-5 w-5 mr-2" />
                {module.name}
              </CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={module.link}>
                <Button variant="default" size="sm" className="w-full">
                  <Edit className="h-4 w-4 mr-2" /> Manage
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Our Product Categories Section */}
      <h2 className="text-xl font-semibold mt-12 mb-4">Our Product Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <Card key={cat.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                {cat.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-100 rounded flex items-center justify-center mb-2 overflow-hidden">
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) handleCategoryImage(idx, e.target.files[0]);
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Category Name</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={cat.name}
                  onChange={e => handleCategoryChange(idx, 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full border rounded px-2 py-1"
                  value={cat.description}
                  onChange={e => handleCategoryChange(idx, 'description', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
