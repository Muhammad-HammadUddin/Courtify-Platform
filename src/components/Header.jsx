"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate=useNavigate()

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-black/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg ">
            <span className="text-lg font-bold text-white">
              <img src={logo} alt="Courtify Logo" className="h-15 w-15"/>
              
            </span>
          </div>
          <span className="text-xl font-bold text-white">Courtify</span>
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" className="text-white hover:bg-white/10"  onClick={() => navigate('/auth/login')}>
            Login
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white"  onClick={() => navigate('/auth/signup')}>
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-blue-400" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-primary/10 bg-black md:hidden">
          <div className="flex flex-col gap-2 px-6 py-4">
            <Button variant="ghost" className="w-full text-white hover:bg-white/10" onClick={() => navigate('/auth/login')}>

              Login
            </Button>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"  onClick={() => navigate('/auth/signup')}>
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
