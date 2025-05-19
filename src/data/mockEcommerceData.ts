import {
  ProductsInterface,
  CategoriesInterface,
  OrderInterface,
  CustomerInterface
} from "../types/ecommerce";

// Mock Categories
export const mockCategories: CategoriesInterface[] = [
  {
    uuid_category: "cat-001",
    category_name: "Electronics",
    category_description: "Electronic devices and accessories",
    image_url: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D"
  },
  {
    uuid_category: "cat-002",
    category_name: "Clothing",
    category_description: "Apparel and fashion items",
    image_url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsb3RoaW5nfGVufDB8fDB8fHww"
  },
  {
    uuid_category: "cat-003",
    category_name: "Home & Garden",
    category_description: "Products for home decor and gardening",
    image_url: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww"
  },
  {
    uuid_category: "cat-004",
    category_name: "Sports",
    category_description: "Sports equipment and accessories",
    image_url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    uuid_category: "cat-005",
    category_name: "Books",
    category_description: "Books, magazines, and reading materials",
    image_url: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJvb2tzfGVufDB8fDB8fHww"
  }
];

// Mock Products
export const mockProducts: ProductsInterface[] = [
  {
    idProduct: 1,
    productUuid: "prod-001",
    name: "Premium Wireless Headphones",
    price: 129.99,
    pack: {
      "Standard": [
        { price: 129.99, qty: 100 }
      ],
      "Deluxe": [
        { price: 149.99, qty: 50 }
      ]
    },
    description: "High-quality wireless headphones with noise cancellation technology.",
    form: "Over-ear",
    material: "Premium leather and aluminum",
    size: ["One size"],
    stock: true,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
    uuidCategory: "cat-001",
    uuidTag: ["premium", "audio", "wireless"],
    options: ["Black", "White", "Blue"]
  },
  {
    idProduct: 2,
    productUuid: "prod-002",
    name: "Smart Watch",
    price: 199.99,
    pack: {
      "Basic": [
        { price: 199.99, qty: 80 }
      ],
      "Premium": [
        { price: 249.99, qty: 40 }
      ]
    },
    description: "Smart watch with fitness tracking and notifications.",
    form: "Wrist watch",
    material: "Aluminum and silicone",
    size: ["S", "M", "L"],
    stock: true,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3RzfGVufDB8fDB8fHww",
    uuidCategory: "cat-001",
    uuidTag: ["smart", "wearable", "tech"],
    options: ["Black", "Silver", "Gold"]
  },
  {
    idProduct: 3,
    productUuid: "prod-003",
    name: "Designer T-shirt",
    price: 39.99,
    pack: {
      "Single": [
        { price: 39.99, qty: 200 }
      ],
      "Pack of 3": [
        { price: 99.99, qty: 50 }
      ]
    },
    description: "Premium designer t-shirt made with organic cotton.",
    form: "Regular fit",
    material: "100% Organic Cotton",
    size: ["S", "M", "L", "XL"],
    stock: true,
    imageUrl: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    uuidCategory: "cat-002",
    uuidTag: ["fashion", "clothing", "designer"],
    options: ["White", "Black", "Gray", "Navy"]
  },
  {
    idProduct: 4,
    productUuid: "prod-004",
    name: "Modern Coffee Table",
    price: 249.99,
    pack: {
      "Standard": [
        { price: 249.99, qty: 30 }
      ]
    },
    description: "Modern coffee table with minimalist design.",
    form: "Rectangular",
    material: "Wood and metal",
    size: ["Small", "Large"],
    stock: true,
    imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnVybml0dXJlfGVufDB8fDB8fHww",
    uuidCategory: "cat-003",
    uuidTag: ["furniture", "home", "modern"],
    options: ["Oak", "Walnut", "White"]
  },
  {
    idProduct: 5,
    productUuid: "prod-005",
    name: "Basketball",
    price: 29.99,
    pack: {
      "Standard": [
        { price: 29.99, qty: 100 }
      ]
    },
    description: "Professional indoor/outdoor basketball.",
    form: "Spherical",
    material: "Synthetic leather",
    size: ["Size 7", "Size 6", "Size 5"],
    stock: true,
    imageUrl: "https://images.unsplash.com/photo-1518339235722-69b91a679621?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFza2V0YmFsbHxlbnwwfHwwfHx8MA%3D%3D",
    uuidCategory: "cat-004",
    uuidTag: ["sports", "basketball", "outdoor"],
    options: ["Orange", "Black"]
  },
  {
    idProduct: 6,
    productUuid: "prod-006",
    name: "Bestselling Novel",
    price: 14.99,
    pack: {
      "Paperback": [
        { price: 14.99, qty: 300 }
      ],
      "Hardcover": [
        { price: 24.99, qty: 150 }
      ]
    },
    description: "Award-winning bestselling novel that has captured readers worldwide.",
    form: "Book",
    material: "Paper",
    size: ["Standard"],
    stock: true,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJvb2t8ZW58MHx8MHx8fDA%3D",
    uuidCategory: "cat-005",
    uuidTag: ["books", "fiction", "bestseller"],
    options: ["English", "Spanish"]
  }
];

// Mock Orders
export const mockOrders: OrderInterface[] = [
  {
    idOrder: 1,
    orderNumber: "ORD-2023-001",
    uuidOrder: "ord-001",
    customerId: 1,
    status: ["Completed"],
    total_amount: 299.98,
    options: ["Express Shipping"],
    orderItems: [
      {
        id_order_item: 1,
        uuid_order_item: "item-001",
        orderId: 1,
        productId: 1,
        quantity: 1,
        pack: 1,
        price: 129.99,
        preview_image: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=250"],
        options: ["Black"],
        qr_link: "https://example.com/qr/item-001",
        note: "Handle with care"
      },
      {
        id_order_item: 2,
        uuid_order_item: "item-002",
        orderId: 1,
        productId: 3,
        quantity: 2,
        pack: 1,
        price: 79.98,
        preview_image: ["https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=250"],
        options: ["White", "M"],
        qr_link: "https://example.com/qr/item-002",
        note: ""
      }
    ]
  },
  {
    idOrder: 2,
    orderNumber: "ORD-2023-002",
    uuidOrder: "ord-002",
    customerId: 2,
    status: ["Processing"],
    total_amount: 199.99,
    options: ["Standard Shipping"],
    orderItems: [
      {
        id_order_item: 3,
        uuid_order_item: "item-003",
        orderId: 2,
        productId: 2,
        quantity: 1,
        pack: 1,
        price: 199.99,
        preview_image: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=250"],
        options: ["Silver", "M"],
        qr_link: "https://example.com/qr/item-003",
        note: ""
      }
    ]
  },
  {
    idOrder: 3,
    orderNumber: "ORD-2023-003",
    uuidOrder: "ord-003",
    customerId: 3,
    status: ["Shipped"],
    total_amount: 249.99,
    options: ["Gift Wrap"],
    orderItems: [
      {
        id_order_item: 4,
        uuid_order_item: "item-004",
        orderId: 3,
        productId: 4,
        quantity: 1,
        pack: 1,
        price: 249.99,
        preview_image: ["https://images.unsplash.com/photo-1592078615290-033ee584e267?w=250"],
        options: ["Oak", "Small"],
        qr_link: "https://example.com/qr/item-004",
        note: "Gift for anniversary"
      }
    ]
  },
  {
    idOrder: 4,
    orderNumber: "ORD-2023-004",
    uuidOrder: "ord-004",
    customerId: 1,
    status: ["Pending"],
    total_amount: 44.98,
    options: ["Standard Shipping"],
    orderItems: [
      {
        id_order_item: 5,
        uuid_order_item: "item-005",
        orderId: 4,
        productId: 5,
        quantity: 1,
        pack: 1,
        price: 29.99,
        preview_image: ["https://images.unsplash.com/photo-1518339335866-2b05e5a11d42?w=250"],
        options: ["Orange", "Size 7"],
        qr_link: "https://example.com/qr/item-005",
        note: ""
      },
      {
        id_order_item: 6,
        uuid_order_item: "item-006",
        orderId: 4,
        productId: 6,
        quantity: 1,
        pack: 1,
        price: 14.99,
        preview_image: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=250"],
        options: ["English", "Paperback"],
        qr_link: "https://example.com/qr/item-006",
        note: ""
      }
    ]
  }
];

// Mock Customers
export const mockCustomers: CustomerInterface[] = [
  {
    username: "john_doe",
    email: "john.doe@example.com",
    isAdmin: false,
    userId: 1,
    uuid: "user-001",
    iat: 1620000000,
    exp: 1730000000
  },
  {
    username: "jane_smith",
    email: "jane.smith@example.com",
    isAdmin: false,
    userId: 2,
    uuid: "user-002",
    iat: 1620100000,
    exp: 1730100000
  },
  {
    username: "admin_user",
    email: "admin@example.com",
    isAdmin: true,
    userId: 3,
    uuid: "user-003",
    iat: 1620200000,
    exp: 1730200000
  },
  {
    username: "sam_johnson",
    email: "sam.johnson@example.com",
    isAdmin: false,
    userId: 4,
    uuid: "user-004",
    iat: 1620300000,
    exp: 1730300000
  },
  {
    username: "alex_brown",
    email: "alex.brown@example.com",
    isAdmin: false,
    userId: 5,
    uuid: "user-005",
    iat: 1620400000,
    exp: 1730400000
  }
];
