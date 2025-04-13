export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isTrending?: boolean;
  isSummerDeal?: boolean;
  isRecommended?: boolean;
  isSuggested?: boolean;
  isNearby?: boolean;
  sizes?: string[];
  colors?: string[];
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  addresses: Address[];
  favorites: string[];
  recentlyViewed: string[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
}

export interface CustomOutfit {
  id: string;
  name: string;
  type: string;
  model: string;
  measurements: {
    [key: string]: number,
  };
  previewImage: string;
}
