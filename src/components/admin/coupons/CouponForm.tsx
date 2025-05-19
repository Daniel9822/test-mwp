"use client";

import { useState, useEffect } from "react";
import { Coupon, CouponFormData, CouponType, CouponUsage } from "@/types/coupon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

interface CouponFormProps {
  coupon?: Coupon;
  onSubmit: (data: CouponFormData) => Promise<void>;
  isSubmitting: boolean;
}

export default function CouponForm({
  coupon,
  onSubmit,
  isSubmitting,
}: CouponFormProps) {
  const [formData, setFormData] = useState<CouponFormData>({
    couponType: "percent",
    couponUsage: "multiple",
    couponCode: "",
    couponDiscount: 0,
    validFrom: new Date().toISOString().split("T")[0],
    validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    active: true,
    maxUsage: undefined,
    minOrderAmount: undefined,
    appliesTo: "all",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // If editing an existing coupon, populate the form
  useEffect(() => {
    if (coupon) {
      setFormData({
        couponType: coupon.couponType,
        couponUsage: coupon.couponUsage,
        couponCode: coupon.couponCode,
        couponDiscount: coupon.couponDiscount,
        validFrom: new Date(coupon.validFrom).toISOString().split("T")[0],
        validTo: new Date(coupon.validTo).toISOString().split("T")[0],
        active: coupon.active,
        maxUsage: coupon.maxUsage,
        minOrderAmount: coupon.minOrderAmount,
        appliesTo: coupon.appliesTo || "all",
        productIds: coupon.productIds,
        categoryIds: coupon.categoryIds,
      });
    }
  }, [coupon]);

  const handleChange = (
    field: keyof CouponFormData,
    value: string | number | boolean | undefined
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when field is modified
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.couponCode.trim()) {
      newErrors.couponCode = "Coupon code is required";
    } else if (formData.couponCode.length < 3) {
      newErrors.couponCode = "Coupon code must be at least 3 characters";
    }

    if (formData.couponType !== "free_shipping" && formData.couponDiscount <= 0) {
      newErrors.couponDiscount = "Discount value must be greater than 0";
    }

    if (formData.couponType === "percent" && formData.couponDiscount > 100) {
      newErrors.couponDiscount = "Percentage discount cannot exceed 100%";
    }

    if (!formData.validFrom) {
      newErrors.validFrom = "Start date is required";
    }

    if (!formData.validTo) {
      newErrors.validTo = "End date is required";
    } else if (new Date(formData.validTo) <= new Date(formData.validFrom)) {
      newErrors.validTo = "End date must be after start date";
    }

    if (
      formData.couponUsage === "multiple" &&
      (formData.maxUsage === undefined || formData.maxUsage <= 0)
    ) {
      newErrors.maxUsage = "Maximum usage count is required for multiple-use coupons";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      await onSubmit(formData);
    }
  };

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    handleChange("couponCode", result);
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{coupon ? "Edit Coupon" : "Create New Coupon"}</CardTitle>
          <CardDescription>
            {coupon
              ? "Update the details of an existing coupon"
              : "Create a discount coupon for your customers"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="couponCode">
                  Coupon Code <span className="text-destructive">*</span>
                </Label>
                <div className="flex space-x-2">
                  <Input
                    id="couponCode"
                    value={formData.couponCode}
                    onChange={(e) => handleChange("couponCode", e.target.value.toUpperCase())}
                    placeholder="e.g. SUMMER25"
                    className={errors.couponCode ? "border-destructive" : ""}
                    maxLength={20}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateRandomCode}
                  >
                    Generate
                  </Button>
                </div>
                {errors.couponCode && (
                  <p className="text-xs text-destructive">{errors.couponCode}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="active">Status</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => handleChange("active", checked)}
                  />
                  <Label htmlFor="active" className="cursor-pointer">
                    {formData.active ? "Active" : "Inactive"}
                  </Label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="couponType">
                  Discount Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.couponType}
                  onValueChange={(value) => handleChange("couponType", value as CouponType)}
                >
                  <SelectTrigger id="couponType">
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                    <SelectItem value="free_shipping">Free Shipping</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.couponType !== "free_shipping" && (
                <div className="space-y-2">
                  <Label htmlFor="couponDiscount">
                    Discount Value <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    {formData.couponType === "fixed" && (
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        $
                      </span>
                    )}
                    <Input
                      id="couponDiscount"
                      type="number"
                      value={formData.couponDiscount}
                      onChange={(e) =>
                        handleChange("couponDiscount", parseFloat(e.target.value) || 0)
                      }
                      className={`${
                        errors.couponDiscount ? "border-destructive" : ""
                      } ${formData.couponType === "fixed" ? "pl-7" : ""}`}
                      min={0}
                      max={formData.couponType === "percent" ? 100 : undefined}
                      step={formData.couponType === "percent" ? 1 : 0.01}
                    />
                    {formData.couponType === "percent" && (
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        %
                      </span>
                    )}
                  </div>
                  {errors.couponDiscount && (
                    <p className="text-xs text-destructive">{errors.couponDiscount}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Usage Restrictions */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Usage Restrictions</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="couponUsage">Usage Limit</Label>
                <Select
                  value={formData.couponUsage}
                  onValueChange={(value) => handleChange("couponUsage", value as CouponUsage)}
                >
                  <SelectTrigger id="couponUsage">
                    <SelectValue placeholder="Select usage type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Use</SelectItem>
                    <SelectItem value="multiple">Multiple Uses</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.couponUsage === "multiple" && (
                <div className="space-y-2">
                  <Label htmlFor="maxUsage">
                    Maximum Uses <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="maxUsage"
                    type="number"
                    value={formData.maxUsage || ""}
                    onChange={(e) =>
                      handleChange(
                        "maxUsage",
                        e.target.value ? parseInt(e.target.value) : undefined
                      )
                    }
                    className={errors.maxUsage ? "border-destructive" : ""}
                    min={1}
                  />
                  {errors.maxUsage && (
                    <p className="text-xs text-destructive">{errors.maxUsage}</p>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minOrderAmount">Minimum Order Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    $
                  </span>
                  <Input
                    id="minOrderAmount"
                    type="number"
                    value={formData.minOrderAmount || ""}
                    onChange={(e) =>
                      handleChange(
                        "minOrderAmount",
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                    className="pl-7"
                    min={0}
                    step={0.01}
                    placeholder="No minimum"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appliesTo">Applies To</Label>
                <Select
                  value={formData.appliesTo || "all"}
                  onValueChange={(value) =>
                    handleChange(
                      "appliesTo",
                      value as "all" | "specific_products" | "specific_categories"
                    )
                  }
                >
                  <SelectTrigger id="appliesTo">
                    <SelectValue placeholder="Select scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="specific_categories">Specific Categories</SelectItem>
                    <SelectItem value="specific_products">Specific Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Validity Period</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="validFrom">
                  Valid From <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="validFrom"
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => handleChange("validFrom", e.target.value)}
                  className={errors.validFrom ? "border-destructive" : ""}
                />
                {errors.validFrom && (
                  <p className="text-xs text-destructive">{errors.validFrom}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="validTo">
                  Valid Until <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="validTo"
                  type="date"
                  value={formData.validTo}
                  onChange={(e) => handleChange("validTo", e.target.value)}
                  className={errors.validTo ? "border-destructive" : ""}
                />
                {errors.validTo && (
                  <p className="text-xs text-destructive">{errors.validTo}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {coupon ? "Updating..." : "Creating..."}
              </>
            ) : (
              coupon ? "Update Coupon" : "Create Coupon"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
