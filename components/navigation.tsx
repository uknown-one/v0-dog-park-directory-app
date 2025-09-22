"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Heart, Plus, User, Settings, LogOut, Shield, Home, MapPin, Map } from "lucide-react"

export function Navigation() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/parks", label: "Find Parks", icon: MapPin },
    { href: "/map", label: "Map View", icon: Map },
    { href: "/parks/add", label: "Add Park", icon: Plus },
  ]

  const userMenuItems = [
    { href: "/profile", label: "Profile", icon: User },
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-primary">PawParks</div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "loading" ? (
              <div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {session.user?.name && <p className="font-medium">{session.user.name}</p>}
                      {session.user?.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user.email}</p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {userMenuItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  {session && (
                    <div className="flex items-center space-x-3 pb-4 border-b">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                        <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{session.user?.name}</p>
                        <p className="text-sm text-muted-foreground">{session.user?.email}</p>
                      </div>
                    </div>
                  )}

                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 text-sm font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}

                  {session ? (
                    <>
                      <div className="border-t pt-4">
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center space-x-3 text-sm font-medium py-2"
                            onClick={() => setIsOpen(false)}
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t pt-4">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            handleSignOut()
                            setIsOpen(false)
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign out
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="border-t pt-4">
                      <Button asChild className="w-full">
                        <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
