"use client"

import { useState,  useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
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

import { delay } from "@/data/common"
import {ProfileButton} from "@/components/Job/profile-button"
import { appliedJobList, applyJob, jobList, savedJobList, saveJob } from "@/data/urlJobseeker"
import { jobApplied,jobSaved } from "@/components/styles/preMadeToasts"
import AllJob from "./allJob"
import AllApplication from "./allApplication"
import { Loader } from "@/components/loader/loader"
import { checkLogin } from "@/data/common"
import { useRouter } from "next/navigation"

const JOBS_PER_PAGE = 3

export default function JobSearchPage() {
  const router=useRouter();
  const[loaderActive,setLoacterActive]=useState(false)
  const [jobs, setJobs] = useState([])
  
  const [currentPage, setCurrentPage] = useState(0)
  const [activeTab, setActiveTab] = useState("all")
  const [totalPages, setTotalPages] = useState(0)
  const [refresh,setRefresh] =useState(0);
  

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCurrentPage(0) 
  }

const getJobs=async ()=>{
   setLoacterActive(true)
   let res=await jobList(currentPage);
   
   setJobs(res.content);
   setTotalPages(res.totalPages);
    setLoacterActive(false)

  
}
const getSavedJobs=async()=>{
   setLoacterActive(true)
   let res=await savedJobList(currentPage);
   setJobs(res.content);
   setTotalPages(res.totalPages);
 setLoacterActive(false)

}
const getAppliedJobs=async()=>{
  setLoacterActive(true)
  let res=await appliedJobList(currentPage);
  
   setJobs(res.content);
   setTotalPages(res.totalPages);
   setLoacterActive(false)
  


}

   const checkRouting=async()=>{
      
      let x=await checkLogin();
  
  await delay(2000) 
      if(!x)
        router.push('/');
          
    }

  useEffect(() => {
    checkRouting()
      
    if(activeTab=='all'){
        getJobs();
    }
    else if(activeTab=='saved'){
        getSavedJobs();
    }
    else{
        getAppliedJobs();
    }
  }, [activeTab,currentPage,refresh])

  const handleApply = async (jobId: number) => {
    jobApplied();
    await applyJob(jobId);
    setRefresh(prev=>prev+1)
  }

  const handleSave = async(jobId: number) => {
    jobSaved()
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
     
     
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
         
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
        {loaderActive?<Loader/>:<>
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
        </>
}
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
