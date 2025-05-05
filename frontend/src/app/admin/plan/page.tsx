import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Plan() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-32 h-32 bg-[#1a1a6c] rounded-full mb-4 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Admin"
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
            <Button className="mt-2">Change Picture</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input id="firstName" defaultValue="Juan" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input id="lastName" defaultValue="Dela Cruz" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" defaultValue="juan.delacuz@gmail.com" />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input id="phone" defaultValue="+63 912 345 6789" />
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Input id="role" defaultValue="Administrator" disabled />
              </div>

              <div className="pt-4 flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
