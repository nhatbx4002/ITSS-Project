"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import * as memberApi from "@/lib/api/member"

// Define workout interface
interface Workout {
  _id: string;
  user_id: string;
  trainer_id: {
    _id: string;
    full_name: string;
  };
  date: string;
  duration: number;
  notes: string;
  status: string;
  feedback?: string;
}

export default function WorkoutHistoryPage() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [workouts, setWorkouts] = useState<Workout[]>([])

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await memberApi.getWorkoutHistory("6811f30ee8de8e72ec3291c4");
        if (response.success) {
          setWorkouts(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  const handleViewDetails = (workout: Workout) => {
    setSelectedWorkout(workout)
    setIsDetailsOpen(true)
  }

  const filteredWorkouts = workouts.filter(
    (workout) =>
      workout.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.trainer_id.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Workout History</h1>
      </div>

      {/* Workout Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Workout Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="workout-notes">Session Notes</Label>
              <Input
                id="workout-notes"
                value={selectedWorkout?.notes || ""}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="workout-date">Date</Label>
              <Input
                id="workout-date"
                type="date"
                value={selectedWorkout?.date ? new Date(selectedWorkout.date).toISOString().split('T')[0] : ""}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="workout-time">Time</Label>
              <Input
                id="workout-time"
                type="time"
                value={selectedWorkout?.date ? new Date(selectedWorkout.date).toTimeString().slice(0,5) : ""}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="workout-duration">Duration (minutes)</Label>
              <Input
                id="workout-duration"
                value={selectedWorkout?.duration || ""}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="workout-trainer">Trainer</Label>
              <Input
                id="workout-trainer"
                value={selectedWorkout?.trainer_id?.full_name || ""}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="workout-status">Status</Label>
              <Input
                id="workout-status"
                value={selectedWorkout?.status || ""}
                disabled
              />
            </div>
            {selectedWorkout?.feedback && (
              <div>
                <Label htmlFor="workout-feedback">Feedback</Label>
                <Input
                  id="workout-feedback"
                  value={selectedWorkout.feedback}
                  disabled
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)} variant="outline">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Past Workouts</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Input
                  placeholder="Search workouts..."
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
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Time</th>
                  <th className="text-left py-3 px-4 font-medium">Trainer</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkouts.map((workout, index) => (
                  <tr key={workout._id} className="border-b">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{workout.notes}</td>
                    <td className="py-3 px-4">Training Session</td>
                    <td className="py-3 px-4">{new Date(workout.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{new Date(workout.date).toLocaleTimeString()}</td>
                    <td className="py-3 px-4">{workout.trainer_id.full_name}</td>
                    <td className="py-3 px-4">{workout.status}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(workout)}>
                        View Details
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