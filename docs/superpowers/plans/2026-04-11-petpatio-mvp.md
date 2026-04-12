# PetPatio Headless Storefront Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a headless Shopify storefront for PetPatio with custom reviews system, matching the petpatio.com design.

**Architecture:** TanStack Start frontend consuming Shopify Storefront API for products/cart/checkout, with PostgreSQL for custom reviews and analytics. Shopify handles payments and customer auth.

**Tech Stack:** TanStack Start, React 19, Radix UI Themes (purple accent), Shopify Storefront API (GraphQL), PostgreSQL, graphql-request

---

## File Structure

```
src/
├── lib/
│   ├── shopify/
│   │   ├── client.ts          # GraphQL client setup
│   │   ├── queries.ts         # Product/collection queries
│   │   ├── cart.ts            # Cart queries and mutations
│   │   └── types.ts           # TypeScript types from Shopify
│   └── db/
│       └── reviews.ts         # Review database operations
├── hooks/
│   ├── useCart.ts             # Cart state with TanStack DB
│   └── useReviews.ts          # Reviews for product
├── components/
│   ├── layout/
│   │   ├── AnnouncementBar.tsx
│   │   ├── Header.tsx         # Replace existing
│   │   ├── Footer.tsx
│   │   ├── CartDrawer.tsx
│   │   └── MobileNav.tsx
│   ├── home/
│   │   ├── HeroSlideshow.tsx
│   │   ├── FeaturedProduct.tsx
│   │   ├── BenefitsGrid.tsx
│   │   ├── ProductCollection.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQPreview.tsx
│   │   └── NewsletterSignup.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── VariantPicker.tsx
│   │   ├── AddToCart.tsx
│   │   ├── ProductTabs.tsx
│   │   └── RelatedProducts.tsx
│   ├── reviews/
│   │   ├── StarRating.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── ReviewList.tsx
│   │   └── ReviewForm.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CheckoutButton.tsx
│   └── account/
│       ├── OrderCard.tsx
│       └── AddressCard.tsx
└── routes/
    ├── __root.tsx             # Update with new layout
    ├── index.tsx              # Homepage with all sections
    ├── products/
    │   ├── index.tsx          # All products
    │   └── $handle.tsx        # Product detail
    ├── collections/
    │   └── $handle.tsx        # Collection page
    ├── cart.tsx               # Full cart page
    ├── account/
    │   ├── index.tsx          # Dashboard
    │   └── orders.$id.tsx     # Order detail
    ├── pages/
    │   ├── faq.tsx
    │   ├── about.tsx
    │   └── contact.tsx
    └── api/
        ├── reviews.ts         # Reviews CRUD
        └── webhooks.shopify.ts
```

---

## Phase 1: Foundation & Shopify Integration

### Task 1: Add Shopify Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Shopify and GraphQL packages**

Run:
```bash
pnpm add graphql graphql-request
```

- [ ] **Step 2: Verify installation**

Run: `pnpm list graphql graphql-request`
Expected: Both packages listed

- [ ] **Step 3: Commit**

```bash
jj describe -m "feat: add graphql and graphql-request dependencies"
```

---

### Task 2: Environment Configuration

**Files:**
- Create: `.env.local`
- Modify: `.gitignore`

- [ ] **Step 1: Add env template**

Create `.env.example`:
```
# Shopify Storefront API
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token

# Database (Phase 2)
DATABASE_URL=postgresql://...
```

- [ ] **Step 2: Create local env file**

Create `.env.local`:
```
SHOPIFY_STORE_DOMAIN=petpatio.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your-actual-token-here
```

- [ ] **Step 3: Verify .gitignore includes .env.local**

Check that `.gitignore` contains:
```
.env.local
.env*.local
```

- [ ] **Step 4: Commit env template only**

```bash
jj describe -m "feat: add environment configuration template"
```

---

### Task 3: Shopify TypeScript Types

**Files:**
- Create: `src/lib/shopify/types.ts`

- [ ] **Step 1: Create Shopify types file**

```typescript
// src/lib/shopify/types.ts

export interface ShopifyImage {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyPrice {
  amount: string
  currencyCode: string
}

export interface ShopifyProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: ShopifyPrice
  compareAtPrice: ShopifyPrice | null
  selectedOptions: Array<{
    name: string
    value: string
  }>
  image: ShopifyImage | null
}

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  featuredImage: ShopifyImage | null
  images: {
    edges: Array<{ node: ShopifyImage }>
  }
  variants: {
    edges: Array<{ node: ShopifyProductVariant }>
  }
  priceRange: {
    minVariantPrice: ShopifyPrice
    maxVariantPrice: ShopifyPrice
  }
  options: Array<{
    name: string
    values: string[]
  }>
  tags: string[]
  productType: string
}

export interface ShopifyCollection {
  id: string
  handle: string
  title: string
  description: string
  image: ShopifyImage | null
  products: {
    edges: Array<{ node: ShopifyProduct }>
  }
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: {
      id: string
      handle: string
      title: string
      featuredImage: ShopifyImage | null
    }
    price: ShopifyPrice
    selectedOptions: Array<{
      name: string
      value: string
    }>
    image: ShopifyImage | null
  }
  cost: {
    totalAmount: ShopifyPrice
  }
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: ShopifyPrice
    totalAmount: ShopifyPrice
  }
  lines: {
    edges: Array<{ node: ShopifyCartLine }>
  }
}

export interface ShopifyCustomer {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  displayName: string
}

export interface ShopifyOrder {
  id: string
  orderNumber: number
  processedAt: string
  financialStatus: string
  fulfillmentStatus: string
  totalPrice: ShopifyPrice
  lineItems: {
    edges: Array<{
      node: {
        title: string
        quantity: number
        variant: {
          image: ShopifyImage | null
          price: ShopifyPrice
        } | null
      }
    }>
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
jj describe -m "feat: add Shopify TypeScript types"
```

---

### Task 4: Shopify GraphQL Client

**Files:**
- Create: `src/lib/shopify/client.ts`

- [ ] **Step 1: Create GraphQL client**

```typescript
// src/lib/shopify/client.ts
import { GraphQLClient } from 'graphql-request'

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || process.env.SHOPIFY_STOREFRONT_TOKEN

if (!domain || !token) {
  console.warn('Shopify credentials not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN.')
}

const endpoint = `https://${domain}/api/2024-01/graphql.json`

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': token || '',
    'Content-Type': 'application/json',
  },
})
```

- [ ] **Step 2: Update environment variable prefix for Vite**

Update `.env.local` to use VITE_ prefix:
```
VITE_SHOPIFY_STORE_DOMAIN=petpatio.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-actual-token-here
```

- [ ] **Step 3: Commit**

```bash
jj describe -m "feat: add Shopify GraphQL client"
```

---

### Task 5: Product Queries

**Files:**
- Create: `src/lib/shopify/queries.ts`

- [ ] **Step 1: Create product queries**

```typescript
// src/lib/shopify/queries.ts
import { gql } from 'graphql-request'
import { shopifyClient } from './client'
import type { ShopifyProduct, ShopifyCollection } from './types'

const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    productType
    tags
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    options {
      name
      values
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`

export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const query = gql`
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `

  const data = await shopifyClient.request<{
    products: { edges: Array<{ node: ShopifyProduct }> }
  }>(query, { first })

  return data.products.edges.map(edge => edge.node)
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = gql`
    ${PRODUCT_FRAGMENT}
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        ...ProductFields
      }
    }
  `

  const data = await shopifyClient.request<{
    productByHandle: ShopifyProduct | null
  }>(query, { handle })

  return data.productByHandle
}

export async function getCollection(handle: string, first = 20): Promise<ShopifyCollection | null> {
  const query = gql`
    ${PRODUCT_FRAGMENT}
    query GetCollection($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        id
        handle
        title
        description
        image {
          url
          altText
          width
          height
        }
        products(first: $first) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    }
  `

  const data = await shopifyClient.request<{
    collectionByHandle: ShopifyCollection | null
  }>(query, { handle, first })

  return data.collectionByHandle
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
jj describe -m "feat: add Shopify product queries"
```

---

### Task 6: Cart Operations

**Files:**
- Create: `src/lib/shopify/cart.ts`

- [ ] **Step 1: Create cart queries and mutations**

```typescript
// src/lib/shopify/cart.ts
import { gql } from 'graphql-request'
import { shopifyClient } from './client'
import type { ShopifyCart } from './types'

const CART_FRAGMENT = gql`
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
                width
                height
              }
              product {
                id
                handle
                title
                featuredImage {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

export async function createCart(): Promise<ShopifyCart> {
  const mutation = gql`
    ${CART_FRAGMENT}
    mutation CreateCart {
      cartCreate {
        cart {
          ...CartFields
        }
      }
    }
  `

  const data = await shopifyClient.request<{
    cartCreate: { cart: ShopifyCart }
  }>(mutation)

  return data.cartCreate.cart
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = gql`
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
  `

  const data = await shopifyClient.request<{
    cart: ShopifyCart | null
  }>(query, { cartId })

  return data.cart
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<ShopifyCart> {
  const mutation = gql`
    ${CART_FRAGMENT}
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
  `

  const data = await shopifyClient.request<{
    cartLinesAdd: { cart: ShopifyCart }
  }>(mutation, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  })

  return data.cartLinesAdd.cart
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const mutation = gql`
    ${CART_FRAGMENT}
    mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
  `

  const data = await shopifyClient.request<{
    cartLinesUpdate: { cart: ShopifyCart }
  }>(mutation, {
    cartId,
    lines: [{ id: lineId, quantity }],
  })

  return data.cartLinesUpdate.cart
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const mutation = gql`
    ${CART_FRAGMENT}
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
      }
    }
  `

  const data = await shopifyClient.request<{
    cartLinesRemove: { cart: ShopifyCart }
  }>(mutation, { cartId, lineIds })

  return data.cartLinesRemove.cart
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
jj describe -m "feat: add Shopify cart operations"
```

---

### Task 7: Cart Hook

**Files:**
- Create: `src/hooks/useCart.ts`

- [ ] **Step 1: Create cart hook with local storage persistence**

```typescript
// src/hooks/useCart.ts
import { useState, useEffect, useCallback } from 'react'
import {
  createCart,
  getCart,
  addToCart as addToCartApi,
  updateCartLine,
  removeFromCart as removeFromCartApi,
} from '../lib/shopify/cart'
import type { ShopifyCart } from '../lib/shopify/types'

const CART_ID_KEY = 'petpatio-cart-id'

export function useCart() {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Initialize cart on mount
  useEffect(() => {
    async function initCart() {
      setIsLoading(true)
      try {
        const storedCartId = localStorage.getItem(CART_ID_KEY)

        if (storedCartId) {
          const existingCart = await getCart(storedCartId)
          if (existingCart) {
            setCart(existingCart)
            setIsLoading(false)
            return
          }
        }

        // Create new cart if none exists
        const newCart = await createCart()
        localStorage.setItem(CART_ID_KEY, newCart.id)
        setCart(newCart)
      } catch (error) {
        console.error('Failed to initialize cart:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initCart()
  }, [])

  const addToCart = useCallback(async (variantId: string, quantity = 1) => {
    if (!cart) return

    setIsLoading(true)
    try {
      const updatedCart = await addToCartApi(cart.id, variantId, quantity)
      setCart(updatedCart)
      setIsDrawerOpen(true)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return

    setIsLoading(true)
    try {
      if (quantity <= 0) {
        const updatedCart = await removeFromCartApi(cart.id, [lineId])
        setCart(updatedCart)
      } else {
        const updatedCart = await updateCartLine(cart.id, lineId, quantity)
        setCart(updatedCart)
      }
    } catch (error) {
      console.error('Failed to update quantity:', error)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return

    setIsLoading(true)
    try {
      const updatedCart = await removeFromCartApi(cart.id, [lineId])
      setCart(updatedCart)
    } catch (error) {
      console.error('Failed to remove item:', error)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])

  return {
    cart,
    isLoading,
    isDrawerOpen,
    addToCart,
    updateQuantity,
    removeItem,
    openDrawer,
    closeDrawer,
    checkoutUrl: cart?.checkoutUrl,
    itemCount: cart?.totalQuantity ?? 0,
  }
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
jj describe -m "feat: add useCart hook with localStorage persistence"
```

---

## Phase 2: Layout Components

### Task 8: Update Theme Configuration

**Files:**
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Update Theme to purple accent**

In `src/routes/__root.tsx`, change:
```typescript
<Theme accentColor="blue" grayColor="slate" radius="medium">
```
to:
```typescript
<Theme accentColor="purple" grayColor="slate" radius="medium">
```

- [ ] **Step 2: Update page title**

Change:
```typescript
{ title: 'My App' },
```
to:
```typescript
{ title: 'PetPatio — Premium Pet Gear' },
```

- [ ] **Step 3: Verify dev server runs**

Run: `pnpm dev`
Expected: App loads with purple accent color

- [ ] **Step 4: Commit**

```bash
jj describe -m "feat: configure purple theme and update title"
```

---

### Task 9: AnnouncementBar Component

**Files:**
- Create: `src/components/layout/AnnouncementBar.tsx`

- [ ] **Step 1: Create AnnouncementBar**

```typescript
// src/components/layout/AnnouncementBar.tsx
import { Box, Text } from '@radix-ui/themes'

export function AnnouncementBar() {
  return (
    <Box
      style={{
        backgroundColor: 'var(--gray-12)',
        color: 'var(--gray-1)',
      }}
      py="2"
    >
      <Text size="2" align="center" weight="medium" style={{ display: 'block' }}>
        Free shipping on all orders $100+
      </Text>
    </Box>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
jj describe -m "feat: add AnnouncementBar component"
```

---

### Task 10: New Header Component

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Replace Header with new implementation**

```typescript
// src/components/Header.tsx
import { Box, Container, Flex, Text, IconButton, Badge } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import { ShoppingCart, User, Menu } from 'lucide-react'

interface HeaderProps {
  cartItemCount?: number
  onCartClick?: () => void
  onMenuClick?: () => void
}

export function Header({ cartItemCount = 0, onCartClick, onMenuClick }: HeaderProps) {
  return (
    <Box
      style={{
        borderBottom: '1px solid var(--gray-4)',
        backgroundColor: 'var(--color-background)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
      py="4"
    >
      <Container size="4">
        <Flex align="center" justify="between">
          {/* Mobile menu button */}
          <Box display={{ initial: 'block', md: 'none' }}>
            <IconButton variant="ghost" size="3" onClick={onMenuClick}>
              <Menu size={24} />
            </IconButton>
          </Box>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Text size="6" weight="bold" style={{ color: 'var(--accent-9)' }}>
              PetPatio
            </Text>
          </Link>

          {/* Desktop Navigation */}
          <Flex gap="6" display={{ initial: 'none', md: 'flex' }}>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <Text size="3" color="gray" style={{ cursor: 'pointer' }}>
                Shop
              </Text>
            </Link>
            <Link to="/pages/about" style={{ textDecoration: 'none' }}>
              <Text size="3" color="gray" style={{ cursor: 'pointer' }}>
                About
              </Text>
            </Link>
            <Link to="/pages/faq" style={{ textDecoration: 'none' }}>
              <Text size="3" color="gray" style={{ cursor: 'pointer' }}>
                FAQ
              </Text>
            </Link>
          </Flex>

          {/* Actions */}
          <Flex gap="2" align="center">
            <IconButton variant="ghost" size="3">
              <User size={20} />
            </IconButton>
            <Box style={{ position: 'relative' }}>
              <IconButton variant="ghost" size="3" onClick={onCartClick}>
                <ShoppingCart size={20} />
              </IconButton>
              {cartItemCount > 0 && (
                <Badge
                  size="1"
                  color="purple"
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    minWidth: 18,
                    height: 18,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {cartItemCount}
                </Badge>
              )}
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
jj describe -m "feat: update Header with cart and navigation"
```

---

### Task 11: Footer Component

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create Footer**

```typescript
// src/components/layout/Footer.tsx
import { Box, Container, Flex, Grid, Text, Link as RadixLink } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import { Instagram } from 'lucide-react'

export function Footer() {
  return (
    <Box style={{ backgroundColor: 'var(--gray-12)', color: 'var(--gray-1)' }} py="9">
      <Container size="4">
        <Grid columns={{ initial: '1', md: '4' }} gap="8">
          {/* Brand */}
          <Flex direction="column" gap="3">
            <Text size="5" weight="bold" style={{ color: 'var(--gray-1)' }}>
              PetPatio
            </Text>
            <Text size="2" style={{ color: 'var(--gray-6)' }}>
              Premium pet gear for the modern home.
            </Text>
          </Flex>

          {/* Shop */}
          <Flex direction="column" gap="3">
            <Text size="2" weight="bold" style={{ color: 'var(--gray-4)' }}>
              SHOP
            </Text>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <Text size="2" style={{ color: 'var(--gray-6)', cursor: 'pointer' }}>
                All Products
              </Text>
            </Link>
            <Link to="/products/cocoturf" style={{ textDecoration: 'none' }}>
              <Text size="2" style={{ color: 'var(--gray-6)', cursor: 'pointer' }}>
                CocoTurf
              </Text>
            </Link>
          </Flex>

          {/* Support */}
          <Flex direction="column" gap="3">
            <Text size="2" weight="bold" style={{ color: 'var(--gray-4)' }}>
              SUPPORT
            </Text>
            <Link to="/pages/faq" style={{ textDecoration: 'none' }}>
              <Text size="2" style={{ color: 'var(--gray-6)', cursor: 'pointer' }}>
                FAQ
              </Text>
            </Link>
            <Link to="/pages/contact" style={{ textDecoration: 'none' }}>
              <Text size="2" style={{ color: 'var(--gray-6)', cursor: 'pointer' }}>
                Contact
              </Text>
            </Link>
            <Link to="/pages/about" style={{ textDecoration: 'none' }}>
              <Text size="2" style={{ color: 'var(--gray-6)', cursor: 'pointer' }}>
                About
              </Text>
            </Link>
          </Flex>

          {/* Social */}
          <Flex direction="column" gap="3">
            <Text size="2" weight="bold" style={{ color: 'var(--gray-4)' }}>
              FOLLOW US
            </Text>
            <Flex gap="4">
              <RadixLink href="https://instagram.com/petpatio" target="_blank">
                <Instagram size={20} style={{ color: 'var(--gray-6)' }} />
              </RadixLink>
            </Flex>
          </Flex>
        </Grid>

        {/* Bottom */}
        <Flex
          justify="between"
          align="center"
          mt="8"
          pt="6"
          style={{ borderTop: '1px solid var(--gray-10)' }}
          direction={{ initial: 'column', md: 'row' }}
          gap="4"
        >
          <Text size="1" style={{ color: 'var(--gray-8)' }}>
            © {new Date().getFullYear()} PetPatio. All rights reserved.
          </Text>
          <Flex gap="4">
            <Text size="1" style={{ color: 'var(--gray-8)' }}>Visa</Text>
            <Text size="1" style={{ color: 'var(--gray-8)' }}>Mastercard</Text>
            <Text size="1" style={{ color: 'var(--gray-8)' }}>Amex</Text>
            <Text size="1" style={{ color: 'var(--gray-8)' }}>PayPal</Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
jj describe -m "feat: add Footer component"
```

---

### Task 12: CartDrawer Component

**Files:**
- Create: `src/components/layout/CartDrawer.tsx`

- [ ] **Step 1: Create CartDrawer**

```typescript
// src/components/layout/CartDrawer.tsx
import { Dialog, Flex, Box, Text, Heading, Button, IconButton, Separator } from '@radix-ui/themes'
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import type { ShopifyCart, ShopifyCartLine } from '../../lib/shopify/types'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  cart: ShopifyCart | null
  onUpdateQuantity: (lineId: string, quantity: number) => void
  onRemoveItem: (lineId: string) => void
  isLoading: boolean
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

function CartLineItem({
  line,
  onUpdateQuantity,
  onRemove,
}: {
  line: ShopifyCartLine
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}) {
  const { merchandise, quantity, cost } = line
  const image = merchandise.image || merchandise.product.featuredImage

  return (
    <Flex gap="4" py="4">
      {/* Image */}
      <Box
        style={{
          width: 80,
          height: 80,
          backgroundColor: 'var(--gray-3)',
          borderRadius: 'var(--radius-2)',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {image && (
          <img
            src={image.url}
            alt={image.altText || merchandise.product.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </Box>

      {/* Details */}
      <Flex direction="column" gap="2" style={{ flex: 1 }}>
        <Text size="2" weight="medium">
          {merchandise.product.title}
        </Text>
        <Text size="1" color="gray">
          {merchandise.selectedOptions.map(o => o.value).join(' / ')}
        </Text>

        {/* Quantity controls */}
        <Flex align="center" gap="2" mt="1">
          <IconButton
            size="1"
            variant="soft"
            onClick={() => onUpdateQuantity(quantity - 1)}
          >
            <Minus size={12} />
          </IconButton>
          <Text size="2">{quantity}</Text>
          <IconButton
            size="1"
            variant="soft"
            onClick={() => onUpdateQuantity(quantity + 1)}
          >
            <Plus size={12} />
          </IconButton>
          <IconButton size="1" variant="ghost" color="red" onClick={onRemove}>
            <Trash2 size={14} />
          </IconButton>
        </Flex>
      </Flex>

      {/* Price */}
      <Text size="2" weight="medium">
        {formatPrice(cost.totalAmount.amount, cost.totalAmount.currencyCode)}
      </Text>
    </Flex>
  )
}

export function CartDrawer({
  open,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  isLoading,
}: CartDrawerProps) {
  const lines = cart?.lines.edges.map(e => e.node) ?? []
  const isEmpty = lines.length === 0

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: 420,
          margin: 0,
          borderRadius: 0,
          animation: 'slideInFromRight 0.2s ease-out',
        }}
      >
        <Flex direction="column" style={{ height: '100%' }}>
          {/* Header */}
          <Flex justify="between" align="center" p="4" style={{ borderBottom: '1px solid var(--gray-4)' }}>
            <Heading size="4">Your Cart</Heading>
            <IconButton variant="ghost" onClick={onClose}>
              <X size={20} />
            </IconButton>
          </Flex>

          {/* Content */}
          <Box style={{ flex: 1, overflowY: 'auto' }} px="4">
            {isEmpty ? (
              <Flex direction="column" align="center" justify="center" py="9" gap="3">
                <Text color="gray">Your cart is empty</Text>
                <Button variant="soft" onClick={onClose}>
                  Continue Shopping
                </Button>
              </Flex>
            ) : (
              <Flex direction="column">
                {lines.map(line => (
                  <Box key={line.id}>
                    <CartLineItem
                      line={line}
                      onUpdateQuantity={(qty) => onUpdateQuantity(line.id, qty)}
                      onRemove={() => onRemoveItem(line.id)}
                    />
                    <Separator size="4" />
                  </Box>
                ))}
              </Flex>
            )}
          </Box>

          {/* Footer */}
          {!isEmpty && cart && (
            <Box p="4" style={{ borderTop: '1px solid var(--gray-4)' }}>
              <Flex justify="between" mb="4">
                <Text size="3" weight="medium">Subtotal</Text>
                <Text size="3" weight="bold">
                  {formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
                </Text>
              </Flex>
              <Text size="1" color="gray" mb="4" style={{ display: 'block' }}>
                Shipping calculated at checkout
              </Text>
              <Button
                size="3"
                style={{ width: '100%' }}
                disabled={isLoading}
                onClick={() => {
                  if (cart.checkoutUrl) {
                    window.location.href = cart.checkoutUrl
                  }
                }}
              >
                Checkout
              </Button>
            </Box>
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
```

- [ ] **Step 2: Add slide animation to styles.css**

Add to `src/styles.css`:
```css
@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
```

- [ ] **Step 3: Verify no TypeScript errors**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
jj describe -m "feat: add CartDrawer component"
```

---

### Task 13: Create Cart Context

**Files:**
- Create: `src/contexts/CartContext.tsx`

- [ ] **Step 1: Create CartContext provider**

```typescript
// src/contexts/CartContext.tsx
import { createContext, useContext, type ReactNode } from 'react'
import { useCart } from '../hooks/useCart'
import type { ShopifyCart } from '../lib/shopify/types'

interface CartContextValue {
  cart: ShopifyCart | null
  isLoading: boolean
  isDrawerOpen: boolean
  addToCart: (variantId: string, quantity?: number) => Promise<void>
  updateQuantity: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  openDrawer: () => void
  closeDrawer: () => void
  checkoutUrl: string | undefined
  itemCount: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart()

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
jj describe -m "feat: add CartContext provider"
```

---

### Task 14: Update Root Layout

**Files:**
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Update root layout with new components**

Replace entire file with:

```typescript
// src/routes/__root.tsx
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { Theme, Box, Container, Flex, Heading, Text } from '@radix-ui/themes'

import { Header } from '../components/Header'
import { Footer } from '../components/layout/Footer'
import { AnnouncementBar } from '../components/layout/AnnouncementBar'
import { CartDrawer } from '../components/layout/CartDrawer'
import { CartProvider, useCartContext } from '../contexts/CartContext'

import radixCss from '@radix-ui/themes/styles.css?url'
import interCss from '@fontsource/inter/latin.css?url'
import typographyCss from '/typography.css?url'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'PetPatio — Premium Pet Gear' },
    ],
    links: [
      { rel: 'stylesheet', href: radixCss },
      { rel: 'stylesheet', href: interCss },
      { rel: 'stylesheet', href: typographyCss },
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function NotFound() {
  return (
    <Container size="2" py="9">
      <Flex direction="column" gap="2" align="center">
        <Heading size="8">404</Heading>
        <Text color="gray">Page not found</Text>
      </Flex>
    </Container>
  )
}

function AppLayout() {
  const { cart, isLoading, isDrawerOpen, openDrawer, closeDrawer, updateQuantity, removeItem, itemCount } = useCartContext()

  return (
    <Flex direction="column" style={{ minHeight: '100vh' }}>
      <AnnouncementBar />
      <Header cartItemCount={itemCount} onCartClick={openDrawer} />
      <Box style={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
      <CartDrawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        isLoading={isLoading}
      />
    </Flex>
  )
}

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Theme accentColor="purple" grayColor="slate" radius="medium">
          <CartProvider>
            <AppLayout />
          </CartProvider>
        </Theme>
        <Scripts />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Remove unused imports and files**

Delete `src/components/ThemePicker.tsx` and `src/contexts/ThemeContext.tsx` if no longer needed.

- [ ] **Step 3: Verify dev server runs**

Run: `pnpm dev`
Expected: App loads with AnnouncementBar, Header, Footer

- [ ] **Step 4: Commit**

```bash
jj describe -m "feat: integrate layout components in root"
```

---

## Phase 3: Homepage Sections

### Task 15: ProductCard Component

**Files:**
- Create: `src/components/product/ProductCard.tsx`

- [ ] **Step 1: Create ProductCard**

```typescript
// src/components/product/ProductCard.tsx
import { Card, Flex, Box, Text, Heading } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import type { ShopifyProduct } from '../../lib/shopify/types'

interface ProductCardProps {
  product: ShopifyProduct
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

export function ProductCard({ product }: ProductCardProps) {
  const { handle, title, featuredImage, priceRange } = product
  const price = priceRange.minVariantPrice

  return (
    <Link to="/products/$handle" params={{ handle }} style={{ textDecoration: 'none' }}>
      <Card style={{ cursor: 'pointer' }}>
        <Flex direction="column" gap="3">
          {/* Image */}
          <Box
            style={{
              aspectRatio: '1',
              backgroundColor: 'var(--gray-3)',
              borderRadius: 'var(--radius-2)',
              overflow: 'hidden',
            }}
          >
            {featuredImage && (
              <img
                src={featuredImage.url}
                alt={featuredImage.altText || title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </Box>

          {/* Info */}
          <Flex direction="column" gap="1">
            <Heading size="3" weight="medium">
              {title}
            </Heading>
            <Text size="3" weight="bold" color="purple">
              {formatPrice(price.amount, price.currencyCode)}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Link>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
jj describe -m "feat: add ProductCard component"
```

---

### Task 16: HeroSlideshow Component

**Files:**
- Create: `src/components/home/HeroSlideshow.tsx`

- [ ] **Step 1: Create HeroSlideshow**

```typescript
// src/components/home/HeroSlideshow.tsx
import { Box, Container, Flex, Heading, Text, Button } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'

export function HeroSlideshow() {
  return (
    <Box
      style={{
        backgroundColor: 'var(--accent-3)',
        backgroundImage: 'linear-gradient(135deg, var(--accent-3) 0%, var(--accent-4) 100%)',
      }}
      py="9"
    >
      <Container size="4">
        <Flex
          direction="column"
          align="center"
          gap="5"
          py="9"
          style={{ textAlign: 'center' }}
        >
          <Text size="2" weight="medium" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Introducing
          </Text>
          <Heading size="9" weight="bold">
            CocoTurf
          </Heading>
          <Text size="5" color="gray" style={{ maxWidth: 500 }}>
            The last pee pad you'll ever buy. Plant-based. Reusable. Built to perform.
          </Text>
          <Flex gap="4" mt="4">
            <Link to="/products">
              <Button size="4">Shop Now</Button>
            </Link>
            <Link to="/pages/about">
              <Button size="4" variant="outline">Learn More</Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add HeroSlideshow component"
```

---

### Task 17: BenefitsGrid Component

**Files:**
- Create: `src/components/home/BenefitsGrid.tsx`

- [ ] **Step 1: Create BenefitsGrid**

```typescript
// src/components/home/BenefitsGrid.tsx
import { Box, Container, Grid, Flex, Heading, Text } from '@radix-ui/themes'
import { Leaf, RefreshCw, Sparkles } from 'lucide-react'

const benefits = [
  {
    icon: Leaf,
    title: 'Plant-Based',
    description: '100% natural coconut coir fibers. Sustainable and biodegradable.',
  },
  {
    icon: RefreshCw,
    title: 'Reusable',
    description: 'Machine washable up to 100+ times. One pad replaces thousands of disposables.',
  },
  {
    icon: Sparkles,
    title: 'Odor Control',
    description: 'Natural antimicrobial properties neutralize odors at the source.',
  },
]

export function BenefitsGrid() {
  return (
    <Box py="9">
      <Container size="4">
        <Grid columns={{ initial: '1', md: '3' }} gap="6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <Flex key={benefit.title} direction="column" align="center" gap="3" style={{ textAlign: 'center' }}>
                <Box
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={28} style={{ color: 'var(--accent-9)' }} />
                </Box>
                <Heading size="4">{benefit.title}</Heading>
                <Text size="2" color="gray">
                  {benefit.description}
                </Text>
              </Flex>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add BenefitsGrid component"
```

---

### Task 18: FeaturedProduct Component

**Files:**
- Create: `src/components/home/FeaturedProduct.tsx`

- [ ] **Step 1: Create FeaturedProduct**

```typescript
// src/components/home/FeaturedProduct.tsx
import { Box, Container, Flex, Grid, Heading, Text, Button } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import type { ShopifyProduct } from '../../lib/shopify/types'

interface FeaturedProductProps {
  product: ShopifyProduct | null
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

export function FeaturedProduct({ product }: FeaturedProductProps) {
  if (!product) {
    return null
  }

  const { handle, title, description, featuredImage, priceRange } = product
  const price = priceRange.minVariantPrice

  return (
    <Box style={{ backgroundColor: 'var(--gray-2)' }} py="9">
      <Container size="4">
        <Grid columns={{ initial: '1', md: '2' }} gap="8" align="center">
          {/* Image */}
          <Box
            style={{
              aspectRatio: '1',
              backgroundColor: 'var(--gray-3)',
              borderRadius: 'var(--radius-4)',
              overflow: 'hidden',
            }}
          >
            {featuredImage && (
              <img
                src={featuredImage.url}
                alt={featuredImage.altText || title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </Box>

          {/* Content */}
          <Flex direction="column" gap="5">
            <Text size="2" weight="medium" color="gray" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Featured Product
            </Text>
            <Heading size="8">{title}</Heading>
            <Text size="4" color="gray" style={{ lineHeight: 1.6 }}>
              {description}
            </Text>
            <Text size="6" weight="bold" color="purple">
              {formatPrice(price.amount, price.currencyCode)}
            </Text>
            <Link to="/products/$handle" params={{ handle }}>
              <Button size="4">View Product</Button>
            </Link>
          </Flex>
        </Grid>
      </Container>
    </Box>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add FeaturedProduct component"
```

---

### Task 19: ProductCollection Component

**Files:**
- Create: `src/components/home/ProductCollection.tsx`

- [ ] **Step 1: Create ProductCollection**

```typescript
// src/components/home/ProductCollection.tsx
import { Box, Container, Flex, Grid, Heading, Button } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import { ProductCard } from '../product/ProductCard'
import type { ShopifyProduct } from '../../lib/shopify/types'

interface ProductCollectionProps {
  title?: string
  products: ShopifyProduct[]
}

export function ProductCollection({ title = 'Shop All Products', products }: ProductCollectionProps) {
  return (
    <Box py="9">
      <Container size="4">
        <Flex direction="column" gap="6">
          <Flex justify="between" align="center">
            <Heading size="6">{title}</Heading>
            <Link to="/products">
              <Button variant="ghost">View All →</Button>
            </Link>
          </Flex>
          <Grid columns={{ initial: '1', sm: '2', md: '3', lg: '4' }} gap="6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        </Flex>
      </Container>
    </Box>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add ProductCollection component"
```

---

### Task 20: Testimonials Component

**Files:**
- Create: `src/components/home/Testimonials.tsx`

- [ ] **Step 1: Create Testimonials**

```typescript
// src/components/home/Testimonials.tsx
import { Box, Container, Grid, Flex, Heading, Text, Card } from '@radix-ui/themes'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah M.',
    rating: 5,
    text: 'Game changer for our apartment! No more plastic waste and it actually works better than disposables.',
  },
  {
    name: 'Mike T.',
    rating: 5,
    text: 'My Frenchie took to it immediately. Easy to clean and no odor. Worth every penny.',
  },
  {
    name: 'Jessica L.',
    rating: 4,
    text: 'Takes a few washes to fully break in, but now it\'s perfect. Love that it\'s plant-based.',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <Flex gap="1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          fill={star <= rating ? 'var(--accent-9)' : 'none'}
          stroke={star <= rating ? 'var(--accent-9)' : 'var(--gray-6)'}
        />
      ))}
    </Flex>
  )
}

export function Testimonials() {
  return (
    <Box style={{ backgroundColor: 'var(--accent-2)' }} py="9">
      <Container size="4">
        <Flex direction="column" gap="6" align="center">
          <Heading size="6" align="center">What Customers Say</Heading>
          <Grid columns={{ initial: '1', md: '3' }} gap="6" style={{ width: '100%' }}>
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <Flex direction="column" gap="3" p="4">
                  <StarRating rating={testimonial.rating} />
                  <Text size="2" style={{ fontStyle: 'italic' }}>
                    "{testimonial.text}"
                  </Text>
                  <Text size="2" weight="medium" color="gray">
                    — {testimonial.name}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Flex>
      </Container>
    </Box>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add Testimonials component"
```

---

### Task 21: FAQPreview Component

**Files:**
- Create: `src/components/home/FAQPreview.tsx`

- [ ] **Step 1: Create FAQPreview**

```typescript
// src/components/home/FAQPreview.tsx
import { Box, Container, Flex, Heading, Text, Button } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How do I clean CocoTurf?',
    answer: 'Simply rinse with water after each use. For a deep clean, machine wash on cold and air dry. It\'s that easy.',
  },
  {
    question: 'What sizes are available?',
    answer: 'We offer Small (for dogs up to 15 lbs), Medium (15-30 lbs), and Large (30+ lbs) to fit any space and any pup.',
  },
  {
    question: 'How long does it last?',
    answer: 'With proper care, CocoTurf lasts 1-2 years. That\'s hundreds of uses and zero waste compared to disposables.',
  },
]

export function FAQPreview() {
  return (
    <Box py="9">
      <Container size="2">
        <Flex direction="column" gap="6" align="center">
          <Heading size="6" align="center">Frequently Asked Questions</Heading>

          <Accordion.Root type="single" collapsible style={{ width: '100%' }}>
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                style={{ borderBottom: '1px solid var(--gray-4)' }}
              >
                <Accordion.Trigger
                  style={{
                    width: '100%',
                    padding: '16px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <Text size="3" weight="medium">{faq.question}</Text>
                  <ChevronDown size={20} style={{ color: 'var(--gray-9)' }} />
                </Accordion.Trigger>
                <Accordion.Content style={{ paddingBottom: 16 }}>
                  <Text size="2" color="gray">{faq.answer}</Text>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

          <Link to="/pages/faq">
            <Button variant="ghost">View All FAQ →</Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add FAQPreview component"
```

---

### Task 22: NewsletterSignup Component

**Files:**
- Create: `src/components/home/NewsletterSignup.tsx`

- [ ] **Step 1: Create NewsletterSignup**

```typescript
// src/components/home/NewsletterSignup.tsx
import { useState } from 'react'
import { Box, Container, Flex, Heading, Text, TextField, Button } from '@radix-ui/themes'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // MVP: No backend - just show success state
    setSubmitted(true)
  }

  return (
    <Box style={{ backgroundColor: 'var(--accent-9)' }} py="9">
      <Container size="2">
        <Flex direction="column" gap="4" align="center" style={{ textAlign: 'center' }}>
          <Heading size="6" style={{ color: 'white' }}>
            Join the Pack
          </Heading>
          <Text size="3" style={{ color: 'var(--accent-3)' }}>
            Get 15% off your first order + exclusive pet care tips.
          </Text>

          {submitted ? (
            <Text size="3" style={{ color: 'white' }} weight="medium">
              ✓ Thanks for subscribing!
            </Text>
          ) : (
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 400 }}>
              <Flex gap="2">
                <TextField.Root
                  size="3"
                  placeholder="Enter your email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ flex: 1 }}
                />
                <Button size="3" variant="solid" style={{ backgroundColor: 'white', color: 'var(--accent-9)' }}>
                  Subscribe
                </Button>
              </Flex>
            </form>
          )}
        </Flex>
      </Container>
    </Box>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add NewsletterSignup component"
```

---

### Task 23: Homepage Route

**Files:**
- Modify: `src/routes/index.tsx`

- [ ] **Step 1: Update homepage with all sections**

```typescript
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@radix-ui/themes'

import { HeroSlideshow } from '../components/home/HeroSlideshow'
import { BenefitsGrid } from '../components/home/BenefitsGrid'
import { FeaturedProduct } from '../components/home/FeaturedProduct'
import { ProductCollection } from '../components/home/ProductCollection'
import { Testimonials } from '../components/home/Testimonials'
import { FAQPreview } from '../components/home/FAQPreview'
import { NewsletterSignup } from '../components/home/NewsletterSignup'

import { getProducts, getProductByHandle } from '../lib/shopify/queries'
import type { ShopifyProduct } from '../lib/shopify/types'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [products, featuredProduct] = await Promise.all([
      getProducts(8),
      getProductByHandle('cocoturf'), // Adjust handle as needed
    ])
    return { products, featuredProduct }
  },
  component: HomePage,
})

function HomePage() {
  const { products, featuredProduct } = Route.useLoaderData()

  return (
    <Flex direction="column">
      <HeroSlideshow />
      <BenefitsGrid />
      <FeaturedProduct product={featuredProduct} />
      <ProductCollection products={products} />
      <Testimonials />
      <FAQPreview />
      <NewsletterSignup />
    </Flex>
  )
}
```

- [ ] **Step 2: Verify dev server loads homepage**

Run: `pnpm dev`
Expected: Homepage renders with all sections (some may show empty if Shopify not configured)

- [ ] **Step 3: Commit**

```bash
jj describe -m "feat: build homepage with all sections"
```

---

## Phase 4: Product Pages

### Task 24: Products Listing Page

**Files:**
- Create: `src/routes/products/index.tsx`

- [ ] **Step 1: Create products listing**

```typescript
// src/routes/products/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'

import { ProductCard } from '../../components/product/ProductCard'
import { getProducts } from '../../lib/shopify/queries'

export const Route = createFileRoute('/products/')({
  loader: async () => {
    const products = await getProducts(50)
    return { products }
  },
  component: ProductsPage,
})

function ProductsPage() {
  const { products } = Route.useLoaderData()

  return (
    <Container size="4" py="9">
      <Flex direction="column" gap="8">
        <Flex direction="column" gap="2">
          <Heading size="8">All Products</Heading>
          <Text size="3" color="gray">
            Premium pet gear built to perform.
          </Text>
        </Flex>

        <Grid columns={{ initial: '1', sm: '2', md: '3', lg: '4' }} gap="6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Flex>
    </Container>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add products listing page"
```

---

### Task 25: ProductGallery Component

**Files:**
- Create: `src/components/product/ProductGallery.tsx`

- [ ] **Step 1: Create ProductGallery**

```typescript
// src/components/product/ProductGallery.tsx
import { useState } from 'react'
import { Flex, Box } from '@radix-ui/themes'
import type { ShopifyImage } from '../../lib/shopify/types'

interface ProductGalleryProps {
  images: ShopifyImage[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedImage = images[selectedIndex]

  if (images.length === 0) {
    return (
      <Box
        style={{
          aspectRatio: '1',
          backgroundColor: 'var(--gray-3)',
          borderRadius: 'var(--radius-4)',
        }}
      />
    )
  }

  return (
    <Flex direction="column" gap="4">
      {/* Main image */}
      <Box
        style={{
          aspectRatio: '1',
          backgroundColor: 'var(--gray-3)',
          borderRadius: 'var(--radius-4)',
          overflow: 'hidden',
        }}
      >
        <img
          src={selectedImage.url}
          alt={selectedImage.altText || 'Product image'}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* Thumbnails */}
      {images.length > 1 && (
        <Flex gap="2" style={{ overflowX: 'auto' }}>
          {images.map((image, index) => (
            <Box
              key={image.url}
              onClick={() => setSelectedIndex(index)}
              style={{
                width: 80,
                height: 80,
                flexShrink: 0,
                backgroundColor: 'var(--gray-3)',
                borderRadius: 'var(--radius-2)',
                overflow: 'hidden',
                cursor: 'pointer',
                border: index === selectedIndex ? '2px solid var(--accent-9)' : '2px solid transparent',
              }}
            >
              <img
                src={image.url}
                alt={image.altText || `Thumbnail ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Flex>
      )}
    </Flex>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add ProductGallery component"
```

---

### Task 26: VariantPicker Component

**Files:**
- Create: `src/components/product/VariantPicker.tsx`

- [ ] **Step 1: Create VariantPicker**

```typescript
// src/components/product/VariantPicker.tsx
import { Flex, Text, Button } from '@radix-ui/themes'
import type { ShopifyProduct, ShopifyProductVariant } from '../../lib/shopify/types'

interface VariantPickerProps {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
  onVariantChange: (variant: ShopifyProductVariant) => void
}

export function VariantPicker({ product, selectedVariant, onVariantChange }: VariantPickerProps) {
  const variants = product.variants.edges.map(e => e.node)
  const options = product.options

  // Get selected options
  const selectedOptions = new Map(
    selectedVariant.selectedOptions.map(o => [o.name, o.value])
  )

  const handleOptionChange = (optionName: string, value: string) => {
    // Find variant matching new selection
    const newOptions = new Map(selectedOptions)
    newOptions.set(optionName, value)

    const matchingVariant = variants.find(v =>
      v.selectedOptions.every(o => newOptions.get(o.name) === o.value)
    )

    if (matchingVariant) {
      onVariantChange(matchingVariant)
    }
  }

  return (
    <Flex direction="column" gap="4">
      {options.map((option) => (
        <Flex key={option.name} direction="column" gap="2">
          <Text size="2" weight="medium">
            {option.name}
          </Text>
          <Flex gap="2" wrap="wrap">
            {option.values.map((value) => {
              const isSelected = selectedOptions.get(option.name) === value
              return (
                <Button
                  key={value}
                  variant={isSelected ? 'solid' : 'outline'}
                  size="2"
                  onClick={() => handleOptionChange(option.name, value)}
                >
                  {value}
                </Button>
              )
            })}
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add VariantPicker component"
```

---

### Task 27: AddToCart Component

**Files:**
- Create: `src/components/product/AddToCart.tsx`

- [ ] **Step 1: Create AddToCart**

```typescript
// src/components/product/AddToCart.tsx
import { useState } from 'react'
import { Flex, Button, IconButton, Text } from '@radix-ui/themes'
import { Minus, Plus } from 'lucide-react'
import { useCartContext } from '../../contexts/CartContext'
import type { ShopifyProductVariant } from '../../lib/shopify/types'

interface AddToCartProps {
  variant: ShopifyProductVariant
}

export function AddToCart({ variant }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart, isLoading } = useCartContext()

  const handleAddToCart = async () => {
    await addToCart(variant.id, quantity)
    setQuantity(1)
  }

  const isAvailable = variant.availableForSale

  return (
    <Flex direction="column" gap="4">
      {/* Quantity selector */}
      <Flex align="center" gap="3">
        <Text size="2" weight="medium">Quantity</Text>
        <Flex align="center" gap="2">
          <IconButton
            variant="soft"
            size="2"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </IconButton>
          <Text size="3" style={{ minWidth: 32, textAlign: 'center' }}>
            {quantity}
          </Text>
          <IconButton
            variant="soft"
            size="2"
            onClick={() => setQuantity(q => q + 1)}
          >
            <Plus size={16} />
          </IconButton>
        </Flex>
      </Flex>

      {/* Add to cart button */}
      <Button
        size="4"
        disabled={!isAvailable || isLoading}
        onClick={handleAddToCart}
        style={{ width: '100%' }}
      >
        {!isAvailable ? 'Out of Stock' : isLoading ? 'Adding...' : 'Add to Cart'}
      </Button>
    </Flex>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add AddToCart component"
```

---

### Task 28: ProductTabs Component

**Files:**
- Create: `src/components/product/ProductTabs.tsx`

- [ ] **Step 1: Create ProductTabs**

```typescript
// src/components/product/ProductTabs.tsx
import { Tabs, Box, Text } from '@radix-ui/themes'
import type { ShopifyProduct } from '../../lib/shopify/types'

interface ProductTabsProps {
  product: ShopifyProduct
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs.Root defaultValue="description">
      <Tabs.List>
        <Tabs.Trigger value="description">Description</Tabs.Trigger>
        <Tabs.Trigger value="details">Details</Tabs.Trigger>
        <Tabs.Trigger value="care">Care & Usage</Tabs.Trigger>
      </Tabs.List>

      <Box pt="4">
        <Tabs.Content value="description">
          <Text size="2" color="gray" style={{ lineHeight: 1.7 }}>
            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          </Text>
        </Tabs.Content>

        <Tabs.Content value="details">
          <Text size="2" color="gray" style={{ lineHeight: 1.7 }}>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li>100% plant-based coconut coir fibers</li>
              <li>Machine washable up to 100+ times</li>
              <li>Natural antimicrobial properties</li>
              <li>Suitable for dogs up to 30 lbs</li>
              <li>Dimensions vary by size</li>
            </ul>
          </Text>
        </Tabs.Content>

        <Tabs.Content value="care">
          <Text size="2" color="gray" style={{ lineHeight: 1.7 }}>
            <ol style={{ paddingLeft: 20, margin: 0 }}>
              <li>Rinse with water after each use</li>
              <li>For deep cleaning, machine wash on cold</li>
              <li>Air dry completely before next use</li>
              <li>Do not use bleach or fabric softener</li>
            </ol>
          </Text>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add ProductTabs component"
```

---

### Task 29: Product Detail Page

**Files:**
- Create: `src/routes/products/$handle.tsx`

- [ ] **Step 1: Create product detail page**

```typescript
// src/routes/products/$handle.tsx
import { useState } from 'react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { Container, Flex, Grid, Heading, Text, Separator } from '@radix-ui/themes'

import { ProductGallery } from '../../components/product/ProductGallery'
import { VariantPicker } from '../../components/product/VariantPicker'
import { AddToCart } from '../../components/product/AddToCart'
import { ProductTabs } from '../../components/product/ProductTabs'

import { getProductByHandle } from '../../lib/shopify/queries'
import type { ShopifyProductVariant } from '../../lib/shopify/types'

export const Route = createFileRoute('/products/$handle')({
  loader: async ({ params }) => {
    const product = await getProductByHandle(params.handle)
    if (!product) {
      throw notFound()
    }
    return { product }
  },
  component: ProductDetailPage,
})

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

function ProductDetailPage() {
  const { product } = Route.useLoaderData()
  const variants = product.variants.edges.map(e => e.node)
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant>(variants[0])

  const images = product.images.edges.map(e => e.node)
  const price = selectedVariant.price
  const compareAtPrice = selectedVariant.compareAtPrice

  return (
    <Container size="4" py="9">
      <Grid columns={{ initial: '1', md: '2' }} gap="9">
        {/* Gallery */}
        <ProductGallery images={images} />

        {/* Product Info */}
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="2">
            <Heading size="8">{product.title}</Heading>
            <Flex align="baseline" gap="3">
              <Text size="6" weight="bold" color="purple">
                {formatPrice(price.amount, price.currencyCode)}
              </Text>
              {compareAtPrice && (
                <Text size="4" color="gray" style={{ textDecoration: 'line-through' }}>
                  {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
                </Text>
              )}
            </Flex>
          </Flex>

          <Separator size="4" />

          {/* Variant picker */}
          {variants.length > 1 && (
            <VariantPicker
              product={product}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
            />
          )}

          {/* Add to cart */}
          <AddToCart variant={selectedVariant} />

          <Separator size="4" />

          {/* Product tabs */}
          <ProductTabs product={product} />
        </Flex>
      </Grid>
    </Container>
  )
}
```

- [ ] **Step 2: Verify product page loads**

Run: `pnpm dev` and navigate to `/products/cocoturf` (or any valid handle)
Expected: Product detail page renders

- [ ] **Step 3: Commit**

```bash
jj describe -m "feat: add product detail page"
```

---

## Phase 5: Static Pages

### Task 30: FAQ Page

**Files:**
- Create: `src/routes/pages/faq.tsx`

- [ ] **Step 1: Create FAQ page**

```typescript
// src/routes/pages/faq.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Container, Flex, Heading, Text, Box } from '@radix-ui/themes'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    category: 'Product',
    questions: [
      {
        question: 'What is CocoTurf made of?',
        answer: 'CocoTurf is made from 100% natural coconut coir fibers, a sustainable byproduct of the coconut industry. It\'s completely plant-based and biodegradable.',
      },
      {
        question: 'What sizes are available?',
        answer: 'We offer three sizes: Small (18"x24") for dogs up to 15 lbs, Medium (24"x36") for dogs 15-30 lbs, and Large (36"x48") for dogs over 30 lbs or multi-dog households.',
      },
      {
        question: 'How long does CocoTurf last?',
        answer: 'With proper care, CocoTurf lasts 1-2 years, or about 100+ washes. That\'s the equivalent of thousands of disposable pee pads.',
      },
    ],
  },
  {
    category: 'Care & Usage',
    questions: [
      {
        question: 'How do I clean CocoTurf?',
        answer: 'For daily use, simply rinse with water and let dry. For deep cleaning, machine wash on cold with mild detergent and air dry. Do not use bleach or fabric softener.',
      },
      {
        question: 'How long does it take to dry?',
        answer: 'Air drying typically takes 4-6 hours depending on humidity. We recommend having two pads so you can rotate while one dries.',
      },
    ],
  },
  {
    category: 'Shipping & Returns',
    questions: [
      {
        question: 'Do you offer free shipping?',
        answer: 'Yes! We offer free shipping on all orders over $100. Standard shipping is $5.99 for orders under $100.',
      },
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, contact us for a full refund.',
      },
    ],
  },
]

export const Route = createFileRoute('/pages/faq')({
  component: FAQPage,
})

function FAQPage() {
  return (
    <Container size="2" py="9">
      <Flex direction="column" gap="8">
        <Flex direction="column" gap="2" align="center" style={{ textAlign: 'center' }}>
          <Heading size="8">Frequently Asked Questions</Heading>
          <Text size="3" color="gray">
            Everything you need to know about CocoTurf.
          </Text>
        </Flex>

        {faqs.map((category) => (
          <Flex key={category.category} direction="column" gap="4">
            <Heading size="5">{category.category}</Heading>
            <Accordion.Root type="single" collapsible>
              {category.questions.map((faq, index) => (
                <Accordion.Item
                  key={index}
                  value={`${category.category}-${index}`}
                  style={{ borderBottom: '1px solid var(--gray-4)' }}
                >
                  <Accordion.Trigger
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <Text size="3" weight="medium">{faq.question}</Text>
                    <ChevronDown size={20} style={{ color: 'var(--gray-9)', flexShrink: 0 }} />
                  </Accordion.Trigger>
                  <Accordion.Content style={{ paddingBottom: 16 }}>
                    <Text size="2" color="gray">{faq.answer}</Text>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Flex>
        ))}
      </Flex>
    </Container>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add FAQ page"
```

---

### Task 31: About Page

**Files:**
- Create: `src/routes/pages/about.tsx`

- [ ] **Step 1: Create About page**

```typescript
// src/routes/pages/about.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Container, Flex, Heading, Text, Grid, Box } from '@radix-ui/themes'

export const Route = createFileRoute('/pages/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <Container size="2" py="9">
      <Flex direction="column" gap="8">
        <Flex direction="column" gap="4" align="center" style={{ textAlign: 'center' }}>
          <Heading size="8">About PetPatio</Heading>
          <Text size="4" color="gray" style={{ maxWidth: 600 }}>
            We're building premium pet gear for the modern home. No gimmicks, no cutesy marketing — just products that perform.
          </Text>
        </Flex>

        <Grid columns={{ initial: '1', md: '2' }} gap="8" py="6">
          <Flex direction="column" gap="3">
            <Heading size="5">Our Mission</Heading>
            <Text size="2" color="gray" style={{ lineHeight: 1.7 }}>
              We believe pet products don't have to be an eyesore. PetPatio combines thoughtful design with genuine performance to create gear you'll actually want in your home.
            </Text>
          </Flex>
          <Flex direction="column" gap="3">
            <Heading size="5">Our Approach</Heading>
            <Text size="2" color="gray" style={{ lineHeight: 1.7 }}>
              Every product starts with a problem worth solving. We obsess over materials, test relentlessly, and only launch when we're confident it's the best solution available.
            </Text>
          </Flex>
        </Grid>

        <Box style={{ backgroundColor: 'var(--accent-3)' }} p="8" style={{ borderRadius: 'var(--radius-4)' }}>
          <Flex direction="column" gap="3" align="center" style={{ textAlign: 'center' }}>
            <Heading size="5">The Nike of Pet Gear</Heading>
            <Text size="2" color="gray" style={{ maxWidth: 500 }}>
              We're not interested in being cute. We're interested in being the best. Premium materials, thoughtful design, and relentless attention to detail.
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Container>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add About page"
```

---

### Task 32: Contact Page

**Files:**
- Create: `src/routes/pages/contact.tsx`

- [ ] **Step 1: Create Contact page**

```typescript
// src/routes/pages/contact.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Container, Flex, Heading, Text, TextField, TextArea, Button, Card } from '@radix-ui/themes'
import { Mail } from 'lucide-react'

export const Route = createFileRoute('/pages/contact')({
  component: ContactPage,
})

function ContactPage() {
  return (
    <Container size="2" py="9">
      <Flex direction="column" gap="8">
        <Flex direction="column" gap="2" align="center" style={{ textAlign: 'center' }}>
          <Heading size="8">Contact Us</Heading>
          <Text size="3" color="gray">
            Questions? We'd love to hear from you.
          </Text>
        </Flex>

        <Card>
          <Flex direction="column" gap="4" p="6">
            <Flex direction="column" gap="2">
              <Text size="2" weight="medium">Name</Text>
              <TextField.Root size="3" placeholder="Your name" />
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="2" weight="medium">Email</Text>
              <TextField.Root size="3" placeholder="you@example.com" type="email" />
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="2" weight="medium">Message</Text>
              <TextArea size="3" placeholder="How can we help?" rows={5} />
            </Flex>
            <Button size="3">Send Message</Button>
          </Flex>
        </Card>

        <Flex direction="column" gap="3" align="center" style={{ textAlign: 'center' }}>
          <Flex align="center" gap="2">
            <Mail size={20} style={{ color: 'var(--accent-9)' }} />
            <Text size="3">support@petpatio.com</Text>
          </Flex>
          <Text size="2" color="gray">
            We typically respond within 24 hours.
          </Text>
        </Flex>
      </Flex>
    </Container>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add Contact page"
```

---

### Task 33: Cart Page

**Files:**
- Create: `src/routes/cart.tsx`

- [ ] **Step 1: Create Cart page**

```typescript
// src/routes/cart.tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { Container, Flex, Grid, Heading, Text, Button, Box, Separator } from '@radix-ui/themes'
import { useCartContext } from '../contexts/CartContext'
import { CartItem } from '../components/cart/CartItem'

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

function CartPage() {
  const { cart, isLoading, updateQuantity, removeItem } = useCartContext()
  const lines = cart?.lines.edges.map(e => e.node) ?? []
  const isEmpty = lines.length === 0

  if (isEmpty) {
    return (
      <Container size="2" py="9">
        <Flex direction="column" gap="6" align="center" style={{ textAlign: 'center' }}>
          <Heading size="8">Your Cart</Heading>
          <Text size="4" color="gray">Your cart is empty.</Text>
          <Link to="/products">
            <Button size="4">Continue Shopping</Button>
          </Link>
        </Flex>
      </Container>
    )
  }

  return (
    <Container size="4" py="9">
      <Flex direction="column" gap="8">
        <Heading size="8">Your Cart</Heading>

        <Grid columns={{ initial: '1', md: '3' }} gap="8">
          {/* Cart items */}
          <Box style={{ gridColumn: 'span 2' }}>
            <Flex direction="column">
              {lines.map(line => (
                <Box key={line.id}>
                  <CartItem
                    line={line}
                    onUpdateQuantity={(qty) => updateQuantity(line.id, qty)}
                    onRemove={() => removeItem(line.id)}
                  />
                  <Separator size="4" my="4" />
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Summary */}
          <Box>
            <Flex
              direction="column"
              gap="4"
              p="6"
              style={{
                backgroundColor: 'var(--gray-2)',
                borderRadius: 'var(--radius-4)',
              }}
            >
              <Heading size="4">Order Summary</Heading>
              <Flex justify="between">
                <Text>Subtotal</Text>
                <Text weight="bold">
                  {cart && formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
                </Text>
              </Flex>
              <Text size="1" color="gray">
                Shipping calculated at checkout
              </Text>
              <Button
                size="4"
                disabled={isLoading}
                onClick={() => {
                  if (cart?.checkoutUrl) {
                    window.location.href = cart.checkoutUrl
                  }
                }}
              >
                Checkout
              </Button>
            </Flex>
          </Box>
        </Grid>
      </Flex>
    </Container>
  )
}
```

- [ ] **Step 2: Create CartItem component**

```typescript
// src/components/cart/CartItem.tsx
import { Flex, Box, Text, IconButton } from '@radix-ui/themes'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { ShopifyCartLine } from '../../lib/shopify/types'

interface CartItemProps {
  line: ShopifyCartLine
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

export function CartItem({ line, onUpdateQuantity, onRemove }: CartItemProps) {
  const { merchandise, quantity, cost } = line
  const image = merchandise.image || merchandise.product.featuredImage

  return (
    <Flex gap="4">
      {/* Image */}
      <Link to="/products/$handle" params={{ handle: merchandise.product.handle }}>
        <Box
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'var(--gray-3)',
            borderRadius: 'var(--radius-2)',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {image && (
            <img
              src={image.url}
              alt={image.altText || merchandise.product.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </Box>
      </Link>

      {/* Details */}
      <Flex direction="column" gap="2" style={{ flex: 1 }}>
        <Link to="/products/$handle" params={{ handle: merchandise.product.handle }} style={{ textDecoration: 'none' }}>
          <Text size="3" weight="medium">
            {merchandise.product.title}
          </Text>
        </Link>
        <Text size="2" color="gray">
          {merchandise.selectedOptions.map(o => o.value).join(' / ')}
        </Text>

        {/* Quantity controls */}
        <Flex align="center" gap="2" mt="2">
          <IconButton
            size="1"
            variant="soft"
            onClick={() => onUpdateQuantity(quantity - 1)}
          >
            <Minus size={14} />
          </IconButton>
          <Text size="2" style={{ minWidth: 24, textAlign: 'center' }}>{quantity}</Text>
          <IconButton
            size="1"
            variant="soft"
            onClick={() => onUpdateQuantity(quantity + 1)}
          >
            <Plus size={14} />
          </IconButton>
          <IconButton size="1" variant="ghost" color="red" onClick={onRemove}>
            <Trash2 size={14} />
          </IconButton>
        </Flex>
      </Flex>

      {/* Price */}
      <Text size="3" weight="medium">
        {formatPrice(cost.totalAmount.amount, cost.totalAmount.currencyCode)}
      </Text>
    </Flex>
  )
}
```

- [ ] **Step 3: Commit**

```bash
jj describe -m "feat: add Cart page and CartItem component"
```

---

## Phase 6: Final Integration

### Task 34: Collection Page

**Files:**
- Create: `src/routes/collections/$handle.tsx`

- [ ] **Step 1: Create collection page**

```typescript
// src/routes/collections/$handle.tsx
import { createFileRoute, notFound } from '@tanstack/react-router'
import { Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'

import { ProductCard } from '../../components/product/ProductCard'
import { getCollection } from '../../lib/shopify/queries'

export const Route = createFileRoute('/collections/$handle')({
  loader: async ({ params }) => {
    const collection = await getCollection(params.handle)
    if (!collection) {
      throw notFound()
    }
    return { collection }
  },
  component: CollectionPage,
})

function CollectionPage() {
  const { collection } = Route.useLoaderData()
  const products = collection.products.edges.map(e => e.node)

  return (
    <Container size="4" py="9">
      <Flex direction="column" gap="8">
        <Flex direction="column" gap="2">
          <Heading size="8">{collection.title}</Heading>
          {collection.description && (
            <Text size="3" color="gray">{collection.description}</Text>
          )}
        </Flex>

        <Grid columns={{ initial: '1', sm: '2', md: '3', lg: '4' }} gap="6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Flex>
    </Container>
  )
}
```

- [ ] **Step 2: Commit**

```bash
jj describe -m "feat: add collection page"
```

---

### Task 35: Verify Complete Application

- [ ] **Step 1: Start dev server**

Run: `pnpm dev`

- [ ] **Step 2: Test homepage**

Navigate to `http://localhost:5173`
Expected: All 10 sections render (some may be empty without Shopify data)

- [ ] **Step 3: Test product listing**

Navigate to `/products`
Expected: Product grid renders (empty without Shopify data)

- [ ] **Step 4: Test cart functionality**

Click cart icon in header
Expected: Cart drawer opens

- [ ] **Step 5: Test static pages**

Navigate to `/pages/faq`, `/pages/about`, `/pages/contact`
Expected: All pages render correctly

- [ ] **Step 6: Run TypeScript check**

Run: `pnpm exec tsc --noEmit`
Expected: No errors

- [ ] **Step 7: Final commit**

```bash
jj describe -m "feat: complete PetPatio MVP storefront"
jj new
jj bookmark set main -r @-
jj git push --bookmark main
```

---

## Summary

This plan builds the PetPatio headless storefront in 35 tasks across 6 phases:

1. **Foundation** (Tasks 1-7): Dependencies, Shopify client, types, cart hook
2. **Layout** (Tasks 8-14): Theme, AnnouncementBar, Header, Footer, CartDrawer, root layout
3. **Homepage** (Tasks 15-23): All 10 homepage sections
4. **Product Pages** (Tasks 24-29): Gallery, variants, add to cart, product detail
5. **Static Pages** (Tasks 30-33): FAQ, About, Contact, Cart
6. **Final Integration** (Tasks 34-35): Collection page, verification

**Not included in this plan (future work):**
- Reviews system (PostgreSQL + API)
- Customer accounts
- Webhooks for analytics
- Newsletter backend integration

These can be added in a follow-up plan once the core storefront is working.

---

*Plan written: 2026-04-11*
