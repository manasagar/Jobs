import { useEffect ,useState} from "react"
import { getApplicationByJob ,selection} from "@/data/urlRecruiter";
import { DataLoader } from "@/data/common"
import { Meeting } from "@/components/type/job";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Mail, Clock, Calendar, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { se } from "date-fns/locale";
export default function AppList({jobId}:{jobId:number}){
const [isDataLoading, setIsDataLoading] = useState(false);
const [applications,setApplications]=useState<any[]>([]);
const [currentPage,setCurrentPage]=useState(0);
  const [totalPages,setTotalPages]=useState(1)
  
const getApplications=async()=>{
  let res;
  setIsDataLoading(true)
  try{
  res= await getApplicationByJob(jobId,currentPage)
  setTotalPages(res.totalPages)
  setApplications(res.content);
  }
  catch(error){
    console.log(error);
  } 
 
  setIsDataLoading(false);

}
const Selection=async(candidateName:string)=>{
    const meeting: Omit<Meeting, "id"> = {
          recruiter:null,
          time:null,
          job:jobId,
          candidate:candidateName
        }
    try{
    setIsDataLoading(true)
    await selection(meeting);
    
  }
  catch(error){
    console.log(error);
  } 
  finally{
     setIsDataLoading(false)
  }

}
useEffect(()=>{
  
  getApplications()
 
},[currentPage])
    return(
        <>
           {isDataLoading?<DataLoader/>:<br/>}
                     {applications.map((app)=>(
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

          <div className="flex items-center text-sm">
            <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">{app.jobseeker.resume}</span>
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
          <Button  variant="outline" size="sm" onClick={()=>{Selection(app.jobseeker.email)}} >
                            Schedule Meet
                            </Button>
        </div>
      </CardContent>
    </Card>
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
            </>
          ))}
        </>
    )
}
