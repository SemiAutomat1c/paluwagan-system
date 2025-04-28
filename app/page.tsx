import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="font-bold text-xl">
              Paluwagan
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Register</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12 md:py-24 lg:py-32">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
            Paluwagan Management System
          </h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mb-8">
            A digital platform for managing informal savings groups, handling payments, and tracking member contributions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg">Sign In</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Member Management</CardTitle>
              <CardDescription>Easily manage members and track contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Create member profiles, verify documents, and monitor member activity all in one place.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secure Payments</CardTitle>
              <CardDescription>Process payments through multiple gateways</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Support for GCash, Maya, and bank transfers with automated reconciliation and verification.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Group Management</CardTitle>
              <CardDescription>Create and manage multiple groups</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Set up payment schedules, assign members, and track group progress with detailed reporting.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container flex flex-col sm:flex-row items-center justify-between py-8 space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 Paluwagan Management System. All rights reserved.
          </p>
          <nav className="flex items-center space-x-4">
            <Link href="/auth/login" className="text-sm text-muted-foreground hover:underline">
              Login
            </Link>
            <Link href="/auth/register" className="text-sm text-muted-foreground hover:underline">
              Register
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
