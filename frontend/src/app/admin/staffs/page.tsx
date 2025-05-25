"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getAllStaff, updateStaff, createStaff, deleteStaff } from "@/lib/api/staffs"
import { Edit, Trash2 } from "lucide-react"

interface Staff {
  _id: string
  full_name: string
  email: string
  phone: string
  birthdate: string
}

export default function StaffsPage() {
  const [staffs, setStaffs] = useState<Staff[]>([])
  const [error, setError] = useState("")

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedStaff, setSelectedStaff] = useState<any>(null)

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    birthdate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function fetchStaffs() {
    try {
      const json = await getAllStaff()
      setStaffs(json.data || [])
    } catch (err) {
      console.error("Lỗi khi lấy danh sách staff:", err)
      setError("Không thể tải danh sách staff.")
    }
  }

  useEffect(() => {
    fetchStaffs()
  }, [])

  async function handleSave() {
    if (!selectedId) return

    try {
      const res = await updateStaff(selectedId, {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        birthdate: form.birthdate,
      })

      if (res.success) {
        await fetchStaffs()
        setIsEditOpen(false)
        setSelectedId(null)
        setForm({
          full_name: "",
          email: "",
          phone: "",
          birthdate: "",
        })
      } else {
        alert("Lỗi cập nhật staffs: " + res.message)
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật thành viên:", err)
      setError("Cập nhật thất bại.")
    }
  }

  async function handleAdd() {
    try {
      const res = await createStaff({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        birthdate: form.birthdate,
      })

      if (res.success) {
        await fetchStaffs()
        setIsAddOpen(false)
        setForm({
          full_name: "",
          email: "",
          phone: "",
          birthdate: "",
        })
      } else {
        alert("Lỗi tạo staff: " + res.message)
      }
    } catch (err) {
      console.error("Lỗi khi tạo staff:", err)
      setError("Tạo staff thất bại.")
    }
  }

  async function handleDelete() {
    if (!selectedId) return

    try {
      const res = await deleteStaff(selectedId)

      if (res.success) {
        await fetchStaffs()
        setIsDeleteOpen(false)
        setSelectedId(null)
        setSelectedStaff(null)
      } else {
        alert("Lỗi xóa staff: " + res.message)
      }
    } catch (err) {
      console.error("Lỗi khi xóa staff:", err)
      setError("Xóa staff thất bại.")
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staffs</h1>
        <Button onClick={() => setIsAddOpen(true)} className="cursor-pointer">
          + Add Staff
        </Button>
      </div>

      {/* Add Staff Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Staff</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="add-staff-name" className="mb-1">
                Staff Name
              </Label>
              <Input id="add-staff-name" name="full_name" value={form.full_name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="add-staff-email" className="mb-1">
                Staff Email
              </Label>
              <Input id="add-staff-email" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="add-staff-phone" className="mb-1">
                Phone
              </Label>
              <Input id="add-staff-phone" name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="add-staff-birthdate" className="mb-1">
                Birthdate
              </Label>
              <Input
                id="add-staff-birthdate"
                name="birthdate"
                type="date"
                value={form.birthdate}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsAddOpen(false)} variant="outline" className="cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleAdd} className="cursor-pointer">Add Staff</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Staff Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Staff</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="staff-name" className="mb-1">
                Staff Name
              </Label>
              <Input id="staff-name" name="full_name" value={form.full_name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="staff-email" className="mb-1">
                Staff Email
              </Label>
              <Input id="staff-email" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="staff-phone" className="mb-1">
                Phone
              </Label>
              <Input id="staff-phone" name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="staff-birthdate" className="mb-1">
                Birthdate
              </Label>
              <Input id="staff-birthdate" name="birthdate" type="date" value={form.birthdate} onChange={handleChange} />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsEditOpen(false)} variant="outline" className="cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleSave} className="cursor-pointer">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Staff</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete "{selectedStaff?.full_name}"? This action cannot be undone.</p>
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
          <CardTitle>All Staffs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">#</th>
                  <th className="text-left py-3 px-4 font-medium">Staff Name</th>
                  <th className="text-left py-3 px-4 font-medium">Staff Email</th>
                  <th className="text-left py-3 px-4 font-medium">Phone</th>
                  <th className="text-left py-3 px-4 font-medium">birthdate</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffs.map((staff, index) => (
                  <tr key={staff._id} className="border-b">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{staff.full_name}</td>
                    <td className="py-3 px-4">{staff.email}</td>
                    <td className="py-3 px-4">{staff.phone}</td>
                    <td className="py-3 px-4">{new Date(staff.birthdate).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedId(staff._id)
                            setForm({
                              full_name: staff.full_name,
                              email: staff.email,
                              phone: staff.phone,
                              birthdate: staff.birthdate ? new Date(staff.birthdate).toISOString().split("T")[0] : "",
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
                            setSelectedId(staff._id)
                            setSelectedStaff(staff)
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
