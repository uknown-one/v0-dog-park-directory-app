import type { Park, Review } from "./types"

// Mock database functions - in a real app, these would connect to your actual database
// For now, we'll use the seed data structure

export async function getParks(filters?: {
  city?: string
  state?: string
  amenities?: string[]
  sortBy?: "closest" | "rating" | "popular"
}): Promise<Park[]> {
  // This would be replaced with actual database queries
  // For now, return mock data based on our seed data structure
  const mockParks: Park[] = [
    {
      id: "650e8400-e29b-41d4-a716-446655440000",
      name: "Central Bark Dog Park",
      description: "A spacious fenced dog park in the heart of downtown with separate areas for large and small dogs.",
      address: "123 Main St",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      latitude: 30.2672,
      longitude: -97.7431,
      amenities: ["fenced", "off-leash", "water", "shade", "parking", "small-dogs", "large-dogs", "agility"],
      images: ["/dog-park-with-fenced-area-and-trees.jpg"],
      averageRating: 4.5,
      totalReviews: 2,
      isApproved: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "550e8400-e29b-41d4-a716-446655440000",
    },
    // Add more mock parks here...
  ]

  return mockParks
}

export async function getParkById(id: string): Promise<Park | null> {
  const parks = await getParks()
  return parks.find((park) => park.id === id) || null
}

export async function getReviewsByParkId(parkId: string): Promise<Review[]> {
  // Mock reviews data
  return [
    {
      id: "1",
      parkId,
      userId: "550e8400-e29b-41d4-a716-446655440001",
      userName: "John Smith",
      rating: 5,
      comment: "Amazing park! My golden retriever loves the agility course.",
      createdAt: new Date(),
      isApproved: true,
    },
  ]
}

export async function createPark(
  park: Omit<Park, "id" | "createdAt" | "updatedAt" | "averageRating" | "totalReviews">,
): Promise<Park> {
  // Mock create function
  const newPark: Park = {
    ...park,
    id: crypto.randomUUID(),
    averageRating: 0,
    totalReviews: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return newPark
}

export async function createReview(review: Omit<Review, "id" | "createdAt">): Promise<Review> {
  // Mock create function
  const newReview: Review = {
    ...review,
    id: crypto.randomUUID(),
    createdAt: new Date(),
  }
  return newReview
}
