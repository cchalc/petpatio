import { useState } from 'react'
import { Flex, Button, IconButton, Text } from '@radix-ui/themes'
import { Minus, Plus } from 'lucide-react'
import { useCartContext } from '../../contexts/CartContext'
import type { ShopifyProductVariant } from '../../lib/shopify/types'

interface AddToCartProps {
  variant: ShopifyProductVariant
}

export function AddToCart({ variant }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart, isLoading } = useCartContext()

  const handleAddToCart = async () => {
    await addToCart(variant.id, quantity)
    setQuantity(1)
  }

  const isAvailable = variant.availableForSale

  return (
    <Flex direction="column" gap="4">
      {/* Quantity selector */}
      <Flex align="center" gap="3">
        <Text size="2" weight="medium">Quantity</Text>
        <Flex align="center" gap="2">
          <IconButton
            variant="soft"
            size="2"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </IconButton>
          <Text size="3" style={{ minWidth: 32, textAlign: 'center' }}>
            {quantity}
          </Text>
          <IconButton
            variant="soft"
            size="2"
            onClick={() => setQuantity(q => q + 1)}
          >
            <Plus size={16} />
          </IconButton>
        </Flex>
      </Flex>

      {/* Add to cart button */}
      <Button
        size="4"
        disabled={!isAvailable || isLoading}
        onClick={handleAddToCart}
        style={{ width: '100%' }}
      >
        {!isAvailable ? 'Out of Stock' : isLoading ? 'Adding...' : 'Add to Cart'}
      </Button>
    </Flex>
  )
}
