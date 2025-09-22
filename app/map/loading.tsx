import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function MapLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="h-8 bg-muted animate-pulse rounded mb-2 w-48"></div>
          <div className="h-4 bg-muted animate-pulse rounded w-96"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="h-6 bg-muted animate-pulse rounded w-32"></div>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-muted animate-pulse rounded"></div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="h-6 bg-muted animate-pulse rounded w-32"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border rounded-lg space-y-2">
                    <div className="h-5 bg-muted animate-pulse rounded w-3/4"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-full"></div>
                    <div className="flex space-x-2">
                      <div className="h-5 bg-muted animate-pulse rounded w-16"></div>
                      <div className="h-5 bg-muted animate-pulse rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
