"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Pencil, Trash2 } from "lucide-react"
import UpdateMembership from "./updateMembership/updateMembership"  
import Modal from './updateMembership/Modal'

interface Membership {
  duration?: number | string;
  name?: string;
}

interface Subscription {
  start_date?: string | null;
  end_date?: string | null;
  membership?: Membership | null;
}

interface Member {
  _id: string;
  full_name: string;
  phone: string;
  birthdate: string;
  subscription?: Subscription | null;
  membership?: Membership | null;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchMembers = useCallback(async (search = "") => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL("http://localhost:5000/api/staff/getAllMembers");
      if (search) url.searchParams.append("search", search);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch members");
      const data = await res.json();

      if (Array.isArray(data.listMembers)) {
        setMembers(data.listMembers);
      } else {
        setMembers([]);
        console.warn("API response does not contain listMembers array:", data);
      }
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchMembers]);

  function handleEditClick(member: Member) {
    setEditingMember(member);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/staff/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete member");

      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (error: any) {
      alert(error.message || "Error deleting member");
    }
  }

  function handleCloseForm() {
    setEditingMember(null);
  }

  if (loading) return <div>Loading members...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 relative">
      {/* Danh sách members */}
      <div className={`transition-all duration-300 ${editingMember ? "filter blur-md" : ""}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Members</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>All Members</CardTitle>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Input
                    placeholder="Search members..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-center py-3 px-4 font-medium">STT</th>
                    <th className="text-center py-3 px-4 font-medium">Member Name</th>
                    <th className="text-center py-3 px-4 font-medium">Phone</th>
                    <th className="text-center py-3 px-4 font-medium">Date of Birth</th>
                    <th className="text-center py-3 px-4 font-medium">Length of Membership</th>
                    <th className="text-center py-3 px-4 font-medium">Start Date</th>
                    <th className="text-center py-3 px-4 font-medium">End Date</th>
                    <th className="text-center py-3 px-4 font-medium">Training Type</th>
                    <th className="text-center py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.length === 0 && (
                    <tr>
                      <td colSpan={9} className="text-center py-4 text-gray-500">
                        No members found.
                      </td>
                    </tr>
                  )}

                  {members.map((member, index) => {
                    const length = member.membership?.duration ?? member.subscription?.membership?.duration ?? "";
                    const startDate = member.subscription?.start_date ?? "";
                    const endDate = member.subscription?.end_date ?? "";
                    const trainingType = member.membership?.name ?? member.subscription?.membership?.name ?? "";

                    return (
                      <tr key={member._id} className="border-b">
                        <td className="py-3 px-4 text-center">{index + 1}</td>
                        <td className="py-3 px-4 text-center">{member.full_name}</td>
                        <td className="py-3 px-4 text-center">{member.phone}</td>
                        <td className="py-3 px-4 text-center">{new Date(member.birthdate).toLocaleDateString('vi-VN')}</td>
                        <td className="py-3 px-4 text-center">{length ? length : "--"}</td>
                        <td className="py-3 px-4 text-center">{startDate ? new Date(startDate).toLocaleDateString('vi-VN') : "--"}</td>
                        <td className="py-3 px-4 text-center">{endDate ? new Date(endDate).toLocaleDateString('vi-VN') : "--"}</td>
                        <td className="py-3 px-4 text-center">{trainingType ? trainingType : "--"}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditClick(member)}
                              aria-label="Edit member"
                            >
                              <Pencil className="w-4 h-4 text-blue-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(member._id)}
                              aria-label="Delete member"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal hiển thị form update ở giữa màn hình */}
      {editingMember && (
        <Modal isOpen={!!editingMember} onClose={handleCloseForm} showOverlay={false}>
          <UpdateMembership member={editingMember} onClose={handleCloseForm} />
        </Modal>
      )}
    </div>
  )
}