import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // adjust path
import { Users, User, Home, Calendar } from "lucide-react";
import { courtsData, pendingCourtsData, usersData } from "@/lib/admin-data"; // adjust path

export default function DashboardStats() {
  // Calculate statistics from dummy data
  const totalUsers = usersData.length;
  const totalOwners = usersData.filter((u) => u.role === "owner").length;
  const totalCourts = courtsData.length + pendingCourtsData.length;
  const totalBookings = 42; // Mock booking count

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
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
