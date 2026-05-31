export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
  inStock: boolean;
  badge: string | null;
  description: string;
  images: string[];
  variants: string[];
  tags: string[];
}

export interface Category {
  id: string;
  label: string;
}

export interface ProductFilters {
  search: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean | null;
  sortBy: SortOption;
}

export type SortOption =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'name-asc';