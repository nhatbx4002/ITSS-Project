const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export async function getAllFeedBack() {
  const res = await fetch(`${API_BASE_URL}/api/feedback`);
  if (!res.ok) {
    throw new Error("Lỗi khi lấy danh sách feedback");
  }
  return res.json();  // trả về object { success, data }
}
