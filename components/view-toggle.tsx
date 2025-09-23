"use client"

import { Button } from "@/components/ui/button"
import { Grid3X3, Map } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export function ViewToggle() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentView = searchParams.get("view") || "grid"

  const toggleView = (view: "grid" | "map") => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("view", view)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex rounded-lg border bg-background p-1">
      <Button
        variant={currentView === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => toggleView("grid")}
        className="flex-1"
      >
        <Grid3X3 className="h-4 w-4 mr-2" />
        Grid
      </Button>
      <Button
        variant={currentView === "map" ? "default" : "ghost"}
        size="sm"
        onClick={() => toggleView("map")}
        className="flex-1"
      >
        <Map className="h-4 w-4 mr-2" />
        Map
      </Button>
    </div>
  )
}
