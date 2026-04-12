# PetPatio Headless Storefront Design Spec

**Date:** 2026-04-11
**Status:** Approved
**Approach:** Full Headless Shopify (Approach A)

---

## Overview

Custom frontend for PetPatio, a direct-to-consumer pet product brand selling CocoTurf reusable pee pads. Built with TanStack Start and Radix UI, powered by Shopify Storefront API, with PostgreSQL for reviews and analytics.

---

## Brand & Positioning

| Attribute | Value |
|-----------|-------|
| **Positioning** | Nike/New Balance of pet gear — premium, sporty, confident |
| **Voice** | Calm, confident, technical. Not cute, not generic. |
| **Target customer** | New puppy owners, small dogs ≤30 lbs, urban/apartment, design-conscious |
| **Value prop** | Performance first, sustainability second |
| **Price tier** | Mid-premium ($50-80 pad, $25-40 refills) |

---

## Product Line

- **Hero product:** CocoTurf Reusable Pee Pad (Small, Medium, Large)
- **Consumables:** CocoTurf Refill Packs
- **Model:** Hero product + consumables (repeat purchase)

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| **Framework** | TanStack Start (React 19) |
| **UI Components** | Radix UI Themes |
| **Typography** | Capsize + Inter |
| **Styling** | Radix props (no inline styles), purple accent |
| **State** | TanStack DB |
| **Backend** | Shopify Storefront API (GraphQL) |
| **Database** | PostgreSQL (reviews, analytics) |
| **Sync** | Shopify webhooks → PostgreSQL |
| **Deployment** | Vercel + Neon (recommended) |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BROWSER                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │              TanStack Start + Radix UI Frontend               │  │
│  │  • Product pages, cart UI, account dashboard                  │  │
│  │  • Reviews display and submission                             │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                    │                              │
                    │ Storefront API               │ Server Functions
                    ▼                              ▼
┌─────────────────────────────┐    ┌─────────────────────────────────┐
│         SHOPIFY             │    │          POSTGRESQL             │
│  • Products & variants      │    │  • Reviews (custom)             │
│  • Cart & checkout          │    │  • Analytics data (synced)      │
│  • Customer accounts        │    │                                 │
│  • Orders & fulfillment     │    │                                 │
│  • Payments                 │    │                                 │
└─────────────────────────────┘    └─────────────────────────────────┘
              │                                    ▲
              │ Webhooks                           │
              └────────────────────────────────────┘
```

### Shopify Responsibilities

- Product catalog management
- Inventory tracking
- Cart persistence
- Checkout flow + payments
- Customer authentication
- Order management
- Shipping/fulfillment

### Custom Build Responsibilities

- Frontend UI (matching petpatio.com design)
- Reviews system (PostgreSQL)
- Analytics sync pipeline
- Custom account dashboard features

---

## MVP Features

### 1. Product Pages

- Image gallery with zoom/lightbox
- Title, price, description
- Variant selector (size)
- Quantity picker
- Add to cart button
- Product tabs (Description, Details, Care & Usage)
- Reviews section (PostgreSQL)
- Related products carousel

**Data source:** Shopify Storefront API + PostgreSQL (reviews)

### 2. Shopping Cart

**Cart Drawer:**
- Slides in from right on add-to-cart
- Line items with images
- Quantity +/- controls
- Remove item
- Subtotal
- Checkout button → Shopify

**Cart Page:**
- Full-page version for direct link
- Same functionality as drawer

**Data source:** Shopify cart API

### 3. Checkout

Shopify-hosted checkout. User clicks Checkout → Redirect to Shopify.

Shopify checkout includes:
- Shipping address form
- Shipping method selection
- Payment (Stripe, Apple Pay, Shop Pay)
- Order confirmation
- Email receipt

### 4. Customer Accounts

**Authentication:** Shopify customer accounts (redirect flow)

**Account Dashboard:**
| Section | Data Source |
|---------|-------------|
| Order history | Shopify Storefront API |
| Order detail | Shopify Storefront API |
| Saved addresses | Shopify Storefront API |
| My reviews | PostgreSQL |

### 5. Product Reviews

**Display:**
- Average rating + count on product cards
- Full review list on product page
- "Verified purchase" badge

**Submission:**
- Must be logged in (Shopify customer)
- Form: Rating (1-5), Title, Body
- Auto-verify if customer purchased product

### 6. Homepage

Replicate petpatio.com structure:

| Section | Content | Source |
|---------|---------|--------|
| Announcement bar | "Free shipping $100+" | Hardcoded |
| Header | Logo, nav, cart, account | Hardcoded + Shopify cart |
| Hero slideshow | Product imagery + CTA | Hardcoded |
| Featured product | CocoTurf main product | Shopify API |
| Benefits grid | 3-4 value props | Hardcoded |
| Product collection | All products | Shopify API |
| Testimonials | Customer quotes | Hardcoded (MVP) |
| FAQ preview | Top 3 questions | Hardcoded |
| Newsletter | Email capture | Hardcoded (no backend MVP) |
| Footer | Links, social, badges | Hardcoded |

*Note: "Hardcoded" means values in source code. No CMS for MVP — content changes require code deploys.*

---

## Routes

```
src/routes/
├── __root.tsx                 # Layout: Theme, Header, Footer, CartDrawer
├── index.tsx                  # Homepage
├── products/
│   ├── index.tsx              # All products grid
│   └── $handle.tsx            # Product detail page
├── collections/
│   └── $handle.tsx            # Collection page
├── cart.tsx                   # Full cart page
├── account/
│   ├── index.tsx              # Dashboard
│   ├── orders/
│   │   ├── index.tsx          # Order history
│   │   └── $id.tsx            # Order detail
│   └── addresses.tsx          # Saved addresses
├── pages/
│   ├── faq.tsx                # FAQ page
│   ├── about.tsx              # About page
│   └── contact.tsx            # Contact page
└── api/
    ├── reviews.ts             # POST/GET reviews
    └── webhooks/
        └── shopify.ts         # Receive Shopify webhooks
```

---

## Components

### Layout
- `AnnouncementBar` — Free shipping message
- `Header` — Logo, nav, cart icon, account
- `Footer` — Links, social, trust badges
- `CartDrawer` — Slide-out cart
- `MobileNav` — Hamburger menu

### Home
- `HeroSlideshow` — Main hero section
- `FeaturedProduct` — Product spotlight
- `BenefitsGrid` — Icon benefits
- `ProductCollection` — Product grid
- `Testimonials` — Customer quotes
- `FAQPreview` — Accordion preview
- `NewsletterSignup` — Email capture

### Product
- `ProductGallery` — Image carousel + zoom
- `ProductInfo` — Title, price, description
- `VariantPicker` — Size selector
- `AddToCart` — Quantity + button
- `ProductTabs` — Description, details, care
- `RelatedProducts` — Carousel

### Reviews
- `ReviewList` — All reviews for product
- `ReviewCard` — Single review
- `ReviewForm` — Write a review
- `StarRating` — 1-5 stars display/input

### Cart
- `CartItem` — Line item with controls
- `CartSummary` — Subtotal, shipping note
- `CheckoutButton` — Redirect to Shopify

### Account
- `OrderCard` — Order summary
- `OrderDetail` — Full order info
- `AddressCard` — Saved address

---

## Database Schema

```sql
-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  body TEXT,
  verified_purchase BOOLEAN DEFAULT false,
  approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_reviews_product ON reviews(product_id);

-- Analytics: Orders
CREATE TABLE orders_analytics (
  id TEXT PRIMARY KEY,
  customer_email TEXT,
  total_price DECIMAL(10,2),
  line_items JSONB,
  created_at TIMESTAMPTZ,
  synced_at TIMESTAMPTZ DEFAULT now()
);

-- Analytics: Products
CREATE TABLE products_analytics (
  id TEXT PRIMARY KEY,
  title TEXT,
  handle TEXT,
  product_type TEXT,
  variants JSONB,
  synced_at TIMESTAMPTZ DEFAULT now()
);
```

---

## Shopify Integration

### Storefront API Operations

| Operation | Purpose |
|-----------|---------|
| `getProducts` | Fetch all products with variants |
| `getProductByHandle` | Single product page data |
| `getCollection` | Products in a collection |
| `createCart` | Initialize cart |
| `addToCart` | Add line item |
| `updateCart` | Change quantity |
| `removeFromCart` | Remove line item |
| `getCart` | Current cart state |
| `getCheckoutUrl` | Redirect URL for checkout |
| `getCustomer` | Logged-in customer info |
| `getCustomerOrders` | Order history |

### Webhooks

| Event | Action |
|-------|--------|
| `products/create` | Insert to products_analytics |
| `products/update` | Update products_analytics |
| `orders/create` | Insert to orders_analytics |
| `orders/fulfilled` | Update order status |

---

## Environment Variables

```
# Shopify
SHOPIFY_STORE_DOMAIN=petpatio.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=xxxxx
SHOPIFY_WEBHOOK_SECRET=xxxxx

# Database
DATABASE_URL=postgresql://...

# Optional (Phase 2)
RESEND_API_KEY=xxxxx
```

---

## Shopify Setup Required

1. Create Storefront API token (Admin → Settings → Apps → Develop apps)
2. Configure webhooks (orders/create, products/update → endpoint)
3. Enable customer accounts (Settings → Customer accounts → Classic)
4. Custom checkout branding (Settings → Checkout → Customize)

---

## Visual Design

| Element | Value |
|---------|-------|
| **Primary color** | Purple (#462466 / Radix purple) |
| **Accent background** | Beige (#eae3da) |
| **Gray scale** | Radix slate |
| **Border radius** | Medium (Radix default) |
| **Max width** | 1600px |
| **Typography** | Inter via Capsize |
| **Spacing** | Radix scale (gap="2" through "9") |

**Style guide:** Match petpatio.com reference exactly, built with Radix components.

---

## Deployment

**Recommended:**
| Service | Purpose | Cost |
|---------|---------|------|
| Vercel | TanStack Start hosting | Free / $20/mo |
| Neon | PostgreSQL | Free / $19/mo |
| Shopify | Backend | Current plan |

**Alternative:** Railway (all-in-one, ~$5-20/mo)

---

## Out of Scope (Future Phases)

| Feature | Phase |
|---------|-------|
| Wishlist | 2 |
| Newsletter integration (Klaviyo/Resend) | 2 |
| Search | 2 |
| Multi-language | 3 |
| Blog | 3 |
| Back-in-stock notifications | 3 |

---

## Success Criteria

1. Homepage loads with all 10 sections matching petpatio.com layout
2. Product pages display Shopify data with reviews from PostgreSQL
3. Add to cart works, cart drawer functions correctly
4. Checkout redirects to Shopify and completes successfully
5. Logged-in customers can view order history
6. Customers can submit and view reviews
7. Webhooks sync orders to PostgreSQL for analytics

---

## Dependencies (additions to package.json)

```json
{
  "dependencies": {
    "@shopify/hydrogen-react": "^2024.x",
    "graphql": "^16.x",
    "graphql-request": "^6.x"
  }
}
```

---

*Spec written: 2026-04-11*
