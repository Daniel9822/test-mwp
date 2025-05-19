"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Invoice, Payment } from "@/types/invoice";
import {
  Plus,
  FileText,
  File,
  MoreVertical,
  CreditCard,
  Clock,
  ClipboardCheck,
  DollarSign,
  History,
  Printer
} from "lucide-react";
import { format } from "date-fns";

export default function InvoiceListPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isPaymentHistoryOpen, setIsPaymentHistoryOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    amount: "",
    method: "cash",
    date: new Date().toISOString().split('T')[0],
    reference: ""
  });

  useEffect(() => {
    // In a real app, this would fetch data from an API
    setTimeout(() => {
      // Add payment history to mock data
      const enhancedInvoices = mockInvoices.map(invoice => ({
        ...invoice,
        payments: invoice.id === "inv-001"
          ? [
              {
                id: "pay-001",
                amount: 39.98,
                date: new Date(2025, 4, 17),
                method: "cash",
                reference: ""
              }
            ]
          : invoice.id === "inv-002"
          ? [
              {
                id: "pay-002",
                amount: 50.00,
                date: new Date(2025, 4, 16),
                method: "card",
                reference: "CARD-1234"
              }
            ]
          : []
      }));
      setInvoices(enhancedInvoices);
      setLoading(false);
    }, 500);
  }, []);

  const handleAddPayment = () => {
    if (!selectedInvoice || !newPayment.amount || parseFloat(newPayment.amount) <= 0) {
      return;
    }

    const paymentAmount = parseFloat(newPayment.amount);

    // Create new payment
    const payment: Payment = {
      id: `pay-${Date.now()}`,
      amount: paymentAmount,
      date: new Date(newPayment.date),
      method: newPayment.method as "cash" | "card" | "bank" | "other",
      reference: newPayment.reference
    };

    // Update invoice
    const updatedInvoices = invoices.map(invoice => {
      if (invoice.id === selectedInvoice.id) {
        const newBalance = invoice.balance - paymentAmount;
        const payments = [...(invoice.payments || []), payment];

        return {
          ...invoice,
          balance: Math.max(0, newBalance),
          payments
        };
      }
      return invoice;
    });

    setInvoices(updatedInvoices);
    setIsPaymentDialogOpen(false);
    setNewPayment({
      amount: "",
      method: "cash",
      date: new Date().toISOString().split('T')[0],
      reference: ""
    });
  };

  const handleMarkAsInvoice = (estimateId: string) => {
    const updatedInvoices = invoices.map(invoice => {
      if (invoice.id === estimateId) {
        return {
          ...invoice,
          status: "processed",
          invoiceNumber: `INV-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        };
      }
      return invoice;
    });

    setInvoices(updatedInvoices);
  };

  const handleGeneratePdf = (invoiceId: string) => {
    // In a real application, this would call an API to generate a PDF
    console.log(`Generating PDF for invoice ${invoiceId}`);
    alert(`PDF generated for invoice ${invoiceId}`);
  };

  const openPaymentDialog = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentDialogOpen(true);
  };

  const openPaymentHistory = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentHistoryOpen(true);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Invoices</h1>
        <Link href="/invoice/create">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Create New Invoice
          </Button>
        </Link>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden shadow-sm border-border/50">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Delivery Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10">
                  Loading invoices...
                </TableCell>
              </TableRow>
            ) : invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10">
                  No invoices found. Create your first invoice!
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.invoiceNumber || (
                      <span className="text-muted-foreground">Estimate</span>
                    )}
                  </TableCell>
                  <TableCell>{invoice.customer.name}</TableCell>
                  <TableCell>{format(invoice.createdDate, "MMM d, yyyy")}</TableCell>
                  <TableCell>{format(invoice.deliveryDate, "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right font-medium">${invoice.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-medium">
                    {invoice.balance > 0 ? (
                      <span className="text-amber-500">${invoice.balance.toFixed(2)}</span>
                    ) : (
                      <span className="text-success">Paid</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      invoice.status === "processed"
                        ? "bg-success/20 text-success"
                        : invoice.status === "estimate"
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary/20 text-secondary"
                    }`}>
                      {invoice.status === "processed"
                        ? "Processed"
                        : invoice.status === "estimate"
                          ? "Estimate"
                          : "Draft"}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/invoice/details?id=${invoice.id}`}>
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => handleGeneratePdf(invoice.id)}>
                          <File className="h-4 w-4 mr-2" />
                          Generate PDF
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => openPaymentHistory(invoice)}>
                          <History className="h-4 w-4 mr-2" />
                          Payment History
                        </DropdownMenuItem>

                        {invoice.balance > 0 && (
                          <DropdownMenuItem onClick={() => openPaymentDialog(invoice)}>
                            <DollarSign className="h-4 w-4 mr-2" />
                            Add Payment
                          </DropdownMenuItem>
                        )}

                        {invoice.status === "estimate" && (
                          <DropdownMenuItem onClick={() => handleMarkAsInvoice(invoice.id)}>
                            <ClipboardCheck className="h-4 w-4 mr-2" />
                            Mark as Invoice
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuItem onClick={() => window.print()}>
                          <Printer className="h-4 w-4 mr-2" />
                          Print
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Payment</DialogTitle>
            <DialogDescription>
              Enter payment details for invoice {selectedInvoice?.invoiceNumber || "Estimate"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <div className="col-span-3 relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  className="pl-7"
                  placeholder="0.00"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                  max={selectedInvoice?.balance}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="method" className="text-right">
                Method
              </Label>
              <Select
                value={newPayment.method}
                onValueChange={(value) => setNewPayment({...newPayment, method: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                className="col-span-3"
                value={newPayment.date}
                onChange={(e) => setNewPayment({...newPayment, date: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reference" className="text-right">
                Reference
              </Label>
              <Input
                id="reference"
                className="col-span-3"
                placeholder="Transaction reference (optional)"
                value={newPayment.reference}
                onChange={(e) => setNewPayment({...newPayment, reference: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleAddPayment}
              disabled={!newPayment.amount || parseFloat(newPayment.amount) <= 0}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment History Dialog */}
      <Dialog open={isPaymentHistoryOpen} onOpenChange={setIsPaymentHistoryOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Payment History</DialogTitle>
            <DialogDescription>
              All payments for {selectedInvoice?.invoiceNumber || "Estimate"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-semibold">${selectedInvoice?.total.toFixed(2) || "0.00"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining Balance</p>
                <p className="font-semibold">
                  {selectedInvoice?.balance === 0 ? (
                    <span className="text-success">Paid in Full</span>
                  ) : (
                    <span>${selectedInvoice?.balance.toFixed(2) || "0.00"}</span>
                  )}
                </p>
              </div>
            </div>

            {!selectedInvoice?.payments || selectedInvoice.payments.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No payments recorded for this invoice yet.
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{format(payment.date, "MMM d, yyyy")}</TableCell>
                        <TableCell className="capitalize">{payment.method}</TableCell>
                        <TableCell>{payment.reference || "-"}</TableCell>
                        <TableCell className="text-right font-medium">
                          ${payment.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          <DialogFooter>
            {selectedInvoice?.balance && selectedInvoice.balance > 0 && (
              <Button
                onClick={() => {
                  setIsPaymentHistoryOpen(false);
                  setTimeout(() => openPaymentDialog(selectedInvoice), 100);
                }}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Add Payment
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Mock invoice data for demo
const mockInvoices: Invoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "INV-001",
    customer: {
      name: "John Doe",
      phone: "555-123-4567"
    },
    items: [
      {
        qty: 2,
        description: "T-Shirt",
        unitPrice: 19.99,
        total: 39.98
      }
    ],
    subtotal: 39.98,
    tax: 0,
    taxRate: 0.0625,
    total: 39.98,
    balance: 0,
    downPayment: 39.98,
    deliveryDate: new Date(2025, 4, 20),
    createdDate: new Date(2025, 4, 17),
    showInJobList: true,
    paymentDetails: {
      method: "cash"
    },
    status: "processed"
  },
  {
    id: "inv-002",
    invoiceNumber: "INV-002",
    customer: {
      name: "Jane Smith",
      phone: "555-987-6543"
    },
    items: [
      {
        qty: 1,
        description: "Custom Banner",
        unitPrice: 79.99,
        total: 79.99
      }
    ],
    subtotal: 79.99,
    tax: 5.00,
    taxRate: 0.0625,
    total: 84.99,
    balance: 34.99,
    downPayment: 50.00,
    deliveryDate: new Date(2025, 4, 25),
    createdDate: new Date(2025, 4, 16),
    showInJobList: true,
    paymentDetails: {
      method: "card"
    },
    status: "processed"
  },
  {
    id: "inv-003",
    invoiceNumber: null,
    customer: {
      name: "Robert Johnson",
      phone: "555-456-7890"
    },
    items: [
      {
        qty: 100,
        description: "Business Cards",
        unitPrice: 0.30,
        total: 30.00
      }
    ],
    subtotal: 30.00,
    tax: 0,
    taxRate: 0.0625,
    total: 30.00,
    balance: 30.00,
    downPayment: 0,
    deliveryDate: new Date(2025, 4, 22),
    createdDate: new Date(2025, 4, 15),
    note: "Client wants to review design before proceeding",
    showInJobList: false,
    paymentDetails: {
      method: "cash"
    },
    status: "estimate"
  }
];
