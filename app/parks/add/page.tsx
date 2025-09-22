"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, Upload, X } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"

const amenityOptions = [
  { id: "fenced", label: "Fenced Area" },
  { id: "off-leash", label: "Off-Leash Area" },
  { id: "water", label: "Water Fountain" },
  { id: "shade", label: "Shade/Trees" },
  { id: "parking", label: "Parking Available" },
  { id: "restrooms", label: "Restrooms" },
  { id: "small-dogs", label: "Small Dog Area" },
  { id: "large-dogs", label: "Large Dog Area" },
  { id: "agility", label: "Agility Equipment" },
  { id: "benches", label: "Benches/Seating" },
  { id: "trails", label: "Walking Trails" },
  { id: "lighting", label: "Lighting" },
]

export default function AddParkPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [images, setImages] = useState<File[]>([])

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    website: "",
    hours: {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    },
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleHoursChange = (day: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      hours: { ...prev.hours, [day]: value },
    }))
  }

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId],
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages((prev) => [...prev, ...files].slice(0, 5)) // Max 5 images
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would submit to your API
      console.log("Submitting park:", {
        ...formData,
        amenities: selectedAmenities,
        images: images.map((img) => img.name),
        submittedBy: session?.user?.id,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      router.push("/parks?submitted=true")
    } catch (error) {
      console.error("Error submitting park:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Add New Dog Park</h1>
            <p className="text-muted-foreground">
              Help other dog owners discover great parks by adding a new location to our directory.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Park Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Central Bark Dog Park"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      placeholder="78701"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the park, its features, and what makes it special..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="123 Main St"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Austin"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="TX"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities & Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {amenityOptions.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity.id}
                        checked={selectedAmenities.includes(amenity.id)}
                        onCheckedChange={() => handleAmenityToggle(amenity.id)}
                      />
                      <Label htmlFor={amenity.id} className="text-sm">
                        {amenity.label}
                      </Label>
                    </div>
                  ))}
                </div>

                {selectedAmenities.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Selected amenities:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedAmenities.map((amenityId) => {
                        const amenity = amenityOptions.find((a) => a.id === amenityId)
                        return (
                          <Badge key={amenityId} variant="secondary">
                            {amenity?.label}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact & Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information & Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="(512) 555-0123"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="info@park.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://park.com"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Operating Hours</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {Object.entries(formData.hours).map(([day, hours]) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Label className="w-20 capitalize text-sm">{day}:</Label>
                        <Input
                          value={hours}
                          onChange={(e) => handleHoursChange(day, e.target.value)}
                          placeholder="6:00 AM - 10:00 PM"
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Photos (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="images">Upload Photos (Max 5)</Label>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Add photos to help other dog owners see what the park looks like.
                  </p>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-sm text-muted-foreground">{image.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Park
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthGuard>
  )
}
