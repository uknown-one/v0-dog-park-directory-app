import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, MessageCircle, Star, TrendingUp, AlertTriangle } from "lucide-react"

export function AdminStats() {
  // Mock stats data - in real app this would come from database
  const stats = {
    totalParks: 1247,
    approvedParks: 1189,
    pendingParks: 5,
    rejectedParks: 53,
    totalUsers: 15420,
    activeUsers: 8934,
    newUsersThisMonth: 342,
    totalReviews: 25678,
    approvedReviews: 24891,
    pendingReviews: 12,
    averageRating: 4.6,
    reportsThisMonth: 8,
  }

  const statCards = [
    {
      title: "Total Parks",
      value: stats.totalParks.toLocaleString(),
      description: `${stats.pendingParks} pending approval`,
      icon: MapPin,
      trend: "+12 this month",
      trendUp: true,
    },
    {
      title: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      description: `${stats.newUsersThisMonth} new this month`,
      icon: Users,
      trend: "+5.2% from last month",
      trendUp: true,
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews.toLocaleString(),
      description: `${stats.pendingReviews} pending moderation`,
      icon: MessageCircle,
      trend: "+234 this week",
      trendUp: true,
    },
    {
      title: "Average Rating",
      value: stats.averageRating.toString(),
      description: "Across all parks",
      icon: Star,
      trend: "+0.1 from last month",
      trendUp: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mb-2">{stat.description}</p>
              <div className={`flex items-center text-xs ${stat.trendUp ? "text-green-600" : "text-red-600"}`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Park Approval Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Approved</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(stats.approvedParks / stats.totalParks) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{stats.approvedParks}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pending</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${(stats.pendingParks / stats.totalParks) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{stats.pendingParks}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rejected</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(stats.rejectedParks / stats.totalParks) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{stats.rejectedParks}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-green-500/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">New park submitted: "Doggy Paradise"</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">Review flagged for moderation</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-red-500/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">Park reported for inappropriate content</p>
                  <p className="text-xs text-muted-foreground">6 hours ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-green-500/10 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">15 new users registered today</p>
                  <p className="text-xs text-muted-foreground">8 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
