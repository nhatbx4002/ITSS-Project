"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Edit, Trash2 } from "lucide-react"

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
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
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

  const [form, setForm] = useState({
    name: "",
    code: "",
    startDate: "",
    duration: "",
    trainingType: "",
    sessionsCompleted: 0,
    sessionsRegistered: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name.includes("sessions") ? Number(value) : value })
  }

  const handleEditClick = (coach: Coach) => {
    setSelectedCoach(coach)
    setForm({
      name: coach.name,
      code: coach.code,
      startDate: coach.startDate,
      duration: coach.duration,
      trainingType: coach.trainingType,
      sessionsCompleted: coach.sessionsCompleted,
      sessionsRegistered: coach.sessionsRegistered,
    })
    setIsEditOpen(true)
  }

  const handleSave = () => {
    if (selectedCoach) {
      const updatedCoach = {
        ...selectedCoach,
        name: form.name,
        code: form.code,
        startDate: form.startDate,
        duration: form.duration,
        trainingType: form.trainingType,
        sessionsCompleted: form.sessionsCompleted,
        sessionsRegistered: form.sessionsRegistered,
      }
      const updatedCoaches = coaches.map((coach) => (coach.id === selectedCoach.id ? updatedCoach : coach))
      setCoaches(updatedCoaches)
      setIsEditOpen(false)
      setSelectedCoach(null)
      setForm({
        name: "",
        code: "",
        startDate: "",
        duration: "",
        trainingType: "",
        sessionsCompleted: 0,
        sessionsRegistered: 0,
      })
    }
  }

  const handleAdd = () => {
    const newCoach: Coach = {
      id: Math.max(...coaches.map((c) => c.id)) + 1,
      name: form.name,
      code: form.code,
      startDate: form.startDate,
      duration: form.duration,
      trainingType: form.trainingType,
      sessionsCompleted: form.sessionsCompleted,
      sessionsRegistered: form.sessionsRegistered,
    }
    setCoaches([...coaches, newCoach])
    setIsAddOpen(false)
    setForm({
      name: "",
      code: "",
      startDate: "",
      duration: "",
      trainingType: "",
      sessionsCompleted: 0,
      sessionsRegistered: 0,
    })
  }

  const handleDelete = () => {
    if (selectedCoach) {
      const updatedCoaches = coaches.filter((coach) => coach.id !== selectedCoach.id)
      setCoaches(updatedCoaches)
      setIsDeleteOpen(false)
      setSelectedCoach(null)
    }
  }

  const filteredCoaches = coaches.filter(
    (coach) =>
      coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.trainingType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coaches</h1>
        <Button onClick={() => setIsAddOpen(true)} className="cursor-pointer">
          + Add Coach
        </Button>
      </div>

      {/* Add Coach Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Coach</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="add-coach-name">Coach Name</Label>
              <Input id="add-coach-name" name="name" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="add-coach-code">Coach ID</Label>
              <Input id="add-coach-code" name="code" value={form.code} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="add-start-date">Start Date</Label>
              <Input id="add-start-date" name="startDate" type="date" value={form.startDate} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="add-duration">Length of Service</Label>
              <Input id="add-duration" name="duration" value={form.duration} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="add-training-type">Training Type</Label>
              <Input id="add-training-type" name="trainingType" value={form.trainingType} onChange={handleChange} />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="add-sessions-completed">Sessions Completed</Label>
                <Input
                  id="add-sessions-completed"
                  name="sessionsCompleted"
                  type="number"
                  value={form.sessionsCompleted}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="add-sessions-registered">Sessions Registered</Label>
                <Input
                  id="add-sessions-registered"
                  name="sessionsRegistered"
                  type="number"
                  value={form.sessionsRegistered}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsAddOpen(false)} variant="outline" className="cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleAdd} className="cursor-pointer">Add Coach</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Coach</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="coach-name">Coach Name</Label>
              <Input id="coach-name" name="name" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="coach-code">Coach ID</Label>
              <Input id="coach-code" name="code" value={form.code} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input id="start-date" name="startDate" type="date" value={form.startDate} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="duration">Length of Service</Label>
              <Input id="duration" name="duration" value={form.duration} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="training-type">Training Type</Label>
              <Input id="training-type" name="trainingType" value={form.trainingType} onChange={handleChange} />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="sessions-completed">Sessions Completed</Label>
                <Input
                  id="sessions-completed"
                  name="sessionsCompleted"
                  type="number"
                  value={form.sessionsCompleted}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="sessions-registered">Sessions Registered</Label>
                <Input
                  id="sessions-registered"
                  name="sessionsRegistered"
                  type="number"
                  value={form.sessionsRegistered}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsEditOpen(false)} variant="outline" className="cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleSave} className="cursor-pointer">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Coach</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete "{selectedCoach?.name}"? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)} className="cursor-pointer">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} className="cursor-pointer">
              Delete
            </Button>
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
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => handleEditClick(coach)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                          onClick={() => {
                            setSelectedCoach(coach)
                            setIsDeleteOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
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
