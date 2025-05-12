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
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#1a1a6c]">
          <Plus className="mr-2 h-4 w-4" /> Add Package
        </Button>
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
                  onClick={() => {
                    setCurrentPackage(pkg)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    setCurrentPackage(pkg)
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

      {/* Add Package Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Membership Package</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Package Name</Label>
              <Input
                id="name"
                value={newPackage.name || ""}
                onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                placeholder="e.g. Basic Membership"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={newPackage.price || ""}
                onChange={(e) => setNewPackage({ ...newPackage, price: Number.parseFloat(e.target.value) })}
                placeholder="e.g. 29.99"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Select
                value={newPackage.duration}
                onValueChange={(value) => setNewPackage({ ...newPackage, duration: value })}
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 month">1 Month</SelectItem>
                  <SelectItem value="3 months">3 Months</SelectItem>
                  <SelectItem value="6 months">6 Months</SelectItem>
                  <SelectItem value="12 months">12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select value={newPackage.type} onValueChange={(value) => setNewPackage({ ...newPackage, type: value })}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gym Access">Gym Access</SelectItem>
                  <SelectItem value="Full Access">Full Access</SelectItem>
                  <SelectItem value="Classes Only">Classes Only</SelectItem>
                  <SelectItem value="Personal Training">Personal Training</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newPackage.status}
                onValueChange={(value: "active" | "inactive") => setNewPackage({ ...newPackage, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPackage}>Add Package</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Package Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Membership Package</DialogTitle>
          </DialogHeader>

          {currentPackage && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Package Name</Label>
                <Input
                  id="edit-name"
                  value={currentPackage.name}
                  onChange={(e) => setCurrentPackage({ ...currentPackage, name: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={currentPackage.price}
                  onChange={(e) => setCurrentPackage({ ...currentPackage, price: Number.parseFloat(e.target.value) })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-duration">Duration</Label>
                <Select
                  value={currentPackage.duration}
                  onValueChange={(value) => setCurrentPackage({ ...currentPackage, duration: value })}
                >
                  <SelectTrigger id="edit-duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 month">1 Month</SelectItem>
                    <SelectItem value="3 months">3 Months</SelectItem>
                    <SelectItem value="6 months">6 Months</SelectItem>
                    <SelectItem value="12 months">12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-type">Type</Label>
                <Select
                  value={currentPackage.type}
                  onValueChange={(value) => setCurrentPackage({ ...currentPackage, type: value })}
                >
                  <SelectTrigger id="edit-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gym Access">Gym Access</SelectItem>
                    <SelectItem value="Full Access">Full Access</SelectItem>
                    <SelectItem value="Classes Only">Classes Only</SelectItem>
                    <SelectItem value="Personal Training">Personal Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={currentPackage.status}
                  onValueChange={(value: "active" | "inactive") =>
                    setCurrentPackage({ ...currentPackage, status: value })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPackage}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Package</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the "{currentPackage?.name}" package? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePackage}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
