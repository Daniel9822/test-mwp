"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { ProductsInterface } from "@/types/products";

interface ProductSelectorProps {
  onSelectProduct: (product: ProductsInterface) => void;
}

export default function ProductSelector({ onSelectProduct }: ProductSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<ProductsInterface[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock products data (in a real app, this would come from an API)
  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  Loading products...
                </TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.productUuid}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectProduct(product)}
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Mock products data for demonstration
const mockProducts: ProductsInterface[] = [
  {
    qty: 1,
    idProduct: 1,
    productUuid: "p1",
    name: "T-Shirt",
    price: 19.99,
    description: "Cotton T-Shirt",
    form: "clothing",
    material: "cotton",
    size: ["S", "M", "L", "XL"],
    stock: true,
    imageUrl: "/images/tshirt.jpg",
    uuidCategory: "cat1",
    pack: {
      S: [{ price: 19.99, qty: 10 }],
      M: [{ price: 19.99, qty: 15 }],
      L: [{ price: 21.99, qty: 8 }],
      XL: [{ price: 21.99, qty: 5 }]
    },
    enableLink: true
  },
  {
    qty: 1,
    idProduct: 2,
    productUuid: "p2",
    name: "Hoodie",
    price: 39.99,
    description: "Warm hoodie for winter",
    form: "clothing",
    material: "cotton",
    size: ["S", "M", "L", "XL"],
    stock: true,
    imageUrl: "/images/hoodie.jpg",
    uuidCategory: "cat1",
    pack: {
      S: [{ price: 39.99, qty: 7 }],
      M: [{ price: 39.99, qty: 12 }],
      L: [{ price: 42.99, qty: 8 }],
      XL: [{ price: 42.99, qty: 3 }]
    },
    enableLink: true
  },
  {
    qty: 1,
    idProduct: 3,
    productUuid: "p3",
    name: "Coffee Mug",
    price: 12.99,
    description: "Ceramic coffee mug",
    form: "tableware",
    material: "ceramic",
    size: ["Standard"],
    stock: true,
    imageUrl: "/images/mug.jpg",
    uuidCategory: "cat2",
    pack: {
      Standard: [{ price: 12.99, qty: 20 }]
    },
    enableLink: true
  },
  {
    qty: 1,
    idProduct: 4,
    productUuid: "p4",
    name: "Custom Banner",
    price: 79.99,
    description: "Customizable vinyl banner",
    form: "signage",
    material: "vinyl",
    size: ["Small", "Medium", "Large"],
    stock: true,
    imageUrl: "/images/banner.jpg",
    uuidCategory: "cat3",
    pack: {
      Small: [{ price: 79.99, qty: 5 }],
      Medium: [{ price: 99.99, qty: 5 }],
      Large: [{ price: 129.99, qty: 3 }]
    },
    enableLink: true
  },
  {
    qty: 1,
    idProduct: 5,
    productUuid: "p5",
    name: "Business Cards",
    price: 29.99,
    description: "Premium business cards, pack of 100",
    form: "print",
    material: "cardstock",
    size: ["Standard"],
    stock: true,
    imageUrl: "/images/cards.jpg",
    uuidCategory: "cat4",
    pack: {
      Standard: [{ price: 29.99, qty: 15 }]
    },
    enableLink: true
  }
];
