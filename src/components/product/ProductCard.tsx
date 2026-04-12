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
    <Link to={'/products/$handle' as '/'} params={{ handle } as never} style={{ textDecoration: 'none' }}>
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
