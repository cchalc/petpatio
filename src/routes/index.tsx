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
import { placeholderProducts, placeholderFeaturedProduct } from '../lib/placeholder-data'
import type { ShopifyProduct } from '../lib/shopify/types'

export const Route = createFileRoute('/')({
  loader: async () => {
    // Fetch products with graceful fallback to placeholder data
    let products: ShopifyProduct[] = []
    let featuredProduct: ShopifyProduct | null = null

    try {
      const results = await Promise.allSettled([
        getProducts(8),
        getProductByHandle('cocoturf'),
      ])

      if (results[0].status === 'fulfilled' && results[0].value.length > 0) {
        products = results[0].value
      }
      if (results[1].status === 'fulfilled' && results[1].value) {
        featuredProduct = results[1].value
      }
    } catch {
      // Shopify not configured
    }

    // Fall back to placeholder data if Shopify returns nothing
    if (products.length === 0) {
      products = placeholderProducts
    }
    if (!featuredProduct) {
      featuredProduct = placeholderFeaturedProduct
    }

    return { products, featuredProduct }
  },
  component: HomePage,
})

function HomePage() {
  const { products, featuredProduct } = Route.useLoaderData() as {
    products: ShopifyProduct[]
    featuredProduct: ShopifyProduct | null
  }

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
