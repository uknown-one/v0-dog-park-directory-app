import { AuthGuard } from "@/components/auth-guard"
import { UserProfile } from "@/components/user-profile"

export default function ProfilePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <UserProfile />
        </div>
      </div>
    </AuthGuard>
  )
}
