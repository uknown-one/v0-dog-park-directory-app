"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import Link from "next/link"

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      fallback || (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <Card className="max-w-md w-full">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-6">🔒</div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Authentication Required</h1>
              <p className="text-muted-foreground mb-6">You need to sign in to access this page.</p>
              <Button asChild>
                <Link href="/auth/signin">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  return <>{children}</>
}
