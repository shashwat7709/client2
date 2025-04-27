import { Activity, AlertCircle, CheckCircle, Edit, File, Image, Mail, Package, Settings, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useWebsiteStats } from "@/hooks/useWebsiteStats";

const AdminDashboard = () => {
  const { visitsToday, pendingMessages, lastChecked } = useWebsiteStats();
  
  const quickAccessModules = [
    { name: "Pages", icon: File, link: "/admin/pages", description: "Manage website pages" },
    { name: "Products", icon: Package, link: "/admin/products", description: "Update product listings" },
    { name: "Services", icon: Wrench, link: "/admin/services", description: "Edit service offerings" },
    { name: "Media", icon: Image, link: "/admin/media", description: "Manage uploaded files" },
    { name: "Messages", icon: Mail, link: "/admin/forms", description: "View contact submissions" },
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
    </div>
  );
};

export default AdminDashboard;
