import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has("auth-token") // Replace with your actual auth check
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")
  const isHomePage = request.nextUrl.pathname === "/"

  // Allow access to home page without authentication
  if (isHomePage) {
    return NextResponse.next()
  }

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If the user is authenticated and trying to access auth pages (login/register)
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
} 