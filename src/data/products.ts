export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  size?: string
  isNew?: boolean
  isBestseller?: boolean
  inStock: boolean
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Dry Texturizing Spray',
    description: 'One spray. Infinite impact. More texture. More volume. More iconic.',
    price: 52.00,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'Styling',
    size: '8.5 oz',
    isBestseller: true,
    inStock: true
  },
  {
    id: '2',
    name: 'Gold Lust Repair & Restore Shampoo',
    description: 'Repair, nourish, and transform damaged hair with our best-selling collection.',
    price: 53.00,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'Shampoo',
    size: '8.5 oz',
    isBestseller: true,
    inStock: true
  },
  {
    id: '3',
    name: 'Gold Lust Nourishing Hair Oil',
    description: 'Luxurious hair oil for ultimate nourishment and shine.',
    price: 59.00,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'Treatment',
    size: '3.4 oz',
    isBestseller: true,
    inStock: true
  },
  {
    id: '4',
    name: 'Supershine Moisturizing Cream',
    description: 'Hydrating cream for silky, smooth hair with incredible shine.',
    price: 54.00,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'Treatment',
    size: '5 oz',
    isBestseller: true,
    inStock: true
  },
  {
    id: '5',
    name: 'Royal Blowout Heat Styling Spray',
    description: 'Professional heat protection and styling spray for salon-quality results.',
    price: 72.00,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'Styling',
    size: '5.9 oz',
    inStock: true
  },
  {
    id: '6',
    name: 'Superfine Hair Spray',
    description: 'Lightweight, flexible hold hair spray for all-day style.',
    price: 46.00,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'Styling',
    size: '9 oz',
    isBestseller: true,
    inStock: true
  },
  {
    id: '7',
    name: 'Signature Shampoo',
    description: 'Luxurious, everyday haircare that combines gentle ingredients with innovative technology.',
    price: 49.00,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'Shampoo',
    size: '8.5 oz',
    inStock: true
  },
  {
    id: '8',
    name: 'Maximista Thickening Spray',
    description: 'Volumizing spray for fuller, thicker-looking hair.',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    category: 'Styling',
    size: '6.8 oz',
    isBestseller: true,
    inStock: true
  }
]

export const categories = [
  'All',
  'Shampoo',
  'Styling',
  'Treatment',
  'Tools'
]
