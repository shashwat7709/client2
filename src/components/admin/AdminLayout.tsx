import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Wrench, 
  Mail, 
  Users, 
  Settings,
  LogOut,
  Menu,
  Sun,
  Moon,
  Info,
  Phone,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger, 
} from "@/components/ui/collapsible";
import { useTheme } from "next-themes";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    try {
      setMounted(true);
      setIsCollapsed(window.innerWidth < 1024);
    } catch (err) {
      setError(err as Error);
      console.error("Error in AdminLayout mount:", err);
    }
  }, []);

  const toggleDarkMode = () => {
    try {
      if (mounted) {
        setTheme(theme === "dark" ? "light" : "dark");
      }
    } catch (err) {
      console.error("Error toggling dark mode:", err);
      toast({
        title: "Error",
        description: "Failed to toggle theme",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    try {
      logout();
      navigate("/admin/login");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (err) {
      console.error("Error during logout:", err);
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: FileText, label: "Pages", path: "/admin/pages" },
    { icon: Package, label: "Products", path: "/admin/products" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <Collapsible 
        open={!isCollapsed} 
        onOpenChange={(open) => setIsCollapsed(!open)}
        className="lg:relative lg:block"
      >
        <CollapsibleContent className="lg:block" forceMount>
          <div className="fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
            {/* Sidebar Header */}
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">
                  APCONEX Constrolink LLP
                </h2>
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">Admin Panel</div>
            </div>
            
            <Separator />
            
            {/* Navigation Menu */}
            <nav className="p-4">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link to={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* User & Logout Section */}
            {mounted && user && (
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{user.username}</div>
                      <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2 justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Main Content */}
      <main className={`flex-1 p-6 ${!isCollapsed ? "lg:ml-64" : ""}`}>
        <div className="max-w-7xl mx-auto">
          {mounted && children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
