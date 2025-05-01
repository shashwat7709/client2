import { Button } from "@/components/ui/button";

const AboutUs = () => (
  <div>
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About Us</h1>
        <p className="text-muted-foreground">
          Manage information about your company.
        </p>
      </div>
      <Button>
        + Add New Info
      </Button>
    </div>
    <div className="border rounded-md p-8 text-center text-xl text-muted-foreground">
      About Us management interface would be implemented here.
    </div>
  </div>
);

export default AboutUs; 