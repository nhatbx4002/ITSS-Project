import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Calendar from "@/components/calendar"
import { Search, ArrowUpDown, MoreVertical } from "lucide-react"
import Image from "next/image"
import MonthlyCalendar from "@/components/calendar"


// Define simple feedback type
interface Feedback {
  id: number
  memberName: string
  message: string
  date: string
  type: "positive" | "negative" | "suggestion"
}

export default function DashboardPage() {
  const coaches = [
    { id: "SFC001", name: "Long" },
    { id: "SFC002", name: "Long" },
    { id: "SFC003", name: "Long" },
  ]

  const members = [
    { id: "SFM001", name: "Quang"},
    { id: "SFM002", name: "Quang"},
    { id: "SFM003", name: "Quang"},
  ]

  const staffs = [
    { id: "SFS001", name: "Hieu"},
    { id: "SFS002", name: "Hieu"},
    { id: "SFS003", name: "Hieu" },
  ]

  // Sample feedback data
  const feedbacks: Feedback[] = [
    {
      id: 1,
      memberName: "James Medalla",
      message:
        "The gym equipment is great, but I think we need more treadmills. During peak hours it's hard to get one.",
      date: "2023-05-10",
      type: "suggestion",
    },
    {
      id: 2,
      memberName: "Kent Chari Mabatas",
      message:
        "Coach Peter is amazing! His training sessions are challenging but very effective. I've seen great results in just a month.",
      date: "2023-05-08",
      type: "positive",
    },
    {
      id: 3,
      memberName: "John Elmer Rodrigo",
      message: "The locker rooms could be cleaner. Sometimes there are no clean towels available.",
      date: "2023-05-05",
      type: "negative",
    },
  ]

  return (
    <main className="p-6">
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Welcome Banner */}
        <Card className="col-span-12 md:col-span-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-medium mb-2">
                  Welcome, <span className="text-[#1a1a6c] font-bold">Long</span>
                </h2>
                <p className="text-gray-500 text-sm max-w-md">
                  There are 4 feedbacks
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
        <Card className="col-span-12 md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Feedback</CardTitle>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="flex flex-col">
                  <span className="font-semibold text-[#1a1a6c]">{feedback.memberName}</span>
                  <span className="text-sm text-gray-500 capitalize">{feedback.type}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="flex flex-wrap gap-4">
  {/* Active Members */}
  <div className="w-full md:w-1/3 bg-[#7a7aa3] rounded-lg p-6 mb-6">
    <div className="mb-4">
      <h2 className="text-xl font-bold text-white mb-4">Active Members</h2>
      <div className="flex justify-between mb-4">
        <div className="relative w-full max-w-xs">
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 bg-[#6a6a93] text-white placeholder:text-gray-300 border-none"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
        </div>
      </div>
      <div className="grid grid-cols-12 text-white text-sm mb-2">
        <div className="col-span-6 font-bold">Member Name</div>
        <div className="col-span-6 font-bold">Member ID</div>
      </div>
    </div>
    <div className="space-y-4">
      {members.map((member) => (
        <div key={member.id} className="grid grid-cols-12 items-center text-white">
          <div className="col-span-6 flex items-center gap-3">
            <div className="bg-gray-300 rounded-full w-8 h-8"></div>
            <span>{member.name}</span>
          </div>
          <div className="col-span-6">{member.id}</div>
        </div>
      ))}
    </div>
  </div>

  {/* Active Staffs */}
  <div className="w-full md:w-3/10 bg-[#7a7aa3] rounded-lg p-6 mb-6">
    <div className="mb-4">
      <h2 className="text-xl font-bold text-white mb-4">Active Staffs</h2>
      <div className="flex justify-between mb-4">
        <div className="relative w-full max-w-xs">
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 bg-[#6a6a93] text-white placeholder:text-gray-300 border-none"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
        </div>
      </div>
      <div className="grid grid-cols-12 text-white text-sm mb-2">
        <div className="col-span-6 font-bold">Staff Name</div>
        <div className="col-span-6 font-bold">Staff ID</div>
      </div>
    </div>
    <div className="space-y-4">
      {staffs.map((staff) => (
        <div key={staff.id} className="grid grid-cols-12 items-center text-white">
          <div className="col-span-6 flex items-center gap-3">
            <div className="bg-gray-300 rounded-full w-8 h-8"></div>
            <span>{staff.name}</span>
          </div>
          <div className="col-span-6">{staff.id}</div>
        </div>
      ))}
    </div>
  </div>

  {/* Active Coaches */}
  <div className="w-full md:w-1/3 bg-[#7a7aa3] rounded-lg p-6 mb-6">
    <div className="mb-4">
      <h2 className="text-xl font-bold text-white mb-4">Active Coaches</h2>
      <div className="flex justify-between mb-4">
        <div className="relative w-full max-w-xs">
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 bg-[#6a6a93] text-white placeholder:text-gray-300 border-none"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
        </div>
      </div>
      <div className="grid grid-cols-12 text-white text-sm mb-2">
        <div className="col-span-6 font-bold">Coach Name</div>
        <div className="col-span-6 font-bold">Coach ID</div>
      </div>
    </div>
    <div className="space-y-4">
      {coaches.map((coach) => (
        <div key={coach.id} className="grid grid-cols-12 items-center text-white">
          <div className="col-span-6 flex items-center gap-3">
            <div className="bg-gray-300 rounded-full w-8 h-8"></div>
            <span>{coach.name}</span>
          </div>
          <div className="col-span-6">{coach.id}</div>
        </div>
      ))}
    </div>
  </div>
</div>


    </main>
  )
}
