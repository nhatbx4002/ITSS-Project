"use client"

import { usePathname } from "next/navigation"
import AdminSidebar from "@/components/sidebar/AdminSideBar"
import CoachSidebar from "@/components/sidebar/CoachSideBar"
import StaffSidebar from "@/components/sidebar/StaffSidebar"
import MemberSidebar from "@/components/sidebar/MemberSidebar"

export default function Sidebar() {
  const pathname = usePathname()

  // Xác định loại sidebar dựa vào đường dẫn URL
  if (pathname.startsWith("/coach")) {
    return <CoachSidebar />
  }

  if (pathname.startsWith("/staff")) {
    return <StaffSidebar />
  }

  if (pathname.startsWith("/member")) {
    return <MemberSidebar />
  }

  if (pathname.startsWith("/admin")) {
    return <AdminSidebar />
  }

  // Mặc định hiển thị AdminSidebar
  return <StaffSidebar />
}
