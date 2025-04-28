"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ModeToggle } from "@/components/mode-toggle"
import { toast } from "sonner"
import Cookies from "js-cookie"
import {
  BarChart,
  Users,
  CreditCard,
  PiggyBank,
  Settings,
  LogOut,
  X,
} from "lucide-react"

interface AppSidebarProps {
  isMobile?: boolean
  onClose?: () => void
}

const routes = [
  {
    label: "Dashboard",
    icon: BarChart,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Members",
    icon: Users,
    href: "/members",
    color: "text-violet-500",
  },
  {
    label: "Groups",
    icon: PiggyBank,
    href: "/groups",
    color: "text-pink-700",
  },
  {
    label: "Payments",
    icon: CreditCard,
    href: "/payments",
    color: "text-orange-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function AppSidebar({ isMobile, onClose }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Remove the auth cookie
      Cookies.remove("auth-token")
      toast.success("Logged out successfully")
      router.push("/")
    } catch (error) {
      toast.error("Failed to logout. Please try again.")
    }
  }

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-sidebar-background text-sidebar-foreground">
      <div className="px-3 py-2 flex-1">
        <div className="flex items-center justify-between pl-3 mb-14">
          <Link href="/dashboard" className="flex items-center">
            <h1 className="text-2xl font-bold">
              Paluwagan
            </h1>
          </Link>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          )}
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={isMobile ? onClose : undefined}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-sidebar-accent rounded-lg transition",
                  pathname === route.href ? "bg-sidebar-accent" : "transparent",
                  route.color
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3")} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="px-3 py-2">
        <div className="flex items-center justify-between mb-4 px-4">
          <p className="text-sm">Theme</p>
          <ModeToggle />
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/10" 
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
