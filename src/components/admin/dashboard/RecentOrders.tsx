"use client";

import { Avatar } from "@/components/ui/avatar";

const orders = [
  {
    id: 1,
    product: "Marco Shoes",
    image: "/products/shoes.webp",
    price: 29.99,
    quantity: 1,
    total: 29.99,
    status: "Sold"
  },
  {
    id: 2,
    product: "High Waist Tshirt",
    image: "/products/tshirt.webp",
    price: 9.99,
    quantity: 3,
    total: 29.97,
    status: "Sold"
  },
  {
    id: 3,
    product: "Comfirt Chair",
    image: "/products/chair.webp",
    price: 49.99,
    quantity: 1,
    total: 49.99,
    status: "Return"
  },
  {
    id: 4,
    product: "Smart Headphone",
    image: "/products/headphone.webp",
    price: 39.99,
    quantity: 1,
    total: 39.99,
    status: "Sold"
  },
  {
    id: 5,
    product: "Laptop Bag",
    image: "/products/bag.webp",
    price: 12.99,
    quantity: 4,
    total: 51.96,
    status: "Sold"
  }
];

const ProductIcon = ({ product }: { product: string }) => {
  let bgColor = "bg-gray-100";
  let icon = "📦";

  if (product.includes("Shoes")) {
    icon = "👟";
    bgColor = "bg-yellow-100";
  } else if (product.includes("Tshirt")) {
    icon = "👕";
    bgColor = "bg-blue-100";
  } else if (product.includes("Chair")) {
    icon = "🪑";
    bgColor = "bg-red-100";
  } else if (product.includes("Headphone")) {
    icon = "🎧";
    bgColor = "bg-green-100";
  } else if (product.includes("Bag")) {
    icon = "🎒";
    bgColor = "bg-purple-100";
  }

  return (
    <div className={`flex items-center justify-center w-10 h-10 rounded-md ${bgColor}`}>
      <span className="text-xl">{icon}</span>
    </div>
  );
};

const RecentOrders = () => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ProductIcon product={order.product} />
            <div>
              <h3 className="font-medium">{order.product}</h3>
              <p className="text-sm text-muted-foreground">
                ${order.price} × {order.quantity} = ${order.total.toFixed(2)}
              </p>
            </div>
          </div>
          <div>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                order.status === "Sold"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentOrders;
