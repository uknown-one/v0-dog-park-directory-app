"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Search, MapPin, Filter } from "lucide-react"
import { AMENITIES } from "@/lib/types"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const [location, setLocation] = useState("")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set("location", location)
    if (selectedAmenities.length > 0) params.set("amenities", selectedAmenities.join(","))

    router.push(`/parks?${params.toString()}`)
  }

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId],
    )
  }

  return (
    <Card className="p-6 max-w-4xl mx-auto shadow-lg">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Enter city, state, or zip code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 h-12 text-lg"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="h-12 px-6">
            <Filter className="h-5 w-5 mr-2" />
            Filters
            {selectedAmenities.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedAmenities.length}
              </Badge>
            )}
          </Button>

          <Button onClick={handleSearch} className="h-12 px-8">
            <Search className="h-5 w-5 mr-2" />
            Search Parks
          </Button>
        </div>

        {showFilters && (
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3 text-foreground">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map((amenity) => (
                <Badge
                  key={amenity.id}
                  variant={selectedAmenities.includes(amenity.id) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => toggleAmenity(amenity.id)}
                >
                  <span className="mr-1">{amenity.icon}</span>
                  {amenity.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
