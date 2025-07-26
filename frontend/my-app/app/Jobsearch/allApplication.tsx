import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Building2, MapPin, Clock, BookmarkCheck, Bookmark, DollarSign, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AllApplication({jobs,onSave,onApply,emptyMessage}:{jobs: any
  onApply: (jobId: number) => void
  onSave: (jobId: number) => void
  emptyMessage: string}){
function print(){
    console.log(jobs,"Mad");
    return <></>
}
if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {
      jobs.map((job:any) => (
        
        <Card key={job.id} className="hover:shadow-md transition-shadow">
          {print()}
          <CardHeader>
            
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <CardTitle className="text-xl">{job.jobTitle}</CardTitle>
                <CardDescription className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {job.job.jobDescription}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.job.type}
                  </span>
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSave(job.job.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                {job.saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{job.job.stipend}</span>
                <span className="text-muted-foreground">• {job.job.deadline}</span>
              </div>

              {/* <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div> */}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
           
            <div className="flex gap-2">
              {job.isApplied ? (
                <Button disabled className="bg-green-100 text-green-800 hover:bg-green-100">
                  <Send className="h-4 w-4 mr-2" />
                  Applied
                </Button>
              ) : (
                <Button onClick={() => onApply(job.id)}>
                  <Send className="h-4 w-4 mr-2" />
                  Apply Now
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}