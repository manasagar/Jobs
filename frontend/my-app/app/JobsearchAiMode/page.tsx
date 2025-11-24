"use client"

import { useState } from "react"

import JobSearchBox from "@/components/Job/job-search-box"
import JobResults from "@/components/Job/job-results"
import { aiJobs } from "@/data/urlJobseeker"
import { ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DataLoader } from "@/data/common"

export default function JobsPage() {
   const router=useRouter();
   const [isDataLoading, setIsDataLoading] = useState(false);

  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any>([])

  const toJobSearch = () => {
   router.push("/Jobsearch")
  }

  const handleSearch =async (searchQuery: string) => {
    setQuery(searchQuery)
    setIsDataLoading(true)
    const  jobly= await aiJobs(searchQuery);
    setIsDataLoading(false)
    console.log(jobly);
   setSearchResults(jobly);
  }
  return (
     
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-4xl flex flex-col gap-8">
      <Button size="icon" onClick={toJobSearch}><ArrowLeft/></Button>
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">Find Your Next Job</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Discover opportunities that match your skills and career goals
            </p>
          </div>

          {/* Search Box */}
          <JobSearchBox onSearch={handleSearch} />

           {isDataLoading?<DataLoader/>:<br/>}
          {searchResults !== null && <JobResults jobs={searchResults} query={query} />}
        </div>
      </main>
    </div>
  )
}
