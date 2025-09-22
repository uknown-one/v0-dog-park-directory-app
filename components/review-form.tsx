"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, Send } from "lucide-react"
import { toast } from "sonner"

interface ReviewFormProps {
  parkId: string
  onReviewSubmitted?: () => void
}

export function ReviewForm({ parkId, onReviewSubmitted }: ReviewFormProps) {
  const { data: session } = useSession()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session?.user?.id) {
      toast.error("Please sign in to leave a review")
      return
    }

    if (rating === 0 || !comment.trim()) {
      toast.error("Please provide a rating and comment")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parkId,
          rating,
          comment: comment.trim(),
        }),
      })

      if (response.ok) {
        toast.success("Review submitted successfully!")
        setRating(0)
        setComment("")
        onReviewSubmitted?.()
      } else {
        throw new Error("Failed to submit review")
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error("Failed to submit review")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!session?.user?.id) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground mb-4">Sign in to leave a review</p>
          <Button asChild>
            <a href="/auth/signin">Sign In</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Your Review
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience at this park..."
              rows={4}
              required
            />
          </div>

          <Button type="submit" disabled={isSubmitting || rating === 0 || !comment.trim()}>
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
