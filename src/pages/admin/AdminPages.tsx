
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileEdit, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";

const AdminPages = () => {
  const [currentTab, setCurrentTab] = useState("home");

  // Mock save function
  const handleSave = () => {
    toast.success("Page content saved successfully!");
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="relative group">
                      <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                        <img 
                          src={`https://images.unsplash.com/photo-148805952830-d33658a5aa8${item + 4}`} 
                          alt={`Hero banner ${item}`}
                          className="w-full h-full object-cover transition-opacity"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                        <Button variant="secondary" size="sm">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800 rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center p-4">
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                  </div>
                </div>
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
      </Tabs>
    </div>
  );
};

export default AdminPages;
