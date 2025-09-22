import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Search, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-6">🐕</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Park Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn't find the dog park you're looking for. It may have been removed or the link might be
            incorrect.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/parks">
                <Search className="h-4 w-4 mr-2" />
                Browse Parks
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
