"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"

// Định nghĩa kiểu dữ liệu cho Coach
interface Coach {
  id: number
  name: string
  code: string
  startDate: string
  duration: string
  trainingType: string
  sessionsCompleted: number
  sessionsRegistered: number
}

export default function CoachesPage() {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [coaches, setCoaches] = useState<Coach[]>([
    {
      id: 1,
      name: "James Medalla",
      code: "SFC001",
      startDate: "2023-01-15",
      duration: "12 months",
      trainingType: "Gym",
      sessionsCompleted: 20,
      sessionsRegistered: 24,
    },
    {
      id: 2,
      name: "Kent Chari Mabatas",
      code: "SFC002",
      startDate: "2023-02-20",
      duration: "6 months",
      trainingType: "Yoga",
      sessionsCompleted: 12,
      sessionsRegistered: 18,
    },
    {
      id: 3,
      name: "John Elmer Rodrigo",
      code: "SFC003",
      startDate: "2023-03-10",
      duration: "3 months",
      trainingType: "Weight Loss",
      sessionsCompleted: 10,
      sessionsRegistered: 12,
    },
    {
      id: 4,
      name: "Maria Santos",
      code: "SFC004",
      startDate: "2023-04-05",
      duration: "1 month",
      trainingType: "Gym",
      sessionsCompleted: 4,
      sessionsRegistered: 8,
    },
    {
      id: 5,
      name: "Robert Lee",
      code: "SFC005",
      startDate: "2022-12-22",
      duration: "12 months",
      trainingType: "Yoga",
      sessionsCompleted: 28,
      sessionsRegistered: 30,
    },
  ])

  const handleEditClick = (coach: Coach) => {
    setSelectedCoach(coach)
    setIsEditOpen(true)
  }

  const handleInputChange = (field: keyof Coach, value: number | string) => {
    if (selectedCoach) {
      setSelectedCoach({ ...selectedCoach, [field]: value })
    }
  }

  const handleSave = () => {
    if (selectedCoach) {
      const updatedCoaches = coaches.map((coach) => (coach.id === selectedCoach.id ? selectedCoach : coach))
      setCoaches(updatedCoaches)
      setIsEditOpen(false)
    }
  }

  const filteredCoaches = coaches.filter(
    (coach) =>
      coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.trainingType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coaches</h1>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Coach</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="coach-name">Coach Name</Label>
              <Input
                id="coach-name"
                value={selectedCoach?.name || ""}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="coach-code">Coach ID</Label>
              <Input
                id="coach-code"
                value={selectedCoach?.code || ""}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={selectedCoach?.startDate || ""}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="duration">Length of Service</Label>
              <Input
                id="duration"
                value={selectedCoach?.duration || ""}
                disabled />
            </div>
            <div>
              <Label htmlFor="training-type">Training Type</Label>
              <Input
                id="training-type"
                value={selectedCoach?.trainingType || ""}
                onChange={(e) => handleInputChange("trainingType", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsEditOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>All Coaches</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Input
                  placeholder="Search coaches..."
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
                  <th className="text-left py-3 px-4 font-medium">Coach Name</th>
                  <th className="text-left py-3 px-4 font-medium">Coach Code</th>
                  <th className="text-left py-3 px-4 font-medium">Start Date</th>
                  <th className="text-left py-3 px-4 font-medium">Length of Service</th>
                  <th className="text-left py-3 px-4 font-medium">Training Type</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoaches.map((coach, index) => (
                  <tr key={coach.id} className="border-b">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{coach.name}</td>
                    <td className="py-3 px-4">{coach.code}</td>
                    <td className="py-3 px-4">{coach.startDate}</td>
                    <td className="py-3 px-4">{coach.duration}</td>
                    <td className="py-3 px-4">{coach.trainingType}</td>

                    <td className="py-3 px-4 text-right">
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(coach)}>
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
