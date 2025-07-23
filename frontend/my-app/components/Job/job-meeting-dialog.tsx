"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Application, Meeting } from "@/components/type/job"
import { SimpleTimeInput } from "@/components/Job/simple-time-input"

interface MeetingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  application: number
  
}

export function MeetingDialog({ open, onOpenChange, application }: MeetingDialogProps) {
  const [formData, setFormData] = useState({
    job:application,
    date: "",
    time: "",
    
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!application) return
    console.log("date ",formData.date," time ",formData.time);
    const meeting: Omit<Meeting, "id"> = {
     
      interviewerName:null,
      datetime: formData.date+"T"+formData.time+":00.000",
      applicationId:application,
      candidateName:null
      
    }

   
    onOpenChange(false)

    // Reset form
    setFormData({
    
      date: "",
      time: "",
      job:application 
    })
  }

  if (!application) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule Meeting</DialogTitle>
          <DialogDescription>Schedule a meeting with candidate</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <SimpleTimeInput
                value={formData.time}
                onChange={(time) => setFormData({ ...formData, time })}
                placeholder="Select meeting time"
              />
            </div>
          </div>


          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Meeting</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
