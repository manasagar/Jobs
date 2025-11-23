"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onToggleTheme: () => void
  isDark: boolean
}

export default function Header({ onToggleTheme, isDark }: HeaderProps) {
  return (
    <header className="w-full border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center text-background font-bold text-sm">
            AI
          </div>
          <span className="font-semibold text-lg">ChatGPT</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="rounded-lg"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button variant="outline" className="rounded-lg bg-transparent">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}
