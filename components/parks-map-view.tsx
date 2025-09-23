"use client"

import { useState, useEffect } from "react"
import { GoogleMap } from "./google-map"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Users } from "lucide-react"
import Link from "next/link"

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

interface ParksMapViewProps {
  parks: Park[]
  center?: { lat: number; lng: number }
}

export function ParksMapView({ parks, center }: ParksMapViewProps) {
  const [selectedPark, setSelectedPark] = useState<Park | null>(null)
  const [mapCenter, setMapCenter] = useState(
    center || { lat: 39.8283, lng: -98.5795 }, // Center of US
  )

  useEffect(() => {
    if (parks.length > 0 && !center) {
      // Calculate center based on parks
      const avgLat = parks.reduce((sum, park) => sum + park.latitude, 0) / parks.length
      const avgLng = parks.reduce((sum, park) => sum + park.longitude, 0) / parks.length
      setMapCenter({ lat: avgLat, lng: avgLng })
    }
  }, [parks, center])

  const markers = parks.map((park) => ({
    id: park.id,
    position: {
      lat: park.latitude,
      lng: park.longitude,
    },
    title: park.name,
    onClick: () => setSelectedPark(park),
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      <div className="lg:col-span-2">
        <GoogleMap center={mapCenter} zoom={10} markers={markers} className="h-full" />
      </div>

      <div className="space-y-4 overflow-y-auto">
        {selectedPark ? (
          <Card>
            <CardContent className="p-4">
              <div className="aspect-video relative mb-3 overflow-hidden rounded-lg">
                <img
                  src={selectedPark.imageUrl || "/placeholder.svg"}
                  alt={selectedPark.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="font-semibold text-lg mb-2">{selectedPark.name}</h3>

              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {selectedPark.city}, {selectedPark.state}
              </div>

              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{selectedPark.rating}</span>
                </div>
                <div className="flex items-center ml-3 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {selectedPark.reviewCount} reviews
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {selectedPark.amenities.slice(0, 3).map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {selectedPark.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{selectedPark.amenities.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/parks/${selectedPark.id}`}>View Details</Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedPark(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-4 text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Click on a marker to view park details</p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-2">
          <h4 className="font-medium">All Parks ({parks.length})</h4>
          {parks.map((park) => (
            <Card
              key={park.id}
              className={`cursor-pointer transition-colors ${
                selectedPark?.id === park.id ? "ring-2 ring-primary" : "hover:bg-muted/50"
              }`}
              onClick={() => setSelectedPark(park)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-sm">{park.name}</h5>
                    <p className="text-xs text-muted-foreground">
                      {park.city}, {park.state}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-xs">{park.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
