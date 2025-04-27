
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const AdminSEO = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Settings</h1>
          <p className="text-muted-foreground">
            Manage search engine optimization for your website.
          </p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="border rounded-md p-8 text-center">
        <h3 className="text-lg font-medium text-muted-foreground">
          SEO management interface would be implemented here.
        </h3>
      </div>
    </div>
  );
};

export default AdminSEO;
