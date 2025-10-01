# Magnus Servis Web

Next.js 14 storefront and marketing site powered by `next-intl`, Tailwind CSS and shadcn/ui.

## Scripts

- `npm run dev` – start the dev server on http://localhost:3000
- `npm run build` – production build
- `npm run start` – run built app
- `npm run lint` – lint the project
- `npm run test` – run Jest unit tests
- `npm run typecheck` – TypeScript type checking
- `npm run e2e` – run Cypress smoke tests (requires the dev server)

## Environment variables

Copy `.env.example` to `.env` and adjust:

- `NEXT_PUBLIC_SITE_URL` – external site URL
- `NEXT_PUBLIC_API_URL` – Medusa API base URL
- `NEXT_PUBLIC_CMS_URL` – Strapi API base URL
- `NEXTAUTH_SECRET` – random string for session encryption

## Features

- Locale-aware routing with `/hr` (default) and `/en`
- Placeholder admin area protected via NextAuth email magic links
- Product listing pages with brand filters and empty-state guidance
- SEO metadata + JSON-LD for LocalBusiness and Service
- CMS-driven rich text pages with TODO markers for copy migration
