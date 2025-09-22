export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="h-6 bg-muted animate-pulse rounded mb-6 w-64" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-32 bg-card animate-pulse rounded-lg" />
            <div className="h-96 bg-card animate-pulse rounded-lg" />
            <div className="h-64 bg-card animate-pulse rounded-lg" />
            <div className="h-96 bg-card animate-pulse rounded-lg" />
          </div>

          <div className="space-y-6">
            <div className="h-80 bg-card animate-pulse rounded-lg" />
            <div className="h-96 bg-card animate-pulse rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
