"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Filter,
  Download,
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [userDialogOpen, setUserDialogOpen] = useState(true);
  const [itemDialogOpen, setItemDialogOpen] = useState(true);

  // Mock data for users
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      subscription: "Free",
      plants: 2,
      joinDate: "2023-05-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      subscription: "Monthly",
      plants: 8,
      joinDate: "2023-06-22",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      subscription: "Annual",
      plants: 15,
      joinDate: "2023-04-10",
    },
    {
      id: 4,
      name: "Maria Garcia",
      email: "maria@example.com",
      subscription: "Semester",
      plants: 12,
      joinDate: "2023-07-05",
    },
    {
      id: 5,
      name: "David Lee",
      email: "david@example.com",
      subscription: "Free",
      plants: 1,
      joinDate: "2023-08-18",
    },
  ];

  // Mock data for suggested items
  const suggestedItems = [
    {
      id: 1,
      name: "Premium Soil Mix",
      category: "Soil",
      price: "$24.99",
      link: "https://example.com/soil",
    },
    {
      id: 2,
      name: "LED Grow Light 1000W",
      category: "Equipment",
      price: "$129.99",
      link: "https://example.com/light",
    },
    {
      id: 3,
      name: "Nutrient Solution Pack",
      category: "Nutrients",
      price: "$39.99",
      link: "https://example.com/nutrients",
    },
    {
      id: 4,
      name: "pH Testing Kit",
      category: "Tools",
      price: "$19.99",
      link: "https://example.com/ph-kit",
    },
    {
      id: 5,
      name: "Humidity Dome",
      category: "Equipment",
      price: "$15.99",
      link: "https://example.com/dome",
    },
  ];

  // Mock statistics data
  const statistics = {
    totalUsers: 156,
    premiumUsers: 87,
    totalPlants: 1243,
    averagePlantsPerUser: 8,
    activeToday: 42,
    revenueMonthly: "$1,245.00",
  };

  return (
    <div className="container mx-auto py-8 bg-background">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Logged in as Admin
          </span>
          <Badge variant="outline" className="bg-primary/10">
            Admin
          </Badge>
        </div>
      </div>

      <Tabs
        defaultValue="users"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="items">Suggested Items</TabsTrigger>
          <TabsTrigger value="stats">Platform Statistics</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account with subscription details.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="User's full name"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subscription" className="text-right">
                        Subscription
                      </Label>
                      <Select defaultValue="free">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select subscription type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="semester">Semester</SelectItem>
                          <SelectItem value="annual">Annual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Temporary password"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setUserDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button>Create User</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Plants</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.subscription === "Free" ? "outline" : "default"
                          }
                          className={
                            user.subscription !== "Free"
                              ? "bg-green-500 hover:bg-green-600"
                              : ""
                          }
                        >
                          {user.subscription}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.plants}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Suggested Items Tab */}
        <TabsContent value="items" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search items..." className="pl-8" />
            </div>
            <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Suggested Item</DialogTitle>
                  <DialogDescription>
                    Add a new item to the suggested products list.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="item-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="item-name"
                      placeholder="Product name"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select defaultValue="equipment">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="nutrients">Nutrients</SelectItem>
                        <SelectItem value="soil">Soil</SelectItem>
                        <SelectItem value="tools">Tools</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      placeholder="$0.00"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="link" className="text-right">
                      Link
                    </Label>
                    <Input
                      id="link"
                      placeholder="https://example.com/product"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="featured" className="text-right">
                      Featured
                    </Label>
                    <div className="flex items-center space-x-2 col-span-3">
                      <Switch id="featured" />
                      <Label htmlFor="featured">Show as featured item</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setItemDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button>Add Item</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suggestedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {item.link}
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <CardDescription>All registered accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {statistics.totalUsers}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {statistics.premiumUsers} premium (
                  {Math.round(
                    (statistics.premiumUsers / statistics.totalUsers) * 100,
                  )}
                  %)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Plants
                </CardTitle>
                <CardDescription>Plants being tracked</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {statistics.totalPlants}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {statistics.averagePlantsPerUser} avg. per user
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Monthly Revenue
                </CardTitle>
                <CardDescription>From all subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {statistics.revenueMonthly}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {statistics.activeToday} active users today
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Platform Usage</CardTitle>
              <CardDescription>
                User activity and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">
                  Chart visualization would go here
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Distribution</CardTitle>
                <CardDescription>Breakdown by plan type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">
                    Pie chart would go here
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-md">
                  <p className="text-muted-foreground">
                    Line chart would go here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
