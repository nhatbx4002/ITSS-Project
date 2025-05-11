"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2 } from "lucide-react"

// Define types
interface MembershipPackage {
  id: number
  name: string
  price: number
  duration: string
  type: string
  status: "active" | "inactive"
}

export default function MembershipPackagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [packages, setPackages] = useState<MembershipPackage[]>([
    {
      id: 1,
      name: "Basic Membership",
      price: 29.99,
      duration: "1 month",
      type: "Gym Access",
      status: "active",
    },
    {
      id: 2,
      name: "Premium Membership",
      price: 49.99,
      duration: "1 month",
      type: "Full Access",
      status: "active",
    },
    {
      id: 3,
      name: "Annual Basic",
      price: 299.99,
      duration: "12 months",
      type: "Gym Access",
      status: "active",
    },
    {
      id: 4,
      name: "Annual Premium",
      price: 499.99,
      duration: "12 months",
      type: "Full Access",
      status: "active",
    },
    {
      id: 5,
      name: "Student Membership",
      price: 19.99,
      duration: "1 month",
      type: "Gym Access",
      status: "active",
    },
    {
      id: 6,
      name: "Family Package",
      price: 79.99,
      duration: "1 month",
      type: "Full Access",
      status: "active",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentPackage, setCurrentPackage] = useState<MembershipPackage | null>(null)
  const [newPackage, setNewPackage] = useState<Partial<MembershipPackage>>({
    name: "",
    price: 0,
    duration: "1 month",
    type: "Gym Access",
    status: "active",
  })

  // Filter packages based on search term
  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.duration.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle adding a new package
  const handleAddPackage = () => {
    if (!newPackage.name || !newPackage.price) return

    const packageToAdd: MembershipPackage = {
      id: packages.length > 0 ? Math.max(...packages.map((p) => p.id)) + 1 : 1,
      name: newPackage.name || "",
      price: Number(newPackage.price) || 0,
      duration: newPackage.duration || "1 month",
      type: newPackage.type || "Gym Access",
      status: (newPackage.status as "active" | "inactive") || "active",
    }

    setPackages([...packages, packageToAdd])
    setNewPackage({
      name: "",
      price: 0,
      duration: "1 month",
      type: "Gym Access",
      status: "active",
    })
    setIsAddDialogOpen(false)
  }

  // Handle editing a package
  const handleEditPackage = () => {
    if (!currentPackage) return

    const updatedPackages = packages.map((pkg) => (pkg.id === currentPackage.id ? currentPackage : pkg))
    setPackages(updatedPackages)
    setIsEditDialogOpen(false)
  }

  // Handle deleting a package
  const handleDeletePackage = () => {
    if (!currentPackage) return

    const updatedPackages = packages.filter((pkg) => pkg.id !== currentPackage.id)
    setPackages(updatedPackages)
    setIsDeleteDialogOpen(false)
  }

  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Membership Packages</h1>
      </div>

      <div className="flex justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <Input
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {filteredPackages.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No packages found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className="flex flex-col">
              <CardContent className="pt-6 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{pkg.name}</h3>
                    <p className="text-2xl font-bold text-[#1a1a6c] mt-2">{formatPrice(pkg.price)}</p>
                    <p className="text-gray-500 text-sm">{pkg.duration}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pkg.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {pkg.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium">Type: {pkg.type}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-black-600 hover:text-green-700 hover:bg-green-50 cursor-pointer"
                  onClick={() => {
                    setCurrentPackage(pkg)
                    setIsDeleteDialogOpen(true)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Apply
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
