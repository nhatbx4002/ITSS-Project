"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Calendar from "@/components/calendar"
import { Search, ArrowUpDown, MoreVertical, BarChart2 } from "lucide-react"
import Image from "next/image"
import MonthlyCalendar from "@/components/calendar"


interface Session {
  date: string
  type: string
  notes: string
}

export default function DashboardPage() {
  const coaches = [
    { id: 1, name: "Long" },
    { id: 2, name: "Hieu" },
    { id: 3, name: "Nhat" },
  ]

  const [completedSessions, setCompletedSessions] = useState(0)
  const [totalSessions, setTotalSessions] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fetchedSessions: Session[] = [
      { date: "2025-05-01", type: "Chest workout", notes: "Increased weight" },
      { date: "2025-05-03", type: "Running", notes: "20 minutes cardio" },
      { date: "2025-05-05", type: "Back workout", notes: "Pull-up exercises" },
    ]
    const completed = fetchedSessions.length
    const total = 20
    const calculatedProgress = total > 0 ? Math.round((completed / total) * 100) : 0
    setCompletedSessions(completed)
    setTotalSessions(total)
    setProgress(calculatedProgress)
  }, [])

  return (
    <main className="p-6">
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Welcome Banner */}
        <Card className="col-span-12 md:col-span-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-medium mb-2">
                  Welcome, <span className="text-[#1a1a6c] font-bold">Long</span>
                </h2>
                <p className="text-gray-500 text-sm max-w-md">
                  You don't have any session today.
                </p>
              </div>
              <div className="bg-[#1a1a6c] rounded-full w-16 h-16 flex items-center justify-center">
                <Image
                  src="/coach-long.jpg"
                  alt="Profile"
                  width={64}
                  height={64}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="col-span-12 md:col-span-4 row-span-2">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <MonthlyCalendar />
            </div>
          </CardContent>
        </Card>

        {/* Coaches */}
        <Card className="col-span-12 md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Coaches</CardTitle>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coaches.map((coach) => (
                <div key={coach.id} className="flex items-center gap-3">
                  <div className="bg-[#1a1a6c] rounded-full w-8 h-8 flex-shrink-0">
                    <Image
                      src="/coach-long.jpg"
                      alt="Profile"
                      width={64}
                      height={64}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <span>{coach.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card key="1" className="col-span-12 md:col-span-4">
          <CardContent className="pt-6 flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">Premium Membership</h3>
                <p className="text-2xl font-bold text-[#1a1a6c] mt-2">49.99$</p>
                <p className="text-gray-500 text-sm">12 months</p>
              </div>

            </div>
            <div className="mt-4">
              <p className="text-sm font-medium">Type: Gym access</p>
            </div>
          </CardContent>
        </Card>


      </div>
      {/* Workout Progress */}
      <Card className="col-span-12 md:col-span-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5" />
            Workout Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            Completed: {completedSessions} / {totalSessions} sessions
          </p>
          <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-green-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground">Progress: {progress}%</p>
        </CardContent>
      </Card>
    </main>
  )
}
