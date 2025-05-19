"use client"

import { useState } from "react"
import { Search, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type PaymentRecord = {
  id: number
  memberName: string
  memberId: string
  plan: string
  month: string
  datePaid: string
  amount: number
}

export default function SalesReportPage() {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [entriesPerPage, setEntriesPerPage] = useState("10")
  const [searchTerm, setSearchTerm] = useState("")

  const paymentRecords: PaymentRecord[] = [
    {
      id: 1,
      memberName: "Member 1",
      memberId: "SFM2301N1",
      plan: "1 Month - PT",
      month: "JAN",
      datePaid: "10-01-2023",
      amount: 200,
    },
    {
      id: 2,
      memberName: "Member 2",
      memberId: "SFM2301N2",
      plan: "6 Months - PT",
      month: "JAN",
      datePaid: "10-01-2023",
      amount: 1000,
    },
    {
      id: 3,
      memberName: "Member 3",
      memberId: "SFM2301N3",
      plan: "1 Month - M",
      month: "JAN",
      datePaid: "10-01-2023",
      amount: 200,
    },
    {
      id: 4,
      memberName: "Member 4",
      memberId: "SFM2301N4",
      plan: "3 Months",
      month: "JAN",
      datePaid: "10-01-2023",
      amount: 500,
    },
  ]

  // Calculate total amount
  const totalAmount = paymentRecords.reduce((sum, record) => sum + record.amount, 0)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#1a1a6c] mb-6">Sales Report</h1>

      {/* Date Range Filter */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="from-date" className="block text-sm font-medium">
                From Date
              </label>
              <div className="relative">
                <Input
                  id="from-date"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="pl-10 bg-gray-100"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="to-date" className="block text-sm font-medium">
                To Date
              </label>
              <div className="relative">
                <Input
                  id="to-date"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="pl-10 bg-gray-100"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Total</label>
              <div className="h-10 flex items-center px-3 font-bold text-lg">{totalAmount.toLocaleString()} $</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            <div className="flex items-center">
              <span className="text-sm mr-2">Show Entries</span>
              <div className="relative">
                <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                  <SelectTrigger className="bg-[#6a6a93] text-white border-none w-16">
                    <SelectValue>{entriesPerPage}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="relative">
              <Input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#6a6a93] text-white placeholder:text-gray-300 border-none w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
            </div>
          </div>

          {/* Payment Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="py-3 px-4 font-medium text-[#1a1a6c]">Member Name</th>
                  <th className="py-3 px-4 font-medium text-[#1a1a6c]">Member ID</th>
                  <th className="py-3 px-4 font-medium text-[#1a1a6c]">Plan</th>
                  <th className="py-3 px-4 font-medium text-[#1a1a6c]">Month</th>
                  <th className="py-3 px-4 font-medium text-[#1a1a6c]">Date Paid</th>
                  <th className="py-3 px-4 font-medium text-[#1a1a6c]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {paymentRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-200">
                    <td className="py-3 px-4 text-[#1a1a6c]">{record.memberName}</td>
                    <td className="py-3 px-4">{record.memberId}</td>
                    <td className="py-3 px-4">{record.plan}</td>
                    <td className="py-3 px-4">{record.month}</td>
                    <td className="py-3 px-4">{record.datePaid}</td>
                    <td className="py-3 px-4">{record.amount.toLocaleString()} $</td>
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
