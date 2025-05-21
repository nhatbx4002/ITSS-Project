"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  User,
  ClipboardList,
  FileText,
  CreditCard,
  Package,
  Users,
  Dumbbell,
  BarChart2,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useSession } from "next-auth/react" 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "next-auth/react";

type NavItem = {
  icon: React.ElementType
  label: string
  href: string
}

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const getInitials = (name?: string | null) => {
    if (!name) return "Coach"; // Mặc định nếu không có tên
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const userName = session?.user?.name || session?.user?.email || "Admin";
  const userEmail = session?.user?.email || "N/A"; 
  const userImage = session?.user?.image;


  const navItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/coach" },
    { icon: User, label: "Profile", href: "/coach/profile" },
    { icon: Users, label: "My Members", href: "/coach/members" },
    { icon: FileText, label: "Plan", href: "/coach/plan" },
    { icon: BarChart2, label: "Feedback", href: "/coach/feedback" },
  ]

  const isActive = (path: string) => {
    if (path === "/coach") {
      return pathname === "/coach"
    }
    return pathname.startsWith(path)
  }

  return (
    <div className="w-[190px] bg-[#1a1a6c] text-white flex flex-col h-screen">
      {/* Admin Profile */}
      <div className="p-4 flex flex-col items-center text-center border-b border-[#2a2a7c]">
        <Avatar className="w-16 h-16 mb-2"> {/* Sử dụng Avatar */}
          {userImage && (
            <AvatarImage src={userImage} alt={userName} className="object-cover" />
          )}
          <AvatarFallback className="bg-white text-[#2a2a7c] font-bold">
            {getInitials(userName)} {/* Hiển thị chữ cái đầu tên */}
          </AvatarFallback>
        </Avatar>

        {status === 'authenticated' ? (
          <>
            <h3 className="font-medium">{userName}</h3>
            <p className="text-xs text-gray-300">{userEmail}</p>
          </>
        ) : (
          <>
            <h3 className="font-medium">Loading...</h3>
            <p className="text-xs text-gray-300">...</p>
          </>
        )}
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
        <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-[#2a2a7c] transition-colors rounded-md cursor-pointer" onClick={() => signOut({ callbackUrl: '/' })}>
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
