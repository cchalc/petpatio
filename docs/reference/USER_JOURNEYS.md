# PetPatio Customer User Journeys

## Overview

This document details the customer experience flows for the PetPatio eCommerce application. Each journey maps the user's goals, touchpoints, and the system interactions required.

---

## Personas

### Persona 1: Sarah (First-Time Buyer)
- **Age:** 32
- **Situation:** New puppy owner, apartment living
- **Goal:** Find a sustainable, mess-free solution for potty training
- **Pain Points:** Traditional pee pads are wasteful and smelly
- **Tech Comfort:** High (mobile-first shopper)

### Persona 2: Mike (Returning Customer)
- **Age:** 45
- **Situation:** Existing CocoTurf customer, needs refills
- **Goal:** Quick reorder of supplies
- **Pain Points:** Hates creating new accounts, values convenience
- **Tech Comfort:** Medium

### Persona 3: Emma (Browser/Researcher)
- **Age:** 28
- **Situation:** Considering a dog, researching products
- **Goal:** Understand options, save for later
- **Pain Points:** Not ready to buy, wants to compare
- **Tech Comfort:** High

---

## Journey 1: First-Time Purchase

### Sarah's Journey: Discovery to Purchase

```
AWARENESS
─────────────────────────────────────────────────────────────────────────────

   [Social Media Ad]              [Search: "reusable dog pee pad"]
          │                                    │
          └──────────────┬─────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          HOMEPAGE                                        │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                         HERO SECTION                             │   │
│   │   "The Last Pee Pad You'll Ever Buy"                            │   │
│   │   [Shop Now] [Learn More]                                        │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   Sarah thinks: "Interesting... reusable? Let me see more"             │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                      BENEFITS SECTION                            │   │
│   │   ✓ Plant-based materials    ✓ Machine washable                 │   │
│   │   ✓ Odor neutralizing        ✓ 30-day guarantee                 │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   Sarah thinks: "This addresses my concerns. What do others say?"      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘


CONSIDERATION
─────────────────────────────────────────────────────────────────────────────

                         │
                    Scrolls down
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       TESTIMONIALS SECTION                               │
│                                                                         │
│   ★★★★★ "Game changer for our apartment!"                              │
│   ★★★★★ "No more plastic waste guilt"                                  │
│   ★★★★☆ "Takes a few washes to break in, but worth it"                │
│                                                                         │
│   Sarah thinks: "Real people use this. Let me look at the product."    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

                         │
                    Clicks CTA
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        PRODUCT PAGE                                      │
│                                                                         │
│   ┌──────────────────┬──────────────────────────────────────────────┐   │
│   │   [Image Gallery]│   CocoTurf Reusable Pee Pad                  │   │
│   │                  │   ★★★★★ (127 reviews)                        │   │
│   │   [Thumbnails]   │                                              │   │
│   │                  │   $49.99                                      │   │
│   │                  │                                              │   │
│   │                  │   Size: [Small] [Medium] [Large]             │   │
│   │                  │                                              │   │
│   │                  │   Quantity: [-] 1 [+]                        │   │
│   │                  │                                              │   │
│   │                  │   [Add to Cart]                              │   │
│   │                  │   ✓ 30-day money-back guarantee              │   │
│   └──────────────────┴──────────────────────────────────────────────┘   │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  [Description] [Product Details] [Care & Usage] [How to Load]   │   │
│   │                                                                 │   │
│   │  Made from 100% plant-based materials, CocoTurf absorbs...     │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   Sarah thinks: "Medium size for my puppy. Let me check reviews."      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

                         │
                    Scrolls to reviews
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        REVIEWS SECTION                                   │
│                                                                         │
│   127 Reviews                    Average: ★★★★★ (4.8)                  │
│   ─────────────────────────────────────────────                         │
│   ★★★★★  "Perfect for my French Bulldog"                               │
│   Verified Buyer - 2 weeks ago                                          │
│   "I was skeptical but this thing actually works..."                    │
│                                                                         │
│   [Load More Reviews]                                                   │
│                                                                         │
│   Sarah thinks: "OK, I'm convinced. Adding to cart."                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘


DECISION
─────────────────────────────────────────────────────────────────────────────

                         │
                    Clicks "Add to Cart"
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        CART DRAWER (Slides In)                          │
│                                                                         │
│   Your Cart (1 item)                                          [X]      │
│   ─────────────────────────────────────────────────────────────        │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ [img] CocoTurf Reusable Pee Pad - Medium                        │   │
│   │       $49.99              Qty: [-] 1 [+]           [Remove]     │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ 💡 Add CocoTurf Refill Pack and save 15%                        │   │
│   │    [Add for $29.99]                                             │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   Subtotal: $49.99                                                      │
│   Shipping: Calculated at checkout                                      │
│                                                                         │
│   [Checkout]                                                            │
│                                                                         │
│   Sarah thinks: "Refills make sense... adding those too."              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘


PURCHASE
─────────────────────────────────────────────────────────────────────────────

                         │
                    Clicks "Checkout"
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        CHECKOUT PAGE                                     │
│                                                                         │
│   ┌───────────────────────────────┬─────────────────────────────────┐   │
│   │   Contact                     │   Order Summary                 │   │
│   │   ──────────────────────      │   ─────────────────────         │   │
│   │   Email: [____________]       │   CocoTurf Medium    $49.99     │   │
│   │                               │   Refill Pack        $29.99     │   │
│   │   Shipping                    │   ─────────────────────         │   │
│   │   ──────────────────────      │   Subtotal           $79.98     │   │
│   │   Name: [________________]    │   Shipping            $5.99     │   │
│   │   Address: [_____________]    │   ─────────────────────         │   │
│   │   City: [____] State: [__]    │   Total              $85.97     │   │
│   │   ZIP: [_____]                │                                 │   │
│   │                               │                                 │   │
│   │   Payment                     │                                 │   │
│   │   ──────────────────────      │                                 │   │
│   │   [Apple Pay] [Google Pay]    │                                 │   │
│   │   ── or pay with card ──      │                                 │   │
│   │   Card: [________________]    │                                 │   │
│   │   Exp: [__/__] CVC: [___]     │                                 │   │
│   │                               │                                 │   │
│   │   ☐ Create account (optional) │                                 │   │
│   │                               │                                 │   │
│   │   [Complete Purchase]         │                                 │   │
│   └───────────────────────────────┴─────────────────────────────────┘   │
│                                                                         │
│   Sarah thinks: "Apple Pay makes this easy. Done!"                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

                         │
                    Apple Pay confirms
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        CONFIRMATION PAGE                                 │
│                                                                         │
│   ✓ Order Confirmed!                                                    │
│                                                                         │
│   Order #PP-12847                                                       │
│   A confirmation email has been sent to sarah@email.com                 │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │   What's Next?                                                  │   │
│   │   • You'll receive shipping confirmation within 24 hours        │   │
│   │   • Track your order anytime with your order number             │   │
│   │   • Questions? Contact support@petpatio.com                     │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   [Create Account to Track Order]    [Continue Shopping]               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key Metrics for Journey 1

| Stage | Metric | Target |
|-------|--------|--------|
| Awareness | Bounce rate | < 40% |
| Consideration | Time on product page | > 2 min |
| Decision | Add to cart rate | > 8% |
| Purchase | Cart abandonment | < 70% |
| Purchase | Checkout conversion | > 60% |

---

## Journey 2: Returning Customer Reorder

### Mike's Journey: Quick Reorder

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           LOGIN PAGE                                     │
│                                                                         │
│   Welcome back!                                                         │
│                                                                         │
│   Email: [mike@email.com_______]                                        │
│   Password: [••••••••••]                                                │
│                                                                         │
│   [Sign In]                                                             │
│                                                                         │
│   [Forgot password?]                                                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

                         │
                    Signs in
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        ACCOUNT DASHBOARD                                 │
│                                                                         │
│   ┌─────────────────┬───────────────────────────────────────────────┐   │
│   │   Navigation    │   Recent Orders                               │   │
│   │   ───────────   │   ─────────────────────────────────────────   │   │
│   │   Dashboard     │                                               │   │
│   │   Orders        │   Order #PP-11923 - Mar 15, 2026              │   │
│   │   Addresses     │   CocoTurf Refill Pack x2          $59.98     │   │
│   │   Wishlist      │   Status: Delivered ✓                         │   │
│   │   ───────────   │   [Reorder] [View Details]                    │   │
│   │   Log Out       │                                               │   │
│   │                 │   Order #PP-10847 - Feb 1, 2026               │   │
│   │                 │   CocoTurf Large + Refill          $89.98     │   │
│   │                 │   Status: Delivered ✓                         │   │
│   │                 │   [Reorder] [View Details]                    │   │
│   └─────────────────┴───────────────────────────────────────────────┘   │
│                                                                         │
│   Mike thinks: "Perfect, I'll just reorder my last refill purchase."  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

                         │
                    Clicks "Reorder"
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        CART (Pre-filled)                                 │
│                                                                         │
│   Your Cart (2 items)                                                   │
│   ─────────────────────────────────────────────────────────────        │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │ [img] CocoTurf Refill Pack                                      │   │
│   │       $29.99              Qty: [-] 2 [+]           [Remove]     │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   Subtotal: $59.98                                                      │
│   Shipping: FREE (orders over $50)                                      │
│   ─────────────────────────────────────────────────────────────        │
│   Total: $59.98                                                         │
│                                                                         │
│   Shipping to:                                                          │
│   Mike Johnson, 123 Main St, Austin TX 78701                            │
│   [Change Address]                                                      │
│                                                                         │
│   [Checkout with Apple Pay]                                             │
│                                                                         │
│   Mike thinks: "One tap and done. Love it."                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

                         │
                    Apple Pay (1-tap)
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        CONFIRMATION                                      │
│                                                                         │
│   ✓ Order Confirmed!                                                    │
│   Order #PP-12901                                                       │
│                                                                         │
│   Shipping to your saved address.                                       │
│   Estimated delivery: Apr 14-16                                         │
│                                                                         │
│   [View Order]    [Continue Shopping]                                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key Metrics for Journey 2

| Stage | Metric | Target |
|-------|--------|--------|
| Login | Success rate | > 95% |
| Reorder | Click rate | > 30% |
| Checkout | Completion | > 85% |
| Total | Time to purchase | < 60 sec |

---

## Journey 3: Newsletter Subscriber

### Emma's Journey: Research to Subscriber

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        HOMEPAGE (Browsing)                               │
│                                                                         │
│   Emma browses products, reads about CocoTurf...                        │
│                                                                         │
│   After 30 seconds of inactivity, about to close tab...                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

                         │
                    Exit intent detected
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                     NEWSLETTER MODAL                             │   │
│   │                                                          [X]    │   │
│   │                                                                 │   │
│   │                 🐾 Join the Pack!                               │   │
│   │                                                                 │   │
│   │     Get 15% off your first order + exclusive                    │   │
│   │     pet care tips delivered to your inbox.                      │   │
│   │                                                                 │   │
│   │     Email: [________________________]                           │   │
│   │                                                                 │   │
│   │     [Get My 15% Off]                                           │   │
│   │                                                                 │   │
│   │     No thanks, I'll pay full price                              │   │
│   │                                                                 │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   Emma thinks: "15% off when I'm ready? Sure, why not."               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

                         │
                    Enters email, submits
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                     SUCCESS MESSAGE                              │   │
│   │                                                                 │   │
│   │     ✓ You're in!                                                │   │
│   │                                                                 │   │
│   │     Check your email for your 15% discount code.                │   │
│   │     Code: WELCOME15                                             │   │
│   │                                                                 │   │
│   │     [Start Shopping]                                            │   │
│   │                                                                 │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

                         │
                    Later, receives email
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        WELCOME EMAIL                                     │
│                                                                         │
│   Subject: Welcome to the Pack! Here's your 15% off 🐾                 │
│                                                                         │
│   ─────────────────────────────────────────────────────────────        │
│                                                                         │
│   Hi there!                                                             │
│                                                                         │
│   Thanks for joining the PetPatio family.                               │
│                                                                         │
│   Use code WELCOME15 at checkout for 15% off your first order.         │
│                                                                         │
│   [Shop Now]                                                            │
│                                                                         │
│   This code expires in 7 days.                                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

                         │
                    7 days later, decides to get dog
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        PURCHASE FLOW                                     │
│                                                                         │
│   Emma clicks email link → Product page → Add to cart                  │
│                                                                         │
│   At checkout:                                                          │
│                                                                         │
│   Discount Code: [WELCOME15___] [Apply]                                 │
│                                                                         │
│   Subtotal: $49.99                                                      │
│   Discount: -$7.50                                                      │
│   Shipping: $5.99                                                       │
│   ─────────────────                                                     │
│   Total: $48.48                                                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key Metrics for Journey 3

| Stage | Metric | Target |
|-------|--------|--------|
| Modal | Display rate | 100% on exit intent |
| Modal | Close rate | < 60% |
| Signup | Conversion rate | > 5% |
| Email | Open rate | > 40% |
| Email | Click rate | > 10% |
| Coupon | Redemption rate | > 20% |

---

## Touchpoint Summary

| Touchpoint | Type | Purpose |
|------------|------|---------|
| Homepage Hero | Visual | First impression, value prop |
| Benefits Section | Content | Address objections |
| Product Page | Transactional | Inform and convert |
| Reviews | Social | Build trust |
| Cart Drawer | Transactional | Confirm and upsell |
| Checkout | Transactional | Complete purchase |
| Exit Modal | Marketing | Capture leads |
| Welcome Email | Marketing | Nurture and convert |
| Account Dashboard | Service | Retain and reorder |
| Order Confirmation | Transactional | Confirm and reassure |

---

## Emotional Journey Map

```
        😐                    😊                    🤩
        |                     |                     |
        |    Skeptical        |    Convinced        |    Delighted
   ─────┼─────────────────────┼─────────────────────┼─────────────────►
        |                     |                     |
   LAND │    Product info     │    Reviews + CTA    │    Fast checkout
        │    overcomes        │    build trust      │    + confirmation
        │    skepticism       │                     │


Legend:
─────────
LAND = Landing page
Product info = Detailed tabs, specifications
Reviews = Social proof from real customers
Fast checkout = Apple Pay / saved info
```

---

*Last updated: 2026-04-11*
