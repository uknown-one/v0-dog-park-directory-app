import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Users, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AMENITIES } from "@/lib/types"

interface ParkGridProps {
  location?: string
  amenities?: string[]
  sortBy?: string
}

// Mock parks data - in real app this would come from database with filters applied
const mockParks = [
  {
    id: "650e8400-e29b-41d4-a716-446655440000",
    name: "Central Bark Dog Park",
    city: "Austin",
    state: "TX",
    rating: 4.8,
    reviewCount: 124,
    image: "/fenced-dog-park-with-agility-equipment.jpg",
    amenities: ["fenced", "agility", "water", "parking", "small-dogs", "large-dogs"],
    description:
      "Spacious fenced park with separate areas for large and small dogs. Features agility equipment and water fountains.",
    distance: "2.3 miles",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440001",
    name: "Riverside Paws Park",
    city: "Portland",
    state: "OR",
    rating: 4.7,
    reviewCount: 156,
    image: "/riverside-dog-park-with-trails.jpg",
    amenities: ["off-leash", "water", "shade", "parking"],
    description: "Beautiful riverside location with trails and open fields perfect for running.",
    distance: "1.8 miles",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440002",
    name: "Pup Paradise",
    city: "Denver",
    state: "CO",
    rating: 4.9,
    reviewCount: 89,
    image: "/premium-dog-park-with-modern-amenities.jpg",
    amenities: ["fenced", "agility", "water", "restrooms", "small-dogs", "large-dogs"],
    description: "Premium dog park with modern amenities and professional agility course.",
    distance: "3.1 miles",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440003",
    name: "Woofington Commons",
    city: "Seattle",
    state: "WA",
    rating: 4.6,
    reviewCount: 203,
    image: "/community-dog-park-with-benches.jpg",
    amenities: ["fenced", "off-leash", "water", "parking", "benches"],
    description: "Community-favorite dog park with friendly atmosphere and regular events.",
    distance: "0.9 miles",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440004",
    name: "Sunset Hills Dog Run",
    city: "San Francisco",
    state: "CA",
    rating: 4.5,
    reviewCount: 98,
    image: "/hilltop-dog-park-with-city-views.jpg",
    amenities: ["fenced", "shade", "parking", "small-dogs", "large-dogs"],
    description: "Hilltop location with panoramic city views, especially beautiful at sunset.",
    distance: "4.2 miles",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440005",
    name: "Bark Avenue Park",
    city: "New York",
    state: "NY",
    rating: 4.4,
    reviewCount: 267,
    image: "/urban-dog-park-with-artificial-turf.jpg",
    amenities: ["fenced", "off-leash", "water", "small-dogs", "large-dogs"],
    description: "Urban oasis with excellent drainage and artificial turf that stays clean.",
    distance: "1.2 miles",
  },
]

export function ParkGrid({ location, amenities = [], sortBy = "rating" }: ParkGridProps) {
  // In a real app, this would filter and sort based on the parameters
  const filteredParks = mockParks

  if (filteredParks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🐕</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No parks found</h3>
        <p className="text-muted-foreground">Try adjusting your search filters to find more parks.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Found {filteredParks.length} parks
          {location && ` in ${location}`}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4 mr-1" />
            View Favorites
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredParks.map((park) => (
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
                <Heart className="h-4 w-4" />
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
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {park.reviewCount} reviews
                </div>

                <Button asChild size="sm">
                  <Link href={`/parks/${park.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
