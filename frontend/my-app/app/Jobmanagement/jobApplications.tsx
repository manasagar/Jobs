
import { Button } from "@/components/ui/button"
import { useEffect,useState} from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Mail, Clock, Calendar, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ArrowLeft } from 'lucide-react';
import { getApplicationByJob } from "@/data/urlRecruiter"

export default function JobApplications({application,changeApplication}:{application:number,changeApplication : (id:any) => void}){

  
  const [currentPage,setCurrentPage]=useState(0);
  const [totalPages,setTotalPages]=useState(1)
  const changePage=(page:number)=>{
    setCurrentPage(page);
  }
  const changeTotalPages=(total:number)=>{
    setTotalPages(total)
  }

  const getStatusColor = (status: string) => {
    const colors = {
      Active: "bg-green-100 text-green-800",
      Draft: "bg-yellow-100 text-yellow-800",
      Closed: "bg-red-100 text-red-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }
  return(
    <>

    <div className="w-full">
     
    <button onClick={()=>{changeApplication(-1)}}><ArrowLeft/></button>

      <Tabs defaultValue="application">
        <TabsList className="flex w-full gap-2 mb-4">
          <TabsTrigger value="application">Application</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>
        <TabsContent value="application">
          

         
        </TabsContent>
        <TabsContent value="meetings">
      
        </TabsContent>
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
      </Tabs>
    </div>
    </>
    
  )
}