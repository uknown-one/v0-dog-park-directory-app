"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Shield, User, Ban, Mail } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Mock users data
const users = [
  {
    id: "user-1",
    name: "John Smith",
    email: "john@example.com",
    avatar: "/placeholder.svg?key=avatar9",
    role: "user",
    status: "active",
    joinDate: new Date("2023-06-15"),
    lastActive: new Date("2024-01-16"),
    reviewsCount: 12,
    parksAdded: 2,
  },
  {
    id: "user-2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?key=avatar10",
    role: "user",
    status: "active",
    joinDate: new Date("2023-08-22"),
    lastActive: new Date("2024-01-15"),
    reviewsCount: 8,
    parksAdded: 0,
  },
  {
    id: "user-3",
    name: "Admin User",
    email: "admin@pawparks.com",
    avatar: "/placeholder.svg?key=avatar11",
    role: "admin",
    status: "active",
    joinDate: new Date("2023-01-01"),
    lastActive: new Date("2024-01-16"),
    reviewsCount: 0,
    parksAdded: 15,
  },
  {
    id: "user-4",
    name: "Banned User",
    email: "banned@example.com",
    avatar: "/placeholder.svg?key=avatar12",
    role: "user",
    status: "banned",
    joinDate: new Date("2023-12-01"),
    lastActive: new Date("2024-01-10"),
    reviewsCount: 3,
    parksAdded: 0,
  },
]

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleRoleChange = (userId: string, newRole: string) => {
    console.log("Changing role for user:", userId, "to:", newRole)
    // In real app, this would make API call to update user role
  }

  const handleStatusChange = (userId: string, newStatus: string) => {
    console.log("Changing status for user:", userId, "to:", newStatus)
    // In real app, this would make API call to update user status
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/10 text-red-500"
      case "moderator":
        return "bg-blue-500/10 text-blue-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500"
      case "banned":
        return "bg-red-500/10 text-red-500"
      case "suspended":
        return "bg-yellow-500/10 text-yellow-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold text-foreground">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role === "admin" && <Shield className="h-3 w-3 mr-1" />}
                            {user.role === "user" && <User className="h-3 w-3 mr-1" />}
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status === "banned" && <Ban className="h-3 w-3 mr-1" />}
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-2">
                        Joined {formatDistanceToNow(user.joinDate, { addSuffix: true })}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Last active {formatDistanceToNow(user.lastActive, { addSuffix: true })}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.reviewsCount} reviews • {user.parksAdded} parks added
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Select value={user.role} onValueChange={(value) => handleRoleChange(user.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={user.status} onValueChange={(value) => handleStatusChange(user.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                          <SelectItem value="banned">Banned</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No users found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
