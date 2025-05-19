"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Invoice, InvoiceItem, DiscountType, PaymentMethod } from "@/types/invoice";
import { ProductsInterface } from "@/types/products";
import InvoiceItemsTable from "./InvoiceItemsTable";
import ProductSelector from "./ProductSelector";
import { useForm } from "react-hook-form";

interface InvoiceFormProps {
  initialInvoice: Invoice;
  onSave: (invoice: Invoice, action: 'process' | 'estimate') => void;
  isLoading: boolean;
}

export default function InvoiceForm({
  initialInvoice,
  onSave,
  isLoading
}: InvoiceFormProps) {
  const [invoice, setInvoice] = useState<Invoice>(initialInvoice);
  const [items, setItems] = useState<InvoiceItem[]>(initialInvoice.items || []);
  const [discountType, setDiscountType] = useState<DiscountType>("fixed");
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [showSplitPayment, setShowSplitPayment] = useState(false);
  const [cashAmount, setCashAmount] = useState<number>(0);
  const [cardAmount, setCardAmount] = useState<number>(0);
  const [customProduct, setCustomProduct] = useState<{
    qty: number;
    description: string;
    unitPrice: number;
  }>({
    qty: 1,
    description: "",
    unitPrice: 0,
  });

  const form = useForm<Invoice>({
    defaultValues: initialInvoice,
  });

  // Calculate totals whenever items, discount, or payment method changes
  useEffect(() => {
    calculateTotals();
  }, [items, discountType, discountValue, paymentMethod, invoice.downPayment]);

  const calculateTotals = () => {
    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);

    // Calculate discount
    let discountAmount = 0;
    if (discountValue > 0) {
      if (discountType === "fixed") {
        discountAmount = discountValue;
      } else {
        discountAmount = subtotal * (discountValue / 100);
      }
    }

    // Calculate tax (only if payment method is card)
    const afterDiscount = subtotal - discountAmount;
    const tax = paymentMethod === "card" ? afterDiscount * initialInvoice.taxRate : 0;

    // Calculate total
    const total = afterDiscount + tax;

    // Calculate balance (total - downpayment)
    const balance = total - (invoice.downPayment || 0);

    // Update invoice state
    setInvoice(prev => ({
      ...prev,
      items,
      subtotal,
      tax,
      total,
      balance,
      discount: discountValue > 0 ? { type: discountType, value: discountValue } : undefined,
      paymentDetails: {
        method: paymentMethod,
        downPayment: prev.downPayment,
        cashAmount: showSplitPayment ? cashAmount : (paymentMethod === "cash" ? total : 0),
        cardAmount: showSplitPayment ? cardAmount : (paymentMethod === "card" ? total : 0),
      }
    }));
  };

  const handleAddCustomProduct = () => {
    if (customProduct.description && customProduct.unitPrice > 0) {
      const newItem: InvoiceItem = {
        qty: customProduct.qty,
        description: customProduct.description,
        unitPrice: customProduct.unitPrice,
        total: customProduct.qty * customProduct.unitPrice,
        isCustom: true
      };

      setItems([...items, newItem]);

      // Reset custom product form
      setCustomProduct({
        qty: 1,
        description: "",
        unitPrice: 0,
      });
    }
  };

  const handleAddProduct = (product: ProductsInterface) => {
    const newItem: InvoiceItem = {
      qty: 1,
      description: product.name,
      unitPrice: product.price,
      total: product.price,
      productId: product.productUuid,
      isCustom: false
    };

    setItems([...items, newItem]);
    setShowProductSelector(false);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleUpdateItemQty = (index: number, qty: number) => {
    const updatedItems = [...items];
    updatedItems[index].qty = qty;
    updatedItems[index].total = qty * updatedItems[index].unitPrice;
    setItems(updatedItems);
  };

  const handleCustomerChange = (field: 'name' | 'phone', value: string) => {
    setInvoice(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value
      }
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setInvoice(prev => ({
        ...prev,
        deliveryDate: date
      }));
    }
  };

  const handleNoteChange = (value: string) => {
    setInvoice(prev => ({
      ...prev,
      note: value
    }));
  };

  const handleShowJobListChange = (checked: boolean) => {
    setInvoice(prev => ({
      ...prev,
      showInJobList: checked
    }));
  };

  const handleDownPaymentChange = (value: string) => {
    const downPayment = parseFloat(value) || 0;
    setInvoice(prev => ({
      ...prev,
      downPayment
    }));
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setShowSplitPayment(method === "split");
  };

  const handleSplitAmountChange = (type: 'cash' | 'card', value: string) => {
    const amount = parseFloat(value) || 0;
    if (type === 'cash') {
      setCashAmount(amount);
      // Automatically set card amount to remaining balance
      setCardAmount(invoice.total - amount);
    } else {
      setCardAmount(amount);
      // Automatically set cash amount to remaining balance
      setCashAmount(invoice.total - amount);
    }
  };

  const handleProcessOrder = () => {
    onSave(invoice, 'process');
  };

  const handleEstimate = () => {
    onSave(invoice, 'estimate');
  };

  const isFormValid = () => {
    return (
      invoice.customer.name.trim() !== "" &&
      items.length > 0 &&
      (paymentMethod !== "split" || (cashAmount + cardAmount === invoice.total))
    );
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Customer Information */}
      <Card className="shadow-sm border border-border/50 overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                placeholder="Enter customer name"
                value={invoice.customer.name}
                onChange={(e) => handleCustomerChange('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="customerPhone">Phone Number</Label>
              <Input
                id="customerPhone"
                placeholder="Enter phone number"
                value={invoice.customer.phone}
                onChange={(e) => handleCustomerChange('phone', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products and Items */}
      <Card className="shadow-sm border border-border/50 overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Products & Services</h2>

          {/* Add custom product */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <Label htmlFor="qty">Qty</Label>
              <Input
                id="qty"
                type="number"
                min="1"
                value={customProduct.qty}
                onChange={(e) => setCustomProduct({
                  ...customProduct,
                  qty: parseInt(e.target.value) || 1
                })}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter product/service description"
                value={customProduct.description}
                onChange={(e) => setCustomProduct({
                  ...customProduct,
                  description: e.target.value
                })}
              />
            </div>
            <div>
              <Label htmlFor="unitPrice">Unit Price</Label>
              <Input
                id="unitPrice"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={customProduct.unitPrice || ''}
                onChange={(e) => setCustomProduct({
                  ...customProduct,
                  unitPrice: parseFloat(e.target.value) || 0
                })}
              />
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <Button
              type="button"
              onClick={handleAddCustomProduct}
              disabled={!customProduct.description || customProduct.unitPrice <= 0}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Custom Item
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowProductSelector(!showProductSelector)}
            >
              Select Product
            </Button>
          </div>

          {showProductSelector && (
            <div className="mb-6">
              <ProductSelector onSelectProduct={handleAddProduct} />
            </div>
          )}

          {/* Items Table */}
          {items.length > 0 && (
            <InvoiceItemsTable
              items={items}
              onRemoveItem={handleRemoveItem}
              onUpdateQty={handleUpdateItemQty}
            />
          )}
        </CardContent>
      </Card>

      {/* Invoice Details */}
      <Card className="shadow-sm border border-border/50 overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-primary">Invoice Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {/* Delivery Date */}
              <div className="mb-4">
                <Label htmlFor="deliveryDate">Delivery Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {invoice.deliveryDate ? format(invoice.deliveryDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={invoice.deliveryDate}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Notes */}
              <div className="mb-4">
                <Label htmlFor="note">Notes</Label>
                <Textarea
                  id="note"
                  placeholder="Add any notes here..."
                  value={invoice.note || ''}
                  onChange={(e) => handleNoteChange(e.target.value)}
                  className="resize-none"
                  rows={4}
                />
              </div>

              {/* Image Upload (placeholder) */}
              <div className="mb-4">
                <Label>Upload Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 mt-1 text-center">
                  <Button variant="ghost" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
              </div>

              {/* Show in job list */}
              <div className="flex items-center gap-2 mb-4">
                <Checkbox
                  id="showInJobList"
                  checked={invoice.showInJobList}
                  onCheckedChange={(checked) =>
                    handleShowJobListChange(checked as boolean)
                  }
                />
                <Label htmlFor="showInJobList">Show in job list</Label>
              </div>
            </div>

            <div>
              {/* Payment & Discount */}
              <div className="space-y-4">
                {/* Discount */}
                <div>
                  <Label>Discount</Label>
                  <div className="flex gap-2 mt-1">
                    <Select
                      value={discountType}
                      onValueChange={(value) => setDiscountType(value as DiscountType)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Discount Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed ($)</SelectItem>
                        <SelectItem value="percent">Percent (%)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      min="0"
                      step={discountType === 'percent' ? '1' : '0.01'}
                      placeholder={discountType === 'percent' ? "0%" : "$0.00"}
                      value={discountValue || ''}
                      onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <Label htmlFor="downPayment">Down Payment</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="$0.00"
                    value={invoice.downPayment || ''}
                    onChange={(e) => handleDownPaymentChange(e.target.value)}
                  />
                </div>

                {/* Summary */}
                <div className="bg-muted p-4 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${invoice.subtotal.toFixed(2)}</span>
                  </div>

                  {discountValue > 0 && (
                    <div className="flex justify-between text-red-500">
                      <span>Discount:</span>
                      <span>-${(discountType === 'fixed' ? discountValue : invoice.subtotal * (discountValue / 100)).toFixed(2)}</span>
                    </div>
                  )}

                  {invoice.tax > 0 && (
                    <div className="flex justify-between">
                      <span>Tax (6.25%):</span>
                      <span>${invoice.tax.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span>${invoice.total.toFixed(2)}</span>
                  </div>

                  {invoice.downPayment > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span>Down Payment:</span>
                        <span>${invoice.downPayment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Balance:</span>
                        <span>${invoice.balance.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Options */}
      <div className="bg-card border rounded-lg p-6 shadow-sm border-border/50">
        <h2 className="text-xl font-semibold mb-4 text-primary">Payment Method</h2>

        {showSplitPayment && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="cashAmount">Cash Amount</Label>
              <Input
                id="cashAmount"
                type="number"
                min="0"
                step="0.01"
                placeholder="$0.00"
                value={cashAmount || ''}
                onChange={(e) => handleSplitAmountChange('cash', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cardAmount">Card Amount</Label>
              <Input
                id="cardAmount"
                type="number"
                min="0"
                step="0.01"
                placeholder="$0.00"
                value={cardAmount || ''}
                onChange={(e) => handleSplitAmountChange('card', e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            variant={paymentMethod === "cash" ? "default" : "outline"}
            onClick={() => handlePaymentMethodChange("cash")}
            className={`min-w-[120px] ${paymentMethod === "cash" ? "bg-primary hover:bg-primary/90" : ""}`}
          >
            Cash
          </Button>
          <Button
            size="lg"
            variant={paymentMethod === "card" ? "default" : "outline"}
            onClick={() => handlePaymentMethodChange("card")}
            className={`min-w-[120px] ${paymentMethod === "card" ? "bg-primary hover:bg-primary/90" : ""}`}
          >
            Card
          </Button>
          <Button
            size="lg"
            variant={paymentMethod === "split" ? "default" : "outline"}
            onClick={() => handlePaymentMethodChange("split")}
            className={`min-w-[120px] ${paymentMethod === "split" ? "bg-primary hover:bg-primary/90" : ""}`}
          >
            Split
          </Button>
          <Button
            size="lg"
            onClick={handleProcessOrder}
            disabled={!isFormValid() || isLoading}
            className="min-w-[150px] bg-accent hover:bg-accent/90"
          >
            Process Order
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={handleEstimate}
            disabled={!isFormValid() || isLoading}
            className="min-w-[120px]"
          >
            Estimate
          </Button>
        </div>
      </div>
    </div>
  );
}
