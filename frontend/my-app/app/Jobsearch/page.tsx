"use client"

import { useState, useMemo, useEffect } from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search} from "lucide-react"
import {ProfileButton} from "@/components/Job/profile-button"
import { appliedJobList, applyJob, jobList, savedJobList, saveJob } from "@/data/urlJobseeker"

import AllJob from "./allJob"
import AllApplication from "./allApplication"


const JOBS_PER_PAGE = 3

export default function JobSearchPage() {
  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(0)
  const [activeTab, setActiveTab] = useState("all")
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [refresh,setRefresh] =useState(0);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCurrentPage(0) 
  }

const getJobs=async ()=>{
   let res=await jobList(currentPage);
   
   setJobs(res.content);
   setTotalPages(res.totalPages);
   setTotalCount(res.totalElements)
  
}
const getSavedJobs=async()=>{
   let res=await savedJobList(currentPage);
   setJobs(res.content);
   setTotalPages(res.totalPages);
  setTotalCount(res.totalElements)

}
const getAppliedJobs=async()=>{
  let res=await appliedJobList(currentPage);
   setJobs(res.content);
   setTotalPages(res.totalPages);
   setTotalCount(res.totalElements)

}

  

  useEffect(() => {
    
    if(activeTab=='all'){
        getJobs();
    }
    else if(activeTab=='saved'){
        getSavedJobs();
    }
    else{
        getAppliedJobs();
    }
  }, [searchTerm, locationFilter, typeFilter, activeTab,currentPage,refresh])

  const handleApply = async (jobId: number) => {
    await applyJob(jobId);
    setRefresh(prev=>prev+1)
  }

  const handleSave = async(jobId: number) => {
    await saveJob(jobId);
    setRefresh(prev=>prev+1);
  }

  const handlePageChange = (page: number) => {
    console.log(page)
    setCurrentPage(page)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
     <div className="mb-8 flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
      <p className="text-muted-foreground">
        Discover opportunities that match your skills and interests
      </p>
    </div>
    <ProfileButton variant="minimal" />
  </div>
     
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="san francisco">San Francisco</SelectItem>
                <SelectItem value="new york">New York</SelectItem>
                <SelectItem value="austin">Austin</SelectItem>
                <SelectItem value="seattle">Seattle</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All Jobs
            
          </TabsTrigger>
          <TabsTrigger value="applied" className="flex items-center gap-2">
            Applied
           
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            Saved
            
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
        <AllJob
            jobs={jobs}
            onApply={handleApply}
            onSave={handleSave}
            emptyMessage="You haven't applied to any jobs yet."
          />
        </TabsContent>

        <TabsContent value="applied" className="mt-6">
          <AllApplication
            jobs={jobs}
            onApply={handleApply}
            onSave={handleSave}
            emptyMessage="You haven't applied to any jobs yet."
          />
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
         <AllApplication
            jobs={jobs}
            onApply={handleApply}
            onSave={handleSave}
            emptyMessage="You haven't applied to any jobs yet."
          />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 0) handlePageChange(currentPage - 1)
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
                      handlePageChange(page-1)
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
                    if (currentPage < totalPages-1) handlePageChange(currentPage+1)
                  }}
                  className={currentPage === totalPages-1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

// Job List Component
