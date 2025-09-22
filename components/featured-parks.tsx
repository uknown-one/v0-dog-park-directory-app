import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AMENITIES } from "@/lib/types"

// Mock featured parks data - in real app this would come from database
const featuredParks = [
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
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440001",
    name: "Riverside Paws Park",
    city: "Portland",
    state: "OR",
    rating: 4.7,
    reviewCount: 156,
    image: "/riverside-dog-park-with-trails.jpg",
    amenities: ["off-leash", "water", "shade"],
    description: "Beautiful riverside location with trails and open fields.",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440006",
    name: "Lakeside Leash-Free Zone",
    city: "Chicago",
    state: "IL",
    rating: 4.6,
    reviewCount: 203,
    image: "/lakeside-dog-park-with-beach-area.jpg",
    amenities: ["off-leash", "water", "parking"],
    description: "Scenic lakeside park where dogs can swim and play in the water.",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440004",
    name: "Sunset Hills Dog Run",
    city: "San Francisco",
    state: "CA",
    rating: 4.5,
    reviewCount: 98,
    image: "/hilltop-dog-park-with-city-views.jpg",
    amenities: ["fenced", "shade", "parking"],
    description: "Hilltop location with panoramic city views.",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440009",
    name: "Coastal Canine Club",
    city: "San Diego",
    state: "CA",
    rating: 4.8,
    reviewCount: 167,
    image: "/beachfront-dog-park-with-sand-and-waves.jpg",
    amenities: ["off-leash", "water", "parking"],
    description: "Beachfront dog park where pups can run on sand and splash in waves.",
  },
]

export function FeaturedParks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredParks.map((park) => (
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
          </div>

          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground text-balance">{park.name}</h3>
                <div className="flex items-center text-muted-foreground text-sm mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {park.city}, {park.state}
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
  )
}
