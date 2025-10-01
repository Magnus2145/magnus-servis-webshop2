# Magnus Servis Webshop MVP Plan

## 1. Goals
- Present the company, services, and references on the public website.
- Enable online sales of new/used devices, spare parts, and consumables through a webshop.
- Connect service operations with the webshop for service requests, scheduling, and maintenance packages.
- Support both B2B and B2C pricing models including VAT handling, discounts, and quote requests.
- Deliver fast-loading pages with strong SEO and Google Merchant compatibility.

## 2. Functional Scope
### 2.1 Public Website
- **Home:** hero section, brand overview, calls-to-action for service requests and shop entry.
- **About:** team profiles, certifications, partner brands (e.g., Julius, Protinus).
- **Services:** coffee machine, washer, ice machine servicing, general services, maintenance contracts, emergency interventions.
- **References:** client list, case studies, before/after gallery.
- **Contact:** contact form, Google Maps embed, WhatsApp/phone CTAs, business hours.

### 2.2 Webshop
- Product categories: coffee machines, grinders, washers, ice makers, cooling units, spare parts, detergents & rinses, accessories.
- Filters: brand, condition (new/used/refurbished), price, availability, power, voltage, cooling method, capacity, compatible models.
- Product features: variants, galleries, video, PDF specs, QR codes for quick access.
- Checkout: cart, VAT handling, invoices (R1), delivery (GLS/DPD/HP), pickup option.
- Payments: cards (CorvusPay/WSPay/Monri), cash on delivery, bank transfer, split payments (advance + remainder).
- Promotions: coupons/discounts, user-specific B2B price lists, margin rules per category/brand.
- Inventory: stock level tracking with low-stock alerts.

### 2.3 Service & Support Portal
- Service request form with location, brand/model, serial number, issue description, images, urgency.
- Scheduling: calendar of appointments, technician task view, customer slot selection.
- Order tracking: status workflow (Open/In Progress/Closed), client digital signature, file uploads.
- Reporting: PDF report generation per order with email delivery to the client.
- Warranty claims (RMA) linked to webshop orders.

### 2.4 Administration
- Roles: Admin, Technician, Sales, B2B Customer.
- Catalog management: bulk import via CSV/Excel, serial numbers, compatibility mapping.
- Pricing: user group price lists, VAT/reverse charge for EU B2B (VIES validation).
- Order management: orders, invoices (PDF), statuses, email/SMS notifications.
- SEO: OpenGraph, Schema.org structured data, Google Merchant feed.
- Security: logs, audit trail, two-factor authentication.

## 3. Integrations (HR/EU)
- **Payments:** CorvusPay, WSPay, Monri; optional Stripe/PayPal for EU customers.
- **Shipping:** GLS, DPD, HP Express with label printing and tracking links.
- **Accounting:** PDF invoices and fiscalization via payment gateway or ERP (Minimax/E-račun/Syncro).
- **Maps:** Google Maps for service locations and pickup points.
- **Email:** Microsoft 365 business mail, Mailgun/SendGrid for transactional emails.

## 4. Recommended Technical Architecture
### Option A — Custom Modern Stack (Preferred)
- Frontend: Next.js (React) with Tailwind CSS for SSR/SSG and SEO.
- Backend: Node.js (Express/NestJS) or Medusa for headless commerce.
- Database: MySQL (existing) or PostgreSQL alternative.
- CMS: Strapi or Sanity for managing pages, blog posts, and references.
- Hosting: Existing VPS (Linux, Docker) with Cloudflare CDN for static assets.
- Advantages: Full control, high performance, adaptable to B2B features (service orders, QR, PDFs, calendar, integrations).

### Option B — WooCommerce (WordPress)
- Rapid time-to-market with many plugins for payments and shipping.
- Requires disciplined performance/security management and solid hosting.

### Option C — Shopify (Headless or Traditional)
- Stable checkout and integrations but limited flexibility for service modules and B2B logic; incurs monthly fees.

**Recommendation:** Option A for long-term scalability; Option B if a short-term MVP is needed with later migration to Option A.

## 5. Design & Branding Guidelines
- Minimalist, professional aesthetic with dark blue and white palette, gold accents for premium items.
- Clear navigation separating Service and Shop.
- Product cards highlighting condition labels (New/Refurbished), key specs (e.g., ice capacity, cooling method), and "Request a Quote" CTA for larger equipment.
- Consistent PDF templates for offers, invoices, and service reports.

## 6. SEO & Marketing Package
- Structured URLs, meta tags, Schema.org (Product, LocalBusiness, Service).
- Blog/News section for maintenance tips, case studies, and product selection guides.
- Google Merchant XML feed for Shopping ads.
- Integration with Instagram/Facebook/LinkedIn pixels.

## 7. Security & Compliance
- Enforce HTTPS, rate limiting, firewall, 2FA for admin users.
- GDPR compliance: privacy policy, cookie management (CMP), terms of use, return policy.
- Regular backups, monitoring, and uptime alerts.

## 8. Delivery Roadmap
- **Phase 0 – Preparation (1–3 days):** Compile product categories/brands, initial product CSV, branding assets, service content.
- **Phase 1 – MVP (2–4 weeks):** Launch public pages and webshop with card payments and shipping, import products, configure VAT/pricing, generate invoices, and set up email notifications.
- **Phase 2 – Service Module (1–3 weeks):** Implement online service requests, scheduling, status tracking, PDF reporting, and RMA handling.
- **Phase 3 – B2B & Advanced (Ongoing):** Add bespoke price lists, quote workflows, serial number tracking, ERP integrations.

## 9. Required Inputs to Start
- Product/brand list with initial 20–50 products (CSV/Excel) including pricing, SKU, images, key specs.
- Content and imagery for Home, About, Services, and Contact pages.
- Selected payment gateway(s) and shipping providers with integration credentials.
- Legal documents (or templates to be reviewed by legal counsel).

## 10. Additional Opportunities
- Refurbished program with standardized grading and warranty.
- Equipment configurator for ice machines based on capacity, cooling, water/power availability.
- "Service package" subscription with parts discounts and priority support.
- QR stickers on devices linking to model info, service requests, and maintenance history.
