import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import {
 
  Eye,
  Edit,
  Calendar,
  Mail,
  MapPin,
  Phone
 
} from "lucide-react"
import { AddJob } from "@/components/Job/addJob"
import { jobList } from "@/data/urlRecruiter"
import { JobPayload } from "@/data/common"
export default function JobApplications(props:any){
  const [refresh,setRefresh]=useState(0);
  const [jobs,setJobs]=useState<any[] >([]);
  const onSubmit=()=>{
    setRefresh(prev=>prev+1)
  }
   const getStageColor = (stage: string) => {
    const colors = {
      Applied: "bg-blue-100 text-blue-800",
      Screening: "bg-yellow-100 text-yellow-800",
      Interview: "bg-purple-100 text-purple-800",
      "Final Round": "bg-orange-100 text-orange-800",
      Offer: "bg-green-100 text-green-800",
      Hired: "bg-emerald-100 text-emerald-800",
    }
    return colors[stage as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

 
 const getStatusColor = (status: string) => {
    const colors = {
      Active: "bg-green-100 text-green-800",
      Draft: "bg-yellow-100 text-yellow-800",
      Closed: "bg-red-100 text-red-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }
  const recentCandidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Frontend Developer",
    stage: "Interview",
    applied: "2024-01-18",
    experience: "5 years",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 (555) 987-6543",
    position: "Product Manager",
    stage: "Final Round",
    applied: "2024-01-16",
    experience: "7 years",
    location: "Remote",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "+1 (555) 456-7890",
    position: "UX Designer",
    stage: "Screening",
    applied: "2024-01-19",
    experience: "4 years",
    location: "New York, NY",
  },
]

  return(
    <>
        <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Candidate Management</h2>
              <div className="flex items-center space-x-4">
                <Input placeholder="Search candidates..." className="w-64" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="screening">Screening</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="final">Final Round</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{candidate.name}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Mail className="h-3 w-3" />
                              <span>{candidate.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Phone className="h-3 w-3" />
                              <span>{candidate.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.position}</TableCell>
                        <TableCell>
                          <Badge className={getStageColor(candidate.stage)}>{candidate.stage}</Badge>
                        </TableCell>
                        <TableCell>{new Date(candidate.applied).toLocaleDateString()}</TableCell>
                        <TableCell>{candidate.experience}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {candidate.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            </>
    
  )
}