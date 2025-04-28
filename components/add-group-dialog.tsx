"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Plus } from "lucide-react"

export type Group = {
  id: string
  name: string
  description: string
  members: number
  maxMembers: number
  status: "active" | "recruiting" | "pending" | "completed"
  frequency: "weekly" | "monthly" | "quarterly" | "annual"
  amount: number
  startDate: string
  endDate: string
  progress: number
}

type AddGroupDialogProps = {
  onAddGroup: (group: Group) => void
  className?: string
}

export function AddGroupDialog({ onAddGroup, className }: AddGroupDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    maxMembers: "10",
    status: "recruiting",
    frequency: "monthly",
    amount: "1000",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Generate a random ID
    const id = `G${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`

    // Calculate end date based on frequency
    const startDate = new Date().toISOString().split("T")[0]
    const endDate = new Date()

    switch (formData.frequency) {
      case "weekly":
        endDate.setDate(endDate.getDate() + 7 * Number.parseInt(formData.maxMembers))
        break
      case "monthly":
        endDate.setMonth(endDate.getMonth() + Number.parseInt(formData.maxMembers))
        break
      case "quarterly":
        endDate.setMonth(endDate.getMonth() + 3 * Number.parseInt(formData.maxMembers))
        break
      case "annual":
        endDate.setFullYear(endDate.getFullYear() + Number.parseInt(formData.maxMembers))
        break
    }

    // Create new group object
    const newGroup: Group = {
      id,
      name: formData.name,
      description: formData.description,
      members: 0,
      maxMembers: Number.parseInt(formData.maxMembers),
      status: formData.status as "active" | "recruiting" | "pending" | "completed",
      frequency: formData.frequency as "weekly" | "monthly" | "quarterly" | "annual",
      amount: Number.parseInt(formData.amount),
      startDate,
      endDate: endDate.toISOString().split("T")[0],
      progress: 0,
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onAddGroup(newGroup)
      setOpen(false)
      setFormData({
        name: "",
        description: "",
        maxMembers: "10",
        status: "recruiting",
        frequency: "monthly",
        amount: "1000",
      })
      toast({
        title: "Group created",
        description: `${newGroup.name} has been created successfully`,
      })
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>
          <Plus className="mr-2 h-4 w-4" /> Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogDescription>Create a new Paluwagan group in the system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Frequency
              </Label>
              <Select value={formData.frequency} onValueChange={(value) => handleSelectChange("frequency", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (₱)
              </Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxMembers" className="text-right">
                Max Members
              </Label>
              <Input
                id="maxMembers"
                type="number"
                value={formData.maxMembers}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recruiting">Recruiting</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
