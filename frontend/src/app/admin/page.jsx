import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Calendar from "@/components/calendar"
import CircularProgressCard from "@/components/CircularProgressCard"
import { Search, ArrowUpDown, MoreVertical } from "lucide-react"
import Image from "next/image"
import MonthlyCalendar from "@/components/calendar"

export default function DashboardPage() {
  const coaches = [
    { id: 1, name: "Long" },
    { id: 2, name: "Hieu" },
    { id: 3, name: "Nhat" },
  ]

  const members = [
    { id: 1, name: "Quang", datePaid: "01/15/2023", dateExpiry: "01/15/2024", status: "Active" },
    { id: 2, name: "Quang", datePaid: "02/20/2023", dateExpiry: "02/20/2024", status: "Active" },
    { id: 3, name: "Quang", datePaid: "03/10/2023", dateExpiry: "03/10/2024", status: "Active" },
  ]

  return (
    <main className="p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Welcome Banner */}
        <Card className="col-span-12 md:col-span-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-medium mb-2">
                  Welcome, <span className="text-[#1a1a6c] font-bold">Long</span>
                </h2>
                <p className="text-gray-500 text-sm max-w-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
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

        {/* Sales */}
        <Card className="col-span-12 md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sales</CardTitle>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <CircularProgressCard percentage={50} />
          </CardContent>
        </Card>

        {/* Inventory */}
        <Card className="col-span-12 md:col-span-4 row-span-2">
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">Inventory Content</div>
          </CardContent>
        </Card>

        {/* Active Members */}
        <div className="col-span-12 md:col-span-8 bg-[#7a7aa3] rounded-lg p-6">
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
              <Button variant="ghost" className="text-white flex items-center gap-2 cursor-pointer">
                Sort by <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-12 text-white text-sm mb-2">
              <div className="col-span-5 font-bold">Name</div>
              <div className="col-span-3 font-bold">Date paid</div>
              <div className="col-span-3 font-bold">Date Expiry</div>
              <div className="col-span-1 font-bold">Status</div>
            </div>
          </div>

          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="grid grid-cols-12 items-center text-white">
                <div className="col-span-5 flex items-center gap-3">
                  <div className="bg-gray-300 rounded-full w-8 h-8"></div>
                  <span>{member.name}</span>
                </div>
                <div className="col-span-3">{member.datePaid}</div>
                <div className="col-span-3">{member.dateExpiry}</div>
                <div className="col-span-1 flex justify">
                  <Button variant="ghost" size="icon" className="cursor-pointer">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
