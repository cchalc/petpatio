import { useState } from 'react'
import { Flex, Box } from '@radix-ui/themes'
import type { ShopifyImage } from '../../lib/shopify/types'

interface ProductGalleryProps {
  images: ShopifyImage[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedImage = images[selectedIndex]

  if (images.length === 0) {
    return (
      <Box
        style={{
          aspectRatio: '1',
          backgroundColor: 'var(--gray-3)',
          borderRadius: 'var(--radius-4)',
        }}
      />
    )
  }

  return (
    <Flex direction="column" gap="4">
      {/* Main image */}
      <Box
        style={{
          aspectRatio: '1',
          backgroundColor: 'var(--gray-3)',
          borderRadius: 'var(--radius-4)',
          overflow: 'hidden',
        }}
      >
        <img
          src={selectedImage.url}
          alt={selectedImage.altText || 'Product image'}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* Thumbnails */}
      {images.length > 1 && (
        <Flex gap="2" style={{ overflowX: 'auto' }}>
          {images.map((image, index) => (
            <Box
              key={image.url}
              onClick={() => setSelectedIndex(index)}
              style={{
                width: 80,
                height: 80,
                flexShrink: 0,
                backgroundColor: 'var(--gray-3)',
                borderRadius: 'var(--radius-2)',
                overflow: 'hidden',
                cursor: 'pointer',
                border: index === selectedIndex ? '2px solid var(--accent-9)' : '2px solid transparent',
              }}
            >
              <img
                src={image.url}
                alt={image.altText || `Thumbnail ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Flex>
      )}
    </Flex>
  )
}
