import { Suspense } from "react"
import { SearchBar } from "@/components/search-bar"
import { FeaturedParks } from "@/components/featured-parks"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Find the Perfect Park for Your Pup</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Search thousands of dog parks, read reviews from fellow dog owners, and discover new places to play.
          </p>
        </div>

        <Suspense fallback={<div className="h-16 bg-muted animate-pulse rounded-lg" />}>
          <SearchBar />
        </Suspense>
      </section>

      <StatsSection />

      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Featured Dog Parks</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Discover highly-rated parks loved by the community
            </p>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-card animate-pulse rounded-xl" />
                ))}
              </div>
            }
          >
            <FeaturedParks />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
