# Magnus Servis API

MedusaJS v2 backend exposing REST endpoints for the storefront, payment stubs, PDF generation and transactional emails.

## Scripts

- `npm run dev` – start Medusa API with hot-reload
- `npm run build` – compile TypeScript to `dist`
- `npm run start` – run compiled server
- `npm run seed` – create base categories and brands
- `npm run lint` – lint source files
- `npm run test` – backend Jest tests placeholder
- `npm run typecheck` – strict TypeScript checking

## Key endpoints

- `GET /health` – health + version info
- `GET /store/products` – list products (empty until you add items)
- `GET /store/product-categories` – list Medusa product categories
- `GET /store/product-tags` – list product tags used as brands
- `GET /pdf/test?template=ponuda|racun|servisni-izvjestaj` – sample PDF output

## Environment

Copy `.env.example` to `.env` and configure database, Redis, file storage and payment provider placeholders.

## Notes

- Payment and shipping integrations are scaffolded for later implementation.
- Emails use Nodemailer stream transport for development. Replace with SMTP credentials when moving to staging/production.
