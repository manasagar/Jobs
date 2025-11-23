"use client"

import { useState } from "react"

import JobSearchBox from "@/components/Job/job-search-box"
import JobResults from "@/components/Job/job-results"

import { aiQuery } from "@/data/urlRecruiter"
import { Button } from "@/components/ui/button";

import { Mail,  Calendar, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import { DataLoader } from "@/data/common"
import {
  Card,
  CardContent,
  CardHeader,

} from "@/components/ui/card"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
 Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"


export default function AImode(props:any) {
    
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any>([])


  const handleSearch =async (searchQuery: string) => {
    setQuery(searchQuery)
    const  jobly= await aiQuery(props.jobId,searchQuery);

   setSearchResults(jobly);
  }
  return (
     
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-4xl flex flex-col gap-8">
     
         

          {/* Search Box */}
          <JobSearchBox onSearch={handleSearch} />
                         { searchResults !== null&&searchResults.map((app:any)=>(
            <>
             <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
          
            
          </div>
          <Badge >{app.applicationStatus}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
            <a href={`mailto:${app.jobseeker.email}`} className="text-blue-600 hover:underline">
              {app.jobseeker.email}
            </a>
          </div>
          <div >
             <h4 className="text-sm font-medium mb-2">resume score</h4>
            {app.score.toFixed(2)}
          </div>


        </div>

        
        <div>
          <h4 className="text-sm font-medium mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1">
           {app.job.skills}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-1" />
            Applied {new Date(app.job.deadline).toLocaleDateString()}
          </div>
          
            <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Resume</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Resume</DialogTitle>
          </DialogHeader>
                    <div className="flex items-center text-sm">
            <iframe
      src={`data:application/pdf;base64,${app.jobseeker.resume}`}
      width="100%"
      height="800px"
      title="Parsed Resume"
      className="border"
    />

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
        </div>
       
      </CardContent>
    </Card>
    
            </>
          ))}
          
         
        </div>
      </main>
    </div>
  )
}
