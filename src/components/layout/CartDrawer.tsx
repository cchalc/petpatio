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
