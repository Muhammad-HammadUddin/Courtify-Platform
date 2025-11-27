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
  ];

  // ⭐ GET ACTIVE ITEM ONCE (no repeated .find())
  const activeItem = navItems.find(item => item.path === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-green-100 shadow-sm">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 text-transparent bg-clip-text">
              Courtify
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md scale-105"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Profile + Mobile Menu */}
          <div className="flex items-center gap-2">

            {/* Desktop Profile Dropdown */}
            <div className="hidden sm:block relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2 px-3 py-2 border-2 border-green-200 hover:border-green-400 hover:bg-green-50 rounded-lg transition-all duration-200 bg-white">
                    <User className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-700">{ownerName}</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 bg-white border border-green-100 rounded-lg shadow-xl overflow-hidden">
                  <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 hover:bg-green-50">
                    <User className="w-4 h-4" />
                    <span className="text-gray-700 text-sm">Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 hover:bg-green-50">
                    <span>⚙️</span>
                    <span className="text-gray-700 text-sm">Settings</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="border-green-100" />

                  <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>

          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-green-100 shadow-lg flex flex-col px-4 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-green-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
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
      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">


        <Outlet />
      </main>
    </div>
  );
}
