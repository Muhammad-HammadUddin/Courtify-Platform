import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function RevenueReport() {
  const revenueData = [
    { court: "Downtown Courts A", revenue: 1200, bookings: 48 },
    { court: "Riverside Sports Complex", revenue: 1500, bookings: 50 },
    { court: "North Park Facility", revenue: 900, bookings: 45 },
  ];

  const pieData = [
    { name: "Downtown Courts A", value: 1200 },
    { name: "Riverside Sports Complex", value: 1500 },
    { name: "North Park Facility", value: 900 },
  ];

  const COLORS = ["oklch(0.646 0.222 41.116)", "oklch(0.6 0.118 184.704)", "oklch(0.398 0.07 227.392)"];

  const totalRevenue = revenueData.reduce((sum, court) => sum + court.revenue, 0);
  const totalBookings = revenueData.reduce((sum, court) => sum + court.bookings, 0);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Revenue Report</h2>
        <p className="text-muted-foreground mt-1">Track your earnings and performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Revenue</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">${totalRevenue}</div>
            <p className="text-sm text-muted-foreground mt-2">↑ 12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Bookings</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">{totalBookings}</div>
            <p className="text-sm text-muted-foreground mt-2">↑ 8% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Court */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Court</CardTitle>
            <CardDescription>Monthly earnings per facility</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.922 0 0)" />
                <XAxis dataKey="court" stroke="oklch(0.556 0 0)" />
                <YAxis stroke="oklch(0.556 0 0)" />
                <Tooltip />
                <Bar dataKey="revenue" fill="oklch(0.646 0.222 41.116)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>Share of total revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Court Performance</CardTitle>
          <CardDescription>Detailed revenue and booking statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Court Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Bookings</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Avg. per Booking</th>
                </tr>
              </thead>
              <tbody>
                {revenueData.map((court, index) => (
                  <tr
                    key={index}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-4 text-foreground">{court.court}</td>
                    <td className="py-4 px-4 font-semibold text-foreground">${court.revenue}</td>
                    <td className="py-4 px-4 text-foreground">{court.bookings}</td>
                    <td className="py-4 px-4 text-foreground">${(court.revenue / court.bookings).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
