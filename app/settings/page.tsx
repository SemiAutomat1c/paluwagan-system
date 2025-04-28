"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Cookies from "js-cookie"

interface UserProfile {
  id: number
  name: string
  email: string
}

export default function SettingsPage() {
  const userDataString = Cookies.get("auth-token")
  const userData: UserProfile | null = userDataString ? JSON.parse(userDataString) : null
  
  const [profile, setProfile] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
  })
  
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    darkMode: false,
  })
  
  const [isLoading, setIsLoading] = useState(false)

  // Initialize dark mode preference from document after mount
  useEffect(() => {
    setPreferences(prev => ({
      ...prev,
      darkMode: document.documentElement.classList.contains("dark"),
    }))
  }, [])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update the stored user data
      const updatedUserData = {
        ...userData,
        ...profile,
      }
      Cookies.set("auth-token", JSON.stringify(updatedUserData))
      
      toast.success("Profile updated successfully!")
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleDarkMode = (checked: boolean) => {
    setPreferences(prev => ({ ...prev, darkMode: checked }))
    document.documentElement.classList.toggle("dark", checked)
  }

  const toggleEmailNotifications = (checked: boolean) => {
    setPreferences(prev => ({ ...prev, emailNotifications: checked }))
    toast.success(`Email notifications ${checked ? "enabled" : "disabled"}`)
  }

  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-[600px]">
          <CardHeader>
            <CardTitle className="text-center text-red-500">Access Denied</CardTitle>
            <CardDescription className="text-center">
              Please log in to access settings
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Manage your profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Customize your application experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle dark mode theme
                </p>
              </div>
              <Switch
                checked={preferences.darkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email updates about your account
                </p>
              </div>
              <Switch
                checked={preferences.emailNotifications}
                onCheckedChange={toggleEmailNotifications}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 