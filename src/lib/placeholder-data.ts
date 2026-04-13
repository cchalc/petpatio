// Placeholder data for development without Shopify
import type { ShopifyProduct } from './shopify/types'

// Real PetPatio product images
const IMAGES = {
  cocoturf: 'https://www.petpatio.com/cdn/shop/files/dog-10copy_8c759ae0-9a6d-4e92-8218-f7f8155856ec.jpg?v=1768506600&width=800',
  liners: 'https://www.petpatio.com/cdn/shop/files/IMG_5581.png?v=1767983732&width=800',
  refills: 'https://www.petpatio.com/cdn/shop/files/Petpatio-10.jpg?v=1773596959&width=800',
}

export const placeholderProducts: ShopifyProduct[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'cocoturf-small',
    title: 'CocoTurf Pee Pad - Small',
    description: 'Perfect for puppies and small dogs up to 15 lbs. Made from 100% natural coconut coir fibers.',
    descriptionHtml: '<p>Perfect for puppies and small dogs up to 15 lbs. Made from 100% natural coconut coir fibers.</p><p>Our reusable pee pad is machine washable up to 100+ times, making it both eco-friendly and economical.</p>',
    featuredImage: {
      url: IMAGES.cocoturf,
      altText: 'CocoTurf Small Pee Pad',
      width: 800,
      height: 800,
    },
    images: {
      edges: [
        {
          node: {
            url: IMAGES.cocoturf,
            altText: 'CocoTurf Small Pee Pad',
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
      url: IMAGES.cocoturf,
      altText: 'CocoTurf Medium Pee Pad',
      width: 800,
      height: 800,
    },
    images: {
      edges: [
        {
          node: {
            url: IMAGES.cocoturf,
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
      url: IMAGES.cocoturf,
      altText: 'CocoTurf Large Pee Pad',
      width: 800,
      height: 800,
    },
    images: {
      edges: [
        {
          node: {
            url: IMAGES.cocoturf,
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
      url: IMAGES.refills,
      altText: 'CocoTurf Refill Pack',
      width: 800,
      height: 800,
    },
    images: {
      edges: [
        {
          node: {
            url: IMAGES.refills,
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
  {
    id: 'gid://shopify/Product/5',
    handle: 'cocoturf-liners',
    title: 'CocoTurf Liners',
    description: 'Optional puppy liners for extra absorption during training. Biodegradable and compostable.',
    descriptionHtml: '<p>Optional puppy liners for extra absorption during training.</p><p>Biodegradable and compostable - perfect for puppies still learning.</p>',
    featuredImage: {
      url: IMAGES.liners,
      altText: 'CocoTurf Liners',
      width: 800,
      height: 800,
    },
    images: {
      edges: [
        {
          node: {
            url: IMAGES.liners,
            altText: 'CocoTurf Liners',
            width: 800,
            height: 800,
          },
        },
      ],
    },
    options: [
      {
        name: 'Pack',
        values: ['50-Pack'],
      },
    ],
    priceRange: {
      minVariantPrice: {
        amount: '19.99',
        currencyCode: 'USD',
      },
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/5',
            title: '50-Pack',
            availableForSale: true,
            price: {
              amount: '19.99',
              currencyCode: 'USD',
            },
            compareAtPrice: null,
            selectedOptions: [{ name: 'Pack', value: '50-Pack' }],
            image: null,
          },
        },
      ],
    },
  },
]

export const placeholderFeaturedProduct = placeholderProducts[0]
