import { Suspense } from "react"
import { SearchFilters } from "@/components/search-filters"
import { ParkGrid } from "@/components/park-grid"
import { ParkMap } from "@/components/park-map"

interface ParksPageProps {
  searchParams: {
    location?: string
    amenities?: string
    sortBy?: string
    view?: "grid" | "map"
  }
}

export default function ParksPage({ searchParams }: ParksPageProps) {
  const { location, amenities, sortBy = "rating", view = "grid" } = searchParams

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dog Parks Directory</h1>
          <p className="text-muted-foreground">
            {location ? `Parks in ${location}` : "Discover amazing dog parks near you"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-80 flex-shrink-0">
            <Suspense fallback={<div className="h-96 bg-card animate-pulse rounded-lg" />}>
              <SearchFilters
                initialLocation={location}
                initialAmenities={amenities?.split(",") || []}
                initialSortBy={sortBy}
              />
            </Suspense>
          </aside>

          <main className="flex-1">
            {view === "map" ? (
              <Suspense fallback={<div className="h-96 bg-card animate-pulse rounded-lg" />}>
                <ParkMap />
              </Suspense>
            ) : (
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="h-80 bg-card animate-pulse rounded-lg" />
                    ))}
                  </div>
                }
              >
                <ParkGrid location={location} amenities={amenities?.split(",") || []} sortBy={sortBy} />
              </Suspense>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
