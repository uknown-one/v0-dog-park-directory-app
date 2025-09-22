import { AuthGuard } from "@/components/auth-guard"
import { FavoriteParks } from "@/components/favorite-parks"

export default function FavoritesPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <FavoriteParks />
        </div>
      </div>
    </AuthGuard>
  )
}
