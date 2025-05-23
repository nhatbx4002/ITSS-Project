"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PencilIcon } from "lucide-react"

export default function StaffProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#1a1a6c] mb-6">Staff Information</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-[#1a1a6c] rounded-full flex items-center justify-center mb-2">
            <Image
              src="/coach-long.jpg"
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2">
            <p className="text-gray-600">Fullname</p>
            <p className="font-medium">Nguyen Van A</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-gray-600">ID</p>
            <p className="font-medium">SFT001</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-gray-600">Date of birth:</p>
            <p className="font-medium">01/01/2025</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-gray-600">Contact no.</p>
            <p className="font-medium">09123456789</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-gray-600">Email Address:</p>
            <p className="font-medium">abcdefgh@gmail.com</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-gray-600">Start Date:</p>
            <p className="font-medium">01/01/2024</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-gray-600">Role:</p>
            <p className="font-medium">Staff</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-gray-600">Length of Service:</p>
            <p className="font-medium">1.5 Years</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card - Profile Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-[#1a1a6c] mb-4">Change Infomation</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Fullname
              </label>
              <Input id="username" defaultValue="Nguyen Van A" className="bg-gray-100" />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium mb-1">
                Contact No.
              </label>
              <Input id="contact" defaultValue="09123456789" className="bg-gray-100" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <Input id="email" type="email" defaultValue="abcdefgh@gmail.com" className="bg-gray-100" />
            </div>

          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button className="bg-[#1a1a6c] cursor-pointer">Save</Button>
            <Button variant="outline" className="cursor-pointer">Cancel</Button>
          </div>
        </div>

        {/* Right Column - Edit Forms */}
        <div className="space-y-6">
          {/* Edit Profile Form */}


          {/* Password Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-[#1a1a6c] mb-4">Password</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <Input id="current-password" type="password" className="bg-gray-100" />
              </div>

              <div>
                <label htmlFor="new-password" className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <Input id="new-password" type="password" className="bg-gray-100" />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
                  Re-type Password
                </label>
                <Input id="confirm-password" type="password" className="bg-gray-100" />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button className="bg-[#1a1a6c] cursor-pointer">Save</Button>
              <Button variant="outline" className="cursor-pointer">Clear</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
