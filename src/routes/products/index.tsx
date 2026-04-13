// src/routes/products/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'

import { ProductCard } from '../../components/product/ProductCard'
import { getProducts } from '../../lib/shopify/queries'
import { placeholderProducts } from '../../lib/placeholder-data'
import type { ShopifyProduct } from '../../lib/shopify/types'

export const Route = createFileRoute('/products/')({
  loader: async () => {
    let products: ShopifyProduct[] = []

    try {
      products = await getProducts(50)
    } catch {
      // Shopify not configured
    }

    // Fall back to placeholder data
    if (products.length === 0) {
      products = placeholderProducts
    }

    return { products }
  },
  component: ProductsPage,
})

function ProductsPage() {
  const { products } = Route.useLoaderData() as {
    products: ShopifyProduct[]
  }

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
          {products.map((product: ShopifyProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Flex>
    </Container>
  )
}
