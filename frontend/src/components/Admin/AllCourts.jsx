import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axios";
import { API_PATH } from "@/utils/apiPath";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "react-toastify";

export default function AllCourts() {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);

  // -----------------------------------------
  // ⬇️ Fetch all courts from backend
  // -----------------------------------------
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const res = await axiosInstance.get(API_PATH.COURT.ALL_COURTS);
        setCourts(res.data.courts || []);
        console.log(res.data.courts)
      } catch (err) {
        console.error("Error fetching courts:", err);
        toast.error("Failed to load courts");
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, []);

  // -----------------------------------------
  // ⬇️ Delete click → open dialog
  // -----------------------------------------
  const handleDeleteClick = (court) => {
    setSelectedCourt(court);
    setDeleteDialogOpen(true);
  };

  // -----------------------------------------
  // ⬇️ Confirm delete → API call
  // -----------------------------------------
  const handleConfirmDelete = async () => {
    if (!selectedCourt) return;

    try {
      await axiosInstance.delete(API_PATH.COURT.DELETE_COURT(selectedCourt.id));

      // Remove from UI
      setCourts((prev) => prev.filter((c) => c.id !== selectedCourt.id));

      toast.success("Court deleted successfully!");

    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete court");
    }

    setDeleteDialogOpen(false);
    setSelectedCourt(null);
  };

  // -----------------------------------------
  // ⬇️ Loading state
  // -----------------------------------------
  if (loading) {
    return (
      <div className="py-10 flex justify-center">
        <p className="text-muted-foreground text-lg">Loading courts...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-card">
              <TableHead className="text-foreground">Court Name</TableHead>
              <TableHead className="text-foreground">Location</TableHead>
              <TableHead className="text-foreground">Price/Hour</TableHead>
              <TableHead className="text-foreground">Type</TableHead>
              <TableHead className="text-foreground">Status</TableHead>
              <TableHead className="text-foreground">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {courts.map((court) => (
              <TableRow key={court.id} className="border-border hover:bg-muted">
                <TableCell className="text-foreground">{court.name}</TableCell>
                <TableCell className="text-foreground">{court.location}</TableCell>
                <TableCell className="text-foreground">${court.hourly_rate}</TableCell>
                <TableCell className="text-foreground">{court.type}</TableCell>

                <TableCell>
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      court.status === "approved"
        ? "bg-green-900 text-green-200"
        : court.status === "rejected"
        ? "bg-red-900 text-red-200"
        : "bg-yellow-900 text-yellow-200" // pending ya koi aur status
    }`}
  >
    {court.status}
  </span>
</TableCell>

                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:bg-red-950 hover:text-red-300"
                    onClick={() => handleDeleteClick(court)}
                  >
                    🗑️ Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Confirm Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-card border border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Delete Court</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to delete <strong>{selectedCourt?.name}</strong>?  
              <br />This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-border text-foreground hover:bg-muted"
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
