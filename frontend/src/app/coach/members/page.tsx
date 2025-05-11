"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"

// Định nghĩa kiểu dữ liệu cho Member
interface Member {
  id: number
  name: string
  code: string
  startDate: string
  duration: string
  trainingType: string
  sessionsCompleted: number
  sessionsRegistered: number
}

export default function MembersPage() {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "James Medalla",
      code: "SFM001",
      startDate: "2023-01-15",
      duration: "12 months",
      trainingType: "Gym",
      sessionsCompleted: 20,
      sessionsRegistered: 24,
    },
    {
      id: 2,
      name: "Kent Chari Mabatas",
      code: "SFM002",
      startDate: "2023-02-20",
      duration: "6 months",
      trainingType: "Yoga",
      sessionsCompleted: 12,
      sessionsRegistered: 18,
    },
    {
      id: 3,
      name: "John Elmer Rodrigo",
      code: "SFM003",
      startDate: "2023-03-10",
      duration: "3 months",
      trainingType: "Weight Loss",
      sessionsCompleted: 10,
      sessionsRegistered: 12,
    },
    {
      id: 4,
      name: "Maria Santos",
      code: "SFM004",
      startDate: "2023-04-05",
      duration: "1 month",
      trainingType: "Gym",
      sessionsCompleted: 4,
      sessionsRegistered: 8,
    },
    {
      id: 5,
      name: "Robert Lee",
      code: "SFM005",
      startDate: "2022-12-22",
      duration: "12 months",
      trainingType: "Yoga",
      sessionsCompleted: 28,
      sessionsRegistered: 30,
    },
  ])

  const handleEditClick = (member: Member) => {
    setSelectedMember(member)
    setIsEditOpen(true)
  }

  const handleInputChange = (field: keyof Member, value: number | string) => {
    if (selectedMember) {
      setSelectedMember({ ...selectedMember, [field]: value })
    }
  }

  const handleSave = () => {
    if (selectedMember) {
      // Cập nhật dữ liệu của thành viên trong mảng members
      const updatedMembers = members.map((member) => (member.id === selectedMember.id ? selectedMember : member))
      setMembers(updatedMembers)
      setIsEditOpen(false)
    }
  }

  // Lọc danh sách thành viên theo từ khóa tìm kiếm
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.trainingType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Members</h1>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="member-name" className="mb-1">
                Member Name
              </Label>
              <Input id="member-name" value={selectedMember?.name || ""} disabled />
            </div>
            <div>
              <Label htmlFor="member-code" className="mb-1">
                Member Code
              </Label>
              <Input id="member-code" value={selectedMember?.code || ""} disabled />
            </div>
            <div>
              <Label htmlFor="start-date" className="mb-1">
                Start Date
              </Label>
              <Input id="start-date" type="date" value={selectedMember?.startDate || ""} disabled />
            </div>
            <div>
              <Label htmlFor="duration" className="mb-1">
                Length of Membership
              </Label>
              <Input id="duration" value={selectedMember?.duration || ""} disabled />
            </div>
            <div>
              <Label htmlFor="training-type" className="mb-1">
                Training Type
              </Label>
              <Input id="training-type" value={selectedMember?.trainingType || ""} disabled />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="sessions-completed" className="mb-1">
                  Sessions Completed
                </Label>
                <Input
                  id="sessions-completed"
                  type="number"
                  value={selectedMember?.sessionsCompleted || 0}
                  onChange={(e) => handleInputChange("sessionsCompleted", Number.parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="sessions-registered" className="mb-1">
                  Sessions Registered
                </Label>
                <Input
                  id="sessions-registered"
                  type="number"
                  value={selectedMember?.sessionsRegistered || 0}
                  disabled
                />
              </div>
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
            <CardTitle>All Members</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Input
                  placeholder="Search members..."
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
                  <th className="text-left py-3 px-4 font-medium">Member Name</th>
                  <th className="text-left py-3 px-4 font-medium">Member Code</th>
                  <th className="text-left py-3 px-4 font-medium">Start Date</th>
                  <th className="text-left py-3 px-4 font-medium">Length of Membership</th>
                  <th className="text-left py-3 px-4 font-medium">Training Type</th>
                  <th className="text-left py-3 px-4 font-medium">Sessions</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member, index) => (
                  <tr key={member.id} className="border-b">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{member.name}</td>
                    <td className="py-3 px-4">{member.code}</td>
                    <td className="py-3 px-4">{member.startDate}</td>
                    <td className="py-3 px-4">{member.duration}</td>
                    <td className="py-3 px-4">{member.trainingType}</td>
                    <td className="py-3 px-4">
                      {member.sessionsCompleted} / {member.sessionsRegistered}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => handleEditClick(member)}
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
