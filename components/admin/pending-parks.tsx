"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, MapPin, Calendar, Eye } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { AMENITIES } from "@/lib/types"
import Image from "next/image"

// Mock pending parks data
const pendingParks = [
  {
    id: "pending-1",
    name: "Doggy Paradise",
    description: "A beautiful new dog park with modern amenities and plenty of space for dogs to run and play.",
    address: "456 New Park Ave",
    city: "Austin",
    state: "TX",
    zipCode: "78702",
    amenities: ["fenced", "water", "parking", "shade"],
    images: ["/community-dog-park-with-benches.jpg"],
    submittedBy: {
      id: "user-1",
      name: "Jane Doe",
      email: "jane@example.com",
      avatar: "/placeholder.svg?key=avatar5",
    },
    submittedAt: new Date("2024-01-15"),
    status: "pending",
  },
  {
    id: "pending-2",
    name: "Riverside Canine Club",
    description:
      "Scenic riverside location perfect for dogs who love water. Features include swimming areas and trails.",
    address: "789 River Road",
    city: "Portland",
    state: "OR",
    zipCode: "97201",
    amenities: ["off-leash", "water", "shade", "parking"],
    images: ["/riverside-dog-park-with-trails.jpg"],
    submittedBy: {
      id: "user-2",
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "/placeholder.svg?key=avatar6",
    },
    submittedAt: new Date("2024-01-14"),
    status: "pending",
  },
]

export function PendingParks() {
  const [selectedPark, setSelectedPark] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  const handleApprove = (parkId: string) => {
    console.log("Approving park:", parkId)
    // In real app, this would make API call to approve park
  }

  const handleReject = (parkId: string) => {
    console.log("Rejecting park:", parkId, "Reason:", rejectionReason)
    // In real app, this would make API call to reject park
    setRejectionReason("")
    setSelectedPark(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pending Park Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingParks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">All caught up!</h3>
              <p className="text-muted-foreground">No parks pending approval at the moment.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingParks.map((park) => (
                <Card key={park.id} className="border-l-4 border-l-yellow-500">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{park.name}</h3>
                            <div className="flex items-center text-muted-foreground text-sm mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              {park.address}, {park.city}, {park.state} {park.zipCode}
                            </div>
                            <div className="flex items-center text-muted-foreground text-sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              Submitted {formatDistanceToNow(park.submittedAt, { addSuffix: true })}
                            </div>
                          </div>
                          <Badge variant="secondary">Pending</Badge>
                        </div>

                        <p className="text-muted-foreground mb-4 text-pretty">{park.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {park.amenities.map((amenityId) => {
                            const amenity = AMENITIES.find((a) => a.id === amenityId)
                            return amenity ? (
                              <Badge key={amenityId} variant="outline">
                                <span className="mr-1">{amenity.icon}</span>
                                {amenity.name}
                              </Badge>
                            ) : null
                          })}
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={park.submittedBy.avatar || "/placeholder.svg"}
                              alt={park.submittedBy.name}
                            />
                            <AvatarFallback>{park.submittedBy.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">Submitted by {park.submittedBy.name}</p>
                            <p className="text-xs text-muted-foreground">{park.submittedBy.email}</p>
                          </div>
                        </div>

                        {park.images.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {park.images.slice(0, 2).map((image, index) => (
                              <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={`${park.name} photo ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                          <Button onClick={() => handleApprove(park.id)} className="w-full">
                            <Check className="h-4 w-4 mr-2" />
                            Approve Park
                          </Button>

                          <Button
                            variant="outline"
                            onClick={() => setSelectedPark(selectedPark === park.id ? null : park.id)}
                            className="w-full"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject Park
                          </Button>

                          <Button variant="ghost" className="w-full">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>

                        {selectedPark === park.id && (
                          <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                            <label className="text-sm font-medium">Rejection Reason</label>
                            <Textarea
                              placeholder="Please provide a reason for rejection..."
                              value={rejectionReason}
                              onChange={(e) => setRejectionReason(e.target.value)}
                              rows={3}
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReject(park.id)}
                                disabled={!rejectionReason.trim()}
                              >
                                Confirm Reject
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => setSelectedPark(null)}>
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
