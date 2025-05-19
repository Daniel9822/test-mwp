"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InvoiceForm from "@/components/admin/invoice/InvoiceForm";
import { Invoice, InvoiceItem } from "@/types/invoice";

export default function CreateInvoicePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Set default delivery date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Initialize empty invoice with defaults
  const defaultInvoice: Invoice = {
    customer: {
      name: "",
      phone: ""
    },
    items: [],
    subtotal: 0,
    tax: 0,
    taxRate: 0.0625, // 6.25% for card payments
    total: 0,
    balance: 0,
    downPayment: 0,
    deliveryDate: tomorrow,
    createdDate: new Date(),
    showInJobList: true,
    paymentDetails: {
      method: "cash"
    },
    status: "draft"
  };

  const handleSaveInvoice = async (invoice: Invoice, action: 'process' | 'estimate') => {
    setIsLoading(true);
    try {
      // Set the status based on the action
      invoice.status = action === 'process' ? 'processed' : 'estimate';

      // Here you would normally save the invoice to your database
      console.log('Saving invoice:', invoice);

      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to the invoice list page after saving
      router.push('/invoice/list');
    } catch (error) {
      console.error('Error saving invoice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <InvoiceForm
        initialInvoice={defaultInvoice}
        onSave={handleSaveInvoice}
        isLoading={isLoading}
      />
    </div>
  );
}
