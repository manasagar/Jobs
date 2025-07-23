"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  DollarSign
} from "lucide-react"
import JobDetails from "./jobDetails"
import JobApplications from "./jobApplications"

// Sample data
const applicationTrends = [
  { month: "Jan", applications: 45, hires: 8 },
  { month: "Feb", applications: 52, hires: 12 },
  { month: "Mar", applications: 38, hires: 6 },
  { month: "Apr", applications: 67, hires: 15 },
  { month: "May", applications: 73, hires: 18 },
  { month: "Jun", applications: 89, hires: 22 },
]

const hiringFunnel = [
  { stage: "Applied", count: 324, color: "#3b82f6" },
  { stage: "Screening", count: 156, color: "#8b5cf6" },
  { stage: "Interview", count: 89, color: "#06b6d4" },
  { stage: "Final Round", count: 34, color: "#10b981" },
  { stage: "Offer", count: 18, color: "#f59e0b" },
  { stage: "Hired", count: 12, color: "#ef4444" },
]

const jobPerformance = [
  { job: "Senior Developer", applications: 45, views: 234, conversion: 19.2 },
  { job: "Product Manager", applications: 32, views: 189, conversion: 16.9 },
  { job: "UX Designer", applications: 28, views: 156, conversion: 17.9 },
  { job: "Data Scientist", applications: 38, views: 201, conversion: 18.9 },
]

const applicationSources = [
  { name: "LinkedIn", value: 35, color: "#0077b5" },
  { name: "Indeed", value: 28, color: "#2557a7" },
  { name: "Company Website", value: 20, color: "#16a34a" },
  { name: "Referrals", value: 12, color: "#dc2626" },
  { name: "Other", value: 5, color: "#6b7280" },
]

const activeJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    posted: "2024-01-15",
    applications: 45,
    status: "Active",
    deadline: "2024-02-15",
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    salary: "$130k - $170k",
    posted: "2024-01-10",
    applications: 32,
    status: "Active",
    deadline: "2024-02-10",
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "New York, NY",
    salary: "$90k - $120k",
    posted: "2024-01-20",
    applications: 28,
    status: "Draft",
    deadline: "2024-02-20",
  },
]

export default function Component() {
  const [application,setApplication]=useState(-1);
  function changeApplication(id:any){
  setApplication(id);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">RecruiterHub</span>
            </div>
            
          </div>
        </div>
      </header>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">324</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hires This Month</p>
                  <p className="text-2xl font-bold text-gray-900">22</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. Time to Hire</p>
                  <p className="text-2xl font-bold text-gray-900">18 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {application==-1?<JobDetails changeApplication={changeApplication}/>:<JobApplications changeApplication={changeApplication} application={application}/>}
        {/* <Tabs defaultValue="dashboard" className="w-full">
          
        
          <TabsContent value="jobs" className="space-y-6">
            <JobDetails />
          </TabsContent>

          
        </Tabs> */}
      </div>
    </div>
  )
}
