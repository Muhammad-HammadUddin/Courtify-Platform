import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardStats from "@/components/Admin/DashboardStats";
import AllCourts from "@/components/Admin/AllCourts";
import AdminApprovals from "@/components/Admin/Approval";
import AllUsers from "@/components/Admin/AllUsers";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("courts");

  return (
    <div className="min-h-screen bg-black text-foreground">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-border py-8 px-6">
          <h1 className="text-4xl font-bold text-foreground">Courtify Admin</h1>
          <p className="text-muted-foreground mt-2">Manage courts, approvals, and users</p>
        </div>

        {/* Dashboard Stats */}
        <div className="px-6 py-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Dashboard Stats</h2>
          <DashboardStats />
        </div>

        {/* Tabs */}
        <div className="px-6 py-8 border-t border-border">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card border border-border p-1">
              <TabsTrigger
                value="courts"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground"
              >
                Courts
              </TabsTrigger>
              <TabsTrigger
                value="approvals"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground"
              >
                Approvals
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground"
              >
                Users
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="courts">
                <AllCourts />
              </TabsContent>
              <TabsContent value="approvals">
                <AdminApprovals />
              </TabsContent>
              <TabsContent value="users">
                <AllUsers />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
