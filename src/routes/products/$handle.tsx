import { useState } from 'react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { Container, Flex, Grid, Heading, Text, Separator } from '@radix-ui/themes'

import { ProductGallery } from '../../components/product/ProductGallery'
import { VariantPicker } from '../../components/product/VariantPicker'
import { AddToCart } from '../../components/product/AddToCart'
import { ProductTabs } from '../../components/product/ProductTabs'

import { getProductByHandle } from '../../lib/shopify/queries'
import type { ShopifyProductVariant, ShopifyProduct } from '../../lib/shopify/types'

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
  const { product } = Route.useLoaderData() as { product: ShopifyProduct }
  const variants = product.variants.edges.map((e: { node: ShopifyProductVariant }) => e.node)
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant>(variants[0])

  const images = product.images.edges.map((e: { node: any }) => e.node)
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
