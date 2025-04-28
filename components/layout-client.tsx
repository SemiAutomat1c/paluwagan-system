"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"

interface LayoutClientProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: LayoutClientProps) {
  const pathname = usePathname()
  const isAuthPage = pathname === "/auth/login" || pathname === "/auth/register"
  const isHomePage = pathname === "/"

  if (isAuthPage || isHomePage) {
    return <>{children}</>
  }

  return (
    <div className="relative min-h-screen">
      {/* Mobile Navigation */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 border-b bg-background md:hidden">
        <h1 className="text-xl font-bold">Paluwagan</h1>
        <MobileNav />
      </div>

      <div className="flex h-[calc(100vh-4rem)] md:h-screen">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
          <AppSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 md:pl-72">
          <div className="h-full p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 