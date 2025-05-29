"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Users } from "lucide-react"

// Define types
interface MembershipPackage {
  id: number
  type: string
  duration: number
  price: number
  registeredCount: number
  status: "active" | "inactive"
}

// Valid membership packages data - 12 gói tập đầy đủ
const validMemberships = [
  { type: 'personal_training', duration: 30, price: 42 },
  { type: 'personal_training', duration: 90, price: 113 },
  { type: 'personal_training', duration: 180, price: 208 },
  { type: 'personal_training', duration: 365, price: 375 },
  
  { type: 'standard', duration: 30, price: 25 },
  { type: 'standard', duration: 90, price: 63 },
  { type: 'standard', duration: 180, price: 113 },
  { type: 'standard', duration: 365, price: 208 },
  
  { type: 'vip', duration: 30, price: 84 },
  { type: 'vip', duration: 90, price: 229 },
  { type: 'vip', duration: 180, price: 417 },
  { type: 'vip', duration: 365, price: 750 },
];

export default function MembershipPackagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [packages, setPackages] = useState<MembershipPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // API functions
  const fetchMemberships = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Tạo tất cả 12 gói từ validMemberships với giá trị mặc định
      const allPackages = validMemberships.map((pkg, index) => ({
        id: index + 1,
        type: pkg.type,
        duration: pkg.duration,
        price: pkg.price,
        registeredCount: 0, // Mặc định là 0
        status: "active" as const
      }))

      try {
        // Thử lấy dữ liệu từ API để cập nhật số người đăng ký
        const response = await fetch('http://localhost:5000/api/membership')
        
        if (response.ok) {
          const result = await response.json()
          
          if (result.success && Array.isArray(result.data)) {
            // Gộp dữ liệu API với danh sách gói đầy đủ
            const mergedPackages = allPackages.map(pkg => {
              // Tìm gói tương ứng trong dữ liệu API
              const apiData = result.data.find((item: any) => 
                item.type === pkg.type && 
                item.duration === pkg.duration && 
                item.price === pkg.price
              )
              
              return {
                ...pkg,
                registeredCount: apiData?.registeredCount || 0,
                status: apiData?.status || "active"
              }
            })
            
            setPackages(mergedPackages)
          } else {
            // Nếu API response không hợp lệ, dùng gói mặc định
            setPackages(allPackages)
          }
        } else {
          // Nếu API call thất bại, dùng gói mặc định
          console.warn('API call failed, using default packages')
          setPackages(allPackages)
        }
      } catch (apiError) {
        // Nếu API không khả dụng, dùng gói mặc định
        console.warn('API not available, using default packages:', apiError)
        setPackages(allPackages)
        setError(null) // Không hiển thị lỗi cho việc API không khả dụng
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định')
      console.error('Error in fetchMemberships:', err)
    } finally {
      setLoading(false)
    }
  }

  // Load data on component mount
  useEffect(() => {
    fetchMemberships()
  }, [])

  // Filter packages based on search term
  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.duration.toString().includes(searchTerm.toLowerCase()) ||
      pkg.price.toString().includes(searchTerm.toLowerCase())
  )

  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  // Format type display
  const formatType = (type: string) => {
    switch (type) {
      case 'personal_training':
        return 'Personal Training'
      case 'standard':
        return 'Standard'
      case 'vip':
        return 'VIP'
      default:
        return type.charAt(0).toUpperCase() + type.slice(1)
    }
  }

  // Format duration display
  const formatDuration = (duration: number) => {
    if (duration < 30) return `${duration} days`
    if (duration === 30) return '1 month'
    if (duration === 90) return '3 months'
    if (duration === 180) return '6 months'
    if (duration === 365) return '1 year'
    return `${duration} days`
  }

  // Get card color based on type
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'personal_training':
        return 'border-l-4 border-l-purple-500'
      case 'standard':
        return 'border-l-4 border-l-blue-500'
      case 'vip':
        return 'border-l-4 border-l-yellow-500'
      default:
        return 'border-l-4 border-l-gray-500'
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gói Tập Gym</h1>
          {loading && <p className="text-sm text-gray-500 mt-1">Đang tải dữ liệu...</p>}
          {error && <p className="text-sm text-red-500 mt-1">Lỗi: {error}</p>}
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={fetchMemberships} 
            variant="outline"
            disabled={loading}
          >
            {loading ? "Đang tải..." : "Làm mới"}
          </Button>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <Input
            placeholder="Tìm kiếm gói tập..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-500">Đang tải dữ liệu...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">Lỗi kết nối: {error}</p>
          <Button onClick={fetchMemberships} variant="outline">
            Thử lại
          </Button>
        </div>
      ) : filteredPackages.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          {searchTerm ? "Không tìm thấy gói tập nào phù hợp" : "Không có dữ liệu gói tập"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className={`flex flex-col ${getTypeColor(pkg.type)} hover:shadow-lg transition-shadow`}>
              <CardContent className="pt-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{formatType(pkg.type)}</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-2">{formatPrice(pkg.price)}</p>
                    <p className="text-gray-500 text-sm">{formatDuration(pkg.duration)}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      pkg.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {pkg.status === "active" ? "Hoạt động" : "Tạm dừng"}
                  </span>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Đã đăng ký</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-semibold text-lg ${pkg.registeredCount === 0 ? 'text-gray-400' : 'text-blue-600'}`}>
                        {pkg.registeredCount}
                      </span>
                      {pkg.registeredCount === 0 && (
                        <p className="text-xs text-gray-400">Chưa có đăng ký</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>
                    <span className="font-medium">Thời hạn:</span>
                    <p>{pkg.duration} ngày</p>
                  </div>
                  <div>
                    <span className="font-medium">Loại:</span>
                    <p>{formatType(pkg.type)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}