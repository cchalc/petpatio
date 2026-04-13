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

export const Route = createFileRoute('/')({
  loader: async () => {
    // Fetch products with graceful fallback for unconfigured Shopify
    let products: Awaited<ReturnType<typeof getProducts>> = []
    let featuredProduct: Awaited<ReturnType<typeof getProductByHandle>> = null

    try {
      const results = await Promise.allSettled([
        getProducts(8),
        getProductByHandle('cocoturf'), // Adjust handle as needed
      ])

      if (results[0].status === 'fulfilled') {
        products = results[0].value
      }
      if (results[1].status === 'fulfilled') {
        featuredProduct = results[1].value
      }
    } catch {
      // Shopify not configured - continue with empty data
    }

    return { products, featuredProduct }
  },
  component: HomePage,
})

function HomePage() {
  const { products, featuredProduct } = Route.useLoaderData() as {
    products: Awaited<ReturnType<typeof getProducts>>
    featuredProduct: Awaited<ReturnType<typeof getProductByHandle>>
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
