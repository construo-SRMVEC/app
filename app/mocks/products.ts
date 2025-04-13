import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    description:
      "Ultra-soft premium cotton t-shirt with a comfortable fit. Perfect for everyday wear and available in multiple colors.",
    price: 29.99,
    discountPrice: 19.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "clothing",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isRecommended: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Blue", "Red"],
    stock: 50,
  },
  {
    id: "2",
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
    price: 199.99,
    discountPrice: 149.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "electronics",
    rating: 4.6,
    reviews: 89,
    isTrending: true,
    colors: ["Black", "White", "Blue"],
    stock: 25,
  },
  {
    id: "3",
    name: "Slim Fit Jeans",
    description:
      "Classic slim fit jeans with stretch for comfort. Versatile style for any occasion.",
    price: 59.99,
    discountPrice: 39.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "clothing",
    rating: 4.5,
    reviews: 76,
    isSummerDeal: true,
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Blue", "Black", "Gray"],
    stock: 40,
  },
  {
    id: "4",
    name: "Smart Watch Series 5",
    description:
      "Advanced smartwatch with health monitoring, GPS, and water resistance. Stay connected on the go.",
    price: 299.99,
    discountPrice: 249.99,
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "electronics",
    rating: 4.9,
    reviews: 215,
    isRecommended: true,
    isTrending: true,
    colors: ["Black", "Silver", "Gold"],
    stock: 15,
  },
  {
    id: "5",
    name: "Summer Floral Dress",
    description:
      "Light and breezy floral dress perfect for summer days. Features a flattering cut and comfortable fabric.",
    price: 49.99,
    discountPrice: 34.99,
    images: [
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "clothing",
    rating: 4.7,
    reviews: 68,
    isSummerDeal: true,
    isNew: true,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Floral Print", "Blue", "Pink"],
    stock: 30,
  },
  {
    id: "6",
    name: "Professional DSLR Camera",
    description:
      "High-performance DSLR camera with 24.1MP sensor, 4K video recording, and advanced autofocus system.",
    price: 1299.99,
    discountPrice: 1099.99,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "electronics",
    rating: 4.8,
    reviews: 42,
    isSuggested: true,
    colors: ["Black"],
    stock: 8,
  },
  {
    id: "7",
    name: "Leather Crossbody Bag",
    description:
      "Stylish genuine leather crossbody bag with adjustable strap and multiple compartments.",
    price: 89.99,
    discountPrice: 69.99,
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "accessories",
    rating: 4.6,
    reviews: 57,
    isRecommended: true,
    colors: ["Brown", "Black", "Tan"],
    stock: 20,
  },
  {
    id: "8",
    name: "Running Shoes",
    description:
      "Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for comfort and performance.",
    price: 129.99,
    discountPrice: 99.99,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "footwear",
    rating: 4.7,
    reviews: 134,
    isTrending: true,
    isNearby: true,
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black/Red", "Blue/White", "Gray/Green"],
    stock: 35,
  },
  {
    id: "9",
    name: "Stainless Steel Water Bottle",
    description:
      "Double-walled insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Eco-friendly and durable.",
    price: 34.99,
    discountPrice: 24.99,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "accessories",
    rating: 4.5,
    reviews: 92,
    isSuggested: true,
    colors: ["Silver", "Black", "Blue", "Red"],
    stock: 50,
  },
  {
    id: "10",
    name: "Linen Summer Shirt",
    description:
      "Breathable linen shirt perfect for hot summer days. Relaxed fit with a classic collar.",
    price: 69.99,
    discountPrice: 49.99,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "clothing",
    rating: 4.6,
    reviews: 48,
    isSummerDeal: true,
    isNearby: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Blue", "Beige"],
    stock: 25,
  },
  {
    id: "11",
    name: "Wireless Earbuds",
    description:
      "True wireless earbuds with premium sound quality, touch controls, and 30-hour battery life with charging case.",
    price: 129.99,
    discountPrice: 99.99,
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "electronics",
    rating: 4.8,
    reviews: 156,
    isNew: true,
    isRecommended: true,
    colors: ["White", "Black"],
    stock: 18,
  },
  {
    id: "12",
    name: "Yoga Mat",
    description:
      "Non-slip yoga mat with alignment lines. Eco-friendly material with perfect cushioning for joints.",
    price: 49.99,
    discountPrice: 39.99,
    images: [
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ],
    category: "fitness",
    rating: 4.7,
    reviews: 83,
    isSuggested: true,
    isNearby: true,
    colors: ["Purple", "Blue", "Green", "Pink"],
    stock: 40,
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getRecommendedProducts = (): Product[] => {
  return products.filter((product) => product.isRecommended);
};

export const getNewProducts = (): Product[] => {
  return products.filter((product) => product.isNew);
};

export const getTrendingProducts = (): Product[] => {
  return products.filter((product) => product.isTrending);
};

export const getSummerDeals = (): Product[] => {
  return products.filter((product) => product.isSummerDeal);
};

export const getSuggestedProducts = (): Product[] => {
  return products.filter((product) => product.isSuggested);
};

export const getNearbyProducts = (): Product[] => {
  return products.filter((product) => product.isNearby);
};

export const getRelatedProducts = (productId: string): Product[] => {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];

  return products
    .filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, 4);
};
