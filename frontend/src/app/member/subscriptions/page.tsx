"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import * as memberApi from "@/lib/api/member"

// Define subscription interface
interface Subscription {
  _id: string;
  user_id: string;
  membership_id: {
    _id: string;
    name: string;
    type: string;
    price: number;
    duration: number;
    sessions: number;
  };
  start_date: string;
  end_date: string;
  status: string;
  sessions_remaining: number;
}

export default function SubscriptionsPage() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await memberApi.getSubscriptions("6811f30ee8de8e72ec3291c4")
        if (response.success) {
          setSubscriptions(response.data)
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách gói tập:", error)
      }
    }

    fetchSubscriptions()
  }, [])

  const handleViewDetails = (subscription: Subscription) => {
    setSelectedSubscription(subscription)
    setIsDetailsOpen(true)
  }

  const handleRenewSubscription = () => {
    // Implement renewal logic here
    setIsDetailsOpen(false)
  }

  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.membership_id.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.membership_id.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Subscriptions</h1>
      </div>

      {/* Subscription Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subscription Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="subscription-name">Subscription Name</Label>
              <Input
                id="subscription-name"
                value={selectedSubscription?.membership_id.name || ""}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="subscription-type">Type</Label>
              <Input
                id="subscription-type"
                value={selectedSubscription?.membership_id.type || ""}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={selectedSubscription?.start_date ? new Date(selectedSubscription.start_date).toISOString().split('T')[0] : ""}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={selectedSubscription?.end_date ? new Date(selectedSubscription.end_date).toISOString().split('T')[0] : ""}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="sessions">Sessions</Label>
              <Input
                id="sessions"
                value={`${selectedSubscription?.sessions_remaining} / ${selectedSubscription?.membership_id.sessions}`}
                disabled
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)} variant="outline">Close</Button>
            <Button onClick={handleRenewSubscription}>Renew Subscription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Active Subscriptions</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Input
                  placeholder="Search subscriptions..."
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
                  <th className="text-left py-3 px-4 font-medium">Start Date</th>
                  <th className="text-left py-3 px-4 font-medium">End Date</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Sessions</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map((subscription, index) => (
                  <tr key={subscription._id} className="border-b">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{subscription.membership_id.name}</td>
                    <td className="py-3 px-4">{subscription.membership_id.type}</td>
                    <td className="py-3 px-4">{new Date(subscription.start_date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{new Date(subscription.end_date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        subscription.status === 'active' ? 'bg-green-100 text-green-800' :
                        subscription.status === 'expired' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {subscription.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{`${subscription.sessions_remaining}/${subscription.membership_id.sessions}`}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(subscription)}>
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