import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Mock parks data
const mockParks = [
  {
    id: "1",
    name: "Central Bark Dog Park",
    city: "Austin",
    state: "TX",
    address: "2100 Barton Springs Rd",
    latitude: 30.2672,
    longitude: -97.7431,
    rating: 4.8,
    reviewCount: 124,
    amenities: ["Fenced", "Water Station", "Agility Equipment"],
    imageUrl: "/dog-park-with-fenced-area-and-trees.jpg",
    description: "A spacious fenced park with separate areas for large and small dogs.",
    hours: "6:00 AM - 10:00 PM",
    phone: "(512) 974-6700",
    website: "https://austintexas.gov/department/parks-and-recreation",
    status: "approved",
  },
  // Add more mock parks as needed
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const amenities = searchParams.get("amenities")?.split(",") || []
    const sortBy = searchParams.get("sortBy") || "rating"

    let filteredParks = mockParks.filter((park) => park.status === "approved")

    // Apply location filter
    if (location) {
      filteredParks = filteredParks.filter(
        (park) =>
          park.city.toLowerCase().includes(location.toLowerCase()) ||
          park.state.toLowerCase().includes(location.toLowerCase()),
      )
    }

    // Apply amenities filter
    if (amenities.length > 0) {
      filteredParks = filteredParks.filter((park) =>
        amenities.some((amenity) =>
          park.amenities.some((parkAmenity) => parkAmenity.toLowerCase().includes(amenity.toLowerCase())),
        ),
      )
    }

    // Apply sorting
    if (sortBy === "rating") {
      filteredParks.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "reviews") {
      filteredParks.sort((a, b) => b.reviewCount - a.reviewCount)
    } else if (sortBy === "name") {
      filteredParks.sort((a, b) => a.name.localeCompare(b.name))
    }

    return NextResponse.json({ parks: filteredParks })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch parks" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "address", "city", "state", "zipCode", "description", "amenities"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Simulate saving to database
    const newPark = {
      id: Date.now().toString(),
      ...body,
      status: "pending",
      submittedBy: user.email,
      submittedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      message: "Park submitted successfully",
      park: newPark,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit park" }, { status: 500 })
  }
}
