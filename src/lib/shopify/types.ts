// src/lib/shopify/types.ts

export interface ShopifyImage {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyPrice {
  amount: string
  currencyCode: string
}

export interface ShopifyProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: ShopifyPrice
  compareAtPrice: ShopifyPrice | null
  selectedOptions: Array<{
    name: string
    value: string
  }>
  image: ShopifyImage | null
}

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  featuredImage: ShopifyImage | null
  images: {
    edges: Array<{ node: ShopifyImage }>
  }
  variants: {
    edges: Array<{ node: ShopifyProductVariant }>
  }
  priceRange: {
    minVariantPrice: ShopifyPrice
    maxVariantPrice: ShopifyPrice
  }
  options: Array<{
    name: string
    values: string[]
  }>
  tags: string[]
  productType: string
}

export interface ShopifyCollection {
  id: string
  handle: string
  title: string
  description: string
  image: ShopifyImage | null
  products: {
    edges: Array<{ node: ShopifyProduct }>
  }
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: {
      id: string
      handle: string
      title: string
      featuredImage: ShopifyImage | null
    }
    price: ShopifyPrice
    selectedOptions: Array<{
      name: string
      value: string
    }>
    image: ShopifyImage | null
  }
  cost: {
    totalAmount: ShopifyPrice
  }
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: ShopifyPrice
    totalAmount: ShopifyPrice
  }
  lines: {
    edges: Array<{ node: ShopifyCartLine }>
  }
}

export interface ShopifyCustomer {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  displayName: string
}

export interface ShopifyOrder {
  id: string
  orderNumber: number
  processedAt: string
  financialStatus: string
  fulfillmentStatus: string
  totalPrice: ShopifyPrice
  lineItems: {
    edges: Array<{
      node: {
        title: string
        quantity: number
        variant: {
          image: ShopifyImage | null
          price: ShopifyPrice
        } | null
      }
    }>
  }
}
