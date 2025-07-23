import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect ,useState} from "react"
import { Mail, Clock, Calendar, FileText } from "lucide-react"
import { DataLoader } from "@/data/common"
export default function ApplicationList({jobId,currentPage,changeTotalPages,setPage}:{jobId:number,currentPage:number,changeTotalPages:(id:number)=>void,setPage : (id:number) => void}){
const [isDataLoading, setIsDataLoading] = useState(false);
const [applications,setApplications]=useState<any[]>([]);
const getMeetings=async()=>{
  let res;
  setIsDataLoading(true)
  try{
//   res= await getApplicationByJob(jobId,currentPage)
//   changeTotalPages(res.totalPages)
//   setApplications(res.content);
  }
  catch(error){
    console.log(error);
  }
  setIsDataLoading(false);

}
useEffect(()=>{
    setPage(0)
  getMeetings()
},[])
    return(
        <>
           {isDataLoading?<DataLoader/>:<br/>}
                    <div className="space-y-4">
      {meetings.map((meeting) => (
        <Card key={meeting.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{meeting.title}</CardTitle>
                <p className="text-sm text-muted-foreground">with {meeting.candidateName}</p>
              </div>
              <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                {new Date(meeting.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                {meeting.time} ({meeting.duration} min)
              </div>
              <div className="flex items-center">
                {getTypeIcon(meeting.type)}
                <span className="ml-1">{meeting.type}</span>
              </div>
            </div>
            {meeting.notes && (
              <div>
                <h4 className="text-sm font-medium mb-1">Notes</h4>
                <p className="text-sm text-muted-foreground">{meeting.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
        </>
    )
}
