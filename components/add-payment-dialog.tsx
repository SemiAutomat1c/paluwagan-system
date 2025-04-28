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

export type Payment = {
  id: string
  memberId: string
  memberName: string
  group: string
  amount: number
  status: "completed" | "pending" | "failed"
  method: "gcash" | "maya" | "bank"
  date: string
  time: string
}

type AddPaymentDialogProps = {
  onAddPayment: (payment: Payment) => void
  className?: string
}

export function AddPaymentDialog({ onAddPayment, className }: AddPaymentDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Sample data for dropdowns
  const members = [
    { id: "M001", name: "Maria Santos" },
    { id: "M002", name: "Juan Dela Cruz" },
    { id: "M003", name: "Ana Reyes" },
    { id: "M004", name: "Carlos Mendoza" },
    { id: "M005", name: "Elena Gomez" },
  ]

  const groups = ["Weekly Savings", "Monthly Group", "Quarterly Fund", "Emergency Fund"]

  const [formData, setFormData] = useState({
    memberId: "",
    group: "",
    amount: "1000",
    method: "gcash",
    status: "completed",
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
    const id = `TR-${Math.floor(Math.random() * 10000)}`

    // Get current date and time
    const now = new Date()
    const date = now.toISOString().split("T")[0]
    const time = now.toTimeString().split(" ")[0]

    // Find member name from ID
    const memberName = members.find((m) => m.id === formData.memberId)?.name || "Unknown Member"

    // Create new payment object
    const newPayment: Payment = {
      id,
      memberId: formData.memberId,
      memberName,
      group: formData.group,
      amount: Number.parseInt(formData.amount),
      status: formData.status as "completed" | "pending" | "failed",
      method: formData.method as "gcash" | "maya" | "bank",
      date,
      time,
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onAddPayment(newPayment)
      setOpen(false)
      setFormData({
        memberId: "",
        group: "",
        amount: "1000",
        method: "gcash",
        status: "completed",
      })
      toast({
        title: "Payment recorded",
        description: `Payment of ₱${newPayment.amount.toLocaleString()} has been recorded successfully`,
      })
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>
          <Plus className="mr-2 h-4 w-4" /> Record Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Record New Payment</DialogTitle>
            <DialogDescription>Record a new payment transaction in the system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memberId" className="text-right">
                Member
              </Label>
              <Select value={formData.memberId} onValueChange={(value) => handleSelectChange("memberId", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="group" className="text-right">
                Group
              </Label>
              <Select value={formData.group} onValueChange={(value) => handleSelectChange("group", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select group" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
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
              <Label htmlFor="method" className="text-right">
                Method
              </Label>
              <Select value={formData.method} onValueChange={(value) => handleSelectChange("method", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gcash">GCash</SelectItem>
                  <SelectItem value="maya">Maya</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Recording..." : "Record Payment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
