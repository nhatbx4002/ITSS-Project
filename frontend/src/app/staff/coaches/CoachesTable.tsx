
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Loader2, Trash2 } from "lucide-react"

// Define Coach interface
interface Coach {
  _id: string
  full_name: string
  email: string
  phone: string
  birthdate: string
  created_at: string
  updatedAt?: string
}

interface CoachesTableProps {
  coaches: Coach[]
  loading: boolean
  searchTerm: string
  onSearchChange: (value: string) => void
  onDeleteCoach: (coachId: string) => void
}

export default function CoachesTable({
  coaches,
  loading,
  searchTerm,
  onSearchChange,
  onDeleteCoach
}: CoachesTableProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString('en-US')
  }

  const formDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN')
  }

  return (
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
                onChange={(e) => onSearchChange(e.target.value)}
                disabled={loading}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Loading coaches...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-center py-3 px-4 font-medium">STT</th>
                  <th className="text-center py-3 px-4 font-medium">Coach Name</th>
                  <th className="text-center py-3 px-4 font-medium">Phone</th>
                  <th className="text-center py-3 px-4 font-medium">Email</th>
                  <th className="text-center py-3 px-4 font-medium">Date of Birth</th>
                  <th className="text-center py-3 px-4 font-medium">Start Date</th>
                  <th className="text-center py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coaches.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No coaches found
                    </td>
                  </tr>
                ) : (
                  coaches.map((coach, index) => (
                    <tr key={coach._id} className="border-b">
                      <td className="py-3 px-4 text-center">{index + 1}</td>
                      <td className="py-3 px-4 text-center">{coach.full_name}</td>
                      <td className="py-3 px-4 text-center">{coach.phone}</td>
                      <td className="py-3 px-4 text-center">{coach.email}</td>
                      <td className="py-3 px-4 text-center">{formatDate(coach.birthdate)}</td>
                      <td className="py-3 px-4 text-center">{formDate(coach.created_at)}</td>
                      <td className="py-3 px-4 text-center">
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => onDeleteCoach(coach._id)}
                          className="p-2"
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}