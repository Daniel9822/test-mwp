/* eslint-disable @typescript-eslint/no-explicit-any */
// Product Interface
export interface ProductsInterface {
  qty: any;
  idProduct: number;
  productUuid: string;
  name: string;
  price: number;
  pack: {
    [size: string]: {
      price: number;
      qty: number;
    }[];
  };
  description: string;
  form: string;
  material: string;
  size: string[];
  stock: boolean;
  imageUrl: string;
  uuidCategory: string;
  uuidTag?: string[];
  options?: string[];
}

// Category Interface
export interface CategoriesInterface {
  uuid_category: string;
  category_name: string;
  category_description: string;
  image_url: string;
}

// Order Interface
export interface OrderInterface {
  idOrder: number;
  orderNumber: string;
  uuidOrder: string;
  customerId: number;
  status: string[];
  total_amount: number;
  options: string[];
  orderItems: OrderItemInterface[];
}

// Order Item Interface
export interface OrderItemInterface {
  id_order_item: number;
  uuid_order_item: string;
  orderId: number;
  productId: number;
  quantity: number;
  pack: number;
  price: number;
  preview_image: string[];
  options: string[];
  qr_link: string;
  note: string;
}

// Customer Interface
export interface CustomerInterface {
  username: string;
  email: string;
  isAdmin: boolean;
  userId: number;
  uuid: string;
  iat: number;
  exp: number;
}
