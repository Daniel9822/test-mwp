import { ProductsInterface } from "./products";

export interface CustomerInfo {
  name: string;
  phone: string;
}

export interface InvoiceItem {
  qty: number;
  description: string;
  unitPrice: number;
  total: number;
  productId?: string; // If it's a product from the catalog
  isCustom?: boolean; // If it's a custom product
}

export type DiscountType = "fixed" | "percent";

export interface InvoiceDiscount {
  type: DiscountType;
  value: number;
}

export type PaymentMethod = "cash" | "card" | "split";

export interface PaymentDetails {
  method: PaymentMethod;
  downPayment?: number;
  cardAmount?: number;
  cashAmount?: number;
}

export interface Invoice {
  id?: string;
  invoiceNumber?: string;
  customer: CustomerInfo;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  taxRate: number;
  discount?: InvoiceDiscount;
  total: number;
  balance: number;
  downPayment: number;
  deliveryDate: Date;
  createdDate: Date;
  note?: string;
  imageUrl?: string;
  showInJobList: boolean;
  paymentDetails: PaymentDetails;
  status: "draft" | "estimate" | "processed";
}
