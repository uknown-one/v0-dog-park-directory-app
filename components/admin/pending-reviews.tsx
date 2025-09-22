"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, Star, Flag, Eye } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Mock pending reviews data
const pendingReviews = [
  {
    id: "review-1",
    parkName: "Central Bark Dog Park",
    parkId: "park-1",
    rating: 1,
    comment:
      "This park is terrible! The staff was rude and the facilities were dirty. I would never recommend this place to anyone.",
    author: {
      id: "user-3",
      name: "Angry User",
      email: "angry@example.com",
      avatar: "/placeholder.svg?key=avatar7",
    },
    submittedAt: new Date("2024-01-16"),
    flaggedReason: "Inappropriate language",
    status: "flagged",
  },
  {
    id: "review-2",
    parkName: "Riverside Paws Park",
    parkId: "park-2",
    rating: 5,
    comment:
      "Amazing park! My dog absolutely loves it here. The facilities are clean and well-maintained. Highly recommend!",
    author: {
      id: "user-4",
      name: "Happy Owner",
      email: "happy@example.com",
      avatar: "/placeholder.svg?key=avatar8",
    },
    submittedAt: new Date("2024-01-15"),
    status: "pending",
  },
]

export function PendingReviews() {
  const [selectedReview, setSelectedReview] = useState<string | null>(null)
  const [moderationNote, setModerationNote] = useState("")

  const handleApprove = (reviewId: string) => {
    console.log("Approving review:", reviewId)
    // In real app, this would make API call to approve review
  }

  const handleReject = (reviewId: string) => {
    console.log("Rejecting review:", reviewId, "Note:", moderationNote)
    // In real app, this would make API call to reject review
    setModerationNote("")
    setSelectedReview(null)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pending Review Moderation</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingReviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">All reviews moderated!</h3>
              <p className="text-muted-foreground">No reviews pending moderation at the moment.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingReviews.map((review) => (
                <Card
                  key={review.id}
                  className={`border-l-4 ${review.status === "flagged" ? "border-l-red-500" : "border-l-yellow-500"}`}
                >
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-foreground mb-2">{review.parkName}</h3>
                            <div className="flex items-center mb-2">{renderStars(review.rating)}</div>
                            <div className="text-sm text-muted-foreground">
                              Submitted {formatDistanceToNow(review.submittedAt, { addSuffix: true })}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={review.status === "flagged" ? "destructive" : "secondary"}>
                              {review.status === "flagged" ? "Flagged" : "Pending"}
                            </Badge>
                            {review.status === "flagged" && (
                              <Badge variant="outline">
                                <Flag className="h-3 w-3 mr-1" />
                                {review.flaggedReason}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="bg-muted/50 p-4 rounded-lg mb-4">
                          <p className="text-foreground text-pretty">{review.comment}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.author.avatar || "/placeholder.svg"} alt={review.author.name} />
                            <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{review.author.name}</p>
                            <p className="text-xs text-muted-foreground">{review.author.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                          <Button onClick={() => handleApprove(review.id)} className="w-full">
                            <Check className="h-4 w-4 mr-2" />
                            Approve Review
                          </Button>

                          <Button
                            variant="outline"
                            onClick={() => setSelectedReview(selectedReview === review.id ? null : review.id)}
                            className="w-full"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject Review
                          </Button>

                          <Button variant="ghost" className="w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            View Park
                          </Button>
                        </div>

                        {selectedReview === review.id && (
                          <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                            <label className="text-sm font-medium">Moderation Note</label>
                            <Textarea
                              placeholder="Optional note for rejection..."
                              value={moderationNote}
                              onChange={(e) => setModerationNote(e.target.value)}
                              rows={3}
                            />
                            <div className="flex gap-2">
                              <Button size="sm" variant="destructive" onClick={() => handleReject(review.id)}>
                                Confirm Reject
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => setSelectedReview(null)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
