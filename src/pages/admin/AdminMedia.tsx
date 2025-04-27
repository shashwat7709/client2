
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

const AdminMedia = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">
            Upload and manage images and documents.
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
        </Button>
      </div>

      <div className="border rounded-md p-8 text-center">
        <h3 className="text-lg font-medium text-muted-foreground">
          Media management interface would be implemented here.
        </h3>
      </div>
    </div>
  );
};

export default AdminMedia;
