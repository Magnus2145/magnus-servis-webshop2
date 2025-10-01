# Magnus Servis Webshop Monorepo

Magnus Servis monorepo hosts the public website, Medusa commerce API and Strapi CMS. It is optimised for local Docker-based development and production-ready deployment on your own infrastructure.

## Structure

```
magnus-servis-webshop/
├── apps/
│   ├── web/    # Next.js 14 marketing site + storefront
│   ├── api/    # MedusaJS v2 REST API + PDF + emails
│   └── cms/    # Strapi v5 headless CMS
├── packages/
│   ├── ui/     # Shared React UI primitives
│   └── config/ # Shared tooling config (ESLint, Prettier, TS)
├── services/
│   ├── mysql/
│   └── redis/
├── docker-compose.yml
└── .github/workflows/ci.yml
```

## Requirements

- Node.js 20+
- Docker & Docker Compose
- npm 9+

## Quick start

```bash
git clone <your-repo-url>
cd magnus-servis-webshop
npm install  # installs workspace dependencies
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/cms/.env.example apps/cms/.env
docker-compose up -d --build
```

Services:

- Web storefront: http://localhost:3000 (default locale `/hr`)
- Medusa API health: http://localhost:9000/health
- Strapi admin: http://localhost:1337/admin

Once containers are running, seed the commerce database:

```bash
npm run --workspace @magnus/api seed
```

This command creates the required product categories (`Perilice`, `Ledomati`) and brands (`Icematic`, `Elframo`). The product catalogue remains empty by design so you can import items later via the admin tools.

## Development scripts

- `npm run dev --workspace @magnus/web` – Next.js dev server
- `npm run dev --workspace @magnus/api` – Medusa API in watch mode
- `npm run develop --workspace @magnus/cms` – Strapi CMS dev server
- `npm run lint --workspaces` – ESLint across all packages
- `npm run test --workspace @magnus/api` – Backend unit tests placeholder

## Admin credentials (development)

During the first Strapi CMS boot, you will be prompted to create an administrator user. Use a development-only account (e.g. `admin@magnus-servis.com`) and update credentials before production deployment.

For storefront NextAuth email sign-in, dev emails are logged to the API container output. Replace the Nodemailer transport settings with production SMTP credentials before launch.

## CI/CD

The repository includes a GitHub Actions workflow (`.github/workflows/ci.yml`) to lint, typecheck, build and run tests on every push and pull request.

## Environment variables

Refer to the `.env.example` files in each app for the required configuration. In production, set secrets via your hosting platform rather than committing `.env` files.

## PDF & Email stubs

The Medusa API exposes `/pdf/test` to generate example PDFs (`ponuda`, `racun`, `servisni-izvjestaj`) and stores transactional email templates in `apps/api/src/emails/templates`. Update branding and copy when real assets are available.

## Internationalisation

Next.js uses `next-intl` with Croatian (`hr`) as the default locale and English (`en`) as secondary. Content is sourced from Strapi single collection entries so editors can maintain both languages from one place.

## CMS-driven layout & branding

- **Global settings** – In Strapi open *Global settings* to manage navigation, footer links, contact details, social profiles and colour palette (primary/secondary/accent, light/dark foregrounds). Updating these values instantly restyles the storefront header, footer and CTA buttons via CSS variables.
- **Page builder** – Every marketing page (`homepage`, `servis`, `usluge`, `kontakt`, `o-nama`, `pravila*`, `trgovina*`) is assembled from dynamic sections (hero, rich text, feature grid, media highlight, CTA banner, contact block, link grid). Drag-and-drop new components or edit copy directly in Strapi without touching code.
- **Category storytelling** – Dedicated Strapi entries (`trgovina`, `trgovina-perilice`, `trgovina-ledomati`) let you enrich webshop landing and category pages with SEO-friendly intros, hero banners and buying guides while the product grid continues to pull live data from Medusa.

All seeded content contains `TODO` placeholders to remind editors where to paste official copy, imagery and links from the existing Magnus Servis site.

## TODO for launch

- Connect real payment providers (CorvusPay/WSPay/Monri) and shipping integrations (GLS/DPD/HP)
- Extend admin dashboard for order management, service tickets, and B2B pricing workflows
- Harden security (WAF, rate limits per endpoint, production SMTP, TLS certificates)
- Replace placeholder copy and imagery with final Magnus Servis assets
