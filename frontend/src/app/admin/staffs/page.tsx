"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"

// Định nghĩa kiểu dữ liệu cho Staff
interface Staff {
  id: number
  name: string
  code: string
  startDate: string
  duration: string
  salary: number
  sessionsCompleted: number
  sessionsRegistered: number
}

export default function StaffsPage() {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [staffs, setStaffs] = useState<Staff[]>([
    {
      id: 1,
      name: "James Medalla",
      code: "SFM001",
      startDate: "2023-01-15",
      duration: "12 months",
      salary: 1000,
      sessionsCompleted: 20,
      sessionsRegistered: 24,
    },
    {
      id: 2,
      name: "Kent Chari Mabatas",
      code: "SFM002",
      startDate: "2023-02-20",
      duration: "6 months",
      salary: 1000,
      sessionsCompleted: 12,
      sessionsRegistered: 18,
    },
    {
      id: 3,
      name: "John Elmer Rodrigo",
      code: "SFM003",
      startDate: "2023-03-10",
      duration: "3 months",
      salary: 1000,
      sessionsCompleted: 10,
      sessionsRegistered: 12,
    },
    {
      id: 4,
      name: "Maria Santos",
      code: "SFM004",
      startDate: "2023-04-05",
      duration: "1 month",
      salary: 1000,
      sessionsCompleted: 4,
      sessionsRegistered: 8,
    },
    {
      id: 5,
      name: "Robert Lee",
      code: "SFM005",
      startDate: "2022-12-22",
      duration: "12 months",
      salary: 1000,
      sessionsCompleted: 28,
      sessionsRegistered: 30,
    },
  ])

  const handleEditClick = (staff: Staff) => {
    setSelectedStaff(staff)
    setIsEditOpen(true)
  }

  const handleInputChange = (field: keyof Staff, value: number | string) => {
    if (selectedStaff) {
      setSelectedStaff({ ...selectedStaff, [field]: value })
    }
  }

  const handleSave = () => {
    if (selectedStaff) {
      const updatedStaffs = staffs.map((staff) =>
        staff.id === selectedStaff.id ? selectedStaff : staff,
      )
      setStaffs(updatedStaffs)
      setIsEditOpen(false)
    }
  }

  const filteredStaffs = staffs.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staffs</h1>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Staff</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="staff-name" className="mb-1">
                Staff Name
              </Label>
              <Input id="staff-name" value={selectedStaff?.name || ""} disabled />
            </div>
            <div>
              <Label htmlFor="staff-code" className="mb-1">
                Staff Code
              </Label>
              <Input id="staff-code" value={selectedStaff?.code || ""} disabled />
            </div>
            <div>
              <Label htmlFor="start-date" className="mb-1">
                Start Date
              </Label>
              <Input id="start-date" type="date" value={selectedStaff?.startDate || ""} disabled />
            </div>
            <div>
              <Label htmlFor="training-type" className="mb-1">
                Salary
              </Label>
              <Input id="training-type" value={selectedStaff?.salary || ""}
                onChange={(e) => handleInputChange("sessionsCompleted", Number.parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsEditOpen(false)} variant="outline" className="cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleSave} className="cursor-pointer">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>All Staffs</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Input
                  placeholder="Search staffs..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">#</th>
                  <th className="text-left py-3 px-4 font-medium">Staff Name</th>
                  <th className="text-left py-3 px-4 font-medium">Staff Code</th>
                  <th className="text-left py-3 px-4 font-medium">Start Date</th>
                  <th className="text-left py-3 px-4 font-medium">Length of Service</th>
                  <th className="text-left py-3 px-4 font-medium">Salary</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaffs.map((staff, index) => (
                  <tr key={staff.id} className="border-b">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{staff.name}</td>
                    <td className="py-3 px-4">{staff.code}</td>
                    <td className="py-3 px-4">{staff.startDate}</td>
                    <td className="py-3 px-4">{staff.duration}</td>
                    <td className="py-3 px-4">{staff.salary} $</td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => handleEditClick(staff)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
