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
import { Search, MapPin, Clock, DollarSign, Bookmark, BookmarkCheck, Send, Building2 } from "lucide-react"

import { appliedJobList, applyJob, jobList, savedJobList, saveJob } from "@/data/urlJobseeker"
import { count } from "console"
import AllJob from "./allJob"

// Mock job data
const mockJobs = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    description: "We're looking for a senior frontend developer to join our team and build amazing user experiences.",
    tags: ["React", "TypeScript", "Next.js"],
    postedDate: "2 days ago",
    isApplied: false,
    isSaved: false,
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    description: "Join our fast-growing startup and work on cutting-edge technology solutions.",
    tags: ["Node.js", "React", "PostgreSQL"],
    postedDate: "1 day ago",
    isApplied: true,
    isSaved: true,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Design Studio",
    location: "Remote",
    type: "Contract",
    salary: "$80,000 - $100,000",
    description: "Create beautiful and intuitive user interfaces for our client projects.",
    tags: ["Figma", "Adobe XD", "Prototyping"],
    postedDate: "3 days ago",
    isApplied: false,
    isSaved: true,
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "CloudTech Solutions",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    description: "Build scalable backend systems and APIs for our cloud platform.",
    tags: ["Python", "Django", "AWS"],
    postedDate: "4 days ago",
    isApplied: true,
    isSaved: false,
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "InfraCorp",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    description: "Manage and optimize our cloud infrastructure and deployment pipelines.",
    tags: ["Docker", "Kubernetes", "CI/CD"],
    postedDate: "5 days ago",
    isApplied: false,
    isSaved: false,
  },
  {
    id: 6,
    title: "Product Manager",
    company: "ProductCo",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$140,000 - $170,000",
    description: "Lead product strategy and work with cross-functional teams to deliver great products.",
    tags: ["Strategy", "Analytics", "Agile"],
    postedDate: "1 week ago",
    isApplied: false,
    isSaved: true,
  },
  {
    id: 7,
    title: "Data Scientist",
    company: "DataTech",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $155,000",
    description: "Analyze complex datasets and build machine learning models to drive business insights.",
    tags: ["Python", "Machine Learning", "SQL"],
    postedDate: "1 week ago",
    isApplied: true,
    isSaved: false,
  },
  {
    id: 8,
    title: "Mobile Developer",
    company: "AppStudio",
    location: "Miami, FL",
    type: "Full-time",
    salary: "$105,000 - $135,000",
    description: "Develop native mobile applications for iOS and Android platforms.",
    tags: ["React Native", "Swift", "Kotlin"],
    postedDate: "1 week ago",
    isApplied: false,
    isSaved: false,
    jobDescription:""
  },
]

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
    setCurrentPage(0) // 🔄 Reset page to 0 on tab change
  }

const getJobs=async ()=>{
   let res=await jobList(currentPage);
   
   setJobs(res.content);
   setTotalPages(res.totalPages);
   setTotalCount(res.totalElements)
  //  console.log(res);
  //  console.log(res.content);
  //  console.log(jobs,"hello");
}
const getSavedJobs=async()=>{
   let res=await savedJobList(currentPage);
   setJobs(res.content);
   setTotalPages(res.totalPages);
  setTotalCount(res.totalElements)
  // console.log(res);
  //  console.log(jobs,"hello");
}
const getAppliedJobs=async()=>{
  let res=await appliedJobList(currentPage);
   setJobs(res.content);
   setTotalPages(res.totalPages);
   setTotalCount(res.totalElements)
  //  console.log(res);
  //  console.log(jobs,"hello");
}

  
  //const paginatedJobs = jobs.slice(startIndex, startIndex + JOBS_PER_PAGE)

  // Reset to first page when filters change
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
        <p className="text-muted-foreground">Discover opportunities that match your skills and interests</p>
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
          <AllJob
            jobs={jobs}
            onApply={handleApply}
            onSave={handleSave}
            emptyMessage="You haven't applied to any jobs yet."
          />
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
         <AllJob
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
function JobList({
  jobs,
  onApply,
  onSave,
  emptyMessage,
}: {
  jobs: typeof mockJobs
  onApply: (jobId: number) => void
  onSave: (jobId: number) => void
  emptyMessage: string
}) {
  
}
