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
          <Link to={'/products' as '/'}>
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
