
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const AdminForms = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Form Submissions</h1>
          <p className="text-muted-foreground">
            View and manage contact form submissions.
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="border rounded-md p-8 text-center">
        <h3 className="text-lg font-medium text-muted-foreground">
          Form submission management interface would be implemented here.
        </h3>
      </div>
    </div>
  );
};

export default AdminForms;
