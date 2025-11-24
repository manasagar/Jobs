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



 
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Mail,  Calendar, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AppList({jobId}:{jobId:number}){
    const [newStatus, setNewStatus] = useState("NextRound")
const [isDataLoading, setIsDataLoading] = useState(false);
const [selectedCandidate,setSelectedCandidate]=useState("");
const [applications,setApplications]=useState<any[]>([]);
const [currentPage,setCurrentPage]=useState(0);
  const [totalPages,setTotalPages]=useState(1)
  const [statusNote, setStatusNote] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [applicationId,setApplicationId]=useState(-1);
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
const editChange=async(app:any)=>{
  setIsDialogOpen(true);
  setSelectedCandidate(app.jobseeker.email);
  setApplicationId(app.id);
}
const Selection=async(candidateName:string)=>{

    const meeting: Omit<Meeting, "id"> = {
          recruiter:null,
          time:null,
          job:jobId,
          candidate:candidateName
        }
    try{
      console.log(meeting)
    setIsDataLoading(true)
    await selection(meeting,statusNote,newStatus,applicationId);
    
  }
  catch(error){
    console.log(error);
  } 
  finally{
     setIsDataLoading(false)
  }

}
const statusConfig = {

    NextRound: {
    label: "Next Round",
    color: "bg-blue-100 text-blue-800 border-blue-200",
   
  },
  Selected: {
    label: "Approved",
    color: "bg-green-100 text-green-800 border-green-200",
    
  },
  Rejected: {
    label: "Rejected",
    color: "bg-red-100 text-red-800 border-red-200",
   
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
          <Button  variant="outline" size="sm" onClick={()=>{editChange(app)}} >
                           edit status
                            </Button>
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
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Application Status</DialogTitle>
              <DialogDescription>
                Update the status 
              </DialogDescription>
            </DialogHeader>
   {isDataLoading?<DataLoader/>:
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">New Status</Label>
                <Select value={newStatus} onValueChange={(value) => setNewStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
               
                  <SelectContent>
                    {Object.entries(statusConfig).map(([key, config]) => {
                      
                      return (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            {config.label}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>

                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Status Note (Optional)</Label>
                <Textarea
                  id="note"
                  placeholder="Add a note about this status change..."
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
                  }
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={()=>{Selection(selectedCandidate,)}}>
                <Check className="h-4 w-4 mr-1" />
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
    
            </>
          ))}
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
