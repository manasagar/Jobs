"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {Clock} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Application, Meeting } from "@/components/type/job"
import { SimpleTimeInput } from "@/components/Job/simple-time-input"
import { addMeeting } from "@/data/urlRecruiter"
import {getMeetingList}from "@/data/common"
import { finaliseMeeting } from "@/data/urlJobseeker"
interface MeetingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  application: number
  
}

export function GetMeetingDialog({ open, onOpenChange, application }: MeetingDialogProps) {
  const[timeSlot,setTimeSlot]=useState<any[]>([])
  const[slot,setSlot]=useState({time:"",job:0});
  useEffect(()=>{
    getTimeSlot()
    },[])
    const getTimeSlot=async()=>{
        let res;
        try{
       res=await getMeetingList(application)
       setTimeSlot(res)
        }
        catch(error){
            console.log(error)
        }
    }
  const Schedule= async(day:string)=>{
    let res;
    const meeting={
        time:day,
        job:application
    }
    setSlot(meeting);
   
  }
 const onSubmit= async()=>{
    let res;
     try{
  res=await finaliseMeeting(slot);
   onOpenChange(false)
    }
    catch(error){
        console.log(error)
    }
 }

  if (!application) return null
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Meeting</DialogTitle>
          <DialogDescription>Schedule a meeting with candidate</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
            {timeSlot.map((day) => (
              <>
                 <Button
          
          variant={day === slot.time ? "default" :  "secondary"}
          disabled={false}
          onClick={()=>{Schedule(day)}}
          className="h-auto p-3 flex flex-col items-start gap-1"
        >
        <div className="flex items-center gap-1 w-full">
            <Clock className="h-3 w-3" />
            <span className="font-medium">{day}</span>
          </div>
              
              </Button>
              </>
            ))}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => onSubmit()}>Schedule Meeting</Button>
          </DialogFooter>
       
      </DialogContent>
    </Dialog>
  )
}
