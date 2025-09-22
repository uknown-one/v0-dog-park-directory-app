"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Heart, Navigation } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AMENITIES } from "@/lib/types"

// Mock favorite parks data
const favoriteParks = [
  {
    id: "650e8400-e29b-41d4-a716-446655440000",
    name: "Central Bark Dog Park",
    city: "Austin",
    state: "TX",
    rating: 4.8,
    reviewCount: 124,
    image: "/fenced-dog-park-with-agility-equipment.jpg",
    amenities: ["fenced", "agility", "water", "parking"],
    description: "Spacious fenced park with separate areas for large and small dogs.",
    distance: "2.3 miles",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440002",
    name: "Pup Paradise",
    city: "Denver",
    state: "CO",
    rating: 4.9,
    reviewCount: 89,
    image: "/premium-dog-park-with-modern-amenities.jpg",
    amenities: ["fenced", "agility", "water", "restrooms"],
    description: "Premium dog park with modern amenities and professional agility course.",
    distance: "5.1 miles",
  },
]

export function FavoriteParks() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Favorite Parks</h1>
        <p className="text-muted-foreground">Parks you've saved for quick access and future visits.</p>
      </div>

      {favoriteParks.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">💝</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-6">Start exploring parks and save your favorites for easy access.</p>
            <Button asChild>
              <Link href="/parks">Browse Parks</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteParks.map((park) => (
            <Card key={park.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={park.image || "/placeholder.svg"}
                  alt={park.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{park.rating}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm hover:bg-white"
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground text-balance">{park.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {park.city}, {park.state} • {park.distance}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 text-pretty">{park.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {park.amenities.slice(0, 3).map((amenityId) => {
                    const amenity = AMENITIES.find((a) => a.id === amenityId)
                    return amenity ? (
                      <Badge key={amenityId} variant="secondary" className="text-xs">
                        <span className="mr-1">{amenity.icon}</span>
                        {amenity.name}
                      </Badge>
                    ) : null
                  })}
                  {park.amenities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{park.amenities.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    <Navigation className="h-4 w-4 mr-1" />
                    Directions
                  </Button>

                  <Button asChild size="sm">
                    <Link href={`/parks/${park.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
