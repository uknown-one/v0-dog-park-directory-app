"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, MessageCircle, Filter } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ReviewForm } from "./review-form"

interface ParkReviewsProps {
  parkId: string
}

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    userId: "550e8400-e29b-41d4-a716-446655440001",
    userName: "John Smith",
    userAvatar: "/placeholder.svg?key=avatar1",
    rating: 5,
    comment:
      "Amazing park! My golden retriever loves the agility course and the separate small dog area is perfect for my friends chihuahua. The staff is always friendly and the facilities are well-maintained. Highly recommend for any dog owner in the area.",
    createdAt: new Date("2024-01-10"),
    isApproved: true,
    helpful: 12,
    dogBreed: "Golden Retriever",
  },
  {
    id: "2",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    userName: "Sarah Johnson",
    userAvatar: "/placeholder.svg?key=avatar2",
    rating: 4,
    comment:
      "Great facilities and well-maintained. Can get crowded on weekends but thats because its so popular! The water fountains are a nice touch and there are plenty of waste bags available.",
    createdAt: new Date("2024-01-08"),
    isApproved: true,
    helpful: 8,
    dogBreed: "Border Collie",
  },
  {
    id: "3",
    userId: "550e8400-e29b-41d4-a716-446655440003",
    userName: "Mike Wilson",
    userAvatar: "/placeholder.svg?key=avatar3",
    rating: 5,
    comment:
      "Perfect spot for socializing! My shy rescue dog has really come out of her shell here. The other dog owners are friendly and responsible. Love the separate areas for different sized dogs.",
    createdAt: new Date("2024-01-05"),
    isApproved: true,
    helpful: 15,
    dogBreed: "Mixed Breed",
  },
  {
    id: "4",
    userId: "550e8400-e29b-41d4-a716-446655440004",
    userName: "Emily Davis",
    userAvatar: "/placeholder.svg?key=avatar4",
    rating: 4,
    comment:
      "Good park overall. The agility equipment is fun but could use some updates. Parking can be challenging during peak hours. Still a solid choice for exercise and play.",
    createdAt: new Date("2024-01-03"),
    isApproved: true,
    helpful: 6,
    dogBreed: "Australian Shepherd",
  },
]

const ratingBreakdown = {
  5: 68,
  4: 32,
  3: 18,
  2: 4,
  1: 2,
}

export function ParkReviews({ parkId }: ParkReviewsProps) {
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "helpful">("newest")
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const totalReviews = Object.values(ratingBreakdown).reduce((sum, count) => sum + count, 0)
  const averageRating = (
    Object.entries(ratingBreakdown).reduce((sum, [rating, count]) => sum + Number.parseInt(rating) * count, 0) /
    totalReviews
  ).toFixed(1)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const handleReviewSubmitted = () => {
    setShowReviewForm(false)
    // In a real app, you would refresh the reviews list here
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Reviews & Ratings</span>
            <Button onClick={() => setShowReviewForm(!showReviewForm)}>
              <MessageCircle className="h-4 w-4 mr-2" />
              {showReviewForm ? "Cancel" : "Write Review"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">{averageRating}</div>
              <div className="flex items-center justify-center mb-2">
                {renderStars(Math.round(Number.parseFloat(averageRating)))}
              </div>
              <div className="text-muted-foreground">Based on {totalReviews} reviews</div>
            </div>

            <div className="space-y-2">
              {Object.entries(ratingBreakdown)
                .reverse()
                .map(([rating, count]) => {
                  const percentage = (count / totalReviews) * 100
                  return (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm w-8">{rating}★</span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">{count}</span>
                    </div>
                  )
                })}
            </div>
          </div>
        </CardContent>
      </Card>

      {showReviewForm && <ReviewForm parkId={parkId} onReviewSubmitted={handleReviewSubmitted} />}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Reviews</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockReviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
                    <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-foreground">{review.userName}</span>
                      <Badge variant="outline" className="text-xs">
                        {review.dogBreed}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(review.createdAt, { addSuffix: true })}
                      </span>
                    </div>

                    <div className="flex items-center mb-3">{renderStars(review.rating)}</div>

                    <p className="text-muted-foreground mb-3 text-pretty">{review.comment}</p>

                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({review.helpful})
                      </Button>
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Button variant="outline">Load More Reviews</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
