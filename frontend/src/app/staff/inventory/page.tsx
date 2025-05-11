"use client"

import { useState } from "react"
import { Search, ArrowUpDown, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Equipment = {
  id: number
  name: string
  total: number
  status: "Active" | "Inactive"
}

export default function InventoryPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [entriesPerPage, setEntriesPerPage] = useState("10")

  const equipments: Equipment[] = [
    { id: 1, name: "Treadmill", total: 1, status: "Active" },
    { id: 2, name: "10 lbs Dumbbell", total: 3, status: "Inactive" },
    { id: 3, name: "5 lbs Dumbbell", total: 6, status: "Active" },
    { id: 4, name: "20 lbs Dumbbell", total: 12, status: "Active" },
  ]

  return (
    <div className="p-0">
      {/* Add Equipment Button */}
      <div className="p-4">
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white text-[#1a1a6c] hover:bg-gray-100 border border-gray-200 cursor-pointer">Add Equipment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-0 border-none">
            <div className="bg-white rounded-lg p-6">
              <DialogTitle className="text-xl font-bold text-[#1a1a6c] mb-4">Add Equipment</DialogTitle>

              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-sm text-blue-600">Attach Photo</span>
                  <Camera className="w-4 h-4 ml-1 text-blue-600" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="equipment-name" className="block text-sm font-medium">
                    Equipment Name
                  </label>
                  <Input id="equipment-name" className="bg-gray-200 border-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="status" className="block text-sm font-medium">
                      Status
                    </label>
                    <Select>
                      <SelectTrigger className="bg-gray-200 border-none">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="total-no" className="block text-sm font-medium">
                      Total No.
                    </label>
                    <Input id="total-no" type="number" className="bg-gray-200 border-none" />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="border-gray-300 cursor-pointer">
                    Cancel
                  </Button>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black cursor-pointer">Save Changes</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Manage Equipments Section */}
      <div className="bg-[#7a7aaa] rounded-lg mx-4 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Manage Equipments</h2>

        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <span className="text-white text-sm mr-2">Show Entries</span>
            <div className="relative">
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="bg-[#6a6a93] text-white border-none w-16">
                  <SelectValue>{entriesPerPage}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#6a6a93] text-white placeholder:text-gray-300 border-none w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
          </div>
        </div>

        {/* Equipment Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-4 font-medium">
                  <div className="flex items-center">
                    <span>Equipment Name</span>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="py-2 px-4 font-medium">Total no.</th>
                <th className="py-2 px-4 font-medium">
                  <div className="flex items-center">
                    <span>Status</span>
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th className="py-2 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((equipment) => (
                <tr key={equipment.id} className="border-t border-[#6a6a93]">
                  <td className="py-3 px-4">{equipment.name}</td>
                  <td className="py-3 px-4">{equipment.total}</td>
                  <td className="py-3 px-4">{equipment.status}</td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white text-[#1a1a6c] hover:bg-gray-100 border-none cursor-pointer"
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-6 space-x-2">
          <Button variant="outline" size="sm" className="bg-[#6a6a93] text-white hover:bg-[#5a5a83] border-none cursor-pointer">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-[#6a6a93] text-white hover:bg-[#5a5a83] border-none cursor-pointer">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
