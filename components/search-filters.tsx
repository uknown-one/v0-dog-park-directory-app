"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { MapPin, Filter, X } from "lucide-react"
import { AMENITIES } from "@/lib/types"
import { useRouter, useSearchParams } from "next/navigation"

interface SearchFiltersProps {
  initialLocation?: string
  initialAmenities?: string[]
  initialSortBy?: string
}

export function SearchFilters({
  initialLocation = "",
  initialAmenities = [],
  initialSortBy = "rating",
}: SearchFiltersProps) {
  const [location, setLocation] = useState(initialLocation)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialAmenities)
  const [sortBy, setSortBy] = useState(initialSortBy)
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilters = () => {
    const params = new URLSearchParams(searchParams)

    if (location) {
      params.set("location", location)
    } else {
      params.delete("location")
    }

    if (selectedAmenities.length > 0) {
      params.set("amenities", selectedAmenities.join(","))
    } else {
      params.delete("amenities")
    }

    params.set("sortBy", sortBy)

    router.push(`/parks?${params.toString()}`)
  }

  const clearFilters = () => {
    setLocation("")
    setSelectedAmenities([])
    setSortBy("rating")
    router.push("/parks")
  }

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId],
    )
  }

  useEffect(() => {
    updateFilters()
  }, [location, selectedAmenities, sortBy])

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </div>
          {(location || selectedAmenities.length > 0) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="City, state, or zip"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Separator />

        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Sort By</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="closest">Closest</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Amenities</label>
          <div className="space-y-2">
            {AMENITIES.map((amenity) => (
              <Badge
                key={amenity.id}
                variant={selectedAmenities.includes(amenity.id) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/20 transition-colors w-full justify-start"
                onClick={() => toggleAmenity(amenity.id)}
              >
                <span className="mr-2">{amenity.icon}</span>
                {amenity.name}
              </Badge>
            ))}
          </div>
        </div>

        {selectedAmenities.length > 0 && (
          <>
            <Separator />
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Selected Filters</label>
              <div className="flex flex-wrap gap-1">
                {selectedAmenities.map((amenityId) => {
                  const amenity = AMENITIES.find((a) => a.id === amenityId)
                  return amenity ? (
                    <Badge key={amenityId} variant="secondary" className="text-xs">
                      {amenity.name}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleAmenity(amenityId)
                        }}
                      />
                    </Badge>
                  ) : null
                })}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
