"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { MapPin, Upload, Loader2 } from "lucide-react"
import { toast } from "sonner"

const addParkSchema = z.object({
  name: z.string().min(1, "Park name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Valid zip code is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  amenities: z.array(z.string()).min(1, "Select at least one amenity"),
  hours: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
})

type AddParkForm = z.infer<typeof addParkSchema>

const availableAmenities = [
  "Fenced Area",
  "Off-Leash Area",
  "Water Station",
  "Waste Bags",
  "Separate Small Dog Area",
  "Agility Equipment",
  "Shade/Shelter",
  "Parking Available",
  "Restrooms",
  "Benches",
  "Lighting",
  "Double-Gated Entry",
]

export function AddParkForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const form = useForm<AddParkForm>({
    resolver: zodResolver(addParkSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      description: "",
      amenities: [],
      hours: "",
      phone: "",
      website: "",
    },
  })

  const onSubmit = async (data: AddParkForm) => {
    try {
      setIsSubmitting(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Park submitted successfully! It will be reviewed by our team.")
      router.push("/parks")
    } catch (error) {
      toast.error("Failed to submit park. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const updatedAmenities = checked ? [...selectedAmenities, amenity] : selectedAmenities.filter((a) => a !== amenity)

    setSelectedAmenities(updatedAmenities)
    form.setValue("amenities", updatedAmenities)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Park Name *</Label>
            <Input id="name" {...form.register("name")} placeholder="e.g., Central Bark Dog Park" />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input id="address" {...form.register("address")} placeholder="123 Main Street" />
              {form.formState.errors.address && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.address.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="city">City *</Label>
              <Input id="city" {...form.register("city")} placeholder="Austin" />
              {form.formState.errors.city && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="state">State *</Label>
              <Input id="state" {...form.register("state")} placeholder="TX" />
              {form.formState.errors.state && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.state.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="zipCode">Zip Code *</Label>
              <Input id="zipCode" {...form.register("zipCode")} placeholder="78701" />
              {form.formState.errors.zipCode && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.zipCode.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="Describe the park, its features, and what makes it special..."
              rows={4}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.description.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Amenities *</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {availableAmenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <Label htmlFor={amenity} className="text-sm">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
          {form.formState.errors.amenities && (
            <p className="text-sm text-destructive mt-2">{form.formState.errors.amenities.message}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="hours">Hours of Operation</Label>
            <Input id="hours" {...form.register("hours")} placeholder="e.g., 6:00 AM - 10:00 PM daily" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" {...form.register("phone")} placeholder="(555) 123-4567" />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" {...form.register("website")} placeholder="https://example.com" />
              {form.formState.errors.website && (
                <p className="text-sm text-destructive mt-1">{form.formState.errors.website.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Photos (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">Upload photos of the park</p>
            <p className="text-sm text-muted-foreground">Drag and drop files here, or click to select files</p>
            <Button type="button" variant="outline" className="mt-4 bg-transparent">
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Park"
          )}
        </Button>
      </div>
    </form>
  )
}
