"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import EquipmentForm from "./EquipmentForm"
import EquipmentTable from "./EquipmentTable"

type Equipment = {
  id: string
  name: string
  purchase_date: string
  warranty_until: string
  working: number
  maintenance: number
  broken: number
  total?: number
  status?: string
}

type EquipmentFormData = Omit<Equipment, "id">

export default function InventoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null)

  // Hàm gọi API để lấy dữ liệu equipment
  const fetchEquipments = async (searchName = "") => {
    setLoading(true)
    setError("")
    
    try {
      const url = searchName 
        ? `http://localhost:5000/api/equipment?name=${encodeURIComponent(searchName)}`
        : `http://localhost:5000/api/equipment`
      
      const response = await fetch(url)
      const result = await response.json()
      
      console.log("API Response:", result)
      
      if (result.success) {
        // Map dữ liệu từ API response đúng với cấu trúc thực tế
        const mappedData = result.data.map((item: any) => ({
          id: item._id,
          name: item.name,
          purchase_date: item.purchase_date ? item.purchase_date.split('T')[0] : '',
          warranty_until: item.warranty_until ? item.warranty_until.split('T')[0] : '',
          working: item.quantity?.working || 0,
          maintenance: item.quantity?.maintenance || 0,
          broken: item.quantity?.broken || 0,
          total: item.total,
          status: item.status
        }))
        setEquipments(mappedData)
      } else {
        setError("Failed to fetch equipments")
      }
    } catch (err) {
      setError("Error connecting to server")
      console.error("Error fetching equipments:", err)
    } finally {
      setLoading(false)
    }
  }

  // Hàm tạo equipment mới
  const createEquipment = async (formData: EquipmentFormData) => {
    try {
      const requestData = {
        name: formData.name,
        purchase_date: formData.purchase_date,
        warranty_until: formData.warranty_until,
        quantity: {
          working: formData.working,
          maintenance: formData.maintenance,
          broken: formData.broken
        }
      }

      const response = await fetch('http://localhost:5000/api/equipment/createEquipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create equipment')
      }

      if (result.success) {
        // Refresh danh sách equipment sau khi tạo thành công
        await fetchEquipments()
        return result.data
      } else {
        throw new Error(result.message || 'Failed to create equipment')
      }
    } catch (err) {
      console.error("Error creating equipment:", err)
      throw err
    }
  }

  // Hàm update equipment (nếu bạn có API update)
  const updateEquipment = async (id: string, formData: EquipmentFormData) => {
    try {
      const requestData = {
        name: formData.name,
        purchase_date: formData.purchase_date,
        warranty_until: formData.warranty_until,
        quantity: {
          working: formData.working,
          maintenance: formData.maintenance,
          broken: formData.broken
        }
      }

      const response = await fetch(`http://localhost:5000/api/equipment/updateEquipment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update equipment')
      }

      if (result.success) {
        // Refresh danh sách equipment sau khi update thành công
        await fetchEquipments()
        return result.data
      } else {
        throw new Error(result.message || 'Failed to update equipment')
      }
    } catch (err) {
      console.error("Error updating equipment:", err)
      throw err
    }
  }

  // Load dữ liệu khi component mount
  useEffect(() => {
    fetchEquipments()
  }, [])

  // Debounce search để tránh gọi API quá nhiều
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEquipments(searchTerm)
    }, 500) // Chờ 500ms sau khi user ngừng gõ

    return () => clearTimeout(timer)
  }, [searchTerm])

  const openAddModal = () => {
    setEditingEquipment(null)
    setIsModalOpen(true)
  }

  const openEditModal = (equipment: Equipment) => {
    setEditingEquipment(equipment)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingEquipment(null)
  }

  const handleSaveEquipment = async (formData: EquipmentFormData) => {
    try {
      setLoading(true)
      setError("")

      if (editingEquipment) {
        // Update existing equipment - sử dụng ID từ editingEquipment
        console.log("Updating equipment with ID:", editingEquipment.id)
        await updateEquipment(editingEquipment.id, formData)
      } else {
        // Create new equipment
        console.log("Creating new equipment")
        await createEquipment(formData)
      }

      // Đóng modal sau khi thành công
      setIsModalOpen(false)
      setEditingEquipment(null)
      
    } catch (err: any) {
      // Hiển thị lỗi cho user
      setError(err.message || "An error occurred while saving equipment")
      alert(err.message || "An error occurred while saving equipment")
    } finally {
      setLoading(false)
    }
  }

  const deleteEquipment = async (id: string) => {
    try {
      setLoading(true)
      setError("")
      
      console.log("Deleting equipment with ID:", id)

      const response = await fetch(`http://localhost:5000/api/equipment/deleteEquipment/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete equipment')
      }

      if (result.success) {
        // Refresh danh sách equipment sau khi xóa thành công
        await fetchEquipments()
      } else {
        throw new Error(result.message || 'Failed to delete equipment')
      }
    } catch (err: any) {
      console.error("Error deleting equipment:", err)
      setError(err.message || "An error occurred while deleting equipment")
      alert(err.message || "An error occurred while deleting equipment")
    } finally {
      setLoading(false)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Prepare form initial data for editing
  const getFormInitialData = (): EquipmentFormData | undefined => {
    if (!editingEquipment) return undefined
    
    return {
      name: editingEquipment.name,
      purchase_date: editingEquipment.purchase_date,
      warranty_until: editingEquipment.warranty_until,
      working: editingEquipment.working,
      maintenance: editingEquipment.maintenance,
      broken: editingEquipment.broken,
    }
  }

  return (
    <div className="p-4">
      <Button
        className="mb-4 bg-white text-[#1a1a6c] hover:bg-gray-100 border border-gray-200 cursor-pointer"
        onClick={openAddModal}
        disabled={loading}
      >
        Add Equipment
      </Button>

      <EquipmentForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveEquipment}
        initialData={getFormInitialData()}
        isEditing={!!editingEquipment}
      />

      <EquipmentTable
        equipments={equipments}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onEdit={openEditModal}
        onDelete={deleteEquipment}
      />
    </div>
  )
}