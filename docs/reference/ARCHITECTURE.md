# PetPatio Technical Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT (Browser)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     TanStack Start (React 19)                        │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │   │
│  │  │   Router    │  │  Radix UI   │  │  TanStack   │  │  Electric  │  │   │
│  │  │  (Routes)   │  │  (Themes)   │  │     DB      │  │   Shapes   │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    │ Real-time Sync                         │
│                                    ▼                                        │
└────────────────────────────────────┬────────────────────────────────────────┘
                                     │
                                     │ HTTP/WebSocket
                                     │
┌────────────────────────────────────┴────────────────────────────────────────┐
│                              SERVER                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    TanStack Start Server Functions                   │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │   │
│  │  │    API      │  │   Auth      │  │   Email     │  │  Payments  │  │   │
│  │  │  Routes     │  │ (BetterAuth)│  │  (Resend)   │  │  (Stripe)  │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│  ┌─────────────────────────────────┴───────────────────────────────────┐   │
│  │                         Electric SQL Service                         │   │
│  │                      (Real-time Sync Engine)                         │   │
│  └─────────────────────────────────┬───────────────────────────────────┘   │
│                                    │                                        │
└────────────────────────────────────┬────────────────────────────────────────┘
                                     │
                                     │ PostgreSQL Protocol
                                     │
┌────────────────────────────────────┴────────────────────────────────────────┐
│                              DATABASE                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          PostgreSQL                                  │   │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐           │   │
│  │  │ Products  │ │ Customers │ │  Orders   │ │  Reviews  │           │   │
│  │  └───────────┘ └───────────┘ └───────────┘ └───────────┘           │   │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐           │   │
│  │  │ Variants  │ │ Addresses │ │OrderItems │ │ Wishlist  │           │   │
│  │  └───────────┘ └───────────┘ └───────────┘ └───────────┘           │   │
│  │  ┌───────────┐ ┌───────────┐                                        │   │
│  │  │Categories │ │Newsletter │                                        │   │
│  │  └───────────┘ └───────────┘                                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Frontend Layer

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              ROUTES                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   __root.tsx                                                                │
│   ├── index.tsx ─────────────────────── Homepage                            │
│   ├── products/                                                             │
│   │   ├── index.tsx ─────────────────── Product Listing                     │
│   │   └── $slug.tsx ─────────────────── Product Detail                      │
│   ├── collections/                                                          │
│   │   ├── index.tsx ─────────────────── Collection Listing                  │
│   │   └── $slug.tsx ─────────────────── Collection Products                 │
│   ├── cart.tsx ──────────────────────── Cart Page                           │
│   ├── checkout.tsx ──────────────────── Checkout Flow                       │
│   ├── account/                                                              │
│   │   ├── index.tsx ─────────────────── Dashboard                           │
│   │   ├── orders/                                                           │
│   │   │   ├── index.tsx ─────────────── Order History                       │
│   │   │   └── $id.tsx ───────────────── Order Detail                        │
│   │   ├── addresses.tsx ─────────────── Address Book                        │
│   │   └── wishlist.tsx ──────────────── Saved Items                         │
│   ├── login.tsx ─────────────────────── Sign In                             │
│   ├── register.tsx ──────────────────── Sign Up                             │
│   ├── blog/                                                                 │
│   │   ├── index.tsx ─────────────────── Blog Listing                        │
│   │   └── $slug.tsx ─────────────────── Blog Article                        │
│   └── pages/                                                                │
│       └── $slug.tsx ─────────────────── Static Pages                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SHARED COMPONENTS                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Layout/                                                                   │
│   ├── Header ─────────────────── Logo, Nav, Cart Icon, Account             │
│   ├── Footer ─────────────────── Links, Newsletter, Social                 │
│   ├── CartDrawer ─────────────── Slide-out cart                            │
│   └── MobileNav ──────────────── Hamburger menu                            │
│                                                                             │
│   Product/                                                                  │
│   ├── ProductCard ────────────── Grid item (image, title, price)           │
│   ├── ProductGallery ─────────── Image carousel + lightbox                 │
│   ├── VariantPicker ──────────── Size/color selection                      │
│   ├── QuantityPicker ─────────── +/- controls                              │
│   ├── AddToCartButton ────────── Main CTA                                  │
│   ├── ProductTabs ────────────── Description, Details, Usage               │
│   └── RelatedProducts ────────── Carousel of related items                 │
│                                                                             │
│   Cart/                                                                     │
│   ├── CartItem ───────────────── Line item with controls                   │
│   ├── CartSummary ────────────── Totals, shipping estimate                 │
│   └── CartUpsell ─────────────── Suggested additions                       │
│                                                                             │
│   Reviews/                                                                  │
│   ├── ReviewList ─────────────── All reviews for product                   │
│   ├── ReviewCard ─────────────── Single review                             │
│   ├── ReviewForm ─────────────── Write a review                            │
│   └── StarRating ─────────────── Visual rating display                     │
│                                                                             │
│   Account/                                                                  │
│   ├── AccountNav ─────────────── Sidebar navigation                        │
│   ├── OrderCard ──────────────── Order summary                             │
│   ├── AddressCard ────────────── Address display/edit                      │
│   └── WishlistItem ───────────── Saved product                             │
│                                                                             │
│   UI/                                                                       │
│   ├── Hero ───────────────────── Homepage hero section                     │
│   ├── Slideshow ──────────────── Image carousel                            │
│   ├── ContentTabs ────────────── Tabbed content sections                   │
│   ├── BenefitsGrid ───────────── Icon + text grid                          │
│   ├── TestimonialCard ────────── Customer quote                            │
│   ├── NewsletterForm ─────────── Email signup                              │
│   └── FAQAccordion ───────────── Expandable Q&A                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Real-Time Sync with Electric SQL

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │◄───────►│  Electric   │◄───────►│  PostgreSQL │
│  TanStack DB│  Shapes │   Service   │   CDC   │   Database  │
└─────────────┘         └─────────────┘         └─────────────┘
      │                                                │
      │ Local State                                    │ Source of Truth
      ▼                                                ▼
┌─────────────┐                                 ┌─────────────┐
│ Optimistic  │                                 │  Persisted  │
│   Updates   │                                 │    Data     │
└─────────────┘                                 └─────────────┘
```

### Cart Flow (Client-Side)

```
┌──────────────────────────────────────────────────────────────────────┐
│                         CART STATE (TanStack DB)                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   User Action          TanStack DB            Side Effect            │
│   ───────────          ───────────            ───────────            │
│                                                                      │
│   Add to Cart    ───►  cart.insert()    ───►  Drawer opens           │
│                        { variant, qty }       Toast notification     │
│                                                                      │
│   Update Qty     ───►  cart.update()    ───►  Totals recalculate     │
│                        { qty }                                       │
│                                                                      │
│   Remove Item    ───►  cart.delete()    ───►  Totals recalculate     │
│                                                                      │
│   Checkout       ───►  createOrder()    ───►  Server mutation        │
│                        cart.clear()           Redirect to confirm    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Checkout Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    Cart     │───►│  Shipping   │───►│   Payment   │───►│   Confirm   │
│   Review    │    │   Address   │    │   (Stripe)  │    │    Page     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                  │                  │                  │
      ▼                  ▼                  ▼                  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Validate    │    │ Save addr   │    │ Create      │    │ Send email  │
│ inventory   │    │ (if logged) │    │ payment     │    │ Clear cart  │
│             │    │             │    │ intent      │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## Authentication Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                      BETTER AUTH INTEGRATION                          │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌─────────────┐                         ┌─────────────┐            │
│   │   Login     │───► Email/Password ────►│ BetterAuth  │            │
│   │   Form      │                         │   Server    │            │
│   └─────────────┘                         └──────┬──────┘            │
│                                                  │                   │
│   ┌─────────────┐                                │                   │
│   │  Register   │───► Create Account ────────────┤                   │
│   │   Form      │                                │                   │
│   └─────────────┘                                │                   │
│                                                  ▼                   │
│   ┌─────────────┐                         ┌─────────────┐            │
│   │  Session    │◄─────── JWT Token ◄─────│  PostgreSQL │            │
│   │  Context    │                         │  (sessions) │            │
│   └─────────────┘                         └─────────────┘            │
│         │                                                            │
│         ▼                                                            │
│   ┌─────────────┐                                                    │
│   │ Protected   │                                                    │
│   │  Routes     │                                                    │
│   │ /account/*  │                                                    │
│   └─────────────┘                                                    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## External Services

```
┌──────────────────────────────────────────────────────────────────────┐
│                        THIRD-PARTY INTEGRATIONS                       │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌─────────────┐    Purpose              Cost                       │
│   │   Stripe    │    Payment processing   2.9% + $0.30/txn          │
│   └─────────────┘                                                    │
│                                                                      │
│   ┌─────────────┐    Purpose              Cost                       │
│   │   Resend    │    Transactional email  Free: 3k/month            │
│   └─────────────┘    + Newsletter         Paid: $20/mo for 50k      │
│                                                                      │
│   ┌─────────────┐    Purpose              Cost                       │
│   │ Cloudflare  │    Image CDN            Free tier available       │
│   │   Images    │    Optimization                                   │
│   └─────────────┘                                                    │
│                                                                      │
│   ┌─────────────┐    Purpose              Cost                       │
│   │  Plausible  │    Privacy analytics    Self-host free            │
│   └─────────────┘                         Cloud: $9/mo              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Deployment Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                         DEPLOYMENT OPTIONS                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Option A: Vercel + Neon + Electric Cloud                           │
│   ─────────────────────────────────────────                          │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
│   │   Vercel    │───►│    Neon     │◄───│  Electric   │             │
│   │  (App/SSR)  │    │ (Postgres)  │    │   Cloud     │             │
│   └─────────────┘    └─────────────┘    └─────────────┘             │
│   Cost: ~$20/mo for small scale                                      │
│                                                                      │
│   Option B: Railway (All-in-One)                                     │
│   ──────────────────────────────                                     │
│   ┌─────────────────────────────────────────────────────┐           │
│   │                      Railway                         │           │
│   │   ┌─────────┐  ┌─────────┐  ┌─────────┐            │           │
│   │   │   App   │  │Postgres │  │Electric │            │           │
│   │   └─────────┘  └─────────┘  └─────────┘            │           │
│   └─────────────────────────────────────────────────────┘           │
│   Cost: ~$5-20/mo usage-based                                        │
│                                                                      │
│   Option C: Self-Hosted (Docker Compose)                             │
│   ──────────────────────────────────────                             │
│   ┌─────────────────────────────────────────────────────┐           │
│   │                   VPS / Dedicated                    │           │
│   │   ┌─────────────────────────────────────────────┐   │           │
│   │   │              Docker Compose                  │   │           │
│   │   │  ┌─────┐ ┌─────────┐ ┌─────────┐ ┌───────┐ │   │           │
│   │   │  │ App │ │Postgres │ │Electric │ │Caddy  │ │   │           │
│   │   │  └─────┘ └─────────┘ └─────────┘ └───────┘ │   │           │
│   │   └─────────────────────────────────────────────┘   │           │
│   └─────────────────────────────────────────────────────┘           │
│   Cost: ~$5-10/mo VPS                                                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Security Considerations

| Layer | Measure |
|-------|---------|
| Authentication | BetterAuth with secure session management |
| Authorization | Row-level security in PostgreSQL |
| API | Server functions with validation |
| Payments | Stripe handles PCI compliance |
| Data | Electric shapes for read-only sync to clients |
| HTTPS | Enforced via deployment platform |
| CSRF | Built into TanStack Start |

---

## Performance Strategy

| Technique | Implementation |
|-----------|----------------|
| SSR | TanStack Start server rendering |
| Code Splitting | Route-based with React lazy |
| Image Optimization | Cloudflare Images / Next-gen formats |
| Caching | Electric shapes cache locally |
| Offline | TanStack DB with local persistence |
| CDN | Static assets via deployment platform |

---

*Last updated: 2026-04-11*
