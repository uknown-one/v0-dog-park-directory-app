"use client"

import { useState, useEffect } from "react"
import { GoogleMap } from "@/components/google-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Star, Navigation } from "lucide-react"
import Link from "next/link"

// Mock parks data - in real app this would come from database
const mockParks = [
  {
    id: "1",
    name: "Central Bark Dog Park",
    address: "123 Main St",
    city: "Austin",
    state: "TX",
    latitude: 30.2672,
    longitude: -97.7431,
    rating: 4.8,
    reviewCount: 124,
    amenities: ["fenced", "water", "shade"],
  },
  {
    id: "2",
    name: "Riverside Dog Run",
    address: "456 River Rd",
    city: "Austin",
    state: "TX",
    latitude: 30.25,
    longitude: -97.75,
    rating: 4.6,
    reviewCount: 89,
    amenities: ["off-leash", "water", "trails"],
  },
  {
    id: "3",
    name: "Westside Pup Park",
    address: "789 West Ave",
    city: "Austin",
    state: "TX",
    latitude: 30.28,
    longitude: -97.76,
    rating: 4.4,
    reviewCount: 67,
    amenities: ["fenced", "agility", "parking"],
  },
]

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPark, setSelectedPark] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Location access denied:", error)
        },
      )
    }
  }, [])

  const filteredParks = mockParks.filter(
    (park) =>
      park.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      park.city.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const mapCenter = userLocation || { lat: 30.2672, lng: -97.7431 }

  const mapMarkers = [
    ...filteredParks.map((park) => ({
      position: { lat: park.latitude, lng: park.longitude },
      title: park.name,
      info: `${park.rating} ⭐ (${park.reviewCount} reviews)`,
    })),
    ...(userLocation
      ? [
          {
            position: userLocation,
            title: "Your Location",
            info: "You are here",
          },
        ]
      : []),
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dog Parks Map</h1>
          <p className="text-muted-foreground">Find dog parks near you with interactive maps and directions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Interactive Map
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search parks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <GoogleMap center={mapCenter} markers={mapMarkers} zoom={12} className="h-96" />
              </CardContent>
            </Card>
          </div>

          {/* Parks List */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Nearby Parks ({filteredParks.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredParks.map((park) => (
                  <div
                    key={park.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPark === park.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedPark(selectedPark === park.id ? null : park.id)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-foreground">{park.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                          {park.rating}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {park.address}, {park.city}, {park.state}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {park.amenities.slice(0, 3).map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Link href={`/parks/${park.id}`}>View Details</Link>
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            const query = encodeURIComponent(`${park.address}, ${park.city}, ${park.state}`)
                            window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, "_blank")
                          }}
                        >
                          <Navigation className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
