import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axios";
import { API_PATH } from "@/utils/apiPath";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function AdminApprovals() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending courts
  useEffect(() => {
    const fetchPendingCourts = async () => {
      try {
        const res = await axiosInstance.get(API_PATH.ADMIN.GET_ALL_COURTS_PENDING);
        setCourts(res.data.courts || []);
      } catch (err) {
        console.error("Error fetching pending courts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingCourts();
  }, []);

  // Approve court
  const handleApprove = async (courtId) => {
  try {
    await axiosInstance.put(API_PATH.ADMIN.UPDATE_COURT_STATUS(courtId), {
      status: "approved"
    });

    setCourts((prev) => prev.filter((c) => c.id !== courtId));
    toast.success("Court approved successfully!");
  } catch (err) {
    console.log(err);
    toast.error("Failed to approve court");

  }
};

const handleReject = async (courtId) => {
  try {
    await axiosInstance.put(API_PATH.ADMIN.UPDATE_COURT_STATUS(courtId), {
      status: "rejected"
    });

    setCourts((prev) => prev.filter((c) => c.id !== courtId));
  } catch (err) {
    console.log(err);
  }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground text-lg">Loading pending courts...</p>
      </div>
    );
  }

  if (courts.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground text-lg">No pending approvals</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courts.map((court) => (
        <Card key={court.id} className="bg-card border-border overflow-hidden flex flex-col">

          <div className="relative w-full h-40 bg-muted">
            <img
              src={court.image_url || "/placeholder.svg"}
              alt={court.name}
              className="w-full h-full object-cover"
            />
          </div>

          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-foreground">{court.name}</CardTitle>
          </CardHeader>

          <CardContent className="pb-4 flex-grow">
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">Location</p>
                <p className="text-foreground">{court.location}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Price</p>
                <p className="text-foreground">${court.hourly_rate}/hour</p>
              </div>

              <div>
                <p className="text-muted-foreground">Type</p>
                <p className="text-foreground">{court.type}</p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="gap-2 flex">
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => handleApprove(court.id)}
            >
              ✅ Approve
            </Button>
            <Button
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              onClick={() => handleReject(court.id)}
            >
              ❌ Reject
            </Button>
          </CardFooter>

        </Card>
      ))}
    </div>
  );
}
