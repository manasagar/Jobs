"use client"

import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface JobSearchBoxProps {
  onSearch: (query: string) => void
}

export default function JobSearchBox({ onSearch }: JobSearchBoxProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jobs by title, company, or keyword..."
          className="w-full px-4 py-3 pr-12 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background transition-all"
          aria-label="Search for jobs"
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          disabled={!query.trim()}
          className="absolute right-2 h-8 w-8 rounded"
          aria-label="Search jobs"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </form>
  )
}
