# PetPatio Project Baseline

## Overview

This document captures the baseline reference for building PetPatio, an open-source eCommerce application for pet care products. The design is based on analysis of a Shopify/Debutify reference implementation, adapted to use free and open-source technologies.

---

## Reference Analysis

### Source Project: Shopify PetPatio Theme

**Product Focus:** CocoTurf reusable dog pee pads and refills

**Key Features Identified:**
- Product catalog with variants, images, descriptions
- Shopping cart with drawer interface
- Checkout with multiple payment options
- Customer accounts (login, registration, addresses, order history)
- Product reviews and ratings (Loox integration)
- Newsletter signup with discount incentives
- Multi-language support (24 languages)
- Wishlist functionality
- Quick compare and quick view
- Back-in-stock notifications
- Trust badges and social proof elements

**Design Language:**
| Element | Value |
|---------|-------|
| Primary Color | #462466 (Purple) |
| Secondary Color | #462466 (Purple) |
| Accent Background | #eae3da (Beige) |
| Header Font | Inter (600 weight) |
| Body Font | Instrument Sans (400 weight) |
| Max Page Width | 1600px |
| Body Font Size | 14px |
| Border Radius | 0-6px (square to slightly rounded) |

**Content Structure:**
- Hero slideshow with desktop/mobile variants
- Content tabs showcasing featured products
- Product benefits sections
- Collection grids
- Testimonials/reviews
- FAQ accordions
- Footer with social links and newsletter

---

## Current Tech Stack

### Foundation (Already in Place)

| Technology | Purpose | Version |
|------------|---------|---------|
| TanStack Start | Full-stack React framework | 1.167.6 |
| React | UI library | 19.2.0 |
| Radix UI Themes | Component library | 3.3.0 |
| vite-plugin-capsize-radix | Typography system | 0.2.4 |
| TanStack DB | State management | PR #1330 |
| Electric SQL | Real-time sync | 1.5.13 |
| Lucide React | Icons | 0.561.0 |
| Biome | Linting/formatting | 2.2.4 |

### Current Project Structure

```
petpatio/
├── docs/
│   └── reference/
│       └── PROJECT_BASELINE.md  (this file)
├── public/
├── skills/
│   └── frontend-design/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   └── ThemePicker.tsx
│   ├── contexts/
│   │   └── ThemeContext.tsx
│   ├── routes/
│   │   ├── __root.tsx
│   │   └── index.tsx
│   ├── router.tsx
│   └── styles.css
├── AGENTS.md (CLAUDE.md symlink)
├── package.json
└── vite.config.ts
```

---

## Proposed Architecture

### Open-Source Stack Additions

| Need | Open-Source Solution | Notes |
|------|---------------------|-------|
| Database | PostgreSQL + Electric SQL | Real-time sync, offline-first |
| Authentication | Better Auth / Lucia Auth | Self-hosted, no vendor lock-in |
| Payments | Stripe (free tier) / LemonSqueezy | Standard payment processing |
| Email | Resend / Postmark (free tier) | Transactional + newsletter |
| Reviews | Custom (TanStack DB) | Built-in, no third-party |
| Search | Meilisearch / Orama | Fast, typo-tolerant |
| Images | Cloudflare Images / Imgproxy | CDN + optimization |
| i18n | Paraglide / i18next | Compile-time or runtime |
| Analytics | Plausible / Umami | Privacy-focused |

### Data Model

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Products   │────<│  Variants   │     │  Categories │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id          │     │ id          │     │ id          │
│ title       │     │ product_id  │     │ name        │
│ description │     │ title       │     │ slug        │
│ slug        │     │ price       │     │ description │
│ category_id │     │ sku         │     └─────────────┘
│ images[]    │     │ inventory   │
│ metadata    │     │ options     │
└─────────────┘     └─────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Customers  │────<│   Orders    │────<│ Order Items │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id          │     │ id          │     │ id          │
│ email       │     │ customer_id │     │ order_id    │
│ name        │     │ status      │     │ variant_id  │
│ addresses[] │     │ total       │     │ quantity    │
│ created_at  │     │ shipping    │     │ price       │
└─────────────┘     │ created_at  │     └─────────────┘
                    └─────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Reviews   │     │  Wishlist   │     │ Newsletter  │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id          │     │ id          │     │ id          │
│ product_id  │     │ customer_id │     │ email       │
│ customer_id │     │ product_id  │     │ subscribed  │
│ rating      │     │ created_at  │     │ created_at  │
│ title       │     └─────────────┘     └─────────────┘
│ body        │
│ created_at  │
└─────────────┘

┌─────────────┐
│    Cart     │  (client-side via TanStack DB)
├─────────────┤
│ items[]     │
│ - variant_id│
│ - quantity  │
│ updated_at  │
└─────────────┘
```

### Application Routes

```
/                       # Homepage (hero, featured products, benefits)
/products               # All products grid
/products/[slug]        # Product detail page
/collections            # All collections
/collections/[slug]     # Collection products
/cart                   # Shopping cart (also drawer)
/checkout               # Checkout flow
/account                # Customer dashboard
/account/orders         # Order history
/account/orders/[id]    # Order detail
/account/addresses      # Address book
/account/wishlist       # Saved items
/login                  # Authentication
/register               # New account
/forgot-password        # Password reset
/blog                   # Blog posts
/blog/[slug]            # Blog article
/pages/[slug]           # Static pages (FAQ, Contact, About)
```

---

## Customer User Journey

### Journey 1: First-Time Visitor → Purchase

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  1. DISCOVERY                                                       │
│  ┌─────────┐    ┌─────────────┐    ┌──────────────┐                │
│  │ Landing │───>│ Browse Hero │───>│ View Product │                │
│  │  Page   │    │  Slideshow  │    │   Benefits   │                │
│  └─────────┘    └─────────────┘    └──────────────┘                │
│                                           │                         │
│  2. CONSIDERATION                         ▼                         │
│  ┌──────────────┐    ┌─────────────┐    ┌──────────────┐           │
│  │ Read Reviews │<───│ View Product│<───│ Click CTA    │           │
│  │              │    │   Details   │    │              │           │
│  └──────────────┘    └─────────────┘    └──────────────┘           │
│         │                   │                                       │
│         ▼                   ▼                                       │
│  3. DECISION                                                        │
│  ┌──────────────┐    ┌─────────────┐    ┌──────────────┐           │
│  │ Select Size/ │───>│ Add to Cart │───>│ View Cart    │           │
│  │   Variant    │    │   (Drawer)  │    │   Drawer     │           │
│  └──────────────┘    └─────────────┘    └──────────────┘           │
│                                                │                    │
│  4. PURCHASE                                   ▼                    │
│  ┌──────────────┐    ┌─────────────┐    ┌──────────────┐           │
│  │ Order        │<───│   Payment   │<───│   Checkout   │           │
│  │ Confirmation │    │  (Stripe)   │    │   (Guest OK) │           │
│  └──────────────┘    └─────────────┘    └──────────────┘           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Journey 2: Returning Customer

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  1. RETURN                                                          │
│  ┌─────────┐    ┌─────────────┐    ┌──────────────┐                │
│  │  Login  │───>│  Dashboard  │───>│ View Order   │                │
│  │         │    │  (Account)  │    │   History    │                │
│  └─────────┘    └─────────────┘    └──────────────┘                │
│                        │                                            │
│  2. REORDER            ▼                                            │
│  ┌──────────────┐    ┌─────────────┐    ┌──────────────┐           │
│  │ Quick Add   │───>│   Checkout  │───>│ Saved Address│           │
│  │ from History│    │  (1-click)  │    │   + Payment  │           │
│  └──────────────┘    └─────────────┘    └──────────────┘           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Journey 3: Browser → Newsletter Subscriber

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  1. ENGAGEMENT                                                      │
│  ┌─────────┐    ┌─────────────┐    ┌──────────────┐                │
│  │ Browse  │───>│ Exit Intent │───>│ Newsletter   │                │
│  │ Products│    │   Popup     │    │ Signup Modal │                │
│  └─────────┘    └─────────────┘    └──────────────┘                │
│                                           │                         │
│  2. CONVERSION                            ▼                         │
│  ┌──────────────┐    ┌─────────────┐    ┌──────────────┐           │
│  │  Receive     │───>│ Click Email │───>│  Purchase    │           │
│  │ Welcome Email│    │    Link     │    │ w/ Discount  │           │
│  └──────────────┘    └─────────────┘    └──────────────┘           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Pages Breakdown

### Homepage

| Section | Purpose | Components |
|---------|---------|------------|
| Hero Slideshow | First impression, key products | Carousel, CTA buttons |
| Content Tabs | Feature product details | Tabs, images, text |
| Benefits Grid | Value propositions | Icons, headings, descriptions |
| Featured Collection | Product discovery | Product cards grid |
| Testimonials | Social proof | Review cards, ratings |
| Newsletter CTA | Lead capture | Email input, submit |
| Footer | Navigation, social | Links, icons |

### Product Page

| Section | Purpose | Components |
|---------|---------|------------|
| Image Gallery | Product visuals | Lightbox, thumbnails |
| Product Info | Title, price, variants | Heading, select, price |
| Add to Cart | Conversion | Button, quantity picker |
| Product Tabs | Detailed info | Tabs (Description, Details, Usage) |
| Reviews | Social proof | Star ratings, review list |
| Related Products | Cross-sell | Product card carousel |

### Cart Drawer

| Section | Purpose | Components |
|---------|---------|------------|
| Cart Items | Order summary | Item cards, quantity controls |
| Cart Total | Price breakdown | Subtotal, shipping estimate |
| Checkout CTA | Conversion | Primary button |
| Upsells | Increase AOV | Mini product cards |

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Project structure and routing
- [ ] Database schema (PostgreSQL + Electric)
- [ ] TanStack DB collections setup
- [ ] Basic product catalog (seeded data)
- [ ] Product listing and detail pages

### Phase 2: Shopping
- [ ] Cart functionality (TanStack DB local)
- [ ] Cart drawer UI
- [ ] Checkout page
- [ ] Stripe integration
- [ ] Order creation

### Phase 3: Accounts
- [ ] Authentication (Better Auth)
- [ ] Customer dashboard
- [ ] Order history
- [ ] Address management
- [ ] Wishlist

### Phase 4: Engagement
- [ ] Product reviews
- [ ] Newsletter signup
- [ ] Email notifications (Resend)
- [ ] Search (Meilisearch)

### Phase 5: Polish
- [ ] Multi-language (i18n)
- [ ] SEO optimization
- [ ] Performance tuning
- [ ] Analytics integration

---

## Open Questions (To Resolve in Design)

1. **Deployment target?** - Vercel, Railway, self-hosted?
2. **Payment regions?** - US only or international?
3. **Inventory management?** - Admin panel or external?
4. **Shipping calculation?** - Flat rate, weight-based, API?
5. **Email provider preference?** - Resend, Postmark, other?
6. **Search priority?** - Essential for MVP or Phase 2?
7. **Multi-language scope?** - Which languages for MVP?

---

## Files Created

- `docs/reference/PROJECT_BASELINE.md` - This file
- `docs/reference/ARCHITECTURE.md` - Technical architecture diagram (next)
- `docs/reference/USER_JOURNEYS.md` - Detailed customer journeys (next)

---

*Last updated: 2026-04-11*
