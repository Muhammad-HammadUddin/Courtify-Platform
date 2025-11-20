import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  BarChart3,
  PlusCircle,
  Calendar,
  TrendingUp,
  LogOut,
  User,
  Menu,
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

export default function DashboardLayout() {
  const [ownerName] = useState("John Smith");
  const [activeTab, setActiveTab] = useState("/owner/dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setActiveTab(location.pathname);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { id: "courts", label: "My Courts", icon: BarChart3, path: "/owner/dashboard" },
    { id: "add-court", label: "Add Court", icon: PlusCircle, path: "/owner/dashboard/add-court" },
    { id: "bookings", label: "My Bookings", icon: Calendar, path: "/owner/dashboard/bookings" },
    { id: "revenue", label: "Revenue Report", icon: TrendingUp, path: "/owner/dashboard/revenue" },
  ];

  return (
    <div className="min-h-screen bg-[#0f111a] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1c1f33] border-b border-[#2c2f44] shadow-md">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">CourtHub</h1>
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
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu toggle & profile */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent border border-gray-600">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{ownerName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-[#1c1f33] text-white">
                <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-700">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-700">
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-gray-600" />
                <DropdownMenuItem className="flex items-center gap-2 text-red-500 hover:bg-gray-700">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1c1f33] border-t border-[#2c2f44] flex flex-col px-4 py-2 shadow-md animate-slideDown">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
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
        <Outlet />
      </main>
    </div>
  );
}
