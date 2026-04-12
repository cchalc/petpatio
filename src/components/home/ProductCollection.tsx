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
            <Link to={'/products' as '/'} style={{ textDecoration: 'none' }}>
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
