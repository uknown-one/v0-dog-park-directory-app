import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Mock favorites data - in real app this would use your database
const mockFavorites = new Map<string, string[]>()

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const favorites = mockFavorites.get(session.user.id) || []
  return NextResponse.json({ favorites })
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { parkId } = await request.json()

  if (!parkId) {
    return NextResponse.json({ error: "Park ID required" }, { status: 400 })
  }

  const userFavorites = mockFavorites.get(session.user.id) || []

  if (!userFavorites.includes(parkId)) {
    userFavorites.push(parkId)
    mockFavorites.set(session.user.id, userFavorites)
  }

  return NextResponse.json({ success: true, favorites: userFavorites })
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const parkId = searchParams.get("parkId")

  if (!parkId) {
    return NextResponse.json({ error: "Park ID required" }, { status: 400 })
  }

  const userFavorites = mockFavorites.get(session.user.id) || []
  const updatedFavorites = userFavorites.filter((id) => id !== parkId)
  mockFavorites.set(session.user.id, updatedFavorites)

  return NextResponse.json({ success: true, favorites: updatedFavorites })
}
