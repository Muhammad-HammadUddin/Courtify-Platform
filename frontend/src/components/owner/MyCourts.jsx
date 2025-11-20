import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios.js";
import { toast } from 'react-toastify';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MyCourts() {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // ------------------------------------
  // FETCH COURTS OF LOGGED-IN USER
  // ------------------------------------
  const fetchMyCourts = async () => {
    try {
      const res = await axiosInstance.get("/courts/byuser", {
        withCredentials: true
      });

      const formatted = res.data.courts.map((c) => ({
        id: c.id,
        name: c.name,
        location: c.location,
        pricePerHour: c.hourly_rate,
        maintenance: c.maintenance,
        status: c.status,
        type: c.type,
        openingTime: c.opening_time,
        closingTime: c.closing_time,
        description: c.description,
        image: c.image_url,
      }));

      setCourts(formatted);
    } catch (err) {
      console.error("FETCH ERROR:", err);
      toast.error("Failed to fetch courts");
    }
  };

  useEffect(() => {
    fetchMyCourts();
  }, []);

  // ------------------------------------
  // DELETE COURT
  // ------------------------------------
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/courts/${id}`, {
        withCredentials: true
      });
      setCourts(courts.filter((c) => c.id !== id));
      toast.success("Court deleted Successfully!");
    } catch (err) {
      console.error("DELETE ERROR:", err);
      toast.error("Failed to delete court");
    }
  };

  // ------------------------------------
  // EDIT COURT
  // ------------------------------------
  const handleEdit = (court) => {
    setSelectedCourt(court);
    setIsEditOpen(true);
  };

  // ------------------------------------
  // UPDATE COURT
  // ------------------------------------
  const handleUpdate = async (e) => {
    e.preventDefault();


    const payload = {
      name: selectedCourt.name,
      location: selectedCourt.location,
      hourly_rate: selectedCourt.pricePerHour,
      maintenance: selectedCourt.maintenance,
      type: selectedCourt.type,
      description: selectedCourt.description,
      opening_time: selectedCourt.openingTime,
      closing_time: selectedCourt.closingTime,
      image_url: selectedCourt.image,
    };

    try {
      await axiosInstance.put(`/courts/${selectedCourt.id}`, payload, {
        withCredentials: true
      });

      // update UI instantly
      setCourts((prev) =>
        prev.map((c) => (c.id === selectedCourt.id ? selectedCourt : c))
      );

      setIsEditOpen(false);
      toast.success("Court updated Successfully!");
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      toast.error("Failed to update court");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">My Courts</h2>
          <p className="text-muted-foreground">Manage your sports facilities</p>
        </div>
      </div>

      {/* COURT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <Card key={court.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>{court.name}</CardTitle>
                  <CardDescription>{court.location}</CardDescription>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    court.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {court.status}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Price / hour</p>
                <p className="text-2xl font-bold">
                  Rs {court.pricePerHour}
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() => handleEdit(court)}
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 text-destructive"
                  onClick={() => handleDelete(court.id)}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* EDIT MODAL */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Court</DialogTitle>
          </DialogHeader>

          {selectedCourt && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label>Court Name</Label>
                <Input
                  value={selectedCourt.name}
                  onChange={(e) =>
                    setSelectedCourt({ ...selectedCourt, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={selectedCourt.description}
                  onChange={(e) =>
                    setSelectedCourt({
                      ...selectedCourt,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Hourly Rate</Label>
                  <Input
                    type="number"
                    value={selectedCourt.pricePerHour}
                    onChange={(e) =>
                      setSelectedCourt({
                        ...selectedCourt,
                        pricePerHour: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Maintenance</Label>
                  <Select
                    value={selectedCourt.maintenance ? "true" : "false"}
                    onValueChange={(value) =>
                      setSelectedCourt({
                        ...selectedCourt,
                        maintenance: value === "true",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Opening Time</Label>
                  <Input
                    type="time"
                    value={selectedCourt.openingTime}
                    onChange={(e) =>
                      setSelectedCourt({
                        ...selectedCourt,
                        openingTime: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Closing Time</Label>
                  <Input
                    type="time"
                    value={selectedCourt.closingTime}
                    onChange={(e) =>
                      setSelectedCourt({
                        ...selectedCourt,
                        closingTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <Select
                    value={selectedCourt.type}
                    onValueChange={(value) =>
                      setSelectedCourt({ ...selectedCourt, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="badminton">Badminton</SelectItem>
                      <SelectItem value="tennis">Tennis</SelectItem>
                      <SelectItem value="futsal">Futsal</SelectItem>
                      <SelectItem value="volleyball">Volleyball</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Location (Map Link)</Label>
                  <Input
                    value={selectedCourt.location}
                    onChange={(e) =>
                      setSelectedCourt({
                        ...selectedCourt,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <DialogFooter>
                <Button className="w-full" type="submit">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
