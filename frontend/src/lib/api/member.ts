const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export async function createMember(data: { 
     full_name: string,
     email: string, 
     password_hash: string, 
     phone: string, 
     birthdate: Date, 
     role: string, 
     membership_expiry_date: Date 
    }) {
    const res = await fetch(`${API_BASE_URL}/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("Lỗi khi tạo danh sách user");
    }
    return res.json();
}

export async function getAllMember() {
  const res = await fetch(`${API_BASE_URL}/api/user/member`);
  if (!res.ok) {
    throw new Error("Lỗi khi lấy danh sách user");
  }
  return res.json();  // trả về object { success, data }
}

export async function updateMember(id: string, data: {
      full_name: string;
      email: string;
      phone: string;
      birthdate: Date;
      membership_expiry_date: Date;
}) {
  const res = await fetch(`${API_BASE_URL}/api/user/member/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
        throw new Error("Lỗi khi tạo danh sách user");
    }
    return res.json();
}