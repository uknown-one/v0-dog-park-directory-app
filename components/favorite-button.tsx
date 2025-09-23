"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface FavoriteButtonProps {
  parkId: string
  parkName: string
  initialIsFavorite?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function FavoriteButton({
  parkId,
  parkName,
  initialIsFavorite = false,
  variant = "outline",
  size = "default",
  className = "",
}: FavoriteButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleFavorite = async () => {
    if (!session) {
      toast.error("Please sign in to save favorites")
      router.push("/auth/signin")
      return
    }

    try {
      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setIsFavorite(!isFavorite)

      if (!isFavorite) {
        toast.success(`${parkName} added to favorites!`)
      } else {
        toast.success(`${parkName} removed from favorites`)
      }
    } catch (error) {
      toast.error("Failed to update favorites. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleToggleFavorite} disabled={isLoading} className={className}>
      <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
      {isFavorite ? "Saved" : "Save"}
    </Button>
  )
}
