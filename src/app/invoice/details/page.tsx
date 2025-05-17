"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ArrowLeft, Printer, Download } from "lucide-react";
import { Invoice } from "@/types/invoice";

export default function InvoiceDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const invoiceId = searchParams.get("id");

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!invoiceId) {
      router.push("/invoice/list");
      return;
    }

    // Simulate API fetch
    setTimeout(() => {
      // Find the invoice by ID from our mock data
      const foundInvoice = mockInvoices.find(inv => inv.id === invoiceId) || null;
      setInvoice(foundInvoice);
      setLoading(false);
    }, 500);
  }, [invoiceId, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading invoice details...</p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="mb-4">Invoice not found</p>
        <Link href="/invoice/list">
          <Button>Return to Invoice List</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto pb-10">
      <div className="flex justify-between items-center mb-6">
        <Link href="/invoice/list">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Invoices
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="mb-6 shadow-sm border border-border/50 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {invoice.invoiceNumber ? `Invoice #${invoice.invoiceNumber}` : "Estimate"}
              </h1>
              <p className="text-muted-foreground">
                Created: {format(invoice.createdDate, "MMMM d, yyyy")}
              </p>
              <p className="text-muted-foreground">
                Delivery: {format(invoice.deliveryDate, "MMMM d, yyyy")}
              </p>

              <div className="mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                </span>
              </div>
            </div>

            <div className="text-right">
              <h2 className="text-xl font-semibold">OSEN</h2>
              <p>123 Business Street</p>
              <p>City, State 12345</p>
              <p>contact@example.com</p>
              <p>(555) 123-4567</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-2 text-primary">Customer:</h3>
              <p className="font-medium">{invoice.customer.name}</p>
              <p>{invoice.customer.phone}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-primary">Payment Details:</h3>
              <p>Method: {invoice.paymentDetails.method === "card"
                ? "Credit Card"
                : invoice.paymentDetails.method === "cash"
                  ? "Cash"
                  : "Split Payment"}
              </p>
              {invoice.paymentDetails.method === "split" && (
                <>
                  <p>Cash: ${invoice.paymentDetails.cashAmount?.toFixed(2) || '0.00'}</p>
                  <p>Card: ${invoice.paymentDetails.cardAmount?.toFixed(2) || '0.00'}</p>
                </>
              )}
            </div>
          </div>

          {invoice.note && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-primary">Notes:</h3>
              <p className="bg-muted p-3 rounded-md">{invoice.note}</p>
            </div>
          )}

          <Separator className="my-6" />

          <div className="mb-6">
            <h3 className="font-semibold mb-4 text-primary">Items:</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Qty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Unit Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {invoice.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{item.qty}</td>
                      <td className="px-6 py-4">{item.description}</td>
                      <td className="px-6 py-4 text-right">${item.unitPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>

              {invoice.discount && (
                <div className="flex justify-between text-destructive">
                  <span>Discount:</span>
                  <span>-${invoice.discount.type === 'fixed'
                    ? invoice.discount.value.toFixed(2)
                    : ((invoice.discount.value / 100) * invoice.subtotal).toFixed(2)}
                  </span>
                </div>
              )}

              {invoice.tax > 0 && (
                <div className="flex justify-between">
                  <span>Tax (6.25%):</span>
                  <span>${invoice.tax.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total:</span>
                <span className="text-primary">${invoice.total.toFixed(2)}</span>
              </div>

              {invoice.downPayment > 0 && (
                <>
                  <div className="flex justify-between">
                    <span>Down Payment:</span>
                    <span>${invoice.downPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Balance:</span>
                    <span>${invoice.balance.toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Mock invoice data for demo (same as in list page)
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
