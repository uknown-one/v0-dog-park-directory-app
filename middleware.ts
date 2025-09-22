import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect admin routes
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "admin" || false
        }

        // Protect user routes
        if (
          req.nextUrl.pathname.startsWith("/profile") ||
          req.nextUrl.pathname.startsWith("/favorites") ||
          req.nextUrl.pathname.startsWith("/parks/add")
        ) {
          return !!token
        }

        return true
      },
    },
  },
)

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/favorites/:path*", "/parks/add/:path*"],
}
