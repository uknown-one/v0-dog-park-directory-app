import { AdminGuard } from "@/components/admin-guard"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-background">
        <AdminDashboard />
      </div>
    </AdminGuard>
  )
}
