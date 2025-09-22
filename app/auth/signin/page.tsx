"use client"

import { useState, useEffect } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Chrome, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const errorParam = searchParams.get("error")

  useEffect(() => {
    if (errorParam) {
      setError("Authentication failed. Please try again.")
    }
  }, [errorParam])

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push(callbackUrl)
      }
    })
  }, [router, callbackUrl])

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await signIn("google", {
        callbackUrl,
        redirect: false,
      })

      if (result?.error) {
        setError("Failed to sign in with Google. Please try again.")
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to PawParks
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to save your favorite parks, write reviews, and connect with the dog community.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Sign In to Your Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleGoogleSignIn} disabled={isLoading} className="w-full" size="lg">
              <Chrome className="h-5 w-5 mr-2" />
              {isLoading ? "Signing in..." : "Continue with Google"}
            </Button>

            <Separator />

            <div className="text-center text-sm text-muted-foreground">
              <p>
                By signing in, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            New to PawParks? <span className="text-primary">Sign in with Google to get started!</span>
          </p>
        </div>
      </div>
    </div>
  )
}
