"use client"

import { Briefcase, MapPin, DollarSign, Calendar } from "lucide-react"


interface JobResultsProps {
  jobs: any,
  query: string
}

export default function JobResults({ jobs, query }: JobResultsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">
          {jobs?.length > 0 ? `Found ${jobs.length} job${jobs?.length !== 1 ? "s" : ""}` : "No jobs found"}
        </h2>
        {query && <span className="text-muted-foreground">for "{query}"</span>}
      </div>
      {jobs?.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {jobs.map((job:any) => (
            <div
              key={job.id}
              className="p-5 rounded-lg border border-border bg-card hover:border-ring transition-colors cursor-pointer"
            >
              <div className="flex flex-col gap-2 mb-4">
                <h3 className="text-lg font-semibold text-foreground">{job.jobTitle}</h3>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.jobDescription}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-ring" />
                  <span className="text-muted-foreground">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-ring" />
                  <span className="text-muted-foreground">{job.stipend}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-ring" />
                  <span className="text-muted-foreground">{job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-ring" />
                  <span className="text-muted-foreground">Recently Posted</span>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-lg border border-border bg-card text-center">
          <p className="text-muted-foreground">No jobs match your search. Try adjusting your keywords.</p>
        </div>
      )}
    </div>
  )
}
