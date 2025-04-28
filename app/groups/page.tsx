"use client"

import { useState } from "react"
import { Calendar, ChevronDown, Download, Filter, MoreHorizontal, PiggyBank, Search, Users } from "lucide-react"

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
import { Progress } from "@/components/ui/progress"
import { AddGroupDialog, type Group } from "@/components/add-group-dialog"

// Sample group data
const initialGroups = [
  {
    id: "G001",
    name: "Weekly Savings",
    description: "Weekly contribution of ₱1,500",
    members: 24,
    maxMembers: 30,
    status: "active",
    frequency: "weekly",
    amount: 1500,
    startDate: "2023-01-15",
    endDate: "2023-07-15",
    progress: 65,
  },
  {
    id: "G002",
    name: "Monthly Group",
    description: "Monthly contribution of ₱5,000",
    members: 12,
    maxMembers: 15,
    status: "active",
    frequency: "monthly",
    amount: 5000,
    startDate: "2023-02-01",
    endDate: "2024-02-01",
    progress: 30,
  },
  {
    id: "G003",
    name: "Quarterly Fund",
    description: "Quarterly contribution of ₱15,000",
    members: 8,
    maxMembers: 10,
    status: "active",
    frequency: "quarterly",
    amount: 15000,
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    progress: 25,
  },
  {
    id: "G004",
    name: "Annual Savings",
    description: "Annual contribution of ₱50,000",
    members: 5,
    maxMembers: 20,
    status: "recruiting",
    frequency: "annual",
    amount: 50000,
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    progress: 0,
  },
  {
    id: "G005",
    name: "Emergency Fund",
    description: "Monthly contribution of ₱2,000",
    members: 15,
    maxMembers: 15,
    status: "active",
    frequency: "monthly",
    amount: 2000,
    startDate: "2023-03-01",
    endDate: "2023-09-01",
    progress: 50,
  },
  {
    id: "G006",
    name: "Business Capital",
    description: "Monthly contribution of ₱10,000",
    members: 0,
    maxMembers: 10,
    status: "pending",
    frequency: "monthly",
    amount: 10000,
    startDate: "",
    endDate: "",
    progress: 0,
  },
] as Group[]

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [groups, setGroups] = useState<Group[]>(initialGroups)

  const handleAddGroup = (newGroup: Group) => {
    setGroups((prevGroups) => [...prevGroups, newGroup])
  }

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Groups</h2>
        <div className="flex items-center gap-2">
          <AddGroupDialog onAddGroup={handleAddGroup} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Groups</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groups.length}</div>
            <p className="text-xs text-muted-foreground">
              {groups.filter((g) => g.status === "active").length} active groups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groups.reduce((acc, group) => acc + group.members, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all groups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Collections</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₱
              {groups
                .filter((g) => g.status === "active" && g.frequency === "weekly")
                .reduce((acc, group) => acc + group.amount * group.members, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Expected weekly collection</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Collections</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₱
              {groups
                .filter((g) => g.status === "active" && g.frequency === "monthly")
                .reduce((acc, group) => acc + group.amount * group.members, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Expected monthly collection</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Group Management</CardTitle>
          <CardDescription>Manage all Paluwagan groups in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search groups..."
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
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Recruiting</DropdownMenuItem>
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Filter by Frequency</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Weekly</DropdownMenuItem>
                    <DropdownMenuItem>Monthly</DropdownMenuItem>
                    <DropdownMenuItem>Quarterly</DropdownMenuItem>
                    <DropdownMenuItem>Annual</DropdownMenuItem>
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
                    <TableHead>Group ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Amount</TableHead>
                    <TableHead className="hidden lg:table-cell">Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGroups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">{group.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <PiggyBank className="h-4 w-4 text-primary" />
                          <span>{group.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{group.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {group.members}/{group.maxMembers}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {group.status === "active" && (
                          <Badge
                            variant="outline"
                            className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
                          >
                            Active
                          </Badge>
                        )}
                        {group.status === "recruiting" && (
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          >
                            Recruiting
                          </Badge>
                        )}
                        {group.status === "pending" && (
                          <Badge
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          >
                            Pending
                          </Badge>
                        )}
                        {group.status === "completed" && (
                          <Badge
                            variant="outline"
                            className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                          >
                            Completed
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">₱{group.amount.toLocaleString()}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <Progress value={group.progress} className="h-2 w-[60px]" />
                          <span className="text-xs text-muted-foreground">{group.progress}%</span>
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
                            <DropdownMenuItem>Edit Group</DropdownMenuItem>
                            <DropdownMenuItem>Manage Members</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
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
