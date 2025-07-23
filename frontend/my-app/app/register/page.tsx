"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, Upload } from "lucide-react"
import Candidate from "./candidate"
import Recruiter from "./recruiter"
import Admin from "./admin"
type Role = "candidate" | "interviewer" | "admin" | ""

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<Role>("")

  const renderRoleSpecificFields = () => {
    switch (selectedRole) {
      case "candidate":
        return (
          <>
            <Candidate/>
          </>
        )

      case "interviewer":
        return (
          <>
            <Recruiter/>
          </>
        )

      case "admin":
        return (
          <>
            <Admin/>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Join CareerHub</CardTitle>
          <CardDescription>Create your account and start your career journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="role">I am a...</Label>
            <Select value={selectedRole} onValueChange={(value: Role) => setSelectedRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="candidate">Job Candidate</SelectItem>
                <SelectItem value="interviewer">Interviewer</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedRole && (
            <>
             

              {renderRoleSpecificFields()}

             
            </>
          )}
        </CardContent>
        <div className="px-6 pb-6">
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
