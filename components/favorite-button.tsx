"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { toast } from "sonner"

interface FavoriteButtonProps {
  parkId: string
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost"
}

export function FavoriteButton({ parkId, className = "", size = "default", variant = "ghost" }: FavoriteButtonProps) {
  const { data: session } = useSession()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.user?.id) {
      checkFavoriteStatus()
    }
  }, [session?.user?.id, parkId])

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch("/api/favorites")
      if (response.ok) {
        const data = await response.json()
        setIsFavorite(data.favorites.includes(parkId))
      }
    } catch (error) {
      console.error("Error checking favorite status:", error)
    }
  }

  const toggleFavorite = async () => {
    if (!session?.user?.id) {
      toast.error("Please sign in to save favorites")
      return
    }

    setIsLoading(true)

    try {
      const method = isFavorite ? "DELETE" : "POST"
      const url = isFavorite ? `/api/favorites?parkId=${parkId}` : "/api/favorites"
      const body = isFavorite ? undefined : JSON.stringify({ parkId })

      const response = await fetch(url, {
        method,
        headers: body ? { "Content-Type": "application/json" } : {},
        body,
      })

      if (response.ok) {
        setIsFavorite(!isFavorite)
        toast.success(isFavorite ? "Removed from favorites" : "Added to favorites")
      } else {
        throw new Error("Failed to update favorites")
      }
    } catch (error) {
      console.error("Error updating favorite:", error)
      toast.error("Failed to update favorites")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={toggleFavorite} disabled={isLoading}>
      <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""} ${size === "sm" ? "h-3 w-3" : ""}`} />
      {size !== "sm" && <span className="ml-2">{isFavorite ? "Saved" : "Save"}</span>}
    </Button>
  )
}
