const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const getToken = () => localStorage.getItem('token') || '';

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "API request failed");
  }
  return data; // Trả về { success, data }
};

export async function createMembership(data: {
  name: string;
  duration: number;
  price: number;
  type: string;
}) {
  return fetchWithAuth(`${API_BASE_URL}/api/membership`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllMemberships() {
  return fetchWithAuth(`${API_BASE_URL}/api/membership`);
}

export async function updateMembership(id: string, data: {
  name: string;
  duration: number;
  price: number;
  type: string;
}) {
  return fetchWithAuth(`${API_BASE_URL}/api/membership/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteMembership(id: string) {
  return fetchWithAuth(`${API_BASE_URL}/api/membership/${id}`, {
    method: 'DELETE',
  });
}