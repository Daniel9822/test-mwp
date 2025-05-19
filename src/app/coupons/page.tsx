"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { mockCoupons } from "@/data/mockCoupons";
import { Coupon } from "@/types/coupon";
import CouponList from "@/components/coupons/CouponList";
import { Plus, Search, Tag, Ticket, RefreshCw, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CouponForm from "@/components/coupons/CouponForm";
import { Badge } from "@/components/ui/badge";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | undefined>(undefined);
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all");

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setCoupons(mockCoupons);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleDeleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
  };

  const handleToggleActive = (id: string, active: boolean) => {
    setCoupons((prev) =>
      prev.map((coupon) => (coupon.id === id ? { ...coupon, active } : coupon))
    );
  };

  const handleCreateCoupon = async (formData: any) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newCoupon: Coupon = {
        id: `coup-${Date.now()}`,
        ...formData,
        validFrom: new Date(formData.validFrom),
        validTo: new Date(formData.validTo),
        usageCount: 0,
        createdAt: new Date(),
      };

      setCoupons((prev) => [newCoupon, ...prev]);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating coupon:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCoupon = async (formData: any) => {
    if (!editingCoupon) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCoupons((prev) =>
        prev.map((coupon) =>
          coupon.id === editingCoupon.id
            ? {
                ...coupon,
                ...formData,
                validFrom: new Date(formData.validFrom),
                validTo: new Date(formData.validTo),
                updatedAt: new Date(),
              }
            : coupon
        )
      );

      setIsDialogOpen(false);
      setEditingCoupon(undefined);
    } catch (error) {
      console.error("Error updating coupon:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setIsDialogOpen(true);
  };

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.couponCode.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "active") return matchesSearch && coupon.active;
    if (activeFilter === "inactive") return matchesSearch && !coupon.active;

    return matchesSearch;
  });

  const getStatusCounts = () => {
    const active = coupons.filter((c) => c.active).length;
    const inactive = coupons.length - active;
    return { active, inactive };
  };

  const statusCounts = getStatusCounts();

  const getActiveCoupons = () => {
    const now = new Date();
    return coupons.filter(
      (c) => c.active && now >= new Date(c.validFrom) && now <= new Date(c.validTo)
    ).length;
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Coupons</h1>
          <p className="text-muted-foreground">
            Create and manage discount coupons for your customers
          </p>
        </div>
        <Button onClick={() => {
          setEditingCoupon(undefined);
          setIsDialogOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Create Coupon
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Ticket className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-2xl font-bold">{coupons.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Tag className="h-4 w-4 text-success mr-2" />
              <span className="text-2xl font-bold">{getActiveCoupons()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Badge variant="success" className="flex items-center gap-1">
              <span>{statusCounts.active}</span>
              <span>Active</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <span>{statusCounts.inactive}</span>
              <span>Inactive</span>
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search coupons..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={(v) => setActiveFilter(v as any)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : filteredCoupons.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 border rounded-md bg-muted/10">
          <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">No coupons found</h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? `No results for "${searchQuery}"`
              : "No coupons match the selected filter"}
          </p>
        </div>
      ) : (
        <CouponList
          coupons={filteredCoupons}
          onEdit={openEditDialog}
          onDelete={handleDeleteCoupon}
          onToggleActive={handleToggleActive}
        />
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingCoupon ? "Edit Coupon" : "Create New Coupon"}</DialogTitle>
            <DialogDescription>
              {editingCoupon
                ? "Update the coupon details. Changes will be applied immediately."
                : "Fill in the details to create a new discount coupon."}
            </DialogDescription>
          </DialogHeader>
          <CouponForm
            coupon={editingCoupon}
            onSubmit={editingCoupon ? handleEditCoupon : handleCreateCoupon}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
