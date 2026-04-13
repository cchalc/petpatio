import { Flex, Box, Text, IconButton } from '@radix-ui/themes'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { ShopifyCartLine } from '../../lib/shopify/types'

interface CartItemProps {
  line: ShopifyCartLine
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

export function CartItem({ line, onUpdateQuantity, onRemove }: CartItemProps) {
  const { merchandise, quantity, cost } = line
  const image = merchandise.image || merchandise.product.featuredImage

  return (
    <Flex gap="4">
      {/* Image */}
      <Link to={'/products/$handle' as '/'} params={{ handle: merchandise.product.handle } as never}>
        <Box
          style={{
            width: 100,
            height: 100,
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
      </Link>

      {/* Details */}
      <Flex direction="column" gap="2" style={{ flex: 1 }}>
        <Link to={'/products/$handle' as '/'} params={{ handle: merchandise.product.handle } as never} style={{ textDecoration: 'none' }}>
          <Text size="3" weight="medium">
            {merchandise.product.title}
          </Text>
        </Link>
        <Text size="2" color="gray">
          {merchandise.selectedOptions.map(o => o.value).join(' / ')}
        </Text>

        {/* Quantity controls */}
        <Flex align="center" gap="2" mt="2">
          <IconButton
            size="1"
            variant="soft"
            onClick={() => onUpdateQuantity(quantity - 1)}
          >
            <Minus size={14} />
          </IconButton>
          <Text size="2" style={{ minWidth: 24, textAlign: 'center' }}>{quantity}</Text>
          <IconButton
            size="1"
            variant="soft"
            onClick={() => onUpdateQuantity(quantity + 1)}
          >
            <Plus size={14} />
          </IconButton>
          <IconButton size="1" variant="ghost" color="red" onClick={onRemove}>
            <Trash2 size={14} />
          </IconButton>
        </Flex>
      </Flex>

      {/* Price */}
      <Text size="3" weight="medium">
        {formatPrice(cost.totalAmount.amount, cost.totalAmount.currencyCode)}
      </Text>
    </Flex>
  )
}
