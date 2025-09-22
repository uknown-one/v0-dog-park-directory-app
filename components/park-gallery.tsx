"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"

interface ParkGalleryProps {
  images: string[]
  parkName: string
}

export function ParkGallery({ images, parkName }: ParkGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length === 0) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="text-6xl mb-4">📷</div>
          <p>No photos available</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Photos</h2>
        <Button variant="outline" size="sm">
          <Expand className="h-4 w-4 mr-1" />
          View All ({images.length})
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="relative h-96 group">
          <Image
            src={images[currentImage] || "/placeholder.svg"}
            alt={`${parkName} - Photo ${currentImage + 1}`}
            fill
            className="object-cover"
          />

          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="secondary"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImage ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Card>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(0, 4).map((image, index) => (
            <Card
              key={index}
              className={`overflow-hidden cursor-pointer transition-opacity ${
                index === currentImage ? "ring-2 ring-primary" : "hover:opacity-80"
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <div className="relative h-20">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${parkName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
