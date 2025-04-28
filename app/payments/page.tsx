"use client"

import { useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  ChevronDown,
  CreditCard,
  Download,
  Filter,
  MoreHorizontal,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AddPaymentDialog, type Payment } from "@/components/add-payment-dialog"

// Sample payment data
const initialPayments = [
  {
    id: "TR-7829",
    memberId: "M001",
    memberName: "Maria Santos",
    group: "Weekly Savings",
    amount: 1500,
    status: "completed",
    method: "gcash",
    date: "2023-04-23",
    time: "14:30:45",
  },
  {
    id: "TR-7828",
    memberId: "M002",
    memberName: "Juan Dela Cruz",
    group: "Monthly Group",
    amount: 5000,
    status: "completed",
    method: "bank",
    date: "2023-04-22",
    time: "10:15:22",
  },
  {
    id: "TR-7827",
    memberId: "M003",
    memberName: "Ana Reyes",
    group: "Weekly Savings",
    amount: 1500,
    status: "pending",
    method: "maya",
    date: "2023-04-22",
    time: "09:45:11",
  },
  {
    id: "TR-7826",
    memberId: "M004",
    memberName: "Carlos Mendoza",
    group: "Monthly Group",
    amount: 5000,
    status: "failed",
    method: "gcash",
    date: "2023-04-21",
    time: "16:20:33",
  },
  {
    id: "TR-7825",
    memberId: "M005",
    memberName: "Elena Gomez",
    group: "Weekly Savings",
    amount: 1500,
    status: "completed",
    method: "maya",
    date: "2023-04-21",
    time: "11:05:17",
  },
  {
    id: "TR-7824",
    memberId: "M007",
    memberName: "Sofia Garcia",
    group: "Emergency Fund",
    amount: 2000,
    status: "completed",
    method: "bank",
    date: "2023-04-20",
    time: "14:55:42",
  },
  {
    id: "TR-7823",
    memberId: "M001",
    memberName: "Maria Santos",
    group: "Emergency Fund",
    amount: 2000,
    status: "completed",
    method: "gcash",
    date: "2023-04-20",
    time: "09:30:28",
  },
] as Payment[]

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [payments, setPayments] = useState<Payment[]>(initialPayments)

  const handleAddPayment = (newPayment: Payment) => {
    setPayments((prevPayments) => [newPayment, ...prevPayments])
  }

  const filteredPayments = payments.filter(
    (payment) =>
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.group.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate totals
  const totalCompleted = payments
    .filter((p) => p.status === "completed")
    .reduce((acc, payment) => acc + payment.amount, 0)

  const totalPending = payments.filter((p) => p.status === "pending").reduce((acc, payment) => acc + payment.amount, 0)

  const totalFailed = payments.filter((p) => p.status === "failed").reduce((acc, payment) => acc + payment.amount, 0)

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
        <div className="flex items-center gap-2">
          <AddPaymentDialog onAddPayment={handleAddPayment} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.length}</div>
            <p className="text-xs text-muted-foreground">In the last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Payments</CardTitle>
            <ArrowUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalCompleted.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {payments.filter((p) => p.status === "completed").length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {payments.filter((p) => p.status === "pending").length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
            <ArrowDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalFailed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {payments.filter((p) => p.status === "failed").length} transactions
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>View and manage all payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" /> Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                    <DropdownMenuItem>Failed</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Filter by Method</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>GCash</DropdownMenuItem>
                    <DropdownMenuItem>Maya</DropdownMenuItem>
                    <DropdownMenuItem>Bank Transfer</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead className="hidden md:table-cell">Group</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Method</TableHead>
                    <TableHead className="hidden lg:table-cell">Date & Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={payment.memberName} />
                            <AvatarFallback>{payment.memberName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm">{payment.memberName}</span>
                            <span className="text-xs text-muted-foreground">{payment.memberId}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{payment.group}</TableCell>
                      <TableCell>₱{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        {payment.status === "completed" && (
                          <Badge
                            variant="outline"
                            className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
                          >
                            Completed
                          </Badge>
                        )}
                        {payment.status === "pending" && (
                          <Badge
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          >
                            Pending
                          </Badge>
                        )}
                        {payment.status === "failed" && (
                          <Badge
                            variant="outline"
                            className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          >
                            Failed
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {payment.method === "gcash" && "GCash"}
                        {payment.method === "maya" && "Maya"}
                        {payment.method === "bank" && "Bank Transfer"}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-col">
                          <span className="text-sm">{payment.date}</span>
                          <span className="text-xs text-muted-foreground">{payment.time}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>View Receipt</DropdownMenuItem>
                            {payment.status === "pending" && (
                              <>
                                <DropdownMenuItem>Approve</DropdownMenuItem>
                                <DropdownMenuItem>Reject</DropdownMenuItem>
                              </>
                            )}
                            {payment.status === "failed" && <DropdownMenuItem>Retry</DropdownMenuItem>}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
