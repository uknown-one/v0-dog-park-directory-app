import { AuthGuard } from "@/components/auth-guard"
import { AddParkForm } from "@/components/add-park-form"

export default function AddParkPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <div className="border-b bg-card">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Add a Dog Park</h1>
            <p className="text-muted-foreground">
              Help other dog owners discover great parks by adding one to our directory.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          <AddParkForm />
        </div>
      </div>
    </AuthGuard>
  )
}
