"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  User,
  Contact,
  FileText,
  CreditCard,
  Package,
  Users,
  Dumbbell,
  BarChart2,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  icon: React.ElementType
  label: string
  href: string
}

export default function Sidebar() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: User, label: "Profile", href: "/admin/profile" },
    { icon: Contact, label: "Memberships", href: "/admin/member_ships" },
    { icon: Package, label: "Inventory", href: "/admin/inventory" },
    { icon: Users, label: "Members", href: "/admin/members" },
    { icon: Users, label: "Staffs", href: "/admin/staffs" },
    { icon: Dumbbell, label: "Coaches", href: "/admin/coaches" },
  ]

  const isActive = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(path)
  }

  return (
    <div className="w-[190px] bg-[#1a1a6c] text-white flex flex-col h-screen">
      {/* Admin Profile */}
      <div className="p-4 flex flex-col items-center text-center border-b border-[#2a2a7c]">
        <div className="w-16 h-16 bg-white rounded-full mb-2 flex items-center justify-center">
          <Image
            src="/coach-long.jpg"
            alt="Admin"
            width={64}
            height={64}
            className="rounded-full object-cover w-full h-full"
          />
        </div>
        <h3 className="font-medium">Administrator</h3>
        <p className="text-xs text-gray-300">abcdefgh@gmail.com</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 hover:bg-white hover:text-[#2a2a7c] rounded-l-lg ml-2 transition-colors",
                  isActive(item.href) && "bg-white text-[#2a2a7c] rounded-l-lg ml-2",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#2a2a7c]">
        <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-[#2a2a7c] transition-colors rounded-md cursor-pointer">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
