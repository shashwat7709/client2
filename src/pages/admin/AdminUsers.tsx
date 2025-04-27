
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const AdminUsers = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage admin users and permissions.
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="border rounded-md p-8 text-center">
        <h3 className="text-lg font-medium text-muted-foreground">
          User management interface would be implemented here.
        </h3>
      </div>
    </div>
  );
};

export default AdminUsers;
