"use client";

import { useState } from "react";
import { Coupon } from "@/types/coupon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Copy, Edit, MoreVertical, Trash2, ToggleRight } from "lucide-react";

interface CouponListProps {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, active: boolean) => void;
}

export default function CouponList({
  coupons,
  onEdit,
  onDelete,
  onToggleActive,
}: CouponListProps) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [sortedCoupons, setSortedCoupons] = useState<Coupon[]>(coupons);
  const [sortField, setSortField] = useState<keyof Coupon>("validTo");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Sort coupons when props or sort settings change
  useState(() => {
    const sorted = [...coupons].sort((a, b) => {
      if (sortField === "validFrom" || sortField === "validTo" || sortField === "createdAt") {
        return sortDirection === "asc"
          ? new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime()
          : new Date(b[sortField]).getTime() - new Date(a[sortField]).getTime();
      } else if (sortField === "couponDiscount" || sortField === "usageCount") {
        return sortDirection === "asc"
          ? a[sortField] - b[sortField]
          : b[sortField] - a[sortField];
      } else {
        // For string fields
        const aValue = a[sortField]?.toString() || "";
        const bValue = b[sortField]?.toString() || "";
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    });
    setSortedCoupons(sorted);
  });

  const formatCouponType = (type: Coupon["couponType"]) => {
    switch (type) {
      case "percent":
        return "Percentage";
      case "fixed":
        return "Fixed Amount";
      case "free_shipping":
        return "Free Shipping";
      default:
        return type;
    }
  };

  const formatCouponUsage = (usage: Coupon["couponUsage"]) => {
    switch (usage) {
      case "single":
        return "Single Use";
      case "multiple":
        return "Multiple Uses";
      case "unlimited":
        return "Unlimited";
      default:
        return usage;
    }
  };

  const handleSort = (field: keyof Coupon) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to descending
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // Could add a toast notification here
  };

  const isCouponActive = (coupon: Coupon) => {
    const now = new Date();
    return (
      coupon.active &&
      now >= new Date(coupon.validFrom) &&
      now <= new Date(coupon.validTo)
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("couponCode")} className="cursor-pointer">
              Code
            </TableHead>
            <TableHead onClick={() => handleSort("couponType")} className="cursor-pointer">
              Type
            </TableHead>
            <TableHead onClick={() => handleSort("couponDiscount")} className="cursor-pointer">
              Discount
            </TableHead>
            <TableHead onClick={() => handleSort("validFrom")} className="cursor-pointer">
              Valid From
            </TableHead>
            <TableHead onClick={() => handleSort("validTo")} className="cursor-pointer">
              Valid To
            </TableHead>
            <TableHead onClick={() => handleSort("couponUsage")} className="cursor-pointer">
              Usage
            </TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCoupons.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                No coupons found. Create your first coupon!
              </TableCell>
            </TableRow>
          ) : (
            sortedCoupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <span>{coupon.couponCode}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(coupon.couponCode)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{formatCouponType(coupon.couponType)}</TableCell>
                <TableCell>
                  {coupon.couponType === "percent"
                    ? `${coupon.couponDiscount}%`
                    : coupon.couponType === "fixed"
                    ? `$${coupon.couponDiscount.toFixed(2)}`
                    : "Shipping"}
                </TableCell>
                <TableCell>{format(new Date(coupon.validFrom), "MMM d, yyyy")}</TableCell>
                <TableCell>{format(new Date(coupon.validTo), "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{formatCouponUsage(coupon.couponUsage)}</span>
                    {coupon.couponUsage !== "unlimited" && (
                      <span className="text-xs text-muted-foreground">
                        {coupon.usageCount} {coupon.maxUsage ? `/ ${coupon.maxUsage}` : ""} used
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={
                      isCouponActive(coupon)
                        ? "success"
                        : coupon.active
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {isCouponActive(coupon)
                      ? "Active"
                      : coupon.active
                      ? "Scheduled"
                      : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(coupon)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onToggleActive(coupon.id, !coupon.active)}
                      >
                        <ToggleRight className="mr-2 h-4 w-4" />
                        {coupon.active ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setConfirmDelete(coupon.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Delete confirmation dialog */}
      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this coupon? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 py-3">
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmDelete) {
                  onDelete(confirmDelete);
                  setConfirmDelete(null);
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
