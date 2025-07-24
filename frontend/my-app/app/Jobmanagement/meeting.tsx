import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getMeetingByJob } from "@/data/urlRecruiter"
import { useEffect ,useState} from "react"
import { Clock, Calendar, FileText } from "lucide-react"
import { DataLoader } from "@/data/common"
import { Badge } from "lucide-react"
export default function MeetingList({jobId}:{jobId:number}){
const [currentPage,setCurrentPage]=useState(0);
const [totalPages,setTotalPages]=useState(1)

const [isDataLoading, setIsDataLoading] = useState(false);
const [meetings,setMeetings]=useState<any[]>([]);
const getMeetings=async()=>{
  let res;
  
  
  try{
  res= await getMeetingByJob(jobId,currentPage)
  setTotalPages(res.totalPages)
  setMeetings(res.content);
  }
  catch(error){
    console.log(error);
  }
  
  setIsDataLoading(false);

}
useEffect(()=>{
    
  
  getMeetings()
  
},[currentPage])
    return(
        <>
           {isDataLoading?<DataLoader/>:<br/>}
                    <div className="space-y-4">
      {meetings.map((meeting) => (
        <Card key={meeting.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                
                <p className="text-sm text-muted-foreground">with {meeting.candidate}</p>
              </div>
              <Badge >{meeting.applied}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                {meeting.time}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                {90} (min)
              </div>
              <div className="flex items-center">
              
                <span className="ml-1">{meeting.type}</span>
              </div>
            </div>

          </CardContent>
        </Card>
      ))}
      
    </div>
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
    )
}
