export type CouponType = 'percent' | 'fixed' | 'free_shipping';
export type CouponUsage = 'single' | 'multiple' | 'unlimited';

export interface Coupon {
  id: string;
  couponType: CouponType;
  couponUsage: CouponUsage;
  couponCode: string;
  couponDiscount: number;
  validFrom: Date;
  validTo: Date;
  active: boolean;
  usageCount: number;
  maxUsage?: number;
  minOrderAmount?: number;
  appliesTo?: 'all' | 'specific_products' | 'specific_categories';
  productIds?: string[];
  categoryIds?: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface CouponFormData {
  couponType: CouponType;
  couponUsage: CouponUsage;
  couponCode: string;
  couponDiscount: number;
  validFrom: string; // ISO string format for form input
  validTo: string; // ISO string format for form input
  active: boolean;
  maxUsage?: number;
  minOrderAmount?: number;
  appliesTo?: 'all' | 'specific_products' | 'specific_categories';
  productIds?: string[];
  categoryIds?: string[];
}
