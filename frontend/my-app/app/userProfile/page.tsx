'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Edit, ExternalLink, MoreHorizontal, Search, Users } from "lucide-react"
import { useEffect ,useState} from "react"
import {MeetingCard} from "./meetingCard"
import { getMeetingByJobseeker ,getSelf } from "@/data/urlJobseeker"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
export default function ProfilePage() {
    const [user,setUser]=useState({name:"",email:""})
   
const [meetings,setMeetings]=useState<any[]>([])
const [currentPage,setCurrentPage]=useState(0);
const [totalPages,setTotalPages]=useState(1);
const getMeeting=async()=>{
let res;
try{
    res= await getMeetingByJobseeker(currentPage);
    setMeetings(res.content);
    setTotalPages(res.totalPages);
}
catch(error){
    console.log(error);
}

}
const getUser=async()=>{
    let res;
    try{
        res=await getSelf();
        setUser(res);
        console.log(user,"hello")
    }
    catch(error){
        console.log(error);
    }
}
useEffect(()=>{
    getMeeting()
    getUser()
},[currentPage])
let counter=0;
  return (

    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Section */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="relative pb-0">
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit profile</span>
                </Button>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                 
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{user.email}</span>
                     
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Team</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Product</Badge>
                    <Badge variant="outline">Design</Badge>
                    <Badge variant="outline">Marketing</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Bio</h3>
                  <p className="text-sm">
                    Product Manager with 5+ years of experience in SaaS products. Passionate about creating
                    user-centered solutions and driving product strategy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meetings Section */}
        <div className="md:w-2/3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Meetings</CardTitle>
                  <CardDescription>Manage your upcoming and past meetings</CardDescription>
                </div>
                
              </div>
            </CardHeader>
            <CardContent>
              {meetings.map((meeting)=>(<div  key={counter++}>
               <MeetingCard
                       
                        title="interview"
                        time={meeting.time}
                        participants={2}
                        status="upcoming"
                        toSchedule={meeting.time==null}
                        job={meeting.job}
                        link={meeting.zoomLink}
                      />


              </div>)

              )}
                     
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
                
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

