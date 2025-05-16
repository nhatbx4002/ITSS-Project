"use client";

import React, { useEffect, useState } from "react";
import { getAllMemberships, createMembership, updateMembership, deleteMembership } from "@/lib/api/membership";
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2 } from "lucide-react"

export default function MembershipList() {
  const [memberships, setMemberships] = useState([]);
  const [error, setError] = useState<string | null>(null);

  //open or close state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null);


  // Form state
  const [form, setForm] = useState({
    name: "",
    duration: "",
    price: "",
    type: "",
  });

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = () => {
    getAllMemberships()
      .then((res) => {
        if (res.success) {
          setMemberships(res.data);
          setError(null);
        } else {
          setError("API trả về lỗi");
        }
      })
      .catch((err) => setError(err.message));
  };
//
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createMembership({
        name: form.name,
        duration: Number(form.duration),
        price: form.price, // backend chuyển thành Decimal128
        type: form.type,
      });

      if (res.success) {
        fetchMemberships();
        setIsAddDialogOpen(false);
        setForm({ name: "", duration: "", price: "", type: "" });
      } else {
        alert("Lỗi tạo membership: " + res.message);
      }
    } catch (error) {
      alert("Lỗi tạo membership: " + (error as Error).message);
    }
  };
//
  const handleUpdate = async () => {
    if (!selectedId) return;
    try {
      const res = await updateMembership(selectedId, {
        name: form.name,
        duration: Number(form.duration),
        price: Number(form.price),
        type: form.type,
      });

    if (res.success) {
      fetchMemberships();
      setIsEditDialogOpen(false);
      setSelectedId(null);
      setForm({ name: "", duration: "", price: "", type: "" });
    } else {
      alert("Lỗi cập nhật membership: " + res.message);
    }
    } catch(error) {
      alert("Lỗi cập nhật membership: " + (error as Error).message);
    }
  }
//
  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await deleteMembership(selectedId);

      if (res.success) {
      // 1. Đóng dialog xóa
        setIsDeleteDialogOpen(false);
        setSelectedId(null);
      // 2. Reload danh sách
        fetchMemberships();
      } else {
        alert("Lỗi khi xóa: " + res.message);
      }
    } catch (error) {
      alert("Lỗi cập nhật membership: " + (error as Error).message);
    }
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Membership Packages</h1>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#1a1a6c]">
          <Plus className="mr-2 h-4 w-4" /> Add Package
        </Button>
      </div>

      {memberships.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No packages found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memberships.map((m) => (
            <Card key={m._id} className="flex flex-col">
              <CardContent className="pt-6 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{m.name}</h3>
                    <p className="text-2xl font-bold text-[#1a1a6c] mt-2">${m.price.$numberDecimal}</p>
                    <p className="text-gray-500 text-sm">{m.duration}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">Type: {m.type}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedId(m._id);  // <-- cần để biết đang sửa item nào
                    setForm({
                      name: m.name,
                      duration: m.duration,
                      price: m.price.$numberDecimal,
                      type: m.type,
                    });
                    setIsEditDialogOpen(true);
                    }}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    setSelectedId(m._id);
                    setIsDeleteDialogOpen(true)
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}


      {/* state create memberships */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
              <DialogHeader>
            <DialogTitle>Add New Membership Package</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Package Name</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange}/>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 29.99"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={form.duration}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value })}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">standard</SelectItem>
                  <SelectItem value="vip">vip</SelectItem>
                  <SelectItem value="personal_training">personal_training</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Package</Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* state edit memberships */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Membership Package</DialogTitle>
          </DialogHeader>

          {form && (
            <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="edit-name">Package Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  type="string"
                  value={form.name}
                  onChange={handleChange}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  name="duration"
                  type="number"
                  value={form.duration}
                  onChange={handleChange}
                />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-type">Type</Label>
              <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value })}>
                <SelectTrigger id="edit-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">standard</SelectItem>
                  <SelectItem value="vip">vip</SelectItem>
                  <SelectItem value="personal_training">personal_training</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* state delete membership */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Membership</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the "{form?.name}" Membership? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
