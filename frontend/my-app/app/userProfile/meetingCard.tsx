import { Calendar, Clock, Edit, ExternalLink, MoreHorizontal, Search, Users } from "lucide-react"
import { useState } from "react"
import {GetMeetingDialog} from "@/components/Job/meeting-dialog"
import { Button } from "@/components/ui/button"
interface MeetingCardProps {
  title: string
  time: string|null
  participants: number
  status: "upcoming" | "completed" | "canceled"
  toSchedule:boolean
  job:number
  link:string
}

export function MeetingCard({ title, time, participants, status,toSchedule,job,link }: MeetingCardProps) {
     const[showJobMeetingDialog,setShowJobMeetingDialog]=useState(false);
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-md ${status === "upcoming" ? "bg-primary/10" : "bg-muted"}`}>
          <Calendar className={`h-5 w-5 ${status === "upcoming" ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3.5 w-3.5" />
              {time}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-1 h-3.5 w-3.5" />
              {participants} participants
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!toSchedule && (
            
         <a href={link} target="_blank" rel="noopener noreferrer">
  <Button size="sm" variant="outline" className="gap-1 bg-transparent">
    <ExternalLink className="h-3.5 w-3.5" />
    Join
  </Button>
</a>

        )}
        {toSchedule&&
        <Button size="icon"  onClick={()=> {setShowJobMeetingDialog(true)}}>
          <Calendar />
          <span className="sr-only">finalise interview Time</span>
        </Button>
}
      </div>
          <GetMeetingDialog
              open={showJobMeetingDialog}
              onOpenChange={setShowJobMeetingDialog}
              application={job}
           
            />
    </div>
  )
}
