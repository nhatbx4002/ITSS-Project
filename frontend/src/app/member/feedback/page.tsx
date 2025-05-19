"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface Feedback {
  id: number
  memberName: string
  message: string
  date: string
  type: "positive" | "negative" | "suggestion"
}

export default function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([...sampleFeedbacks])
  const [newFeedback, setNewFeedback] = useState("")
  const [newType, setNewType] = useState<"positive" | "negative" | "suggestion">("positive")
  const [memberName] = useState("Current Member")

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const filterFeedbacks = (type: string | null) => {
    return feedbacks
      .filter((feedback) => {
        if (
          searchTerm &&
          !feedback.memberName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !feedback.message.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return false
        }
        if (type && feedback.type !== type) {
          return false
        }
        return true
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const handleSubmit = () => {
    if (!newFeedback.trim()) return
    const newEntry: Feedback = {
      id: feedbacks.length + 1,
      memberName,
      message: newFeedback.trim(),
      type: newType,
      date: new Date().toISOString().split("T")[0],
    }
    setFeedbacks([newEntry, ...feedbacks])
    setNewFeedback("")
    setNewType("positive")
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Feedback Page</h1>

      <div className="space-y-4">
        <Textarea
          placeholder="Write your feedback here..."
          value={newFeedback}
          onChange={(e) => setNewFeedback(e.target.value)}
        />
        <div className="flex gap-4 items-center">
          <Select value={newType} onValueChange={(value) => setNewType(value as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
              <SelectItem value="suggestion">Suggestion</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit}>Submit Feedback</Button>
        </div>
      </div>

      <div className="relative w-full md:w-64">
        <Input
          placeholder="Search feedback..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="negative">Negative</TabsTrigger>
          <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
        </TabsList>

        {['all', 'positive', 'negative', 'suggestion'].map((type) => (
          <TabsContent key={type} value={type} className="space-y-4">
            {filterFeedbacks(type === 'all' ? null : type).length === 0 ? (
              <div className="text-center py-10 text-gray-500">No feedback found.</div>
            ) : (
              filterFeedbacks(type === 'all' ? null : type).map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function FeedbackCard({ feedback }: { feedback: Feedback }) {
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
            {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{feedback.message}</p>
      </CardContent>
    </Card>
  )
}

const sampleFeedbacks: Feedback[] = [
  {
    id: 1,
    memberName: "James Medalla",
    message: "The gym equipment is great, but I think we need more treadmills. During peak hours it's hard to get one.",
    date: "2023-05-10",
    type: "suggestion",
  },
  {
    id: 2,
    memberName: "Kent Chari Mabatas",
    message: "Coach Peter is amazing! His training sessions are challenging but very effective. I've seen great results in just a month.",
    date: "2023-05-08",
    type: "positive",
  },
  {
    id: 3,
    memberName: "John Elmer Rodrigo",
    message: "The locker rooms could be cleaner. Sometimes there are no clean towels available.",
    date: "2023-05-05",
    type: "negative",
  }
]
