import { createFileRoute, notFound } from '@tanstack/react-router'
import { Container, Flex, Grid, Heading, Text } from '@radix-ui/themes'

import { ProductCard } from '../../components/product/ProductCard'
import { getCollection } from '../../lib/shopify/queries'
import type { ShopifyCollection, ShopifyProduct } from '../../lib/shopify/types'

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
  const { collection } = Route.useLoaderData() as { collection: ShopifyCollection }
  const products = collection.products.edges.map((e: { node: ShopifyProduct }) => e.node)

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
