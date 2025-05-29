"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AddTrainerModal from './AddTrainerModal'
import CoachesTable from './CoachesTable'

// Define interfaces
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

export default function CoachesPage() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [addTrainerForm, setAddTrainerForm] = useState<AddTrainerForm>({
    full_name: "",
    email: "",
    phone: "",
    birthdate: "",
    password: "",
    confirm_password: ""
  })

  // Fetch coaches from backend
  const fetchCoaches = async (searchName = '') => {
    try {
      setLoading(true)
      const url = searchName 
        ? `http://localhost:5000/api/coach?name=${encodeURIComponent(searchName)}`
        : `http://localhost:5000/api/coach`
      
      const response = await fetch(url)
      const result = await response.json()
      console.log(result.data);
      
      if (result.success) {
        setCoaches(result.data)
      } else {
        console.error('Failed to fetch coaches:', result.message)
        alert('Failed to fetch coaches: ' + result.message)
      }
    } catch (error) {
      console.error('Error fetching coaches:', error)
      alert('Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  // Load coaches on component mount
  useEffect(() => {
    fetchCoaches()
  }, [])

  // Search coaches with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchCoaches(searchTerm)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const handleAddTrainerChange = (field: keyof AddTrainerForm, value: string) => {
    setAddTrainerForm({ ...addTrainerForm, [field]: value })
  }

  const handleAddTrainer = async () => {
    // Validation
    if (!addTrainerForm.full_name || !addTrainerForm.email || !addTrainerForm.phone || 
        !addTrainerForm.birthdate || !addTrainerForm.password || !addTrainerForm.confirm_password) {
      alert("Please fill in all fields")
      return
    }

    if (addTrainerForm.password !== addTrainerForm.confirm_password) {
      alert("Passwords do not match")
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`http://localhost:5000/api/coach/createCoach`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addTrainerForm)
      })

      const result = await response.json()

      if (result.success) {
        alert('Trainer added successfully!')
        
        // Reset form
        setAddTrainerForm({
          full_name: "",
          email: "",
          phone: "",
          birthdate: "",
          password: "",
          confirm_password: ""
        })
        
        setIsAddOpen(false)
        
        // Refresh coaches list
        await fetchCoaches(searchTerm)
      } else {
        alert('Failed to add trainer: ' + result.message)
      }
    } catch (error) {
      console.error('Error adding trainer:', error)
      alert('Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCoach = async (coachId: string) => {
    if (!window.confirm("Are you sure you want to delete this trainer?")) {
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`http://localhost:5000/api/coach/deleteCoach/${coachId}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (result.success) {
        alert('Trainer deleted successfully!')
        
        // Refresh coaches list
        await fetchCoaches(searchTerm)
      } else {
        alert('Failed to delete trainer: ' + result.message)
      }
    } catch (error) {
      console.error('Error deleting trainer:', error)
      alert('Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coaches</h1>
        <Button 
          onClick={() => setIsAddOpen(true)} 
          className="bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Trainer
        </Button>
      </div>

      <AddTrainerModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        form={addTrainerForm}
        onFormChange={handleAddTrainerChange}
        onSubmit={handleAddTrainer}
        loading={loading}
      />

      <CoachesTable
        coaches={coaches}
        loading={loading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onDeleteCoach={handleDeleteCoach}
      />
    </div>
  )
}