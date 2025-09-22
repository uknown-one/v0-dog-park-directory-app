"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Car, Clock } from "lucide-react"
import { GoogleMap } from "./google-map"

interface ParkDetailMapProps {
  park: {
    name: string
    address: string
    city: string
    state: string
    latitude: number
    longitude: number
  }
}

export function ParkMap({ park }: ParkDetailMapProps) {
  const handleGetDirections = () => {
    const query = encodeURIComponent(`${park.address}, ${park.city}, ${park.state}`)
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, "_blank")
  }

  const mapCenter = { lat: park.latitude, lng: park.longitude }
  const mapMarkers = [
    {
      position: mapCenter,
      title: park.name,
      info: `${park.address}, ${park.city}, ${park.state}`,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <GoogleMap center={mapCenter} markers={mapMarkers} className="h-64" />

        <div className="space-y-3">
          <div>
            <div className="font-medium text-foreground">{park.name}</div>
            <div className="text-sm text-muted-foreground">
              {park.address}
              <br />
              {park.city}, {park.state}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Car className="h-4 w-4 mr-1" />
              2.3 miles
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />8 min drive
            </div>
          </div>

          <Button onClick={handleGetDirections} className="w-full">
            <Navigation className="h-4 w-4 mr-2" />
            Get Directions
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
