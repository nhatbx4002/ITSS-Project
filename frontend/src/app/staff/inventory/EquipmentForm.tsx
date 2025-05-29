import { useState, useEffect } from "react"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

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

interface EquipmentFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: EquipmentFormData) => void
  initialData?: EquipmentFormData
  isEditing?: boolean
}

export default function EquipmentForm({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData, 
  isEditing = false 
}: EquipmentFormProps) {
  const [formData, setFormData] = useState<EquipmentFormData>(
    initialData || {
      name: "",
      purchase_date: "",
      warranty_until: "",
      working: 0,
      maintenance: 0,
      broken: 0,
    }
  )

  // Reset form data khi initialData thay đổi (cho trường hợp edit)
  useEffect(() => {
    console.log("useEffect triggered - initialData:", initialData, "isOpen:", isOpen, "isEditing:", isEditing)
    
    if (isOpen) {
      if (initialData && isEditing) {
        console.log("Setting form data for edit:", initialData)
        setFormData({
          name: initialData.name || "",
          purchase_date: initialData.purchase_date || "",
          warranty_until: initialData.warranty_until || "",
          working: initialData.working || 0,
          maintenance: initialData.maintenance || 0,
          broken: initialData.broken || 0,
        })
      } else if (!isEditing) {
        console.log("Resetting form data for new equipment")
        setFormData({
          name: "",
          purchase_date: "",
          warranty_until: "",
          working: 0,
          maintenance: 0,
          broken: 0,
        })
      }
    }
  }, [initialData, isOpen, isEditing]) // Thêm isEditing vào dependencies

  const handleSave = () => {
    console.log("Form data being saved:", formData)
    console.log("Is editing:", isEditing)
    
    if (!formData.name) {
      alert("Equipment Name is required")
      return
    }
    if (!formData.purchase_date || !formData.warranty_until) {
      alert("Purchase date and Warranty until are required")
      return
    }

    onSave(formData)
  }

  const handleCancel = () => {
    console.log("Form cancelled")
    // Reset form data when canceling
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        name: "",
        purchase_date: "",
        warranty_until: "",
        working: 0,
        maintenance: 0,
        broken: 0,
      })
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 border-none" aria-describedby="equipment-form-description">
        <div className="bg-white rounded-lg p-6">
          <DialogTitle className="text-xl font-bold text-[#1a1a6c] mb-4">
            {isEditing ? "Update Equipment" : "Add Equipment"}
          </DialogTitle>
          
          <div id="equipment-form-description" className="text-gray-600 mb-4 sr-only">
            {isEditing 
              ? "Update the equipment information below." 
              : "Fill in the details to add new equipment to your inventory."
            }
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-sm text-blue-600">Attach Photo</span>
              <Camera className="w-4 h-4 ml-1 text-blue-600" />
            </div>

            <div className="space-y-2">
              <label htmlFor="equipment-name" className="block text-sm font-medium">
                Equipment Name
              </label>
              <Input
                id="equipment-name"
                className="bg-gray-200 border-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="purchase-date" className="block text-sm font-medium">
                  Purchase Date
                </label>
                <Input
                  id="purchase-date"
                  type="date"
                  className="bg-gray-200 border-none"
                  value={formData.purchase_date}
                  onChange={(e) => setFormData({ ...formData, purchase_date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="warranty-until" className="block text-sm font-medium">
                  Warranty Until
                </label>
                <Input
                  id="warranty-until"
                  type="date"
                  className="bg-gray-200 border-none"
                  value={formData.warranty_until}
                  onChange={(e) => setFormData({ ...formData, warranty_until: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="working" className="block text-sm font-medium">
                  Working
                </label>
                <Input
                  id="working"
                  type="number"
                  min={0}
                  className="bg-gray-200 border-none"
                  value={formData.working}
                  onChange={(e) => setFormData({ ...formData, working: +e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="maintenance" className="block text-sm font-medium">
                  Maintenance
                </label>
                <Input
                  id="maintenance"
                  type="number"
                  min={0}
                  className="bg-gray-200 border-none"
                  value={formData.maintenance}
                  onChange={(e) => setFormData({ ...formData, maintenance: +e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="broken" className="block text-sm font-medium">
                  Broken
                </label>
                <Input
                  id="broken"
                  type="number"
                  min={0}
                  className="bg-gray-200 border-none"
                  value={formData.broken}
                  onChange={(e) => setFormData({ ...formData, broken: +e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-gray-300 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-black cursor-pointer"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}