import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, CreditCard, PiggyBank, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Paluwagan Management System
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            A digital platform for managing informal savings groups, handling payments, and tracking member
            contributions.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up">
          <Button asChild size="lg" className="transition-transform hover:scale-105">
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="transition-transform hover:scale-105">
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <Users className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <CardTitle className="mt-4">Member Management</CardTitle>
            <CardDescription>Easily manage members, track contributions, and handle member status.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create member profiles, verify documents, and monitor member activity all in one place.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
              Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CreditCard className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <CardTitle className="mt-4">Secure Payments</CardTitle>
            <CardDescription>Process payments securely through multiple payment gateways.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Support for GCash, Maya, and bank transfers with automated reconciliation and verification.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
              Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <PiggyBank className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <CardTitle className="mt-4">Group Management</CardTitle>
            <CardDescription>Create and manage multiple Paluwagan groups with ease.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Set up payment schedules, assign members, and track group progress with detailed reporting.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
              Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
