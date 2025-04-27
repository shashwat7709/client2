
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AdminServices = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">
            Manage service offerings and descriptions.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Service
        </Button>
      </div>

      <div className="border rounded-md p-8 text-center">
        <h3 className="text-lg font-medium text-muted-foreground">
          Service management interface would be implemented here.
        </h3>
      </div>
    </div>
  );
};

export default AdminServices;
