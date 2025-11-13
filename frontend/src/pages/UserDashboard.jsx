import { useEffect, useState } from "react";
import { Link, Routes, Route, useLocation,Outlet } from "react-router-dom";
import Header from "../components/User/Header.jsx";


export default function UserDashboardLayout() {
  const [activeTab, setActiveTab] = useState("/user/dashboard/search");
  const location = useLocation();

  // Sync active tab with URL
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const tabs = [
    { id: "search", label: "Search Courts", icon: "🔍", path: "/user/dashboard/search" },
    { id: "matches", label: "Upcoming Matches", icon: "⚽", path: "/user/dashboard/matches" },
    { id: "bookings", label: "My Bookings", icon: "📅", path: "/user/dashboard/bookings" },
    { id: "favorites", label: "Favorite Courts", icon: "❤️", path: "/user/dashboard/favorites" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <Header />

      {/* Tab Navigation */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                className={`px-4 py-4 font-medium text-sm whitespace-nowrap transition-all duration-200 border-b-2 ${
                  activeTab === tab.path
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <Outlet/>
      </main>
    </div>
  );
}
