"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, DollarSign, Calendar, Search, Home, Settings, User } from "lucide-react"

const courtsData = [
  {
    id: 1,
    name: "Sunrise Sports Arena",
    location: "Karachi",
    rating: 4.7,
    price: 1500,
    established: 2018,
    facilities: ["Parking", "Flood Lights", "Changing Rooms"],
    image: "https://images.unsplash.com/photo-1600508774582-3a8c6b9c9a2c?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    name: "Elite Tennis Club",
    location: "Lahore",
    rating: 4.5,
    price: 1200,
    established: 2016,
    facilities: ["Locker Room", "Cafeteria", "Parking"],
    image: "https://images.unsplash.com/photo-1600093463592-3c8c1c1e7d64?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Courtify Arena",
    location: "Islamabad",
    rating: 4.9,
    price: 2000,
    established: 2020,
    facilities: ["Indoor Court", "Showers", "AC Hall"],
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "PowerPlay Sports Complex",
    location: "Faisalabad",
    rating: 4.3,
    price: 1000,
    established: 2015,
    facilities: ["Free WiFi", "Cafeteria", "Parking"],
    image: "https://images.unsplash.com/photo-1505842465776-3d90f616310d?auto=format&fit=crop&w=800&q=60",
  },
]

export default function FilterCourts() {
  const [search, setSearch] = useState("")

  const filteredCourts = courtsData.filter(
    (court) =>
      court.name.toLowerCase().includes(search.toLowerCase()) ||
      court.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#030712] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a]/70 border-r border-blue-700/30 backdrop-blur-md p-6 flex flex-col justify-between sticky top-0 min-h-screen">
        <div>
          <h1 className="text-2xl font-bold text-blue-500 mb-8 tracking-wide">Courtify</h1>
          <nav className="space-y-3">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-blue-400 hover:bg-blue-600/10">
              <Home className="mr-2 h-5 w-5" /> Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-blue-400 hover:bg-blue-600/10">
              <User className="mr-2 h-5 w-5" /> Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-blue-400 hover:bg-blue-600/10">
              <Settings className="mr-2 h-5 w-5" /> Settings
            </Button>
          </nav>
        </div>
        <p className="text-gray-500 text-sm">© 2025 Courtify</p>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-10 py-8 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-blue-500">Find Your Court</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5">
            + Add Court
          </Button>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10 relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by court name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#11182f] text-white placeholder-gray-400 border border-blue-700 pl-10 focus-visible:ring-blue-600 focus-visible:border-blue-600"
          />
        </div>

        {/* Courts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourts.map((court) => (
            <Card
              key={court.id}
              className="bg-[#0f172a]/60 border border-blue-800/40 backdrop-blur-xl rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              <img src={court.image} alt={court.name} className="w-full h-48 object-cover" />
              <CardContent className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-blue-400">{court.name}</h2>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={18} fill="gold" /> {court.rating}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin size={16} /> <span>{court.location}</span>
                </div>

                <div className="flex items-center gap-2 text-blue-400">
                  <DollarSign size={16} /> <span>{court.price} / hour</span>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={15} /> Established: {court.established}
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {court.facilities.map((f, i) => (
                    <Badge
                      key={i}
                      className="bg-blue-600/20 text-blue-300 border border-blue-700/30 rounded-lg"
                    >
                      {f}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4 text-white font-semibold rounded-xl">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourts.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No courts found.</p>
        )}
      </main>
    </div>
  )
}
