// components/AddTrainerModal.tsx
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import TrainerForm from './TrainerForm'

// Define interfaces
interface AddTrainerForm {
  full_name: string
  email: string
  phone: string
  birthdate: string
  password: string
  confirm_password: string
}

interface AddTrainerModalProps {
  isOpen: boolean
  onClose: () => void
  form: AddTrainerForm
  onFormChange: (field: keyof AddTrainerForm, value: string) => void
  onSubmit: () => void
  loading: boolean
}

export default function AddTrainerModal({
  isOpen,
  onClose,
  form,
  onFormChange,
  onSubmit,
  loading
}: AddTrainerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-900">Add Trainer</DialogTitle>
        </DialogHeader>

        <TrainerForm 
          form={form}
          onFormChange={onFormChange}
          loading={loading}
        />

        <DialogFooter className="gap-2">
          <Button onClick={onClose} variant="outline" disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={onSubmit} 
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              'Add'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}