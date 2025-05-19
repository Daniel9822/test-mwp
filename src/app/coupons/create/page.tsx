"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CouponForm from "@/components/coupons/CouponForm";
import { CouponFormData } from "@/types/coupon";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateCouponPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleCreateCoupon = async (formData: CouponFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would make an API request to create the coupon
      console.log("Creating coupon with data:", formData);

      // Navigate back to the coupons list page
      router.push("/coupons");
      router.refresh(); // Refresh the page to show the new coupon
    } catch (error) {
      console.error("Error creating coupon:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <h1 className="text-2xl font-bold">Create New Coupon</h1>
      </div>

      <div className="max-w-3xl mx-auto">
        <CouponForm onSubmit={handleCreateCoupon} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
