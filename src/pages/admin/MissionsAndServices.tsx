import { Button } from "@/components/ui/button";

const Vision = () => (
  <div>
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Vision</h1>
        <p className="text-muted-foreground">
          Manage your company's vision and related information.
        </p>
      </div>
      <Button>
        + Add New Vision
      </Button>
    </div>
    <div className="border rounded-md p-8 text-center text-xl text-muted-foreground">
      Vision management interface would be implemented here.
    </div>
  </div>
);

export default Vision; 