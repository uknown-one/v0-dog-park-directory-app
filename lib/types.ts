export interface Park {
  id: string
  name: string
  description: string
  address: string
  city: string
  state: string
  zipCode: string
  latitude: number
  longitude: number
  amenities: string[]
  images: string[]
  averageRating: number
  totalReviews: number
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export interface Review {
  id: string
  parkId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  createdAt: Date
  isApproved: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  isAdmin: boolean
  favorites: string[] // Park IDs
  createdAt: Date
}

export interface Amenity {
  id: string
  name: string
  icon: string
}

export const AMENITIES: Amenity[] = [
  { id: "fenced", name: "Fenced Area", icon: "🏠" },
  { id: "off-leash", name: "Off-Leash Area", icon: "🐕" },
  { id: "water", name: "Water Available", icon: "💧" },
  { id: "shade", name: "Shaded Areas", icon: "🌳" },
  { id: "parking", name: "Parking Available", icon: "🚗" },
  { id: "restrooms", name: "Restrooms", icon: "🚻" },
  { id: "small-dogs", name: "Small Dog Area", icon: "🐕‍🦺" },
  { id: "large-dogs", name: "Large Dog Area", icon: "🐕" },
  { id: "agility", name: "Agility Equipment", icon: "🏃" },
  { id: "benches", name: "Seating/Benches", icon: "🪑" },
]
