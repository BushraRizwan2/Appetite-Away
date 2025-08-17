export enum UserRole {
  Customer = 'Customer',
  Restaurant = 'Restaurant',
  Rider = 'Rider',
  Shopkeeper = 'Shopkeeper',
  Admin = 'Admin',
}

export interface User {
  id: string;
  name: string; // For Customer/Rider: Full Name, for Restaurant: Owner's Name
  email: string;
  role: UserRole;
  phone?: string; // For verification and contact
  avatarUrl?: string;
  status: 'Active' | 'Inactive';
  joinedDate: string;
  // Role-specific optional fields
  businessName?: string; // Restaurant or Shopkeeper
  slogan?: string; // For Shopkeeper/Restaurant profile
  bannerUrl?: string; // For Shopkeeper/Restaurant profile
  restaurantAddress?: string; // Restaurant
  cuisineType?: string; // Restaurant
  taxId?: string; // Restaurant
  bankDetails?: string; // Restaurant
  logoUrl?: string; // Restaurant or Shopkeeper
  vehicleType?: 'bicycle' | 'motorbike' | 'car' | 'walker'; // Rider
}

export interface Comment {
  id: string;
  authorName: string;
  authorImageUrl: string;
  text: string;
  timestamp: string;
}

export interface Story {
  id: string;
  title: string;
  authorName: string;
  authorRole: 'Customer' | 'Restaurant' | 'Rider' | 'Shopkeeper';
  authorImageUrl: string;
  imageUrl: string;
  content: string;
  likes: number;
  shares: number;
  comments: Comment[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  timestamp: string;
  likedDishes?: MenuItem[];
}

export interface PromoTag {
    text: string;
    icon?: string;
    bgColor: string;
    textColor: string;
}

export interface Restaurant {
  id:string;
  name: string;
  cuisine: string; // Main cuisine category
  tags: string[]; // Detailed tags like 'BBQ', 'Pakistani'
  rating: number;
  reviewCount: number;
  distance: string;
  imageUrl: string; // For restaurant list card
  logoUrl: string; // For restaurant page header
  menu: { category: string; items: MenuItem[] }[];
  reviews: Review[];
  address: string;
  minOrder: number; // 0 for no minimum
  deliveryFee: number;
  deliveryTime: string; // e.g., '5-20 min'
  isNew?: boolean;
  // New fields for advanced homepage
  promoTags?: PromoTag[];
  isAd?: boolean;
  priceTier?: string; // e.g., '$$'
  saverPrice?: number;
  hasFreeDelivery?: boolean;
  acceptsVouchers?: boolean;
  hasDeals?: boolean;
}


export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  inStock: boolean;
  category: string;
  isPopular?: boolean;
  preparationTime?: number; // in minutes
  ingredients?: string; // comma-separated
  stockLevel?: number;
}

export interface CartItem extends MenuItem {
  cartItemId: string; // Unique ID for each item instance in the cart
  quantity: number;
  specialInstructions?: string;
  ifUnavailable?: 'remove' | 'contact' | 'replace';
}


export enum OrderStatus {
    Incoming = 'Incoming',
    Preparing = 'Preparing',
    ReadyForPickup = 'Ready for Pickup',
    OutForDelivery = 'Out for Delivery',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
    Rejected = 'Rejected',
}

export interface Chef {
    id: string;
    name: string;
    avatarUrl: string;
}


export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  restaurantName: string;
  restaurantPhone?: string;
  restaurantLogoUrl?: string;
  items: CartItem[];
  status: OrderStatus;
  date: string;
  deliveryAddress: string;
  restaurantAddress: string;
  estimatedArrival: string;
  bill: {
    subtotal: number;
    deliveryFee: number;
    serviceFee: number;
    discount: number;
    total: number;
  };
  riderInfo?: {
      name: string;
      phone?: string;
      vehicle: string;
      vehiclePlate: string;
      rating: number;
      avatarUrl: string;
  };
  assignedChef?: Chef;
  paymentMethod?: string;
  notesForRestaurant?: string;
  notesForRider?: string;
  chatHistory?: { sender: 'Rider' | 'Customer'; text: string; timestamp: string }[];
}

export interface DeliveryRequest {
    id:string;
    orderId: string;
    restaurantName: string;
    restaurantAddress: string;
    customerName: string;
    customerAddress: string;
    payout: number;
    distance: number;
    items: { name: string; quantity: number }[];
    status: 'Pending' | 'Active' | 'Completed';
}

export interface Address {
  id: string;
  label: 'Home' | 'Work' | 'Other';
  street: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  cardType: 'Visa' | 'Mastercard';
  last4: string;
  expiryDate: string; // MM/YY
  isDefault: boolean;
}

export interface Voucher {
    id: string;
    code: string;
    description: string;
    discount: string; // e.g., "20% off" or "Rs. 50 off"
    expiryDate: string;
}

export interface HelpTopic {
    id: string;
    question: string;
    answer: string;
}

export interface Transaction {
  id: string;
  orderId: string;
  date: string;
  customerName: string;
  amount: number; // Gross amount
  method: 'Card' | 'COD' | 'Wallet';
  status: 'Completed' | 'Pending' | 'Failed';
  breakdown: {
    subtotal: number;
    platformFee: number; // This is a negative value or deducted value
    tax: number;
    netPayout: number;
  };
  items: CartItem[];
}