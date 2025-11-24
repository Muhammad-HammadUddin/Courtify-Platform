import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios.js";
import { API_PATH } from "@/utils/apiPath";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [rejectReason, setRejectReason] = useState("");
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // --------------------------------
  // 1) GET BOOKINGS FROM BACKEND
  // --------------------------------
  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.BOOKINGS.OWNER_COURT_BOOKINGS, {
        withCredentials: true,
      });
      setBookings(res.data.bookings || []);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // --------------------------------
  // 2) APPROVE BOOKING
  // --------------------------------
  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(API_PATH.BOOKINGS.APPROVE_BOOKING(id));

      // UI Update
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, booking_status: "approved" } : b
        )
      );
    } catch (error) {
      console.log("Approve Error:", error);
    }
  };

  // --------------------------------
  // 3) OPEN REJECT MODAL
  // --------------------------------
  const openReject = (id) => {
    setSelectedBookingId(id);
    setRejectReason("");
    setOpenRejectModal(true);
  };

  // --------------------------------
  // 4) REJECT BOOKING (with reason)
  // --------------------------------
  const handleRejectConfirm = async () => {
    try {
      await axiosInstance.put(API_PATH.BOOKINGS.REJECT_BOOKING(selectedBookingId), {
        cancellation_reason: rejectReason,
      });

      // UI Update
      setBookings((prev) =>
        prev.map((b) =>
          b.id === selectedBookingId ? { ...b, booking_status: "rejected" } : b
        )
      );

      setOpenRejectModal(false);
    } catch (error) {
      console.log("Reject Error:", error);
    }
  };

  // --------------------------------
  // 5) Badge color based on status
  // --------------------------------
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-black-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "cancelled":
      case "rejected":
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
                  <th className="text-left py-3 px-4">Court Name</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Time Slot</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-4">{booking.court.name}</td>
                    <td className="py-4 px-4">{booking.user.name}</td>
                    <td className="py-4 px-4">{booking.booking_date}</td>
                    <td className="py-4 px-4">{`${booking.start_time}-${booking.end_time}`}</td>

                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(booking.booking_status)}>
                        {booking.booking_status.toLowerCase()}
                      </Badge>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        {booking.booking_status.toLowerCase() === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600"
                              onClick={() => handleApprove(booking.id)}
                            >
                              Approve
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive"
                              onClick={() => openReject(booking.id)}
                            >
                              Reject
                            </Button>
                          </>
                        )}

                        {["approved", "cancelled", "rejected"].includes(booking.booking_status.toLowerCase()) && (
                          <span className="text-muted-foreground text-sm">
                            — No Action
                          </span>
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

      {/* Reject Modal */}
      <Dialog open={openRejectModal} onOpenChange={setOpenRejectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Booking</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Please enter a reason for rejecting this booking:
            </p>

            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter reason..."
              className="min-h-[100px]"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenRejectModal(false)}>
              Cancel
            </Button>

            <Button
              className="text-destructive"
              onClick={handleRejectConfirm}
              disabled={!rejectReason.trim()}
            >
              Confirm Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
