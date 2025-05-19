"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  FileText,
  MoreHorizontal,
  Filter,
  User,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown
} from "lucide-react";
import { mockCustomers, mockOrders } from "@/data/mockEcommerceData";
import { CustomerInterface } from "@/types/ecommerce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

// Form schema for customer
const customerFormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  isAdmin: z.boolean().default(false),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [adminFilter, setAdminFilter] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<"username" | "email">("username");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerInterface | null>(null);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<CustomerInterface | null>(null);

  // Initialize form for adding customer
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      isAdmin: false,
    },
  });

  // Filter customers based on search query and admin filter
  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch =
      customer.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAdmin =
      adminFilter === null || customer.isAdmin === adminFilter;

    return matchesSearch && matchesAdmin;
  });

  // Sort customers based on sortBy and sortDirection
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (sortBy === "username") {
      return sortDirection === "asc"
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username);
    } else {
      return sortDirection === "asc"
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    }
  });

  // Toggle sort
  const toggleSort = (column: "username" | "email") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  // View customer details
  const viewCustomerDetails = (customer: CustomerInterface) => {
    setSelectedCustomer(customer);
    setIsCustomerDetailsOpen(true);
  };

  // Get customer orders
  const getCustomerOrders = (customerId: number) => {
    return mockOrders.filter(order => order.customerId === customerId);
  };

  // Format date from timestamp
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Submit form handler
  const onSubmit = (data: CustomerFormValues) => {
    console.log("Add new customer:", {
      ...data,
      userId: mockCustomers.length + 1,
      uuid: `user-${Date.now()}`,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60), // 1 year
    });

    setIsAddCustomerOpen(false);
    form.reset();
  };

  // Handle delete click
  const handleDeleteClick = (customer: CustomerInterface) => {
    setCustomerToDelete(customer);
    setIsDeleteDialogOpen(true);
  };

  // Delete customer
  const handleDelete = () => {
    if (customerToDelete) {
      console.log("Delete customer:", customerToDelete);
      setIsDeleteDialogOpen(false);
      setCustomerToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button onClick={() => setIsAddCustomerOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
                {adminFilter !== null && <Badge className="ml-2 bg-primary/20 text-primary">1</Badge>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setAdminFilter(null)}
                className={adminFilter === null ? "bg-muted" : ""}
              >
                All Customers
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setAdminFilter(true)}
                className={adminFilter === true ? "bg-muted" : ""}
              >
                Admin Users
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setAdminFilter(false)}
                className={adminFilter === false ? "bg-muted" : ""}
              >
                Regular Users
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All Customers
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inactive
          </TabsTrigger>
        </TabsList>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => toggleSort("username")}
                >
                  <div className="flex items-center">
                    Username
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => toggleSort("email")}
                >
                  <div className="flex items-center">
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                sortedCustomers.map((customer) => (
                  <TableRow key={customer.uuid}>
                    <TableCell>
                      <Avatar>
                        <AvatarFallback>{customer.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{customer.username}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      <Badge variant={customer.isAdmin ? "default" : "outline"}>
                        {customer.isAdmin ? "Admin" : "Customer"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getCustomerOrders(customer.userId).length}
                    </TableCell>
                    <TableCell>{formatDate(customer.iat)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => viewCustomerDetails(customer)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDeleteClick(customer)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Tabs>

      {/* Customer Details Dialog */}
      <Dialog open={isCustomerDetailsOpen} onOpenChange={setIsCustomerDetailsOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              {selectedCustomer && (
                <>View customer information and order history</>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-xl">
                          {selectedCustomer.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-lg">{selectedCustomer.username}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={selectedCustomer.isAdmin ? "default" : "outline"}>
                            {selectedCustomer.isAdmin ? "Admin" : "Customer"}
                          </Badge>
                          <Badge variant="outline" className="bg-primary/10">
                            ID: {selectedCustomer.userId}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedCustomer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Joined: {formatDate(selectedCustomer.iat)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Expires: {formatDate(selectedCustomer.exp)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/50 rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold">
                            {getCustomerOrders(selectedCustomer.userId).length}
                          </p>
                          <p className="text-sm text-muted-foreground">Total Orders</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold">
                            ${getCustomerOrders(selectedCustomer.userId).reduce((sum, order) => sum + order.total_amount, 0).toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">Total Spent</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Recent Activity</h4>
                        {getCustomerOrders(selectedCustomer.userId).length === 0 ? (
                          <p className="text-sm text-muted-foreground">No orders found</p>
                        ) : (
                          <ul className="space-y-2 text-sm">
                            {getCustomerOrders(selectedCustomer.userId)
                              .slice(0, 3)
                              .map((order) => (
                                <li key={order.uuidOrder} className="flex justify-between">
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline">{order.orderNumber}</Badge>
                                    <span>{order.orderItems.length} items</span>
                                  </div>
                                  <span className="font-medium">${order.total_amount.toFixed(2)}</span>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="font-medium mb-3">Order History</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getCustomerOrders(selectedCustomer.userId).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                            No orders found
                          </TableCell>
                        </TableRow>
                      ) : (
                        getCustomerOrders(selectedCustomer.userId).map((order) => (
                          <TableRow key={order.uuidOrder}>
                            <TableCell className="font-medium">{order.orderNumber}</TableCell>
                            <TableCell>
                              {/* Using mock date based on order number */}
                              {`${order.orderNumber.split("-")[1]}-${order.orderNumber.split("-")[2]}`}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {order.status.map((status, index) => (
                                  <Badge
                                    key={index}
                                    variant={status === "Completed" ? "default" : "outline"}
                                  >
                                    {status}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>{order.orderItems.length}</TableCell>
                            <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Customer Dialog */}
      <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Create a new customer account for your store.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Admin Access</FormLabel>
                      <FormDescription>
                        Give this user admin privileges
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddCustomerOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Customer</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Customer Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this customer?
              {customerToDelete && (
                <div className="mt-2">
                  <div className="font-semibold">{customerToDelete.username}</div>
                  <div className="text-sm text-muted-foreground">{customerToDelete.email}</div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
