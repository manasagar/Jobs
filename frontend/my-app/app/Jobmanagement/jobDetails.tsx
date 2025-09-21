import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {MeetingDialog} from "@/components/Job/job-meeting-dialog"
import {
 
  Eye,
  Edit,
 
} from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { AddJob } from "@/components/Job/addJob"
import { jobList } from "@/data/urlRecruiter"

export default function JobDetails({ changeApplication }: { changeApplication : (id:any) => void }){
  const[showJobMeetingDialog,setShowJobMeetingDialog]=useState(false);
  const[selectedJobForMeeting,setSelectedJobForMeeting]=useState(-1);
  const [refresh,setRefresh]=useState(0);
  const [jobs,setJobs]=useState<any[] >([]);
  const [currentPage,setCurrentPage]=useState(0);
  const [totalPages,setTotalPages]=useState(1);
  const onSubmit=()=>{
    setRefresh(prev=>prev+1)
  }
  
 
 const getStatusColor = (status: string) => {
    const colors = {
      Active: "bg-green-100 text-green-800",
      Draft: "bg-yellow-100 text-yellow-800",
      Closed: "bg-red-100 text-red-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }
  const getJobs=async ()=>{
    try{
    const res=await jobList(currentPage);
     setJobs(res.content);
     setTotalPages(res.totalPages);
     console.log(res.content);
     return res;
    }
    catch(error){
      console.log(error);
    }
    
    
  }  
useEffect(()=>{
  getJobs()
},[refresh,currentPage])
return(<>

<div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Job Management</h2>
              <div className="flex items-center space-x-4"> 
              <AddJob onSubmit={onSubmit}/>
                
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                     
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Stipend</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      
                    jobs.map((job:any) => (
                      <TableRow key={job.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{job.jobTitle}</p>
                            {/* <p className="text-sm text-gray-500"></p> */}
                          </div>
                        </TableCell>
                      
                        <TableCell>{job.location}</TableCell>
                       
                        <TableCell>
                          <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(job.deadline).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {"$"+job.stipend}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button  variant="outline" size="sm" onClick={() => changeApplication(job.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={()=> {setShowJobMeetingDialog(true)
                              setSelectedJobForMeeting(job.id);
                            }

                            }>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                    }
                    { (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 0) {setCurrentPage(prev=>prev-1)}
                  }}
                  className={currentPage === 0 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(page-1)
                    }}
                    isActive={currentPage === page-1}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages-1) setCurrentPage(prev=>prev+1)
                  }}
                  className={currentPage === totalPages-1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          <MeetingDialog
        open={showJobMeetingDialog}
        onOpenChange={setShowJobMeetingDialog}
        application={selectedJobForMeeting}
     
      />
            </>
                )
}