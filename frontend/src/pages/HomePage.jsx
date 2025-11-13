import React from "react"
import FacilitiesGrid from ".././components/FacilitiesGrid.jsx"
import { Header } from "@/components/Header"
import FAQSection from "@/components/FAQSection"

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 bg-black " >
        <Header/>
      {/* Hero Section */}
      <section
  className="relative text-white py-20 text-center flex flex-col items-center justify-center overflow-hidden pt-10"
  style={{
    backgroundImage: `url('https://media.istockphoto.com/id/1149063259/photo/indoor-soccer-sports-hall.jpg?s=612x612&w=0&k=20&c=19WYnAJCnfuxRxLpzLtHDXKVbUpYj3H_uj-IMBE4qiM=')`, // 👈 apni image ka path
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

  {/* Content */}
  <div className="relative z-10 px-4">
    <h1 className="text-5xl font-bold mb-4">
      Welcome to <span className="text-blue-400">Courtify</span>
    </h1>
    <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
      Your one-stop platform to book, manage, and play at the best futsal courts around you.
    </p>
    <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-full transition-all cursor-pointer">
      Book a Court Now
    </button>
  </div>
</section>

      {/*Why Courtify Section */}
      <section className="bg-black text-white py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Left Content */}
      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Why Choose <span className="text-blue-400">Courtify?</span>
        </h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Courtify is built for the futsal community. We connect players with
          premium courts, streamline bookings, and help venue owners manage
          their operations seamlessly. No hassle, no delays—just great futsal.
        </p>

        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1.5">•</span>
            Instant booking confirmation and reminders
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1.5">•</span>
            Access to premium courts across multiple locations
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1.5">•</span>
            Secure payment and transparent pricing
          </li>
        </ul>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src='https://www.arenajoondalup.com.au/images/default-source/arena-joondalup/sport/aj9q8743.jpg?sfvrsn=80464edf_7&Quality=High&Method=CropCropArguments&ScaleUp=true&Width=960&Height=511&Signature=C8266C3C741F7360579EC604D9A84A2BB28F700D'
          alt="Futsal Team Celebrating"
          className="rounded-2xl shadow-lg max-w-md w-full object-cover"
        />
      </div>
    </section>

      {/* Facilities Section */}
      <main className="p-6 bg-black">
        <FacilitiesGrid />
      </main>

      {/* CTA Section */}
      <section className="text-center py-16 bg-black rounded-md text-white ">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Ready to Play?</h2>
        <p className=" mb-6">
          Join thousands of players already booking their favorite courts with Courtify.
        </p>
        <button className="bg-blue-600 hover:bg-blue-400 text-white font-semibold py-3 px-8 rounded-full cursor-pointer">
          Get Started
        </button>
      </section>
      <FAQSection/>

      {/* Footer */}
      <footer className="text-center bg-black text-white">
        <p>© {new Date().getFullYear()} Courtify. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage
