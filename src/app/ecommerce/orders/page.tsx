"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  MoreHorizontal,
  ArrowUpDown,
  FileText,
  Truck,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { mockOrders, mockCustomers } from "@/data/mockEcommerceData";
import { OrderInterface } from "@/types/ecommerce";

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
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedOrder, setSelectedOrder] = useState<OrderInterface | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  // Filter orders based on search query and status filter
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.uuidOrder.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter ? order.status.includes(statusFilter) : true;

    return matchesSearch && matchesStatus;
  });

  // Sort orders based on sortBy and sortDirection
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "date") {
      // Assuming orderNumber contains date information (like ORD-2023-001)
      return sortDirection === "asc"
        ? a.orderNumber.localeCompare(b.orderNumber)
        : b.orderNumber.localeCompare(a.orderNumber);
    } else {
      return sortDirection === "asc"
        ? a.total_amount - b.total_amount
        : b.total_amount - a.total_amount;
    }
  });

  // Toggle sort
  const toggleSort = (column: "date" | "amount") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("desc");
    }
  };

  // View order details
  const viewOrderDetails = (order: OrderInterface) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  // Get customer name by ID
  const getCustomerName = (customerId: number) => {
    const customer = mockCustomers.find(c => c.userId === customerId);
    return customer ? customer.username : "Unknown Customer";
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Processing":
        return "default";
      case "Shipped":
        return "secondary";
      case "Pending":
        return "outline";
      case "Cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />;
      case "Processing":
        return <FileText className="h-4 w-4" />;
      case "Shipped":
        return <Truck className="h-4 w-4" />;
      case "Pending":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Select
            value={statusFilter || ""}
            onValueChange={(value) => setStatusFilter(value || null)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="default">
            <Filter className="mr-2 h-4 w-4" /> More Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All Orders <Badge className="ml-2 bg-primary/20 text-primary">{mockOrders.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending <Badge className="ml-2 bg-primary/20 text-primary">{mockOrders.filter(o => o.status.includes("Pending")).length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="processing">
            Processing <Badge className="ml-2 bg-primary/20 text-primary">{mockOrders.filter(o => o.status.includes("Processing")).length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed <Badge className="ml-2 bg-primary/20 text-primary">{mockOrders.filter(o => o.status.includes("Completed")).length}</Badge>
          </TabsTrigger>
        </TabsList>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Order</TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort("date")}>
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort("amount")}>
                  <div className="flex items-center">
                    Total
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                sortedOrders.map((order) => (
                  <TableRow key={order.uuidOrder}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>
                      {/* Using mock date based on order number */}
                      {`${order.orderNumber.split("-")[1]}-${order.orderNumber.split("-")[2]}`}
                    </TableCell>
                    <TableCell>{getCustomerName(order.customerId)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {order.status.map((status, index) => (
                          <Badge
                            key={index}
                            variant={getStatusBadgeVariant(status) as "default" | "secondary" | "destructive" | "outline"}
                            className="flex items-center gap-1"
                          >
                            {getStatusIcon(status)}
                            {status}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{order.orderItems.length}</TableCell>
                    <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => viewOrderDetails(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              Edit Order
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Print Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Tabs>

      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder && (
                <>Order #{selectedOrder.orderNumber} • {selectedOrder.status.join(", ")}</>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{getCustomerName(selectedOrder.customerId)}</p>
                    <p className="text-sm text-muted-foreground">
                      {mockCustomers.find(c => c.userId === selectedOrder.customerId)?.email}
                    </p>
                    <p className="text-sm mt-2">Customer ID: {selectedOrder.customerId}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span>${(selectedOrder.total_amount * 0.85).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Tax:</span>
                      <span>${(selectedOrder.total_amount * 0.15).toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>${selectedOrder.total_amount.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="font-medium mb-3">Order Items</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Options</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.orderItems.map((item) => (
                        <TableRow key={item.uuid_order_item}>
                          <TableCell>
                            {item.preview_image && item.preview_image.length > 0 ? (
                              <div className="relative h-12 w-12 rounded-md overflow-hidden">
                                <Image
                                  src={item.preview_image[0]}
                                  alt="Product"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                                <AlertCircle className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            Product #{item.productId}
                            {item.note && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Note: {item.note}
                              </p>
                            )}
                          </TableCell>
                          <TableCell>
                            {item.options.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {item.options.map((option, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="whitespace-nowrap"
                                  >
                                    {option}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">No options</span>
                            )}
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">
                  Print Invoice
                </Button>
                <Button>
                  Update Status
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
