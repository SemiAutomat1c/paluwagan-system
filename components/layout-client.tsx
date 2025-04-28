"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"

interface LayoutClientProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: LayoutClientProps) {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith("/auth")
  const isHomePage = pathname === "/"

  // Don't show sidebar on auth pages or home page
  const showSidebar = !isAuthPage && !isHomePage

  return (
    <div className="flex h-screen">
      {showSidebar && (
        <div className="hidden md:flex w-72 flex-col fixed inset-y-0">
          <AppSidebar />
        </div>
      )}
      <main className={`flex-1 overflow-y-auto bg-background ${showSidebar ? 'md:pl-72' : ''}`}>
        {children}
      </main>
    </div>
  )
} 