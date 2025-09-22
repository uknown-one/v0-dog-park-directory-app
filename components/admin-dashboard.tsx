"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PendingParks } from "@/components/admin/pending-parks"
import { PendingReviews } from "@/components/admin/pending-reviews"
import { AdminStats } from "@/components/admin/admin-stats"
import { UserManagement } from "@/components/admin/user-management"
import { Shield, MapPin, MessageCircle, Users, BarChart3 } from "lucide-react"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock pending counts - in real app this would come from database
  const pendingCounts = {
    parks: 5,
    reviews: 12,
    reports: 3,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage parks, reviews, and users</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="parks" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Parks
            {pendingCounts.parks > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {pendingCounts.parks}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Reviews
            {pendingCounts.reviews > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {pendingCounts.reviews}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            Reports
            {pendingCounts.reports > 0 && (
              <Badge variant="destructive" className="ml-1 text-xs">
                {pendingCounts.reports}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <AdminStats />
        </TabsContent>

        <TabsContent value="parks">
          <PendingParks />
        </TabsContent>

        <TabsContent value="reviews">
          <PendingReviews />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reported Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Reports</h3>
                <p className="text-muted-foreground">All reported content has been reviewed.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
