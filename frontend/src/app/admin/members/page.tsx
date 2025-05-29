"use client";

import { useEffect, useState } from "react";
import { getAllMember, createMember, updateMember } from "@/lib/api/member";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Member = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  birthdate: string;
  membership_expiry_date: string;
};

export default function MemberList() {
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);


  useEffect(() => {
    async function fetchMembers() {
      try {
        const json = await getAllMember();
        setMembers(json.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách user:", err);
        setError("Không thể tải danh sách user.");
      }
    }

    fetchMembers();
  }, []);
  async function handleSave() {
  if (!selectedMember) return;

  try {
    await updateMember(selectedMember.id, {
      full_name: selectedMember.full_name,
      email: selectedMember.email,
      phone: selectedMember.phone,
      birthdate: selectedMember.birthdate,
      membership_expiry_date: selectedMember.membership_expiry_date,
    });

    setIsEditOpen(false);
    // Cập nhật lại danh sách thành viên
    const updated = await getAllMember();
    setMembers(updated.data);
  } catch (err) {
    console.error("Lỗi khi cập nhật thành viên:", err);
    setError("Cập nhật thất bại.");
  }
}


  return (
     <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Members</h1>
      </div>
{/*  */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="member-name" className="mb-1">
                Member Name
              </Label>
              <Input
                id="member-name"
                value={selectedMember?.full_name || ""}
                onChange={(e) =>
                  setSelectedMember((prev) => prev ? { ...prev, full_name: e.target.value } : null)
                }
              />
            </div>
            <div>
              <Label htmlFor="member-code" className="mb-1">
                Member Email
              </Label>
              <Input
                id="member-email"
                value={selectedMember?.email || ""}
                onChange={(e) =>
                  setSelectedMember((prev) => prev ? { ...prev, email: e.target.value } : null)
                }
              />
            </div>
            <div>
              <Label htmlFor="start-date" className="mb-1">
                Phone
              </Label>
              <Input
                id="member-phone"
                value={selectedMember?.phone || ""}
                onChange={(e) =>
                  setSelectedMember((prev) => prev ? { ...prev, phone: e.target.value } : null)
                }
              />
            </div>
            <div>
              <Label htmlFor="duration" className="mb-1">
                Birthday
              </Label>
              <Input
                id="member-birthday"
                value={selectedMember?.birthdate || ""}
                onChange={(e) =>
                  setSelectedMember((prev) => prev ? { ...prev, birthdate: e.target.value } : null)
                }
              />
            </div>
            <div>
              <Label htmlFor="training-type" className="mb-1">
                Membership_expiry_date
              </Label>
              <Input
                id="member-membership_expiry_date"
                value={selectedMember?.membership_expiry_date || ""}
                onChange={(e) =>
                  setSelectedMember((prev) => prev ? { ...prev, membership_expiry_date: e.target.value } : null)
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsEditOpen(false)} variant="outline" className="cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleSave} className="cursor-pointer">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
                {/*  */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>All Members</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">#</th>
                  <th className="text-left py-3 px-4 font-medium">Member Name</th>
                  <th className="text-left py-3 px-4 font-medium">Member Email</th>
                  <th className="text-left py-3 px-4 font-medium">Phone</th>
                  <th className="text-left py-3 px-4 font-medium">Birthday</th>
                  <th className="text-left py-3 px-4 font-medium">Membership_expiry_date</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr key={member.id} className="border-b">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{member.full_name}</td>
                    <td className="py-3 px-4">{member.email}</td>
                    <td className="py-3 px-4">{member.phone}</td>
                    <td className="py-3 px-4">{member.birthdate}</td>
                    <td className="py-3 px-4">{member.membership_expiry_date}</td>
                   
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedMember(member);
                          setIsEditOpen(true);
                        }}
                      >
                        Edit
                      </Button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
     </div>
  );
}
