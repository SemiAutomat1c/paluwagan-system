"use client"

import { useState } from "react"
import { Check, ChevronDown, Download, Filter, MoreHorizontal, Search } from "lucide-react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AddMemberDialog, type Member } from "@/components/add-member-dialog"

// Sample member data
const initialMembers = [
  {
    id: "M001",
    name: "Maria Santos",
    email: "maria@example.com",
    phone: "+63 912 345 6789",
    status: "active",
    groups: ["Weekly Savings", "Emergency Fund"],
    joinDate: "2023-01-15",
  },
  {
    id: "M002",
    name: "Juan Dela Cruz",
    email: "juan@example.com",
    phone: "+63 917 123 4567",
    status: "active",
    groups: ["Monthly Group"],
    joinDate: "2023-02-10",
  },
  {
    id: "M003",
    name: "Ana Reyes",
    email: "ana@example.com",
    phone: "+63 918 765 4321",
    status: "active",
    groups: ["Weekly Savings"],
    joinDate: "2023-02-15",
  },
  {
    id: "M004",
    name: "Carlos Mendoza",
    email: "carlos@example.com",
    phone: "+63 919 876 5432",
    status: "inactive",
    groups: ["Monthly Group"],
    joinDate: "2023-03-01",
  },
  {
    id: "M005",
    name: "Elena Gomez",
    email: "elena@example.com",
    phone: "+63 920 987 6543",
    status: "active",
    groups: ["Weekly Savings", "Quarterly Fund"],
    joinDate: "2023-03-10",
  },
  {
    id: "M006",
    name: "Roberto Lim",
    email: "roberto@example.com",
    phone: "+63 921 098 7654",
    status: "pending",
    groups: [],
    joinDate: "2023-04-05",
  },
  {
    id: "M007",
    name: "Sofia Garcia",
    email: "sofia@example.com",
    phone: "+63 922 109 8765",
    status: "active",
    groups: ["Emergency Fund"],
    joinDate: "2023-04-12",
  },
] as Member[]

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [members, setMembers] = useState<Member[]>(initialMembers)

  const handleAddMember = (newMember: Member) => {
    setMembers((prevMembers) => [...prevMembers, newMember])
  }

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Members</h2>
        <div className="flex items-center gap-2">
          <AddMemberDialog onAddMember={handleAddMember} />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Member Management</CardTitle>
          <CardDescription>Manage all members in the Paluwagan system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search members..."
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
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4" /> Active
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4 opacity-0" /> Inactive
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4 opacity-0" /> Pending
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Filter by Group</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4" /> Weekly Savings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4 opacity-0" /> Monthly Group
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4 opacity-0" /> Quarterly Fund
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4 opacity-0" /> Emergency Fund
                    </DropdownMenuItem>
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
                    <TableHead>Member ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Groups</TableHead>
                    <TableHead className="hidden lg:table-cell">Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{member.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{member.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{member.phone}</TableCell>
                      <TableCell>
                        {member.status === "active" && (
                          <Badge
                            variant="outline"
                            className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
                          >
                            Active
                          </Badge>
                        )}
                        {member.status === "inactive" && (
                          <Badge
                            variant="outline"
                            className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          >
                            Inactive
                          </Badge>
                        )}
                        {member.status === "pending" && (
                          <Badge
                            variant="outline"
                            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          >
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {member.groups.length > 0 ? (
                            member.groups.map((group, index) => (
                              <Badge key={index} variant="secondary" className="whitespace-nowrap">
                                {group}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-sm">None</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{member.joinDate}</TableCell>
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
                            <DropdownMenuItem>Edit Member</DropdownMenuItem>
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
