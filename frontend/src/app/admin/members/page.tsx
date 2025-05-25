"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { getAllMember, updateMember, createMember, deleteMember } from "@/lib/api/member"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Edit, Trash2 } from "lucide-react"

interface Member {
  _id: string
  full_name: string
  email: string
  phone: string
  birthdate: string
  membership_expiry_date: string
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [error, setError] = useState("")

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedMember, setSelectedMember] = useState<any>(null)

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    birthdate: "",
    membership_expiry_date: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function fetchMembers() {
    try {
      const json = await getAllMember()
      setMembers(json.data || [])
    } catch (err) {
      console.error("Lỗi khi lấy danh sách user:", err)
      setError("Không thể tải danh sách user.")
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  async function handleSave() {
    if (!selectedId) return

    try {
      const res = await updateMember(selectedId, {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        birthdate: form.birthdate,
        membership_expiry_date: form.membership_expiry_date,
      })

      if (res.success) {
        await fetchMembers()
        setIsEditOpen(false)
        setSelectedId(null)
        setForm({
          full_name: "",
          email: "",
          phone: "",
          birthdate: "",
          membership_expiry_date: "",
        })
      } else {
        alert("Lỗi cập nhật membership: " + res.message)
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật thành viên:", err)
      setError("Cập nhật thất bại.")
    }
  }

  async function handleAdd() {
    try {
      const res = await createMember({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        birthdate: form.birthdate,
        membership_expiry_date: form.membership_expiry_date,
      })

      if (res.success) {
        await fetchMembers()
        setIsAddOpen(false)
        setForm({
          full_name: "",
          email: "",
          phone: "",
          birthdate: "",
          membership_expiry_date: "",
        })
      } else {
        alert("Lỗi tạo member: " + res.message)
      }
    } catch (err) {
      console.error("Lỗi khi tạo thành viên:", err)
      setError("Tạo thành viên thất bại.")
    }
  }

  async function handleDelete() {
    if (!selectedId) return

    try {
      const res = await deleteMember(selectedId)

      if (res.success) {
        await fetchMembers()
        setIsDeleteOpen(false)
        setSelectedId(null)
        setSelectedMember(null)
      } else {
        alert("Lỗi xóa member: " + res.message)
      }
    } catch (err) {
      console.error("Lỗi khi xóa thành viên:", err)
      setError("Xóa thành viên thất bại.")
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Members</h1>
        <Button onClick={() => setIsAddOpen(true)} className="cursor-pointer">
          + Add Member
        </Button>
      </div>

      {/* Add Member Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="add-member-name" className="mb-1">
                Member Name
              </Label>
              <Input id="add-member-name" name="full_name" value={form.full_name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="add-member-email" className="mb-1">
                Member Email
              </Label>
              <Input id="add-member-email" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="add-member-phone" className="mb-1">
                Phone
              </Label>
              <Input id="add-member-phone" name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="add-member-birthdate" className="mb-1">
                Birthdate
              </Label>
              <Input
                id="add-member-birthdate"
                name="birthdate"
                type="date"
                value={form.birthdate}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="add-member-membership_expiry_date" className="mb-1">
                Membership Expiry Date
              </Label>
              <Input
                id="add-member-membership_expiry_date"
                name="membership_expiry_date"
                type="date"
                value={form.membership_expiry_date}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsAddOpen(false)} variant="outline" className="cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleAdd} className="cursor-pointer">Add Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="member-name" className="mb-1">
                Member Name
              </Label>
              <Input id="member-name" name="full_name" value={form.full_name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="member-email" className="mb-1">
                Member Email
              </Label>
              <Input id="member-email" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="member-phone" className="mb-1">
                Phone
              </Label>
              <Input id="member-phone" name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="member-birthdate" className="mb-1">
                Birthdate
              </Label>
              <Input
                id="member-birthdate"
                name="birthdate"
                type="date"
                value={form.birthdate}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="member-membership_expiry_date" className="mb-1">
                Membership Expiry Date
              </Label>
              <Input
                id="member-membership_expiry_date"
                name="membership_expiry_date"
                type="date"
                value={form.membership_expiry_date}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button className="cursor-pointer" onClick={() => setIsEditOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button className="cursor-pointer" onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Member</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete "{selectedMember?.full_name}"? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)} className="cursor-pointer">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} className="cursor-pointer">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>All Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">#</th>
                  <th className="text-left py-3 px-4 font-medium">Member Name</th>
                  <th className="text-left py-3 px-4 font-medium">Member Email</th>
                  <th className="text-left py-3 px-4 font-medium">Phone</th>
                  <th className="text-left py-3 px-4 font-medium">birthdate</th>
                  <th className="text-left py-3 px-4 font-medium">Membership Expiry Date</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr key={member._id} className="border-b">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{member.full_name}</td>
                    <td className="py-3 px-4">{member.email}</td>
                    <td className="py-3 px-4">{member.phone}</td>
                    <td className="py-3 px-4">{new Date(member.birthdate).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{new Date(member.membership_expiry_date).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedId(member._id)
                            setForm({
                              full_name: member.full_name,
                              email: member.email,
                              phone: member.phone,
                              birthdate: member.birthdate ? new Date(member.birthdate).toISOString().split("T")[0] : "",
                              membership_expiry_date: member.membership_expiry_date
                                ? new Date(member.membership_expiry_date).toISOString().split("T")[0]
                                : "",
                            })
                            setIsEditOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                          onClick={() => {
                            setSelectedId(member._id)
                            setSelectedMember(member)
                            setIsDeleteOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
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
