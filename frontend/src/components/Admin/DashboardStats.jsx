import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, Home, Calendar } from "lucide-react";
import axiosInstance from "@/utils/axios";
import { API_PATH } from "@/utils/apiPath";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalCourts: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);

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
    return <p className="text-muted-foreground">Loading stats...</p>;
  }

  const statsArray = [
    { title: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-400" },
    { title: "Total Owners", value: stats.totalOwners, icon: User, color: "text-green-400" },
    { title: "Total Courts", value: stats.totalCourts, icon: Home, color: "text-yellow-400" },
    { title: "Total Bookings", value: stats.totalBookings, icon: Calendar, color: "text-purple-400" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsArray.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
