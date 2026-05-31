# Nova Store — Proyecto de prueba

Resumen
- Aplicación demo de e‑commerce (Angular) con un mock API (`json-server`).
- Pensada para pruebas técnicas y desarrollo local.

Estado actual
- Servidor mock API: `db.json` (JSON Server).
- La app es standalone Angular (v21+), arquitectura simple por features.
- Adaptaciones realizadas:
	- Carga fiable del detalle de producto (fallback: petición por id si no está en memoria).
	- `ProductService` incluye `getProductByIdAsync(id)` para solicitar un producto individual.
	- `product-detail.component` usa signals/effects para reaccionar a la carga de productos.
	- Componentes responsive: `product-filters` (overlay móvil) y `navbar` (menú hamburguesa móvil).

Estructura clave
- `src/app/features/catalog` — Catálogo, filtros y tarjetas de producto.
- `src/app/features/product-detail` — Página de detalle de producto.
- `src/app/core/services` — Servicios `ProductService`, `CartService`.
- `db.json` — datos del mock API.
- `Dockerfile`, `docker-compose.yml` — configuración para ejecutar la app + mock API en contenedores (opcional).

Prerequisitos (opcional para Docker)
- Node.js (recomendado v18+ o v22 para builds locales)
- pnpm
- Docker / Docker Compose (si usas contenedores)

Comandos de desarrollo (sin Docker)
1. Instalar dependencias:
```bash
pnpm install
```
2. Levantar mock API:
```bash
pnpm run mock-api
```
3. Levantar la app (dev server):
```bash
pnpm start
```
4. Tests:
```bash
pnpm test
```

Uso con Docker (ligero, pensado para pruebas)
- Construir y levantar (con `docker compose`):
```bash
docker compose up --build
```
- Servicios expuestos:
	- App: http://localhost:4200 (servida con `http-server` desde la build)
	- Mock API: http://localhost:3000

