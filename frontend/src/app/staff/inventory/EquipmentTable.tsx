import { Search, ArrowUpDown, Pencil, Trash } from "lucide-react"
import { Input } from "@/components/ui/input"

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

interface EquipmentTableProps {
  equipments: Equipment[]
  loading: boolean
  error: string
  searchTerm: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onEdit: (equipment: Equipment) => void
  onDelete: (id: string) => void
}

export default function EquipmentTable({
  equipments,
  loading,
  error,
  searchTerm,
  onSearchChange,
  onEdit,
  onDelete
}: EquipmentTableProps) {
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this equipment?")) {
      onDelete(id)
    }
  }

  return (
    <div className="bg-[#7a7aaa] rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Manage Equipments</h2>

      <div className="relative mb-6 w-64">
        <Input
          type="text"
          placeholder="Search by equipment name..."
          value={searchTerm}
          onChange={onSearchChange}
          className="pl-10 bg-[#6a6a93] text-white placeholder:text-gray-300 border-none w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
      </div>

      {/* Loading và Error states */}
      {loading && (
        <div className="text-center py-4 text-yellow-300">
          Loading equipments...
        </div>
      )}

      {error && (
        <div className="text-center py-4 text-red-300 bg-red-900/20 rounded mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4 font-medium">
                <div className="flex items-center">
                  <span>Equipment Name</span>
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              <th className="py-2 px-4 font-medium">Purchase Date</th>
              <th className="py-2 px-4 font-medium">Warranty Until</th>
              <th className="py-2 px-4 font-medium">Working</th>
              <th className="py-2 px-4 font-medium">Maintenance</th>
              <th className="py-2 px-4 font-medium">Broken</th>
              <th className="py-2 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && equipments.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-300">
                  {searchTerm ? "No equipments found matching your search." : "No equipments found."}
                </td>
              </tr>
            ) : (
              equipments.map((eq) => (
                <tr key={eq.id} className="hover:bg-[#12125c] cursor-pointer">
                  <td className="py-2 px-4">{eq.name}</td>
                  <td className="py-2 px-4">{eq.purchase_date}</td>
                  <td className="py-2 px-4">{eq.warranty_until}</td>
                  <td className="py-2 px-4">{eq.working}</td>
                  <td className="py-2 px-4">{eq.maintenance}</td>
                  <td className="py-2 px-4">{eq.broken}</td>
                  <td className="py-2 px-4 text-right space-x-4">
                    <Pencil
                      className="inline-block w-5 h-5 cursor-pointer text-yellow-400"
                      onClick={() => onEdit(eq)}
                    />
                    <Trash
                      className="inline-block w-5 h-5 cursor-pointer text-red-600"
                      onClick={() => handleDelete(eq.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}