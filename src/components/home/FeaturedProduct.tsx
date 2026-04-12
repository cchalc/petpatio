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
            <Link to={'/products/$handle' as '/'} params={{ handle } as never} style={{ textDecoration: 'none' }}>
              <Button size="4">View Product</Button>
            </Link>
          </Flex>
        </Grid>
      </Container>
    </Box>
  )
}
