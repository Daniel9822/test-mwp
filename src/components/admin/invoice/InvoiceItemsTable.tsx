"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { InvoiceItem } from "@/types/invoice";

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQty: (index: number, qty: number) => void;
}

export default function InvoiceItemsTable({
  items,
  onRemoveItem,
  onUpdateQty
}: InvoiceItemsTableProps) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Qty</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[150px] text-right">Unit Price</TableHead>
            <TableHead className="w-[150px] text-right">Total</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => onUpdateQty(index, parseInt(e.target.value) || 1)}
                  className="w-16 text-center"
                />
              </TableCell>
              <TableCell className="font-medium">{item.description}</TableCell>
              <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
              <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(index)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
