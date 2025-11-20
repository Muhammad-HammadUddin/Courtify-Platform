import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import axiosInstance from "../../utils/axios.js";
import { toast as reactToast } from "react-toastify";

export default function AddCourt() {
  const { toast } = useToast(); // keep if you use custom toast somewhere else
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    courtName: "",
    location: "",
    pricePerHour: "",
    openTime: "08:00",
    closeTime: "22:00",
    description: "",
    courtType: "tennis",
  });

  // ---------- Input Handler ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      courtType: value,
    }));
  };

  // ---------- Cloudinary Upload ----------
  async function uploadToCloudinary(file) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: fd,
      }
    );

    if (!res.ok) throw new Error("Cloudinary upload failed");

    const data = await res.json();
    return data.secure_url;
  }

  // ---------- Submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!imageFile) {
        reactToast.error("Please upload a court image.");
        return;
      }

      if (!formData.courtName || !formData.location || !formData.pricePerHour) {
        reactToast.error("Please fill all required fields.");
        return;
      }

      // Upload Image
      const uploadedImageURL = await uploadToCloudinary(imageFile);

      const payload = {
        name: formData.courtName.trim(),
        location: formData.location.trim(),
        hourly_rate: Number(formData.pricePerHour),
        opening_time: formData.openTime,
        closing_time: formData.closeTime,
        description: formData.description.trim(),
        type: formData.courtType,
        image_url: uploadedImageURL,
      };

      const res = await axiosInstance.post("/courts/register", payload, {
        withCredentials: true,
      });

      if (res.status === 201) {
        reactToast.success(res.data.message);
      } else {
        reactToast.error(res.data.message || "Failed to add court.");
      }

      // Reset Form
      setFormData({
        courtName: "",
        location: "",
        pricePerHour: "",
        openTime: "08:00",
        closeTime: "22:00",
        description: "",
        courtType: "tennis",
      });
      setImageFile(null);

    } catch (err) {
      if (err.response?.data?.message) {
        reactToast.error(err.response.data.message);
      } else {
        reactToast.error("Failed to add court. Please try again.");
      }
      console.error("SUBMIT ERROR:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Add New Court</h2>
        <p className="text-muted-foreground mt-1">
          Create a new sports facility listing
        </p>
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
                <Label>Court Name *</Label>
                <Input
                  name="courtName"
                  value={formData.courtName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Location *</Label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Price per Hour *</Label>
                <Input
                  name="pricePerHour"
                  type="number"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Court Type</Label>
                <Select
                  value={formData.courtType}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
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
                <Label>Opening Time</Label>
                <Input
                  name="openTime"
                  type="time"
                  value={formData.openTime}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Closing Time</Label>
                <Input
                  name="closeTime"
                  type="time"
                  value={formData.closeTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="min-h-32"
              />
            </div>

            {/* Image Upload */}
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-3">
              <Upload className="w-10 h-10 text-muted-foreground mx-auto" />

              <p className="font-medium text-foreground">Upload Court Photo</p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="hidden"
                id="courtImage"
              />

              <Button variant="outline" size="sm" type="button">
                <label htmlFor="courtImage" className="cursor-pointer">
                  Choose File
                </label>
              </Button>

              {imageFile && (
                <p className="text-sm text-green-600">
                  Selected: {imageFile.name}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Save Court
              </Button>

              <Button type="button" variant="outline" className="flex-1" onClick={() => {
                setFormData({
                  courtName: "",
                  location: "",
                  pricePerHour: "",
                  openTime: "08:00",
                  closeTime: "22:00",
                  description: "",
                  courtType: "tennis",
                });
                setImageFile(null);
              }}>
                Cancel
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
 