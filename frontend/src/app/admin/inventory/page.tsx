"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { createEquipment, getAllEquipments, updateEquipment } from "@/lib/api/inventory"
import { Search, Plus, Edit, Trash2 } from "lucide-react"

export default function InventoryPage() {
  const [equipments, setEquipments] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    purchase_date: '',
    warranty_until: '',
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = () => {
    getAllEquipments()
      .then((res) => {
        if (res.success) {
          setEquipments(res.data);
          setError(null);
        } else {
          setError("API trả về lỗi");
        }
      })
      .catch((err) => setError(err.message));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createEquipment(form);
      if (res.success) {
        fetchEquipments();
        setIsAddDialogOpen(false);
        setForm({ name: "", purchase_date: "", warranty_until: "", status: "" });
      } else {
        alert("Lỗi tạo thiết bị: " + res.message);
      }
    } catch (error) {
      alert("Lỗi tạo thiết bị: " + (error as Error).message);
    }
  };

  const handleUpdate = async () => {
    if (!selectedId) return;
    try {
      const res = await updateEquipment(selectedId, form);
      if (res.success) {
        fetchEquipments();
        setIsEditDialogOpen(false);
        setSelectedId(null);
        setForm({ name: "", purchase_date: "", warranty_until: "", status: "" });
      } else {
        alert("Lỗi cập nhật thiết bị: " + res.message);
      }
    } catch (error) {
      alert("Lỗi cập nhật thiết bị: " + (error as Error).message);
    }
  };

  const handleDelete = async () => {
      if (!selectedId) return;
  
      try {
        const res = await deleteEquipment(selectedId); // chưa viết API
  
        if (res.success) {
          // 1. Đóng dialog xóa
          setIsDeleteDialogOpen(false);
          setSelectedId(null);
          // 2. Reload danh sách
          fetchEquipments();
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
        <h1 className="text-2xl font-bold">Inventory</h1>
        <Button onClick={() => setIsAddDialogOpen(true)} className="cursor-pointer">+ Add inventory</Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipments.map((equipment) => (
          <div
            key={equipment._id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{equipment.name}</h2>
            <p>Ngày mua: {equipment.purchase_date}</p>
            <p>Bảo hành đến: {equipment.warranty_until}</p>
            <p>Trạng thái: {equipment.status}</p>
            <div className="flex gap-2 mt-2">
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedId(equipment._id);
                  setForm({
                    name: equipment.name,
                    purchase_date: equipment.purchase_date ? new Date(equipment.purchase_date).toISOString().split("T")[0] : "",
                    warranty_until: equipment.warranty_until ? new Date(equipment.warranty_until).toISOString().split("T")[0] : "",
                    status: equipment.status,
                  });
                  setIsEditDialogOpen(true);
                }}
              >
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                onClick={() => {
                  setDeleteId(equipment._id);
                  setIsDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog ADD */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogTitle>Add inventory</DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input name="name" placeholder="Tên thiết bị" value={form.name} onChange={handleChange} />
            <Input name="purchase_date" placeholder="Ngày mua" value={form.purchase_date} onChange={handleChange} />
            <Input name="warranty_until" placeholder="Bảo hành đến" value={form.warranty_until} onChange={handleChange} />
            <Input name="status" placeholder="Trạng thái" value={form.status} onChange={handleChange} />
            <Button type="submit" className="cursor-pointer">Add</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Edit */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogTitle>Edit inventory information</DialogTitle>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-4 mt-4">
            <Input name="name" placeholder="Tên thiết bị" value={form.name} onChange={handleChange} />
            <Input name="purchase_date" placeholder="Ngày mua" value={form.purchase_date} onChange={handleChange} />
            <Input name="warranty_until" placeholder="Bảo hành đến" value={form.warranty_until} onChange={handleChange} />
            <Input name="status" placeholder="Trạng thái" value={form.status} onChange={handleChange} />
            <Button type="submit" className="cursor-pointer">Save</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Delete */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Membership</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the "{form?.name}" Membership? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleDelete} className="cursor-pointer">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
