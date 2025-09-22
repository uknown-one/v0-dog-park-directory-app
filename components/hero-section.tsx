import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/happy-dogs-playing-in-a-park-with-trees.jpg')] bg-cover bg-center opacity-10" />

      <div className="relative max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            <span className="text-primary">Paw</span>Parks
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Discover amazing dog parks near you. Connect with fellow dog owners, read reviews, and find the perfect
            place for your furry friend to play.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/parks">Explore Parks</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
            <Link href="/parks/add">Add a Park</Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">1000+</div>
            <div className="text-sm text-muted-foreground">Dog Parks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">50k+</div>
            <div className="text-sm text-muted-foreground">Happy Dogs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">25k+</div>
            <div className="text-sm text-muted-foreground">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Cities</div>
          </div>
        </div>
      </div>
    </section>
  )
}
