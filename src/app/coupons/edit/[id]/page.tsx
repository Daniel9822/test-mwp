"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CouponForm from "@/components/admin/coupons/CouponForm";
import { Coupon, CouponFormData } from "@/types/coupon";
import { mockCoupons } from "@/data/mockCoupons";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditCouponPage({ params }: { params: { id: string } }) {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    // Simulate API call to get the coupon
    setTimeout(() => {
      const foundCoupon = mockCoupons.find((c) => c.id === id);

      if (foundCoupon) {
        setCoupon(foundCoupon);
      } else {
        setError("Coupon not found");
      }

      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleUpdateCoupon = async (formData: CouponFormData) => {
    if (!coupon) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would make an API request to update the coupon
      console.log("Updating coupon with data:", formData);

      // Navigate back to the coupons list page
      router.push("/coupons");
      router.refresh(); // Refresh the page to show the updated coupon
    } catch (error) {
      console.error("Error updating coupon:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-6 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !coupon) {
    return (
      <div className="container py-6">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>There was a problem loading this coupon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{error || "Coupon not found"}</p>
            <Button onClick={() => router.push("/coupons")}>
              Go Back to Coupons
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Coupon: {coupon.couponCode}</h1>
      </div>

      <div className="max-w-3xl mx-auto">
        <CouponForm
          coupon={coupon}
          onSubmit={handleUpdateCoupon}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
