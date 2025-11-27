<<<<<<< Updated upstream
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // adjust path
import { Users, User, Home, Calendar } from "lucide-react";
import { courtsData, pendingCourtsData, usersData } from "@/lib/admin-data"; // adjust path
=======
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, Home, Calendar, TrendingUp, Loader2 } from "lucide-react";
import axiosInstance from "@/utils/axios";
import { API_PATH } from "@/utils/apiPath";
>>>>>>> Stashed changes

export default function DashboardStats() {
  // Calculate statistics from dummy data
  const totalUsers = usersData.length;
  const totalOwners = usersData.filter((u) => u.role === "owner").length;
  const totalCourts = courtsData.length + pendingCourtsData.length;
  const totalBookings = 42; // Mock booking count

<<<<<<< Updated upstream
  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Total Owners",
      value: totalOwners,
      icon: User,
      color: "text-green-400",
    },
    {
      title: "Total Courts",
      value: totalCourts,
      icon: Home,
      color: "text-yellow-400",
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: Calendar,
      color: "text-purple-400",
=======
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get(API_PATH.ADMIN.GET_ALL_USERS);
        // API should return: { total_users, total_owners, total_courts, total_bookings }
        setStats({
          totalUsers: res.data.total_users || 0,
          totalOwners: res.data.total_court_owners || 0,
          totalCourts: res.data.total_courts || 0,
          totalBookings: res.data.total_bookings || 0,
        });
        console.log(res.data)
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-white border-2 border-emerald-100 shadow-lg rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
              <div className="h-10 w-10 bg-gradient-to-br from-gray-200 to-gray-100 rounded-xl animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statsArray = [
    { 
      title: "Total Users", 
      value: stats.totalUsers, 
      icon: Users, 
      gradient: "from-blue-400 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100/50",
      iconBg: "from-blue-400 to-blue-600"
    },
    { 
      title: "Total Owners", 
      value: stats.totalOwners, 
      icon: User, 
      gradient: "from-emerald-400 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100/50",
      iconBg: "from-emerald-400 to-teal-500"
    },
    { 
      title: "Total Courts", 
      value: stats.totalCourts, 
      icon: Home, 
      gradient: "from-amber-400 to-amber-600",
      bgGradient: "from-amber-50 to-amber-100/50",
      iconBg: "from-amber-400 to-orange-500"
    },
    { 
      title: "Total Bookings", 
      value: stats.totalBookings, 
      icon: Calendar, 
      gradient: "from-purple-400 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100/50",
      iconBg: "from-purple-400 to-pink-500"
>>>>>>> Stashed changes
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
<<<<<<< Updated upstream
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">from dummy data</p>
=======
      {statsArray.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.title} 
            className="bg-white border-2 border-emerald-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group hover:scale-105"
          >
            {/* Gradient Top Border */}
            <div className={`h-1 bg-gradient-to-r ${stat.iconBg}`} />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 pt-5 px-6">
              <CardTitle className="text-sm font-semibold text-gray-600 group-hover:text-gray-800 transition-colors">
                {stat.title}
              </CardTitle>
              
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.iconBg} shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            
            <CardContent className="px-6 pb-5">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {stat.value.toLocaleString()}
                  </div>
                  
                  {/* Optional: Growth indicator */}
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs text-emerald-600 font-medium">Active</span>
                  </div>
                </div>
              </div>
>>>>>>> Stashed changes
            </CardContent>

            {/* Decorative Gradient Background */}
           
          </Card>
        );
      })}
    </div>
  );
}