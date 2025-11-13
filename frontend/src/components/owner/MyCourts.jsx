import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MyCourts() {
  const [courts, setCourts] = useState([
    {
      id: 1,
      name: "Downtown Courts A",
      location: "123 Main St, City",
      pricePerHour: 25,
      status: "Open",
      description: "Spacious indoor badminton court with proper lighting.",
      type: "Indoor",
      openingTime: "08:00",
      closingTime: "22:00",
      image: "",
    },
    {
      id: 2,
      name: "Riverside Sports Complex",
      location: "456 River Ave, City",
      pricePerHour: 30,
      status: "Open",
      description: "Beautiful riverside view with tennis courts.",
      type: "Outdoor",
      openingTime: "07:00",
      closingTime: "23:00",
      image: "",
    },
  ]);

  const [selectedCourt, setSelectedCourt] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = (id) => {
    setCourts(courts.filter((court) => court.id !== id));
    alert("Court Deleted: The court has been removed from your inventory.");
  };

  const handleEdit = (court) => {
    setSelectedCourt(court);
    setIsEditOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    setCourts((prevCourts) =>
      prevCourts.map((court) =>
        court.id === selectedCourt.id ? selectedCourt : court
      )
    );

    setIsEditOpen(false);
    alert("Court updated successfully!");
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">My Courts</h2>
          <p className="text-muted-foreground mt-1">Manage your sports facilities</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Court
        </Button>
      </div>

      {/* COURT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <Card key={court.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>{court.name}</CardTitle>
                  <CardDescription className="mt-1">{court.location}</CardDescription>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    court.status === "Open"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {court.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Price per hour</p>
                <p className="text-2xl font-bold text-foreground">${court.pricePerHour}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 bg-transparent"
                  onClick={() => handleEdit(court)}
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 text-destructive hover:text-destructive bg-transparent"
                  onClick={() => handleDelete(court.id)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
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
            <form onSubmit={handleUpdate} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>Court Name</Label>
                <Input
                  value={selectedCourt.name}
                  onChange={(e) =>
                    setSelectedCourt({ ...selectedCourt, name: e.target.value })
                  }
                  required
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
                <div className="space-y-2">
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
                <div className="space-y-2">
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
                <div className="space-y-2">
                  <Label>Court Type</Label>
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
                      <SelectItem value="Indoor">Indoor</SelectItem>
                      <SelectItem value="Outdoor">Outdoor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
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

              <div className="space-y-2">
                <Label>Upload Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setSelectedCourt({
                      ...selectedCourt,
                      image: e.target.files[0],
                    })
                  }
                />
              </div>

              <DialogFooter className="pt-4">
                <Button type="submit" className="w-full">
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
