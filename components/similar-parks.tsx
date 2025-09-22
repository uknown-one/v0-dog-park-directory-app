import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SimilarParksProps {
  currentParkId: string
  city: string
  state: string
}

// Mock similar parks data
const mockSimilarParks = [
  {
    id: "650e8400-e29b-41d4-a716-446655440001",
    name: "Riverside Paws Park",
    city: "Austin",
    state: "TX",
    rating: 4.7,
    reviewCount: 89,
    image: "/riverside-dog-park-with-trails.jpg",
    distance: "1.8 miles",
    topAmenity: "Riverside Location",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440002",
    name: "Sunset Hills Dog Run",
    city: "Austin",
    state: "TX",
    rating: 4.5,
    reviewCount: 67,
    image: "/hilltop-dog-park-with-city-views.jpg",
    distance: "3.2 miles",
    topAmenity: "City Views",
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440003",
    name: "Oak Grove Dog Park",
    city: "Austin",
    state: "TX",
    rating: 4.6,
    reviewCount: 124,
    image: "/community-dog-park-with-benches.jpg",
    distance: "2.7 miles",
    topAmenity: "Shaded Areas",
  },
]

export function SimilarParks({ currentParkId, city, state }: SimilarParksProps) {
  const similarParks = mockSimilarParks.filter((park) => park.id !== currentParkId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Similar Parks Nearby</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {similarParks.map((park) => (
            <div key={park.id} className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={park.image || "/placeholder.svg"} alt={park.name} fill className="object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground truncate">{park.name}</h4>

                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{park.rating}</span>
                  <span>({park.reviewCount})</span>
                </div>

                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  {park.distance}
                </div>

                <Badge variant="outline" className="text-xs">
                  {park.topAmenity}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
          <Link href={`/parks?location=${city}, ${state}`}>View All Parks in {city}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
