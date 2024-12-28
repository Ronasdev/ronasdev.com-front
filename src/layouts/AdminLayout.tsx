import { useState, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  Users,
  MessageSquare,
  Settings,
  Menu,
  X,
  LogOut,
  FolderOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

// Type pour les éléments de menu
interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/admin",
  },
  {
    icon: FileText,
    label: "Articles",
    path: "/admin/articles",
  },
  {
    icon: FolderOpen,
    label: 'Portfolios',
    path: '/admin/portfolios'
  },
  {
    icon: GraduationCap,
    label: "Formations",
    path: "/admin/formations",
  },
  {
    icon: Users,
    label: "Utilisateurs",
    path: "/admin/users",
  },
  {
    icon: MessageSquare,
    label: "Commentaires",
    path: "/admin/comments",
  },
  {
    icon: Settings,
    label: "Paramètres",
    path: "/admin/settings",
  },
];

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  // Gestion de la responsivité
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Simulation de déconnexion
  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={cn(
              "fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-lg",
              isMobile && "absolute"
            )}
          >
            {/* Logo */}
            <div className="flex h-16 items-center justify-between px-4">
              <Link to="/admin" className="text-xl font-bold text-primary">
                Admin Panel
              </Link>
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Menu items */}
            <nav className="space-y-1 px-2 py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-primary"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        className={cn(
          "min-h-screen transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  {
                    user?.avatar ? <AvatarImage src={VITE_API_URL + user?.avatar} alt="@admin" />
                      :
                      //  <AvatarImage src="https://github.com/shadcn.png" alt="@admin" /> 
                      <AvatarFallback className="text-green-600 text-sm" >
                        {user?.name?.charAt(0).toUpperCase() + user?.name?.charAt(1).toUpperCase()}
                      </AvatarFallback>
                  }
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.role}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
