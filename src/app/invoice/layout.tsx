import React from "react";

export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Invoice Management</h1>
        <p className="text-muted-foreground">Create and manage invoices for your customers</p>
      </div>
      {children}
    </div>
  );
}
