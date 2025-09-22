"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Heart, MessageCircle, Calendar, Edit } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function UserProfile() {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  // Mock user data - in real app this would come from database
  const userStats = {
    reviewsCount: 12,
    favoritesCount: 8,
    parksAdded: 2,
    joinDate: new Date("2023-06-15"),
  }

  const recentReviews = [
    {
      id: "1",
      parkName: "Central Bark Dog Park",
      rating: 5,
      comment: "Amazing park! My golden retriever loves the agility course.",
      createdAt: new Date("2024-01-10"),
    },
    {
      id: "2",
      parkName: "Riverside Paws Park",
      rating: 4,
      comment: "Beautiful location but can get crowded on weekends.",
      createdAt: new Date("2024-01-05"),
    },
  ]

  const favoriteParks = [
    {
      id: "1",
      name: "Central Bark Dog Park",
      city: "Austin",
      state: "TX",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Pup Paradise",
      city: "Denver",
      state: "CO",
      rating: 4.9,
    },
  ]

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
              <AvatarFallback className="text-2xl">{session.user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">{session.user.name}</h1>
              <p className="text-muted-foreground mb-4">{session.user.email}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {formatDistanceToNow(userStats.joinDate, { addSuffix: true })}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userStats.reviewsCount}</div>
                  <div className="text-sm text-muted-foreground">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userStats.favoritesCount}</div>
                  <div className="text-sm text-muted-foreground">Favorites</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userStats.parksAdded}</div>
                  <div className="text-sm text-muted-foreground">Parks Added</div>
                </div>
              </div>
            </div>

            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="reviews" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reviews">Recent Reviews</TabsTrigger>
          <TabsTrigger value="favorites">Favorite Parks</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{review.parkName}</h3>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2 text-pretty">{review.comment}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(review.createdAt, { addSuffix: true })}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Favorite Parks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteParks.map((park) => (
                  <Card key={park.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{park.name}</h3>
                          <div className="flex items-center text-muted-foreground text-sm mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {park.city}, {park.state}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="text-sm">{park.rating}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">You</span> reviewed{" "}
                      <span className="font-medium">Central Bark Dog Park</span>
                    </p>
                    <p className="text-xs text-muted-foreground">5 days ago</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-red-500/10 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">You</span> added <span className="font-medium">Pup Paradise</span>{" "}
                      to favorites
                    </p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
