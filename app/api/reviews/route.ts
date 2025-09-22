import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Mock reviews data - in real app this would use your database
const mockReviews = new Map<string, any[]>()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const parkId = searchParams.get("parkId")

  if (!parkId) {
    return NextResponse.json({ error: "Park ID required" }, { status: 400 })
  }

  const reviews = mockReviews.get(parkId) || []
  return NextResponse.json({ reviews })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { parkId, rating, comment } = await request.json()

  if (!parkId || !rating || !comment) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const parkReviews = mockReviews.get(parkId) || []
  const newReview = {
    id: Date.now().toString(),
    userId: session.user.id,
    userName: session.user.name,
    userImage: session.user.image,
    rating,
    comment,
    createdAt: new Date().toISOString(),
    helpful: 0,
  }

  parkReviews.push(newReview)
  mockReviews.set(parkId, parkReviews)

  return NextResponse.json({ success: true, review: newReview })
}
