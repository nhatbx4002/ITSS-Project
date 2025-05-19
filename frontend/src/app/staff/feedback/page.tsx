"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search, Trash2, Edit, Check, X } from "lucide-react"

interface Feedback {
  id: number
  memberName: string
  message: string
  date: string
  type: "positive" | "negative" | "suggestion"
}

export default function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({})
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    // ... giữ nguyên data feedbacks như trước
  ])

  const [editingFeedback, setEditingFeedback] = useState<Record<number, string>>({})

  // trạng thái feedback đang mở reply
  const [replyingId, setReplyingId] = useState<number | null>(null)

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

  const handleReplyChange = (id: number, value: string) => {
    setReplyTexts((prev) => ({ ...prev, [id]: value }))
  }

  const handleSendReply = (id: number) => {
    const reply = replyTexts[id]?.trim()
    if (!reply) {
      alert("Vui lòng nhập phản hồi trước khi gửi.")
      return
    }
    alert(`Phản hồi cho feedback #${id}: ${reply}`)
    setReplyTexts((prev) => ({ ...prev, [id]: "" }))
    setReplyingId(null) // ẩn khung reply sau khi gửi
  }

  const handleDeleteFeedback = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa feedback này không?")) {
      setFeedbacks((prev) => prev.filter((f) => f.id !== id))
      setReplyTexts((prev) => {
        const copy = { ...prev }
        delete copy[id]
        return copy
      })
      setEditingFeedback((prev) => {
        const copy = { ...prev }
        delete copy[id]
        return copy
      })
      if (replyingId === id) setReplyingId(null)
    }
  }

  const handleEditFeedback = (id: number, currentMessage: string) => {
    setEditingFeedback((prev) => ({ ...prev, [id]: currentMessage }))
  }

  const handleCancelEdit = (id: number) => {
    setEditingFeedback((prev) => {
      const copy = { ...prev }
      delete copy[id]
      return copy
    })
  }

  const handleSaveEdit = (id: number) => {
    const newMessage = editingFeedback[id]?.trim()
    if (!newMessage) {
      alert("Nội dung phản hồi không được để trống.")
      return
    }
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === id ? { ...f, message: newMessage } : f))
    )
    handleCancelEdit(id)
  }

  // Mở/đóng khung reply
  const toggleReply = (id: number) => {
    setReplyingId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Member Feedback</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div></div>

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

        {["all", "positive", "negative", "suggestion"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {(tab === "all" ? filterFeedbacks(null) : filterFeedbacks(tab)).length === 0 ? (
              <div className="text-center py-10 text-gray-500">No feedback found.</div>
            ) : (
              (tab === "all" ? filterFeedbacks(null) : filterFeedbacks(tab)).map((feedback) => (
                <FeedbackCard
                  key={feedback.id}
                  feedback={feedback}
                  replyText={replyTexts[feedback.id] || ""}
                  onReplyChange={handleReplyChange}
                  onSendReply={handleSendReply}
                  onDelete={handleDeleteFeedback}
                  editingMessage={editingFeedback[feedback.id]}
                  onEdit={handleEditFeedback}
                  onCancelEdit={handleCancelEdit}
                  onSaveEdit={handleSaveEdit}
                  onEditChange={(id, val) =>
                    setEditingFeedback((prev) => ({ ...prev, [id]: val }))
                  }
                  isReplying={replyingId === feedback.id}
                  onToggleReply={toggleReply}
                />
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function FeedbackCard({
  feedback,
  replyText,
  onReplyChange,
  onSendReply,
  onDelete,
  editingMessage,
  onEdit,
  onCancelEdit,
  onSaveEdit,
  onEditChange,
  isReplying,
  onToggleReply,
}: {
  feedback: Feedback
  replyText: string
  onReplyChange: (id: number, value: string) => void
  onSendReply: (id: number) => void
  onDelete: (id: number) => void
  editingMessage?: string
  onEdit: (id: number, currentMessage: string) => void
  onCancelEdit: (id: number) => void
  onSaveEdit: (id: number) => void
  onEditChange: (id: number, val: string) => void
  isReplying: boolean
  onToggleReply: (id: number) => void
}) {
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
        <div className="flex items-center space-x-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              feedback.type === "positive"
                ? "bg-green-100 text-green-800"
                : feedback.type === "negative"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {feedback.type === "positive"
              ? "Positive"
              : feedback.type === "negative"
              ? "Negative"
              : "Suggestion"}
          </span>

          {/* Nút sửa */}
          {!editingMessage ? (
            <button
              onClick={() => onEdit(feedback.id, feedback.message)}
              title="Edit Feedback"
              className="text-blue-600 hover:text-blue-800 p-1 rounded"
              aria-label="Edit Feedback"
              type="button"
            >
              <Edit size={16} />
            </button>
          ) : (
            <>
              <button
                onClick={() => onSaveEdit(feedback.id)}
                title="Save Changes"
                className="text-green-600 hover:text-green-800 p-1 rounded"
                aria-label="Save Edit"
                type="button"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => onCancelEdit(feedback.id)}
                title="Cancel Edit"
                className="text-red-600 hover:text-red-800 p-1 rounded"
                aria-label="Cancel Edit"
                type="button"
              >
                <X size={16} />
              </button>
            </>
          )}

          {/* Nút xóa */}
          <button
            onClick={() => onDelete(feedback.id)}
            title="Delete Feedback"
            className="text-red-600 hover:text-red-800 p-1 rounded"
            aria-label="Delete Feedback"
            type="button"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {editingMessage ? (
          <Input
            value={editingMessage}
            onChange={(e) => onEditChange(feedback.id, e.target.value)}
            autoFocus
            aria-label="Edit Feedback Message"
          />
        ) : (
          <p>{feedback.message}</p>
        )}

        {/* Nút Reply */}
        <button
          onClick={() => onToggleReply(feedback.id)}
          className="mt-4 text-sm text-blue-600 hover:underline"
          type="button"
        >
          {isReplying ? "Cancel Reply" : "Reply"}
        </button>

        {/* Khung nhập reply */}
        {isReplying && (
          <div className="mt-3">
            <textarea
              rows={3}
              value={replyText}
              onChange={(e) => onReplyChange(feedback.id, e.target.value)}
              className="w-full rounded border border-gray-300 p-2"
              placeholder="Write your reply..."
              aria-label="Reply Textarea"
            />
            <button
              onClick={() => onSendReply(feedback.id)}
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              type="button"
            >
              Send Reply
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
