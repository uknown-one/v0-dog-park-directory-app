"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { AuthGuard } from "@/components/auth-guard"
import { Settings, Bell, Shield, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function SettingsPage() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState({
    email: true,
    reviews: true,
    favorites: false,
    marketing: false,
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
    toast.success("Notification preferences updated")
  }

  const handleDeleteAccount = () => {
    toast.error("Account deletion is not available in demo mode")
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and privacy settings.</p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" defaultValue={session?.user?.name || ""} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={session?.user?.email || ""} disabled />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="review-notifications">Review Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when someone responds to your reviews</p>
                  </div>
                  <Switch
                    id="review-notifications"
                    checked={notifications.reviews}
                    onCheckedChange={(checked) => handleNotificationChange("reviews", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="favorite-notifications">Favorite Park Updates</Label>
                    <p className="text-sm text-muted-foreground">Updates about your favorite parks</p>
                  </div>
                  <Switch
                    id="favorite-notifications"
                    checked={notifications.favorites}
                    onCheckedChange={(checked) => handleNotificationChange("favorites", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-notifications">Marketing Communications</Label>
                    <p className="text-sm text-muted-foreground">Receive news and promotional content</p>
                  </div>
                  <Switch
                    id="marketing-notifications"
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Account Visibility</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your profile and reviews are public by default to help other dog owners.
                  </p>
                  <Button variant="outline">Manage Privacy Settings</Button>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Data Export</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Download a copy of your data including reviews, favorites, and account information.
                  </p>
                  <Button variant="outline">Request Data Export</Button>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center text-destructive">
                  <Trash2 className="h-5 w-5 mr-2" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-medium mb-2">Delete Account</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
