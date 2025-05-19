"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, BarChart2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Type definitions
interface Member {
  id: number
  name: string
  progress: number
  goal: string
  lastSession: string
  nextSession: string | null
  notes: string
}

interface TrainingSession {
  id: number
  memberId: number
  memberName: string
  date: Date
  startTime: string
  endTime: string
  type: string
  notes: string
}

interface NewSession {
  memberId: number | null
  date: string
  startTime: string
  endTime: string
  type: string
  notes: string
}

// Date helper functions
function getWeekDays(date: Date): Date[] {
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
  const monday = new Date(date.setDate(diff))

  const weekDays: Date[] = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday)
    day.setDate(monday.getDate() + i)
    weekDays.push(day)
  }

  return weekDays
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "2-digit" })
}

function formatDateForInput(date: Date): string {
  return date.toISOString().split("T")[0]
}

function formatDayName(date: Date): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return days[date.getDay()]
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export default function ProgressTrackingPage() {
  const [activeTab, setActiveTab] = useState("schedule")
  const [selectedDate] = useState(new Date())
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false)
  const [sessions, setSessions] = useState<TrainingSession[]>([])
  const [newSession, setNewSession] = useState<NewSession>({
    memberId: null,
    date: formatDateForInput(new Date()),
    startTime: "08:00",
    endTime: "09:00",
    type: "Gym",
    notes: "",
  })
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  // Sample member data
  const members: Member[] = [
    {
      id: 1,
      name: "James Medalla",
      progress: 75,
      goal: "Build muscle, reduce fat",
      lastSession: "05/10/2023",
      nextSession: "05/15/2023",
      notes: "Good progress with chest and shoulder exercises. Need to focus more on legs.",
    },
    {
      id: 2,
      name: "Kent Chari Mabatas",
      progress: 60,
      goal: "Weight loss",
      lastSession: "05/12/2023",
      nextSession: "05/16/2023",
      notes: "Lost 3kg in the past month. Need to increase cardio.",
    },
    {
      id: 3,
      name: "John Elmer Rodrigo",
      progress: 40,
      goal: "Improve endurance",
      lastSession: "05/08/2023",
      nextSession: null,
      notes: "Just started the program. Need to train with low intensity first.",
    },
    {
      id: 4,
      name: "Maria Santos",
      progress: 90,
      goal: "Competition preparation",
      lastSession: "05/13/2023",
      nextSession: "05/17/2023",
      notes: "In the final phase of the program. Focus on technique.",
    },
    {
      id: 5,
      name: "Robert Lee",
      progress: 25,
      goal: "Injury rehabilitation",
      lastSession: "05/11/2023",
      nextSession: "05/18/2023",
      notes: "Recovering from knee injury. Light training only.",
    },
  ]

  // Initialize sample training sessions
  useEffect(() => {
    setSessions([
      {
        id: 1,
        memberId: 1,
        memberName: "James Medalla",
        date: addDays(new Date(), 1),
        startTime: "08:00",
        endTime: "09:00",
        type: "Gym",
        notes: "Chest and shoulders",
      },
      {
        id: 2,
        memberId: 2,
        memberName: "Kent Chari Mabatas",
        date: addDays(new Date(), 1),
        startTime: "09:30",
        endTime: "10:30",
        type: "Cardio",
        notes: "Running and cycling",
      },
      {
        id: 3,
        memberId: 4,
        memberName: "Maria Santos",
        date: addDays(new Date(), 2),
        startTime: "15:00",
        endTime: "16:30",
        type: "Strength",
        notes: "Back and legs",
      },
      {
        id: 4,
        memberId: 5,
        memberName: "Robert Lee",
        date: addDays(new Date(), 3),
        startTime: "10:00",
        endTime: "11:00",
        type: "Rehabilitation",
        notes: "Injury recovery exercises",
      },
      {
        id: 5,
        memberId: 1,
        memberName: "James Medalla",
        date: addDays(new Date(), 4),
        startTime: "17:00",
        endTime: "18:00",
        type: "Gym",
        notes: "Arms and abs",
      },
    ])
  }, [])

  // Create array of days in the week
  const weekDays = getWeekDays(selectedDate)

  // Filter sessions by day
  const getSessionsByDay = (date: Date) => {
    return sessions.filter((session) => isSameDay(session.date, date))
  }

  // Handle member selection
  const handleMemberChange = (value: string) => {
    const memberId = Number.parseInt(value)
    const member = members.find((m) => m.id === memberId) || null

    setNewSession({
      ...newSession,
      memberId: memberId,
    })

    setSelectedMember(member)
  }

  // Handle adding a new session
  const handleAddSession = () => {
    if (!newSession.memberId) return

    const member = members.find((m) => m.id === newSession.memberId)
    if (!member) return

    const newSessionObj: TrainingSession = {
      id: sessions.length + 1,
      memberId: newSession.memberId,
      memberName: member.name,
      date: new Date(newSession.date),
      startTime: newSession.startTime,
      endTime: newSession.endTime,
      type: newSession.type,
      notes: newSession.notes,
    }

    setSessions([...sessions, newSessionObj])

    // Reset form
    setNewSession({
      memberId: null,
      date: formatDateForInput(new Date()),
      startTime: "08:00",
      endTime: "09:00",
      type: "Gym",
      notes: "",
    })

    setSelectedMember(null)
    setIsAddSessionOpen(false)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Training Progress Management</h1>

      <Tabs defaultValue="schedule" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Training Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Member Progress</span>
          </TabsTrigger>
        </TabsList>

        {/* Training Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Weekly Training Schedule</h2>
            <Button className="bg-[#1a1a6c]" onClick={() => setIsAddSessionOpen(true)}>
              Add Session
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day, index) => (
              <div key={index} className="flex flex-col">
                <div className="text-center p-2 bg-[#1a1a6c] text-white rounded-t-md">
                  <div className="font-medium">{formatDayName(day)}</div>
                  <div className="text-sm">{formatDate(day)}</div>
                </div>
                <div className="bg-white rounded-b-md shadow p-2 flex-1 min-h-[200px]">
                  {getSessionsByDay(day).length > 0 ? (
                    <div className="space-y-2">
                      {getSessionsByDay(day).map((session) => (
                        <div key={session.id} className="p-2 bg-gray-50 rounded border text-sm">
                          <div className="font-medium">{session.memberName}</div>
                          <div className="flex items-center text-gray-600 text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {session.startTime} - {session.endTime}
                          </div>
                          <div className="text-xs mt-1 text-gray-600">{session.type}</div>
                          {session.notes && <div className="text-xs mt-1 italic">{session.notes}</div>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 text-sm">No sessions</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Member Progress Tab */}
        <TabsContent value="progress" className="space-y-4">
          <h2 className="text-xl font-semibold">Member Training Progress</h2>

          <div className="space-y-4">
            {members.map((member) => (
              <Card key={member.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-gray-500">{member.goal}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span>Overall Progress</span>
                        <span className="font-medium">{member.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${member.progress}%` }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Last Session</div>
                        <div>{member.lastSession}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Next Session</div>
                        <div>{member.nextSession || "Not scheduled"}</div>
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="text-gray-500 mb-1">Notes</div>
                      <div className="text-xs italic">{member.notes}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Session Dialog */}
      <Dialog open={isAddSessionOpen} onOpenChange={setIsAddSessionOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Training Session</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="member">Select Member</Label>
              <Select onValueChange={handleMemberChange}>
                <SelectTrigger id="member">
                  <SelectValue placeholder="Select a member" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id.toString()}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedMember && (
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="font-medium text-sm mb-2">Member Information</h4>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-gray-500">Goal:</span> {selectedMember.goal}
                  </p>
                  <p>
                    <span className="text-gray-500">Progress:</span> {selectedMember.progress}%
                  </p>
                  <p>
                    <span className="text-gray-500">Last Session:</span> {selectedMember.lastSession}
                  </p>
                </div>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="date">Training Date</Label>
              <Input
                id="date"
                type="date"
                value={newSession.date}
                onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newSession.startTime}
                  onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newSession.endTime}
                  onChange={(e) => setNewSession({ ...newSession, endTime: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Training Type</Label>
              <Select
                defaultValue={newSession.type}
                onValueChange={(value) => setNewSession({ ...newSession, type: value })}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select training type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gym">Gym</SelectItem>
                  <SelectItem value="Cardio">Cardio</SelectItem>
                  <SelectItem value="Strength">Strength</SelectItem>
                  <SelectItem value="Yoga">Yoga</SelectItem>
                  <SelectItem value="Rehabilitation">Rehabilitation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Session Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add notes for this session"
                value={newSession.notes}
                onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSessionOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSession} disabled={!newSession.memberId}>
              Add Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
