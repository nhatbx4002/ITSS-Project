"use client"

import type React from "react"
import { Bell } from "lucide-react"
import Image from "next/image"
import Sidebar from "@/components/sidebar/sidebar"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <header className="bg-white p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Stamina Fitness Logo"
              width={60}
              height={60}
              className="mr-2"
            />
            <h1 className="text-2xl font-bold text-[#1a1a6c]">STAMINA FITNESS</h1>
          </div>
        </header>

        {children}
      </div>
    </div>
  )
}
