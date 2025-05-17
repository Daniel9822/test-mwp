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
import { Invoice } from "@/types/invoice";
import { Plus, FileText } from "lucide-react";
import { format } from "date-fns";

export default function InvoiceListPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    setTimeout(() => {
      setInvoices(mockInvoices);
      setLoading(false);
    }, 500);
  }, []);

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
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  Loading invoices...
                </TableCell>
              </TableRow>
            ) : invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  No invoices found. Create your first invoice!
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.invoiceNumber || "Draft"}
                  </TableCell>
                  <TableCell>{invoice.customer.name}</TableCell>
                  <TableCell>{format(invoice.createdDate, "MMM d, yyyy")}</TableCell>
                  <TableCell>{format(invoice.deliveryDate, "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right font-medium">${invoice.total.toFixed(2)}</TableCell>
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
                    <Link href={`/invoice/details?id=${invoice.id}`}>
                      <Button variant="ghost" size="sm" className="hover:text-primary">
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
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
