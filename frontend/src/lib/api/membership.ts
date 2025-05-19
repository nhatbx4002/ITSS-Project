const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";


export async function createMembership(data: {
  name: string;
  duration: number;
  price: number;
  type: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/membership`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Lỗi khi tạo danh sách memberships");
  }
  return res.json();
  
}
export async function getAllMemberships() {
  const res = await fetch(`${API_BASE_URL}/api/membership`);
  if (!res.ok) {
    throw new Error("Lỗi khi lấy danh sách memberships");
  }
  return res.json();  // trả về object { success, data }
}

export async function updateMembership(id: string, data: {
  name: string;
  duration: number;
  price: number;
  type: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/membership/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Lỗi khi cập nhật membership");
  }
  return res.json();
}

export async function deleteMembership(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/membership/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error("Lỗi khi cập nhật membership");
  }
  return res.json();
}

