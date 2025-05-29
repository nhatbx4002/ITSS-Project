
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// Define Coach interface based on your backend User model
interface Coach {
  _id: string
  full_name: string
  email: string
  phone: string
  birthdate: string
  created_at: string
  updatedAt?: string
}

interface AddTrainerForm {
  full_name: string
  email: string
  phone: string
  birthdate: string
  password: string
  confirm_password: string
}

interface TrainerFormProps {
  form: AddTrainerForm
  onFormChange: (field: keyof AddTrainerForm, value: string) => void
  loading: boolean
}

export default function TrainerForm({ form, onFormChange, loading }: TrainerFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="full_name" className="text-sm font-medium text-gray-700">Full Name</Label>
        <Input
          id="full_name"
          value={form.full_name}
          onChange={(e) => onFormChange("full_name", e.target.value)}
          className="mt-1"
          placeholder="Enter full name"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => onFormChange("email", e.target.value)}
          className="mt-1"
          placeholder="Enter email address"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</Label>
        <Input
          id="phone"
          value={form.phone}
          onChange={(e) => onFormChange("phone", e.target.value)}
          className="mt-1"
          placeholder="Enter phone number"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="birthdate" className="text-sm font-medium text-gray-700">Date of Birth</Label>
        <Input
          id="birthdate"
          type="date"
          value={form.birthdate}
          onChange={(e) => onFormChange("birthdate", e.target.value)}
          className="mt-1"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
        <Input
          id="password"
          type="password"
          value={form.password}
          onChange={(e) => onFormChange("password", e.target.value)}
          className="mt-1"
          placeholder="Enter password"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="confirm_password" className="text-sm font-medium text-gray-700">Confirm Password</Label>
        <Input
          id="confirm_password"
          type="password"
          value={form.confirm_password}
          onChange={(e) => onFormChange("confirm_password", e.target.value)}
          className="mt-1"
          placeholder="Confirm password"
          disabled={loading}
        />
      </div>
    </div>
  )
}