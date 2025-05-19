const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";


export async function createEquipment(data: {
  name: string;
  purchase_date: Date;
  warranty_until: Date;
  status: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/equipment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {    
    throw new Error("Lỗi khi tạo danh sách equipments");
  }
  return res.json();
  
}
export async function getAllEquipments() {
  const res = await fetch(`${API_BASE_URL}/api/equipment`);
  if (!res.ok) {
    throw new Error("Lỗi khi lấy danh sách equipments");
  }
  return res.json();  // trả về object { success, data }
}

export async function updateEquipment(id: string, data: {
  name: string;
  duration: Date;
  price: Date;
  type: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/equipment/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Lỗi khi cập nhật equipment");
  }
  return res.json();
}


