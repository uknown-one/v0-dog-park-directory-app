import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

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
    const { parkId, rating, comment } = body

    // Validate required fields
    if (!parkId || !rating || !comment) {
      return NextResponse.json({ error: "Park ID, rating, and comment are required" }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    // Simulate saving to database
    const newReview = {
      id: Date.now().toString(),
      parkId,
      rating,
      comment,
      userId: user.email,
      userName: user.user_metadata?.full_name || user.email,
      userImage: user.user_metadata?.avatar_url,
      createdAt: new Date().toISOString(),
      status: "approved",
    }

    return NextResponse.json({
      message: "Review submitted successfully",
      review: newReview,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}
