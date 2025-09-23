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
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        if (!apiKey) {
          setError(
            "Google Maps API key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.",
          )
          return
        }

        // Check if Google Maps is already loaded
        if (window.google && window.google.maps) {
          await initializeMap()
          return
        }

        // Load Google Maps script
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker`
        script.async = true
        script.defer = true

        script.onload = async () => {
          await initializeMap()
        }

        script.onerror = () => {
          setError("Failed to load Google Maps")
        }

        document.head.appendChild(script)
      } catch (err) {
        setError("Error loading Google Maps")
      }
    }

    const initializeMap = async () => {
      if (!mapRef.current || !window.google) return

      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapId: "dog-park-map", // Required for AdvancedMarkerElement
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        })

        const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary("marker")

        // Add markers using the new AdvancedMarkerElement
        markers.forEach((marker) => {
          const pinElement = new PinElement({
            glyph: "🐕",
            scale: 1.2,
            background: "#10b981",
            borderColor: "#059669",
          })

          const advancedMarker = new AdvancedMarkerElement({
            map,
            position: marker.position,
            title: marker.title,
            content: pinElement.element,
          })

          if (marker.onClick) {
            advancedMarker.addListener("click", marker.onClick)
          }
        })

        setIsLoaded(true)
      } catch (err) {
        console.error("Error initializing map:", err)
        setError("Error initializing map")
      }
    }

    loadGoogleMaps()
  }, [center, zoom, markers])

  if (error) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-2">Unable to load map</p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
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
