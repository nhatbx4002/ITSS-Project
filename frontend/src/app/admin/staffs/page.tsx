"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getAllStaff, updateStaff } from "@/lib/api/staffs";

export default function StaffList() {
  const [staffs, setStaffs] = useState([]);
  const [error, setError] = useState("");


  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    birthdate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function fetchStaffs() {
    try {
      const json = await getAllStaff();
      setStaffs(json.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách staff:", err);
      setError("Không thể tải danh sách staff.");
    }
  }

  useEffect(() => {
    fetchStaffs();
  }, []);

  async function handleSave() {
    if (!selectedId) return;

    try {
      const res = await updateStaff(selectedId, {
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        birthdate: form.birthdate,
      });

      if (res.success) {
        await fetchStaffs();
        setIsEditOpen(false);
        setSelectedId(null);
        setForm({
          full_name: "",
          email: "",
          phone: "",
          birthdate: "",
        });
      } else {
        alert("Lỗi cập nhật staffs: " + res.message);
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật thành viên:", err);
      setError("Cập nhật thất bại.");
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Members</h1>
      </div>
{/* form  */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Staff</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="staff-name" className="mb-1">Staff Name</Label>
              <Input
                id="staff-name"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="staff-email" className="mb-1">Staff Email</Label>
              <Input
                id="staff-email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="staff-phone" className="mb-1">Phone</Label>
              <Input
                id="staff-phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="staff-birthdate" className="mb-1">Birthdate</Label>
              <Input
                id="staff-birthdate"
                name="birthdate"
                type="date"
                value={form.birthdate}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsEditOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedId(staff._id);
                          setForm({
                            full_name: staff.full_name,
                            email: staff.email,
                            phone: staff.phone,
                            birthdate: staff.birthdate ? new Date(staff.birthdate).toISOString().split("T")[0] : "",
                          });
                          setIsEditOpen(true);
                        }}
                      >
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
  );
}
