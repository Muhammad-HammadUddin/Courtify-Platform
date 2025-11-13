import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

export default function AddCourt() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    courtName: "",
    location: "",
    pricePerHour: "",
    openTime: "08:00",
    closeTime: "22:00",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.courtName || !formData.location || !formData.pricePerHour) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: `${formData.courtName} has been added successfully.`,
    });

    setFormData({
      courtName: "",
      location: "",
      pricePerHour: "",
      openTime: "08:00",
      closeTime: "22:00",
      description: "",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Add New Court</h2>
        <p className="text-muted-foreground mt-1">Create a new sports facility listing</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Court Information</CardTitle>
          <CardDescription>Fill in the details for your new court</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="courtName">Court Name *</Label>
                <Input
                  id="courtName"
                  name="courtName"
                  placeholder="e.g., Downtown Sports Complex"
                  value={formData.courtName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., 123 Main St, City"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pricePerHour">Price per Hour (USD) *</Label>
                <Input
                  id="pricePerHour"
                  name="pricePerHour"
                  type="number"
                  placeholder="e.g., 25"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courtType">Court Type</Label>
                <Select onValueChange={(value) => handleSelectChange("courtType", value)}>
                  <SelectTrigger id="courtType">
                    <SelectValue placeholder="Select court type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tennis">Tennis</SelectItem>
                    <SelectItem value="basketball">Basketball</SelectItem>
                    <SelectItem value="volleyball">Volleyball</SelectItem>
                    <SelectItem value="badminton">Badminton</SelectItem>
                    <SelectItem value="multi">Multi-purpose</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="openTime">Opening Time</Label>
                <Input id="openTime" name="openTime" type="time" value={formData.openTime} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="closeTime">Closing Time</Label>
                <Input id="closeTime" name="closeTime" type="time" value={formData.closeTime} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Add details about your court (amenities, facilities, etc.)"
                value={formData.description}
                onChange={handleChange}
                className="min-h-32"
              />
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-3">
              <Upload className="w-10 h-10 text-muted-foreground mx-auto" />
              <div>
                <p className="font-medium text-foreground">Upload Court Photo</p>
                <p className="text-sm text-muted-foreground">Drag and drop or click to select a photo</p>
              </div>
              <Button variant="outline" size="sm" type="button">
                Choose File
              </Button>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Save Court
              </Button>
              <Button type="button" variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
