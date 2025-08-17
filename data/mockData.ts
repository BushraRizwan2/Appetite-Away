import { Restaurant, MenuItem, Review, PromoTag, Order, OrderStatus, CartItem, Chef, DeliveryRequest, Transaction } from '../types';

// --- MENUS ---
export const PAKISTANI_MENU: { category: string, items: MenuItem[] }[] = [
    { category: "Popular", items: [
        { id: 'pk-biryani-s', name: 'Chicken Biryani (Single)', description: 'Aromatic basmati rice cooked with chicken and a blend of exotic spices.', price: 380, imageUrl: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Popular', isPopular: true },
        { id: 'pk-karahi-h', name: 'Chicken Karahi (Half)', description: 'A rich and spicy chicken curry cooked in a traditional karahi wok.', price: 850, imageUrl: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Popular', isPopular: true },
        { id: 'pk-naan', name: 'Roghni Naan', description: 'Soft, fluffy, and enriched with milk and yogurt, topped with sesame seeds.', price: 60, imageUrl: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Popular' },
    ]},
    { category: "Biryani", items: [
        { id: 'pk-biryani-s-2', name: 'Chicken Biryani (Single)', description: 'Aromatic basmati rice cooked with chicken and a blend of exotic spices.', price: 380, imageUrl: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Biryani' },
        { id: 'pk-biryani-d', name: 'Chicken Biryani (Double)', description: 'A larger portion of our signature biryani.', price: 650, imageUrl: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Biryani' },
        { id: 'pk-biryani-mutton', name: 'Mutton Biryani', description: 'Tender mutton pieces layered with fragrant basmati rice.', price: 550, imageUrl: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Biryani' },
    ]},
].flatMap(category => category.items.length >= 3 ? [category, { category: `${category.category} (Cont.)`, items: new Array(10).fill(null).map((_, i) => ({ ...category.items[i % category.items.length], id: `${category.items[i % category.items.length].id}-${i}` })) }] : [category]).reduce((acc, curr) => { const existing = acc.find(c => c.category === curr.category); if (existing) { existing.items.push(...curr.items); } else { acc.push(curr); } return acc; }, [] as { category: string; items: MenuItem[] }[]);

const FASTFOOD_MENU: { category: string, items: MenuItem[] }[] = new Array(6).fill(null).map((_, i) => ({
    category: `Category ${i+1}`,
    items: new Array(4).fill(null).map((_, j) => ({
        id: `ff-c${i}-i${j}`,
        name: `Fast Food Item ${j+1}`,
        description: 'A delicious fast food item.',
        price: 250 + (i * 50) + j,
        imageUrl: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400',
        inStock: true,
        category: `Category ${i+1}`
    }))
}));

const CHINESE_MENU: { category: string, items: MenuItem[] }[] = new Array(5).fill(null).map((_, i) => ({
    category: `Chinese Category ${i+1}`,
    items: new Array(3).fill(null).map((_, j) => ({
        id: `ch-c${i}-i${j}`,
        name: `Chinese Item ${j+1}`,
        description: 'Authentic Chinese flavor.',
        price: 400 + (i * 50) + j,
        imageUrl: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=400',
        inStock: true,
        category: `Chinese Category ${i+1}`
    }))
}));

const PIZZA_MENU: { category: string, items: MenuItem[] }[] = new Array(4).fill(null).map((_, i) => ({
    category: `Pizza Category ${i+1}`,
    items: new Array(5).fill(null).map((_, j) => ({
        id: `pz-c${i}-i${j}`,
        name: `Pizza Item ${j+1}`,
        description: 'Cheesy and delicious pizza.',
        price: 1200 + (i * 100) + j,
        imageUrl: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=400',
        inStock: true,
        category: `Pizza Category ${i+1}`
    }))
}));

// --- REVIEWS ---
export const MOCK_REVIEWS: Review[] = [
    { id: 'rev1', author: 'Ayesha K.', rating: 5, comment: 'Absolutely delicious!', timestamp: '2 days ago' },
    { id: 'rev2', author: 'Bilal M.', rating: 4, comment: 'Good food, but a bit slow.', timestamp: '1 week ago', likedDishes: PAKISTANI_MENU[0].items.slice(0,1) },
    { id: 'rev3', author: 'Fatima Z.', rating: 5, comment: 'Best in town!', timestamp: '3 days ago' },
];

export const MOCK_REVIEWS_SUMMARY: Review[] = MOCK_REVIEWS.slice(0, 2);


// --- RESTAURANTS ---
const PROMO_TAG_1: PromoTag = { text: 'Up to 20% off', bgColor: 'bg-pink-600', textColor: 'text-white' };
const PROMO_TAG_2: PromoTag = { text: '10% cashback', bgColor: 'bg-pink-600', textColor: 'text-white' };
const PROMO_TAG_3: PromoTag = { text: 'Up to 15% off', bgColor: 'bg-pink-600', textColor: 'text-white' };
const PROMO_TAG_4: PromoTag = { text: '50% off Rs.199', bgColor: 'bg-yellow-400', textColor: 'text-black' };

const RESTAURANTS: Restaurant[] = [
    { id: '1', name: 'Tawakkal Biryani', cuisine: 'Pakistani', tags: ['Pakistani', 'Biryani'], rating: 4.7, reviewCount: 1200, distance: '1.2 km', imageUrl: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=Tawakkal+Biryani&background=dbeafe&color=1e40af', menu: PAKISTANI_MENU, reviews: MOCK_REVIEWS, address: '123 Food St, Karachi', minOrder: 0, deliveryFee: 99, deliveryTime: '20-45 min', promoTags: [PROMO_TAG_1, PROMO_TAG_2], isAd: true, priceTier: '$$', saverPrice: 179, hasDeals: true, acceptsVouchers: true },
    { id: '2', name: 'Nawab Pakwan & Biryani-B...', cuisine: 'Pakistani', tags: ['Pakistani', 'Biryani'], rating: 4.7, reviewCount: 2500, distance: '2.5 km', imageUrl: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=Nawab+Pakwan&background=dbeafe&color=1e40af', menu: PAKISTANI_MENU, reviews: MOCK_REVIEWS, address: '456 Spice Rd, Karachi', minOrder: 200, deliveryFee: 120, deliveryTime: '15-40 min', promoTags: [PROMO_TAG_3, PROMO_TAG_2], priceTier: '$$', saverPrice: 119, hasFreeDelivery: true },
    { id: '3', name: 'Shahi Darbar', cuisine: 'Fast Food', tags: ['Fast Food', 'Burgers'], rating: 4.7, reviewCount: 5500, distance: '3.1 km', imageUrl: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=Shahi+Darbar&background=dbeafe&color=1e40af', menu: FASTFOOD_MENU, reviews: MOCK_REVIEWS, address: '789 Grill Ave, Karachi', minOrder: 150, deliveryFee: 0, deliveryTime: '10-35 min', promoTags: [{ text: 'Up to 10% off', bgColor: 'bg-pink-600', textColor: 'text-white' }], isAd: true, priceTier: '$$', saverPrice: 89, hasFreeDelivery: true, hasDeals: true },
    { id: '4', name: 'Agha Mustafa Juice', cuisine: 'Healthy Food', tags: ['Healthy Food', 'Juice'], rating: 4.8, reviewCount: 4100, distance: '0.8 km', imageUrl: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=Agha+Mustafa+Juice&background=dbeafe&color=1e40af', menu: [], reviews: MOCK_REVIEWS, address: '321 Fresh Blvd, Karachi', minOrder: 100, deliveryFee: 50, deliveryTime: '10-35 min', promoTags: [{ text: 'Up to 10% off', bgColor: 'bg-pink-600', textColor: 'text-white' }, PROMO_TAG_2], priceTier: '$$', saverPrice: 79, acceptsVouchers: true },
    { id: '5', name: 'Red Apple - Safoora', cuisine: 'Pakistani', tags: ['Pakistani', 'BBQ', 'Fast Food'], rating: 4.8, reviewCount: 13, distance: '4.0 km', imageUrl: 'https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=Red+Apple&background=dbeafe&color=1e40af', menu: PAKISTANI_MENU, reviews: MOCK_REVIEWS, address: '654 Kebab Ln, Karachi', minOrder: 0, deliveryFee: 150, deliveryTime: '10-35 min', isAd: true, priceTier: '$$$', saverPrice: 79 },
    { id: '6', name: 'Taste Studio', cuisine: 'Fast Food', tags: ['Fast Food', 'BBQ'], rating: 4.7, reviewCount: 150, distance: '5.5 km', imageUrl: 'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=Taste+Studio&background=dbeafe&color=1e40af', menu: FASTFOOD_MENU, reviews: MOCK_REVIEWS, address: '987 Charcoal Rd, Karachi', minOrder: 250, deliveryFee: 80, deliveryTime: '10-35 min', promoTags: [{ text: '10% cashback', bgColor: 'bg-pink-600', textColor: 'text-white' }], isAd: true, priceTier: '$$', saverPrice: 79, hasDeals: true, hasFreeDelivery: true },
    { id: '7', name: 'Pizza Max', cuisine: 'Pizza', tags: ['Pizza', 'Italian'], rating: 4.5, reviewCount: 800, distance: '2.1 km', imageUrl: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=Pizza+Max&background=dbeafe&color=1e40af', menu: PIZZA_MENU, reviews: MOCK_REVIEWS, address: '111 Cheesy Way, Karachi', minOrder: 500, deliveryFee: 100, deliveryTime: '25-50 min', promoTags: [PROMO_TAG_4, PROMO_TAG_2], priceTier: '$$$', saverPrice: 199, acceptsVouchers: true },
    { id: '8', name: 'The Wok House', cuisine: 'Chinese', tags: ['Chinese', 'Asian'], rating: 4.9, reviewCount: 1500, distance: '3.8 km', imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800', logoUrl: 'https://ui-avatars.com/api/?name=The+Wok+House&background=dbeafe&color=1e40af', menu: CHINESE_MENU, reviews: MOCK_REVIEWS, address: '222 Noodle Ave, Karachi', minOrder: 300, deliveryFee: 75, deliveryTime: '20-45 min', priceTier: '$$$', hasDeals: true }
];

export const getMockRestaurantById = (id: string): Restaurant | undefined => RESTAURANTS.find(r => r.id === id);
export const getMockRestaurants = (): Restaurant[] => RESTAURANTS;
export const getMockCuisines = (): string[] => [...new Set(RESTAURANTS.flatMap(r => r.tags))].sort();


// --- ORDERS ---
const MOCK_ITEMS_PIZZA: CartItem[] = [
    { cartItemId: 'ci-p1', id: 'm3', name: 'Pepperoni Pizza', description: '', price: 14.99, imageUrl: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Pizza', quantity: 1, originalPrice: 18.00 }
];
const MOCK_ITEMS_BURGER: CartItem[] = [
    { cartItemId: 'ci-b1', id: 'm-b1', name: 'Classic Burger', description: '', price: 18.50, imageUrl: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Burgers', quantity: 1 },
    { cartItemId: 'ci-b2', id: 'm-f1', name: 'Fries', description: '', price: 4.00, imageUrl: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Sides', quantity: 1 }
];
const MOCK_ITEMS_TACO: CartItem[] = [
    { cartItemId: 'ci-t1', id: 'm-t1', name: 'Tacos', description: '', price: 6.50, imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Tacos', quantity: 2 },
    { cartItemId: 'ci-t2', id: 'm-n1', name: 'Nachos', description: '', price: 2.75, imageUrl: 'https://images.pexels.com/photos/2092916/pexels-photo-2092916.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Sides', quantity: 1 }
];
const MOCK_ITEMS_THAI: CartItem[] = [
     { cartItemId: 'ci-th1', id: 'm-th1', name: 'Pad Thai', description: '', price: 16.00, imageUrl: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=400', inStock: true, category: 'Noodles', quantity: 1 }
];
const MOCK_ITEMS_KARAHI: CartItem[] = [
    { cartItemId: 'ci-101-1', id: 'p1', name: 'Chicken Karahi (Half)', description: '', price: 850, imageUrl: '...', inStock: true, category: 'Mains', quantity: 1 },
    { cartItemId: 'ci-101-2', id: 'd1', name: 'Roghni Naan', description: '', price: 60, imageUrl: '...', inStock: true, category: 'Breads', quantity: 4 }
];
const MOCK_ITEMS_BIRYANI: CartItem[] = [
    { cartItemId: 'ci-102-1', id: 'p2', name: 'Chicken Biryani (Single)', description: '', price: 380, imageUrl: '...', inStock: true, category: 'Rice', quantity: 2 },
    { cartItemId: 'ci-102-2', id: 's1', name: 'Raita', description: '', price: 80, imageUrl: '...', inStock: true, category: 'Sides', quantity: 2 }
];


export const MOCK_ORDERS: Order[] = [
    { 
        id: 'ORD124', 
        customerId: 'cust-bob',
        customerName: 'Bob',
        restaurantName: 'Burger Barn', 
        items: MOCK_ITEMS_BURGER, 
        status: OrderStatus.OutForDelivery,
        date: '2024-05-21',
        deliveryAddress: '101 Maple Rd, Flavor Town',
        restaurantAddress: '789 Pine Ln, Grillville',
        estimatedArrival: '5-10 min',
        bill: { subtotal: 22.50, deliveryFee: 2.50, serviceFee: 1.00, discount: 0, total: 26.00 },
        riderInfo: { name: 'Muhammad', vehicle: 'Motorbike', vehiclePlate: 'KHI-1234', rating: 4.9, avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300' }
    },
    { 
        id: 'ORD123', 
        customerId: 'cust-alice',
        customerName: 'Alice',
        restaurantName: 'Pizza Palace', 
        items: MOCK_ITEMS_PIZZA, 
        status: OrderStatus.Delivered, 
        date: '2024-05-20',
        deliveryAddress: '456 Oak Ave, Salsa City',
        restaurantAddress: '123 Main St, Anytown',
        estimatedArrival: 'Delivered',
        bill: { subtotal: 14.99, deliveryFee: 3.00, serviceFee: 1.00, discount: -3.01, total: 15.98 },
    },
    { 
        id: 'ORD125', 
        customerId: 'cust-charlie',
        customerName: 'Charlie',
        restaurantName: 'Taco Town', 
        items: MOCK_ITEMS_TACO, 
        status: OrderStatus.Preparing, 
        date: '2024-05-21',
        deliveryAddress: '654 Birch Blvd, Flavor Town',
        restaurantAddress: '789 Fiesta Street, Salsa City',
        estimatedArrival: '20-25 min',
        bill: { subtotal: 15.75, deliveryFee: 2.00, serviceFee: 0.50, discount: 0, total: 18.25 },
    },
    { 
        id: 'ORD126', 
        customerId: 'cust-dana',
        customerName: 'Dana',
        restaurantName: 'The Golden Spoon', 
        items: MOCK_ITEMS_THAI, 
        status: OrderStatus.Cancelled, 
        date: '2024-05-19',
        deliveryAddress: '888 Wok St, Noodle City',
        restaurantAddress: '456 Noodle Way, Flavor Town',
        estimatedArrival: 'Cancelled',
        bill: { subtotal: 16.00, deliveryFee: 2.00, serviceFee: 0.50, discount: 0, total: 18.50 },
    },
];

export const MOCK_RESTAURANT_ORDERS: Order[] = [
    { 
        id: '101', 
        customerId: 'cust-ayesha-k',
        customerName: 'Ayesha K.', 
        restaurantName: 'The Golden Spoon', 
        items: MOCK_ITEMS_KARAHI, 
        status: OrderStatus.Incoming, 
        date: '2024-05-21',
        deliveryAddress: '123 Oak Ave',
        restaurantAddress: '456 Pizza St',
        estimatedArrival: '25-30 min',
        bill: { subtotal: 1090, deliveryFee: 50, serviceFee: 20, discount: 0, total: 1160 }
    },
    { 
        id: '102', 
        customerId: 'cust-bilal-m',
        customerName: 'Bilal M.', 
        restaurantName: 'The Golden Spoon', 
        items: MOCK_ITEMS_BIRYANI, 
        status: OrderStatus.Incoming, 
        date: '2024-05-21',
        deliveryAddress: '456 Pine Ln',
        restaurantAddress: '456 Pizza St',
        estimatedArrival: '25-30 min',
        bill: { subtotal: 920, deliveryFee: 50, serviceFee: 20, discount: 0, total: 990 }
    },
];

export const getMockOrderById = (id: string) => MOCK_ORDERS.find(o => o.id === id);


// --- CHEFS ---
export const MOCK_CHEFS: Chef[] = [
    { id: 'chef-1', name: 'Aamir Khan', avatarUrl: 'https://i.pravatar.cc/150?u=aamir' },
    { id: 'chef-2', name: 'Basit Ali', avatarUrl: 'https://i.pravatar.cc/150?u=basit' },
    { id: 'chef-3', name: 'Beenish Pervaiz', avatarUrl: 'https://i.pravatar.cc/150?u=beenish' },
    { id: 'chef-4', name: 'Dawood Ibrahim', avatarUrl: 'https://i.pravatar.cc/150?u=dawood' },
    { id: 'chef-5', name: 'Esha Khan', avatarUrl: 'https://i.pravatar.cc/150?u=esha' },
];


// --- DELIVERIES ---
export const MOCK_DELIVERIES: DeliveryRequest[] = [
    { 
        id: 'D1', 
        orderId: 'ORD124',
        restaurantName: 'Burger Barn', 
        restaurantAddress: '789 Pine Ln', 
        customerName: 'Bob',
        customerAddress: '101 Maple Rd', 
        payout: 7.50, 
        distance: 2.5, 
        status: 'Active',
        items: [
            { name: 'Classic Burger', quantity: 1 },
            { name: 'Fries', quantity: 1 },
        ]
    },
    { 
        id: 'D4', 
        orderId: 'ORD123',
        restaurantName: 'Pizza Palace', 
        restaurantAddress: '123 Main St', 
        customerName: 'Alice',
        customerAddress: '456 Oak Ave', 
        payout: 8.10, 
        distance: 3.2, 
        status: 'Completed',
        items: [
            { name: 'Pepperoni Pizza', quantity: 1 },
        ]
    },
    { 
        id: 'D5', 
        orderId: 'ORD126',
        restaurantName: 'The Golden Spoon',
        restaurantAddress: '456 Noodle Way', 
        customerName: 'Eve',
        customerAddress: '321 Wok St', 
        payout: 6.00, 
        distance: 1.8, 
        status: 'Completed',
        items: [
            { name: 'Pad Thai', quantity: 1 },
        ]
    },
];

export const MOCK_DELIVERY_REQUESTS: DeliveryRequest[] = [
    { 
        id: 'D1', 
        orderId: 'ORD-P1', 
        restaurantName: 'Pizza Palace', 
        restaurantAddress: '123 Main St', 
        customerName: 'Alice', 
        customerAddress: '456 Oak Ave', 
        payout: 7.50, 
        distance: 2.5,
        items: [{ name: 'Pepperoni Pizza', quantity: 1 }],
        status: 'Pending'
    },
    { 
        id: 'D2', 
        orderId: 'ORD-B1',
        restaurantName: 'Burger Barn', 
        restaurantAddress: '789 Pine Ln', 
        customerName: 'Bob',
        customerAddress: '101 Maple Rd', 
        payout: 6.00, 
        distance: 1.8,
        items: [{ name: 'Classic Burger', quantity: 1 }, { name: 'Fries', quantity: 1 }],
        status: 'Pending'
    },
];

export const getMockDeliveryById = (id: string) => MOCK_DELIVERIES.find(d => d.id === id);


// --- SHOPKEEPER DATA ---
export const MOCK_SHOP_ORDERS: Order[] = [
    {
        id: 'S-101',
        customerId: 'cust-ayesha-k',
        customerName: 'Ayesha K.',
        restaurantName: 'The Corner Store',
        items: [
            { cartItemId: 'si-1', id: 'milk', name: 'Milk 1L', description: '', price: 220, quantity: 2, imageUrl: 'https://placehold.co/100x100/fef2f2/ef4444?text=Milk', inStock: true, category: 'Dairy' },
            { cartItemId: 'si-2', id: 'bread', name: 'Brown Bread', description: '', price: 150, quantity: 1, imageUrl: 'https://placehold.co/100x100/fef2f2/ef4444?text=Bread', inStock: true, category: 'Bakery' },
        ],
        status: OrderStatus.Incoming,
        date: '2024-05-22',
        deliveryAddress: '123 Oak Ave',
        restaurantAddress: 'Shop 4, Market St',
        estimatedArrival: '15-20 min',
        bill: { subtotal: 590, deliveryFee: 50, serviceFee: 10, discount: 0, total: 650 },
    },
    {
        id: 'S-102',
        customerId: 'cust-bilal-m',
        customerName: 'Bilal M.',
        restaurantName: 'The Corner Store',
        items: [
            { cartItemId: 'si-3', id: 'chips', name: 'Potato Chips', description: '', price: 100, quantity: 3, imageUrl: 'https://placehold.co/100x100/fef2f2/ef4444?text=Chips', inStock: true, category: 'Snacks' },
            { cartItemId: 'si-4', id: 'cola', name: 'Cola 1.5L', description: '', price: 180, quantity: 1, imageUrl: 'https://placehold.co/100x100/fef2f2/ef4444?text=Cola', inStock: true, category: 'Beverages' },
        ],
        status: OrderStatus.Preparing,
        date: '2024-05-22',
        deliveryAddress: '456 Pine Ln',
        restaurantAddress: 'Shop 4, Market St',
        estimatedArrival: '10-15 min',
        bill: { subtotal: 480, deliveryFee: 50, serviceFee: 10, discount: 0, total: 540 },
    },
];

export const MOCK_INVENTORY: MenuItem[] = [
    { id: 'inv1', name: 'Fresh Milk 1L', description: 'Full cream dairy milk.', price: 220, category: 'Dairy & Eggs', inStock: true, imageUrl: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 50 },
    { id: 'inv2', name: 'Brown Bread', description: 'Whole wheat bread loaf.', price: 150, category: 'Bakery', inStock: true, imageUrl: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 30 },
    { id: 'inv3', name: 'Organic Eggs (Dozen)', description: 'Farm fresh organic eggs.', price: 350, category: 'Dairy & Eggs', inStock: false, imageUrl: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 0 },
    { id: 'inv4', name: 'Potato Chips - Salty', description: 'Classic salted potato chips.', price: 100, category: 'Snacks', inStock: true, imageUrl: 'https://images.pexels.com/photos/3793238/pexels-photo-3793238.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 120 },
    { id: 'inv5', name: 'Cola 1.5L', description: 'Chilled carbonated soft drink.', price: 180, category: 'Beverages', inStock: true, imageUrl: 'https://images.pexels.com/photos/1571849/pexels-photo-1571849.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 80 },
    { id: 'inv6', name: 'Apples (1kg)', description: 'Fresh red apples.', price: 300, category: 'Fruits & Vegetables', inStock: true, imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400', stockLevel: 25 },
];

const MOCK_TRANSACTION_ITEMS: CartItem[] = [
    { cartItemId: 'si-1', id: 'milk', name: 'Milk 1L', description: '', price: 220, quantity: 2, imageUrl: '', inStock: true, category: 'Dairy' },
    { cartItemId: 'si-2', id: 'bread', name: 'Brown Bread', description: '', price: 150, quantity: 1, imageUrl: '', inStock: true, category: 'Bakery' },
    { cartItemId: 'si-3', id: 'chips', name: 'Potato Chips', description: '', price: 100, quantity: 3, imageUrl: '', inStock: true, category: 'Snacks' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 'TR-S101', orderId: 'S-101', date: '2024-05-22', customerName: 'Ayesha K.', amount: 650, method: 'Card', status: 'Completed', breakdown: { subtotal: 590, platformFee: 41.3, tax: 18.7, netPayout: 590 }, items: MOCK_TRANSACTION_ITEMS.slice(0,2) },
    { id: 'TR-S102', orderId: 'S-102', date: '2024-05-22', customerName: 'Bilal M.', amount: 540, method: 'COD', status: 'Pending', breakdown: { subtotal: 480, platformFee: 33.6, tax: 16.4, netPayout: 480 }, items: MOCK_TRANSACTION_ITEMS.slice(2) },
    { id: 'TR-S103', orderId: 'S-103', date: '2024-05-22', customerName: 'Sana J.', amount: 360, method: 'Card', status: 'Completed', breakdown: { subtotal: 300, platformFee: 21, tax: 9, netPayout: 300 }, items: [] },
    { id: 'TR-S099', orderId: 'S-099', date: '2024-05-21', customerName: 'Imran H.', amount: 1200, method: 'Card', status: 'Completed', breakdown: { subtotal: 1100, platformFee: 77, tax: 23, netPayout: 1100 }, items: [] },
    { id: 'TR-S098', orderId: 'S-098', date: '2024-05-21', customerName: 'Farida B.', amount: 450, method: 'COD', status: 'Failed', breakdown: { subtotal: 400, platformFee: 28, tax: 12, netPayout: 0 }, items: [] },
];