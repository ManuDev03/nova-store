# Mock API — db.json

## Estructura
JSON Server corriendo en http://localhost:3000

## Modelo Product
\```typescript
interface Product {
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
\```

## Categorías disponibles
audio, wearables, perifericos, monitores, camaras, tablets

## Endpoints
- GET /api/products
- GET /api/products/:id
- GET /api/categories
- GET /api/cart
- POST /api/cart
- DELETE /api/cart/:id