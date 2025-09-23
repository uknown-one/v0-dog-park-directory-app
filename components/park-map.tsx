"use client"

import { useState, useEffect } from "react"
import { ParksMapView } from "./parks-map-view"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Loader2 } from "lucide-react"

interface Park {
  id: string
  name: string
  city: string
  state: string
  latitude: number
  longitude: number
  rating: number
  reviewCount: number
  amenities: string[]
  imageUrl: string
}

interface ParkMapProps {
  location?: string
  amenities?: string[]
  sortBy?: string
}

export function ParkMap({ location, amenities = [], sortBy = "rating" }: ParkMapProps) {
  const [parks, setParks] = useState<Park[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchParks = async () => {
      try {
        setLoading(true)
        const mockParks: Park[] = [
          {
            id: "1",
            name: "Central Bark Dog Park",
            city: "Austin",
            state: "TX",
            latitude: 30.2672,
            longitude: -97.7431,
            rating: 4.8,
            reviewCount: 124,
            amenities: ["Fenced", "Water Station", "Agility Equipment"],
            imageUrl: "/dog-park-with-fenced-area-and-trees.jpg",
          },
          {
            id: "2",
            name: "Paws & Play Park",
            city: "Denver",
            state: "CO",
            latitude: 39.7392,
            longitude: -104.9903,
            rating: 4.6,
            reviewCount: 89,
            amenities: ["Large Area", "Separate Small Dog Area", "Shade"],
            imageUrl: "/dog-park-with-fenced-area-and-trees.jpg",
          },
          {
            id: "3",
            name: "Woofington Dog Run",
            city: "Seattle",
            state: "WA",
            latitude: 47.6062,
            longitude: -122.3321,
            rating: 4.7,
            reviewCount: 156,
            amenities: ["Off-Leash", "Water Station", "Parking"],
            imageUrl: "/dog-park-with-fenced-area-and-trees.jpg",
          },
        ]

        // Apply filters
        let filteredParks = mockParks

        if (location) {
          filteredParks = filteredParks.filter(
            (park) =>
              park.city.toLowerCase().includes(location.toLowerCase()) ||
              park.state.toLowerCase().includes(location.toLowerCase()),
          )
        }

        if (amenities.length > 0) {
          filteredParks = filteredParks.filter((park) =>
            amenities.some((amenity) =>
              park.amenities.some((parkAmenity) => parkAmenity.toLowerCase().includes(amenity.toLowerCase())),
            ),
          )
        }

        // Apply sorting
        if (sortBy === "rating") {
          filteredParks.sort((a, b) => b.rating - a.rating)
        } else if (sortBy === "reviews") {
          filteredParks.sort((a, b) => b.reviewCount - a.reviewCount)
        }

        setParks(filteredParks)
      } catch (err) {
        setError("Failed to load parks")
      } finally {
        setLoading(false)
      }
    }

    fetchParks()
  }, [location, amenities, sortBy])

  if (loading) {
    return (
      <Card className="h-96">
        <CardContent className="p-6 h-full flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Loading parks...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="h-96">
        <CardContent className="p-6 h-full flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Unable to Load Map</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (parks.length === 0) {
    return (
      <Card className="h-96">
        <CardContent className="p-6 h-full flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Parks Found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters to find parks in your area.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return <ParksMapView parks={parks} />
}
