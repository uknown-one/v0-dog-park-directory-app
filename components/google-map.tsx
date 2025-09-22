"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

interface GoogleMapProps {
  center: {
    lat: number
    lng: number
  }
  zoom?: number
  markers?: Array<{
    position: { lat: number; lng: number }
    title: string
    info?: string
  }>
  className?: string
}

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export function GoogleMap({ center, zoom = 15, markers = [], className = "" }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initializeMap()
      return
    }

    // Load Google Maps script
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.defer = true

    script.onload = () => {
      setIsLoaded(true)
      initializeMap()
    }

    script.onerror = () => {
      setError("Failed to load Google Maps")
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup script if component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#a8e6a3" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#2d5a2d" }],
          },
        ],
      })

      // Add markers
      markers.forEach((marker) => {
        const mapMarker = new window.google.maps.Marker({
          position: marker.position,
          map,
          title: marker.title,
          icon: {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2C11.6 2 8 5.6 8 10C8 16 16 30 16 30S24 16 24 10C24 5.6 20.4 2 16 2Z" fill="#f59e0b"/>
                <circle cx="16" cy="10" r="4" fill="white"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 32),
          },
        })

        if (marker.info) {
          const infoWindow = new window.google.maps.InfoWindow({
            content: `<div class="p-2"><strong>${marker.title}</strong><br/>${marker.info}</div>`,
          })

          mapMarker.addListener("click", () => {
            infoWindow.open(map, mapMarker)
          })
        }
      })
    } catch (err) {
      setError("Failed to initialize map")
      console.error("Google Maps initialization error:", err)
    }
  }

  if (error) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center text-muted-foreground">
          <p>Unable to load map</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </Card>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}
