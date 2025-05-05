import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"

export default function MembersPage() {
  const members = [
    {
      id: 1,
      name: "James Medalla",
      email: "james.medalla@example.com",
      plan: "Annual",
      joinDate: "15 Jan 2023",
      status: "Active",
    },
    {
      id: 2,
      name: "Kent Chari Mabatas",
      email: "kent.mabatas@example.com",
      plan: "Monthly",
      joinDate: "20 Feb 2023",
      status: "Active",
    },
    {
      id: 3,
      name: "John Elmer Rodrigo",
      email: "john.rodrigo@example.com",
      plan: "Semi-Annual",
      joinDate: "10 Mar 2023",
      status: "Active",
    },
    {
      id: 4,
      name: "Maria Santos",
      email: "maria.santos@example.com",
      plan: "Monthly",
      joinDate: "05 Apr 2023",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Robert Lee",
      email: "robert.lee@example.com",
      plan: "Annual",
      joinDate: "22 Dec 2022",
      status: "Active",
    },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Members</h1>
        <Button className="bg-[#1a1a6c]">
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>All Members</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Input placeholder="Search members..." className="pl-10" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Member</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Plan</th>
                  <th className="text-left py-3 px-4 font-medium">Join Date</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-300 rounded-full w-8 h-8"></div>
                        <span>{member.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{member.email}</td>
                    <td className="py-3 px-4">{member.plan}</td>
                    <td className="py-3 px-4">{member.joinDate}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${
                          member.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="outline" size="sm" className="mr-2">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
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
