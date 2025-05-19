const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export async function getAllStaff() {
  const res = await fetch(`${API_BASE_URL}/api/user/staff`);
  if (!res.ok) {
    throw new Error("Lỗi khi lấy danh sách staff");
  }
  return res.json();  // trả về object { success, data }
}

export async function updateStaff(id: string, data: {
      full_name: string;
      email: string;
      phone: string;
      birthdate: Date;
}) {
  const res = await fetch(`${API_BASE_URL}/api/user/staff/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
        throw new Error("Lỗi khi tạo danh sách staff");
    }
    return res.json();
}