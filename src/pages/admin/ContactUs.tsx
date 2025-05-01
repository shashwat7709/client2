import { Button } from "@/components/ui/button";

const ContactUs = () => (
  <div>
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-muted-foreground">
          Manage your company's contact information and form settings.
        </p>
      </div>
      <Button>
        + Add New Contact
      </Button>
    </div>
    <div className="border rounded-md p-8 text-center text-xl text-muted-foreground">
      Contact Us management interface would be implemented here.
    </div>
  </div>
);

export default ContactUs; 