"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Share2, Flag, Phone, Globe, Clock } from "lucide-react"
import { AMENITIES } from "@/lib/types"
import { FavoriteButton } from "./favorite-button"
import { toast } from "sonner"

interface ParkHeaderProps {
  park: {
    id: string
    name: string
    city: string
    state: string
    averageRating: number
    totalReviews: number
    amenities: string[]
    contact?: {
      phone?: string
      website?: string
    }
  }
}

export function ParkHeader({ park }: ParkHeaderProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: park.name,
          text: `Check out ${park.name} on PawParks!`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback to copying URL
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  const handleReport = () => {
    toast.info("Report functionality coming soon")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">{park.name}</h1>

          <div className="flex items-center gap-4 text-muted-foreground mb-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {park.city}, {park.state}
            </div>

            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-foreground">{park.averageRating}</span>
              <span className="ml-1">({park.totalReviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {park.contact?.phone && (
              <Button variant="outline" size="sm" onClick={() => window.open(`tel:${park.contact?.phone}`)}>
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
            )}

            {park.contact?.website && (
              <Button variant="outline" size="sm" onClick={() => window.open(park.contact?.website, "_blank")}>
                <Globe className="h-4 w-4 mr-1" />
                Website
              </Button>
            )}

            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-1" />
              Hours
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FavoriteButton parkId={park.id} variant="outline" size="sm" />

          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>

          <Button variant="outline" size="sm" onClick={handleReport}>
            <Flag className="h-4 w-4 mr-1" />
            Report
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {park.amenities.map((amenityId) => {
          const amenity = AMENITIES.find((a) => a.id === amenityId)
          return amenity ? (
            <Badge key={amenityId} variant="secondary" className="text-sm">
              <span className="mr-1">{amenity.icon}</span>
              {amenity.name}
            </Badge>
          ) : null
        })}
      </div>
    </div>
  )
}
