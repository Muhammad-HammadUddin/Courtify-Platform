import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // adjust path
import { Button } from "@/components/ui/button"; // adjust path
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // adjust path
import { courtsData } from "@/lib/admin-data"; // adjust path

export default function AllCourts() {
  const [courts, setCourts] = useState(courtsData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);

  const handleDeleteClick = (court) => {
    setSelectedCourt(court);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCourt) {
      setCourts(courts.filter((c) => c.id !== selectedCourt.id));
    }
    setDeleteDialogOpen(false);
    setSelectedCourt(null);
  };

  return (
    <div className="w-full">
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-card">
              <TableHead className="text-foreground">Court Name</TableHead>
              <TableHead className="text-foreground">Location</TableHead>
              <TableHead className="text-foreground">Owner Name</TableHead>
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
                <TableCell className="text-foreground">{court.owner_name}</TableCell>
                <TableCell className="text-foreground">${court.hourly_rate}</TableCell>
                <TableCell className="text-foreground">{court.type}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-200">
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

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-card border border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Delete Court</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Are you sure you want to delete {selectedCourt?.name}? This action cannot be undone.
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
