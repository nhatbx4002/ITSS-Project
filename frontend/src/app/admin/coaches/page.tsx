import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, MoreVertical } from "lucide-react"
import Image from "next/image"

export default function CoachesPage() {
  const coaches = [
    { id: 1, name: "Juan Dela Cruz", specialty: "Strength Training", members: 24 },
    { id: 2, name: "Peter Smith", specialty: "Cardio", members: 18 },
    { id: 3, name: "Peter Johnson", specialty: "Yoga", members: 15 },
    { id: 4, name: "Maria Santos", specialty: "CrossFit", members: 22 },
    { id: 5, name: "Anna Lee", specialty: "Pilates", members: 12 },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coaches</h1>
        <Button className="bg-[#1a1a6c] cursor-pointer">
          <Plus className="mr-2 h-4 w-4" /> Add Coach
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coaches.map((coach) => (
          <Card key={coach.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">{coach.name}</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="bg-[#1a1a6c] rounded-full w-16 h-16 flex-shrink-0 flex items-center justify-center">
                  <Image
                    src="/coach-long.jpg"
                    alt={coach.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Specialty</p>
                  <p className="font-medium">{coach.specialty}</p>
                  <p className="text-sm text-gray-500 mt-1">Members</p>
                  <p className="font-medium">{coach.members}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
