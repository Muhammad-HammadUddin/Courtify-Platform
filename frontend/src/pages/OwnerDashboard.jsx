import { useState, useEffect } from "react";
import { Link, Route, Routes, useLocation,Outlet } from "react-router-dom";
import {
  BarChart3,
  PlusCircle,
  Calendar,
  TrendingUp,
  LogOut,
  User,
  Menu, // <-- Added menu icon
  X,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";

// Components


export default function DashboardLayout() {
  const [ownerName] = useState("John Smith");
  const [activeTab, setActiveTab] = useState("/owner/dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  // Update activeTab automatically when URL changes
  useEffect(() => {
    setActiveTab(location.pathname);
    setMobileMenuOpen(false); // close mobile menu when navigating
  }, [location.pathname]);

  const navItems = [
    { id: "courts", label: "My Courts", icon: BarChart3, path: "/owner/dashboard" },
    { id: "add-court", label: "Add Court", icon: PlusCircle, path: "/owner/dashboard/add-court" },
    { id: "bookings", label: "My Bookings", icon: Calendar, path: "/owner/dashboard/bookings" },
    { id: "revenue", label: "Revenue Report", icon: TrendingUp, path: "/owner/dashboard/revenue" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">CourtHub</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.path;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{ownerName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Menu (Dropdown under navbar) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border flex flex-col px-4 py-2 shadow-md animate-slideDown">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
       <Outlet/>
      </main>
    </div>
  );
}
