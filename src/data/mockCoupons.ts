import { Coupon } from "../types/coupon";

export const mockCoupons: Coupon[] = [
  {
    id: "coup-001",
    couponType: "percent",
    couponUsage: "multiple",
    couponCode: "SUMMER25",
    couponDiscount: 25,
    validFrom: new Date(2025, 4, 1),
    validTo: new Date(2025, 7, 31),
    active: true,
    usageCount: 12,
    maxUsage: 100,
    minOrderAmount: 50,
    appliesTo: "all",
    createdAt: new Date(2025, 3, 15)
  },
  {
    id: "coup-002",
    couponType: "fixed",
    couponUsage: "single",
    couponCode: "WELCOME10",
    couponDiscount: 10,
    validFrom: new Date(2025, 0, 1),
    validTo: new Date(2025, 11, 31),
    active: true,
    usageCount: 45,
    appliesTo: "all",
    createdAt: new Date(2024, 11, 20)
  },
  {
    id: "coup-003",
    couponType: "free_shipping",
    couponUsage: "unlimited",
    couponCode: "FREESHIP",
    couponDiscount: 0,
    validFrom: new Date(2025, 3, 15),
    validTo: new Date(2025, 5, 30),
    active: true,
    usageCount: 28,
    minOrderAmount: 75,
    appliesTo: "all",
    createdAt: new Date(2025, 3, 10)
  },
  {
    id: "coup-004",
    couponType: "percent",
    couponUsage: "multiple",
    couponCode: "ELECTRONICS15",
    couponDiscount: 15,
    validFrom: new Date(2025, 2, 1),
    validTo: new Date(2025, 11, 31),
    active: true,
    usageCount: 8,
    maxUsage: 50,
    appliesTo: "specific_categories",
    categoryIds: ["cat-001"], // Electronics category
    createdAt: new Date(2025, 1, 25)
  },
  {
    id: "coup-005",
    couponType: "percent",
    couponUsage: "single",
    couponCode: "FLASH50",
    couponDiscount: 50,
    validFrom: new Date(2025, 4, 15),
    validTo: new Date(2025, 4, 16), // 24-hour flash sale
    active: false, // Expired
    usageCount: 87,
    maxUsage: 100,
    minOrderAmount: 100,
    appliesTo: "all",
    createdAt: new Date(2025, 4, 10)
  }
];
