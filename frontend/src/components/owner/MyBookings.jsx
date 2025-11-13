import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MyBookings() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      courtName: "Downtown Courts A",
      userName: "Alex Johnson",
      date: "2024-11-15",
      timeSlot: "10:00 AM - 11:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      courtName: "Riverside Sports Complex",
      userName: "Sarah Williams",
      date: "2024-11-16",
      timeSlot: "2:00 PM - 3:00 PM",
      status: "Approved",
    },
    {
      id: 3,
      courtName: "North Park Facility",
      userName: "Mike Brown",
      date: "2024-11-17",
      timeSlot: "6:00 PM - 7:00 PM",
      status: "Approved",
    },
    {
      id: 4,
      courtName: "Downtown Courts A",
      userName: "Emma Davis",
      date: "2024-11-18",
      timeSlot: "9:00 AM - 10:00 AM",
      status: "Pending",
    },
  ]);

  const handleApprove = (id) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: "Approved" } : b))
    );
    alert("Booking Approved: The booking has been confirmed.");
  };

  const handleCancel = (id) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b))
    );
    alert("Booking Cancelled: The booking has been cancelled.");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">My Bookings</h2>
        <p className="text-muted-foreground mt-1">Manage customer reservations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking List</CardTitle>
          <CardDescription>Recent bookings for your courts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Court Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Time Slot</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-4 text-foreground">{booking.courtName}</td>
                    <td className="py-4 px-4 text-foreground">{booking.userName}</td>
                    <td className="py-4 px-4 text-foreground">{booking.date}</td>
                    <td className="py-4 px-4 text-foreground">{booking.timeSlot}</td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        {booking.status === "Pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApprove(booking.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCancel(booking.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {booking.status === "Approved" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancel(booking.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            Cancel
                          </Button>
                        )}
                        {booking.status === "Cancelled" && (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </div>
                    </td>
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
