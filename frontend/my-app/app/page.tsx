import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, UserCheck, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-full">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to CareerHub</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect talented candidates with top companies through our comprehensive career platform
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle>For Candidates</CardTitle>
              <CardDescription>Find your dream job and showcase your skills to top employers</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Upload your resume</li>
                <li>• Track applications</li>
                <li>• Practice interviews</li>
                <li>• Get matched with jobs</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <UserCheck className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle>For Interviewers</CardTitle>
              <CardDescription>Conduct efficient interviews and find the best talent</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Schedule interviews</li>
                <li>• Access candidate profiles</li>
                <li>• Collaborative evaluation</li>
                <li>• Interview templates</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-purple-600" />
              </div>
              <CardTitle>For Admins</CardTitle>
              <CardDescription>Manage your organization's hiring process efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• User management</li>
                <li>• Analytics dashboard</li>
                <li>• Process automation</li>
                <li>• Compliance tracking</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
