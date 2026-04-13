// Placeholder data for development without Shopify
import type { ShopifyProduct } from './shopify/types'

export const placeholderProducts: ShopifyProduct[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'cocoturf-small',
    title: 'CocoTurf Pee Pad - Small',
    description: 'Perfect for puppies and small dogs up to 15 lbs. Made from 100% natural coconut coir fibers.',
    descriptionHtml: '<p>Perfect for puppies and small dogs up to 15 lbs. Made from 100% natural coconut coir fibers.</p><p>Our reusable pee pad is machine washable up to 100+ times, making it both eco-friendly and economical.</p>',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop',
      altText: 'CocoTurf Small Pee Pad',
      width: 800,
      height: 800,
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=800&fit=crop',
            altText: 'CocoTurf Small Pee Pad',
            width: 800,
            height: 800,
          },
        },
        {
          node: {
            url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=800&fit=crop',
            altText: 'Dog on CocoTurf',
            width: 800,
            height: 800,
          },
        },
      ],
    },
    options: [
      {
        name: 'Size',
        values: ['Small'],
      },
    ],
    priceRange: {
      minVariantPrice: {
        amount: '49.99',
        currencyCode: 'USD',
      },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/1',
            title: 'Small',
            availableForSale: true,
            price: {
              amount: '49.99',
              currencyCode: 'USD',
            },
            compareAtPrice: {
              amount: '59.99',
              currencyCode: 'USD',
            },
            selectedOptions: [{ name: 'Size', value: 'Small' }],
            image: null,
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'cocoturf-medium',
    title: 'CocoTurf Pee Pad - Medium',
    description: 'Ideal for dogs 15-30 lbs. Natural antimicrobial properties keep odors at bay.',
    descriptionHtml: '<p>Ideal for dogs 15-30 lbs. Natural antimicrobial properties keep odors at bay.</p><p>The coconut coir surface provides excellent drainage while staying comfortable for your pet.</p>',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=800&fit=crop',
      altText: 'CocoTurf Medium Pee Pad',
      width: 800,
      height: 800,
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=800&fit=crop',
            altText: 'CocoTurf Medium Pee Pad',
            width: 800,
            height: 800,
          },
        },
      ],
    },
    options: [
      {
        name: 'Size',
        values: ['Medium'],
      },
    ],
    priceRange: {
      minVariantPrice: {
        amount: '64.99',
        currencyCode: 'USD',
      },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/2',
            title: 'Medium',
            availableForSale: true,
            price: {
              amount: '64.99',
              currencyCode: 'USD',
            },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Size', value: 'Medium' }],
            image: null,
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'cocoturf-large',
    title: 'CocoTurf Pee Pad - Large',
    description: 'For dogs over 30 lbs or multi-dog households. Maximum coverage and durability.',
    descriptionHtml: '<p>For dogs over 30 lbs or multi-dog households. Maximum coverage and durability.</p><p>Built to handle heavy use while maintaining its natural antimicrobial properties.</p>',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&h=800&fit=crop',
      altText: 'CocoTurf Large Pee Pad',
      width: 800,
      height: 800,
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&h=800&fit=crop',
            altText: 'CocoTurf Large Pee Pad',
            width: 800,
            height: 800,
          },
        },
      ],
    },
    options: [
      {
        name: 'Size',
        values: ['Large'],
      },
    ],
    priceRange: {
      minVariantPrice: {
        amount: '79.99',
        currencyCode: 'USD',
      },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/3',
            title: 'Large',
            availableForSale: true,
            price: {
              amount: '79.99',
              currencyCode: 'USD',
            },
            compareAtPrice: {
              amount: '99.99',
              currencyCode: 'USD',
            },
            selectedOptions: [{ name: 'Size', value: 'Large' }],
            image: null,
          },
        },
      ],
    },
  },
  {
    id: 'gid://shopify/Product/4',
    handle: 'cocoturf-refills',
    title: 'CocoTurf Refill Pack',
    description: 'Replacement coconut coir inserts. Extends the life of your CocoTurf pad.',
    descriptionHtml: '<p>Replacement coconut coir inserts. Extends the life of your CocoTurf pad.</p><p>Each pack contains 3 inserts, lasting approximately 3-6 months of regular use.</p>',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=800&fit=crop',
      altText: 'CocoTurf Refill Pack',
      width: 800,
      height: 800,
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=800&fit=crop',
            altText: 'CocoTurf Refill Pack',
            width: 800,
            height: 800,
          },
        },
      ],
    },
    options: [
      {
        name: 'Quantity',
        values: ['3-Pack'],
      },
    ],
    priceRange: {
      minVariantPrice: {
        amount: '29.99',
        currencyCode: 'USD',
      },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/4',
            title: '3-Pack',
            availableForSale: true,
            price: {
              amount: '29.99',
              currencyCode: 'USD',
            },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Quantity', value: '3-Pack' }],
            image: null,
          },
        },
      ],
    },
  },
]

export const placeholderFeaturedProduct = placeholderProducts[0]
