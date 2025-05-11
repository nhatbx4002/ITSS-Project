"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search } from "lucide-react"

// Define simple feedback type
interface Feedback {
  id: number
  memberName: string
  message: string
  date: string
  type: "positive" | "negative" | "suggestion"
}

export default function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("")

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
    {
      id: 4,
      memberName: "Maria Santos",
      message: "I love the new yoga classes! The instructor is very knowledgeable and attentive.",
      date: "2023-05-03",
      type: "positive",
    },
    {
      id: 5,
      memberName: "Robert Lee",
      message: "The gym is too crowded in the evenings. Maybe you could extend the opening hours?",
      date: "2023-04-28",
      type: "suggestion",
    },
    {
      id: 6,
      memberName: "Anna Johnson",
      message: "The music is too loud during morning sessions. It's hard to focus on my workout.",
      date: "2023-04-25",
      type: "negative",
    },
    {
      id: 7,
      memberName: "Michael Wong",
      message: "I appreciate the clean environment and friendly staff. Makes coming to the gym enjoyable!",
      date: "2023-04-22",
      type: "positive",
    },
    {
      id: 8,
      memberName: "Sarah Garcia",
      message: "Would it be possible to add more group classes on weekends? I can only attend on Saturdays.",
      date: "2023-04-20",
      type: "suggestion",
    },
  ]

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Filter feedbacks based on search term and tab
  const filterFeedbacks = (type: string | null) => {
    return feedbacks
      .filter((feedback) => {
        // Filter by search term
        if (
          searchTerm &&
          !feedback.memberName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !feedback.message.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false
        }

        // Filter by type
        if (type && feedback.type !== type) {
          return false
        }

        return true
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date (newest first)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Member Feedback</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Input
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="negative">Negative</TabsTrigger>
          <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filterFeedbacks(null).length === 0 ? (
            <div className="text-center py-10 text-gray-500">No feedback found.</div>
          ) : (
            filterFeedbacks(null).map((feedback) => <FeedbackCard key={feedback.id} feedback={feedback} />)
          )}
        </TabsContent>

        <TabsContent value="positive" className="space-y-4">
          {filterFeedbacks("positive").length === 0 ? (
            <div className="text-center py-10 text-gray-500">No positive feedback found.</div>
          ) : (
            filterFeedbacks("positive").map((feedback) => <FeedbackCard key={feedback.id} feedback={feedback} />)
          )}
        </TabsContent>

        <TabsContent value="negative" className="space-y-4">
          {filterFeedbacks("negative").length === 0 ? (
            <div className="text-center py-10 text-gray-500">No negative feedback found.</div>
          ) : (
            filterFeedbacks("negative").map((feedback) => <FeedbackCard key={feedback.id} feedback={feedback} />)
          )}
        </TabsContent>

        <TabsContent value="suggestion" className="space-y-4">
          {filterFeedbacks("suggestion").length === 0 ? (
            <div className="text-center py-10 text-gray-500">No suggestions found.</div>
          ) : (
            filterFeedbacks("suggestion").map((feedback) => <FeedbackCard key={feedback.id} feedback={feedback} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Feedback Card Component
function FeedbackCard({ feedback }: { feedback: Feedback }) {
  // Get border color based on feedback type
  const getBorderColor = (type: string) => {
    switch (type) {
      case "positive":
        return "border-l-green-500"
      case "negative":
        return "border-l-red-500"
      case "suggestion":
        return "border-l-blue-500"
      default:
        return "border-l-gray-300"
    }
  }

  return (
    <Card className={`border-l-4 ${getBorderColor(feedback.type)}`}>
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <div>
          <h3 className="font-medium">{feedback.memberName}</h3>
          <p className="text-sm text-gray-500">{feedback.date}</p>
        </div>
        <div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              feedback.type === "positive"
                ? "bg-green-100 text-green-800"
                : feedback.type === "negative"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
            }`}
          >
            {feedback.type === "positive" ? "Positive" : feedback.type === "negative" ? "Negative" : "Suggestion"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{feedback.message}</p>
      </CardContent>
    </Card>
  )
}
