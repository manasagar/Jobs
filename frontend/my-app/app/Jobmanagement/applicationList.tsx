import { useEffect ,useState} from "react"
import { getApplicationByJob } from "@/data/urlRecruiter";
import { DataLoader } from "@/data/common"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Mail, Clock, Calendar, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
export default function ApplicationList({jobId,currentPage,changeTotalPages,setPage}:{jobId:number,currentPage:number,changeTotalPages:(id:number)=>void,setPage : (id:number) => void}){
const [isDataLoading, setIsDataLoading] = useState(false);
const [applications,setApplications]=useState<any[]>([]);
const getApplications=async()=>{
  let res;
  setIsDataLoading(true)
  try{
  res= await getApplicationByJob(jobId,currentPage)
  changeTotalPages(res.totalPages)
  setApplications(res.content);
  }
  catch(error){
    console.log(error);
  }
  setIsDataLoading(false);

}
useEffect(()=>{
    setPage(0);
  getApplications()
},[])
    return(
        <>
           {isDataLoading?<DataLoader/>:<br/>}
                     {applications.map((app)=>(
            <>
             <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{app.jobseeker.name}</CardTitle>
            
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
        
        </div>
      </CardContent>
    </Card>
            </>
          ))}
        </>
    )
}
