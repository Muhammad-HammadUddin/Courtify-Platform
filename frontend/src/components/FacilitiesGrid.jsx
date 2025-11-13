
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const FacilitiesGrid = () => {
  const items = [
    { title: "Indo & Outdoor", desc: "All-weather indoor turf and open-air outdoor courts." },
    { title: "Premium Turf", desc: "Shock-absorbing, non-slip surfaces for safe, fast play." },
    { title: "LED Lighting", desc: "Even, glare-free illumination for night matches." },
    { title: "Locker Rooms", desc: "Secure lockers, showers, and changing facilities." },
    { title: "Hydration & Cafe", desc: "Water refill stations and on-site refreshments." },
    { title: "Free Parking", desc: "Ample, well-lit parking adjacent to courts." },
    { title: "Equipment Rental", desc: "Balls, bibs, cones, and goalkeeper gloves available." },
    { title: "First Aid", desc: "Trained staff and first-aid kits on premises." },
  ]



  return (
    <section className="mx-auto w-full max-w-6xl  mt-10 bg-black">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-blue-400">Facilities & Amenities</h2>
        <p className="mt-2 text-gray-500">
          Everything you need for a great futsal experience—before, during, and after the match.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 bg-accent p-4 rounded-lg bg-black">
        {items.map((it) => (
          <Card key={it.title} className="h-full bg-black  text-white">
            <CardHeader>
              <CardTitle className="text-lg text-blue-200">{it.title}</CardTitle>
              <CardDescription>{it.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={`https://source.unsplash.com/320x120/?${encodeURIComponent(it.title)}`}
                alt={`${it.title} illustration`}
                className="h-28 w-full rounded-md border object-cover"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default FacilitiesGrid
