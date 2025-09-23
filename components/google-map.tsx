"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"

interface GoogleMapProps {
  center: {
    lat: number
    lng: number
  }
  zoom?: number
  markers?: Array<{
    id: string
    position: {
      lat: number
      lng: number
    }
    title: string
    onClick?: () => void
  }>
  className?: string
}

export function GoogleMap({ center, zoom = 13, markers = [], className = "" }: GoogleMapProps) {
const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
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
          initializeMap()
        }

        script.onerror = () => {
          setError("Failed to load Google Maps")
        }

        document.head.appendChild(script)
      } catch (err) {
        setError("Error loading Google Maps")
      }
    }

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return

      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
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
            url: "/dog-paw-marker.jpg",
            scaledSize: new window.google.maps.Size(32, 32),
          },
        })

        if (marker.onClick) {
          mapMarker.addListener("click", marker.onClick)
        }
      })

      setIsLoaded(true)
    }

    loadGoogleMaps()
  }, [center, zoom, markers])

  if (error) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center p-8 ${className}`}>
        <p className="text-muted-foreground">Unable to load map</p>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted rounded-lg flex items-center justify-center z-10">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    google: any
  }
}
