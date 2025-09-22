import { Suspense } from "react"
import { notFound } from "next/navigation"
import { ParkHeader } from "@/components/park-header"
import { ParkGallery } from "@/components/park-gallery"
import { ParkInfo } from "@/components/park-info"
import { ParkReviews } from "@/components/park-reviews"
import { ParkMap } from "@/components/park-detail-map"
import { SimilarParks } from "@/components/similar-parks"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface ParkDetailPageProps {
  params: {
    id: string
  }
}

// Mock park data - in real app this would come from database
const mockPark = {
  id: "650e8400-e29b-41d4-a716-446655440000",
  name: "Central Bark Dog Park",
  description:
    "A spacious fenced dog park in the heart of downtown with separate areas for large and small dogs. Features include water fountains, agility equipment, and plenty of shade trees. This park has been a community favorite for over 10 years, providing a safe and fun environment for dogs of all sizes to play and socialize.",
  address: "123 Main St",
  city: "Austin",
  state: "TX",
  zipCode: "78701",
  latitude: 30.2672,
  longitude: -97.7431,
  amenities: [
    "fenced",
    "off-leash",
    "water",
    "shade",
    "parking",
    "restrooms",
    "small-dogs",
    "large-dogs",
    "agility",
    "benches",
  ],
  images: [
    "/fenced-dog-park-with-agility-equipment.jpg",
    "/happy-dogs-playing-in-a-park-with-trees.jpg",
    "/community-dog-park-with-benches.jpg",
  ],
  averageRating: 4.8,
  totalReviews: 124,
  isApproved: true,
  createdAt: new Date("2023-01-15"),
  updatedAt: new Date("2024-01-15"),
  createdBy: "550e8400-e29b-41d4-a716-446655440000",
  hours: {
    monday: "6:00 AM - 10:00 PM",
    tuesday: "6:00 AM - 10:00 PM",
    wednesday: "6:00 AM - 10:00 PM",
    thursday: "6:00 AM - 10:00 PM",
    friday: "6:00 AM - 10:00 PM",
    saturday: "6:00 AM - 10:00 PM",
    sunday: "6:00 AM - 10:00 PM",
  },
  contact: {
    phone: "(512) 555-0123",
    email: "info@centralbarkpark.com",
    website: "https://centralbarkpark.com",
  },
  rules: [
    "All dogs must be current on vaccinations",
    "Owners must supervise their dogs at all times",
    "Clean up after your dog",
    "Aggressive dogs must be removed immediately",
    "Maximum 3 dogs per owner",
    "Children under 12 must be supervised",
  ],
}

export default async function ParkDetailPage({ params }: ParkDetailPageProps) {
  const { id } = params

  // In a real app, this would fetch from database
  if (id !== mockPark.id) {
    notFound()
  }

  const park = mockPark

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/parks">Parks</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{park.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ParkHeader park={park} />

            <Suspense fallback={<div className="h-96 bg-card animate-pulse rounded-lg" />}>
              <ParkGallery images={park.images} parkName={park.name} />
            </Suspense>

            <ParkInfo park={park} />

            <Suspense fallback={<div className="h-96 bg-card animate-pulse rounded-lg" />}>
              <ParkReviews parkId={park.id} />
            </Suspense>
          </div>

          <div className="space-y-6">
            <Suspense fallback={<div className="h-80 bg-card animate-pulse rounded-lg" />}>
              <ParkMap park={park} />
            </Suspense>

            <Suspense fallback={<div className="h-96 bg-card animate-pulse rounded-lg" />}>
              <SimilarParks currentParkId={park.id} city={park.city} state={park.state} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
