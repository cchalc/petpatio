// src/lib/shopify/queries.ts
import { gql } from 'graphql-request'
import { shopifyClient } from './client'
import type { ShopifyProduct, ShopifyCollection } from './types'

const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    productType
    tags
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    options {
      name
      values
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`

export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const query = gql`
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `

  const data = await shopifyClient.request<{
    products: { edges: Array<{ node: ShopifyProduct }> }
  }>(query, { first })

  return data.products.edges.map(edge => edge.node)
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = gql`
    ${PRODUCT_FRAGMENT}
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        ...ProductFields
      }
    }
  `

  const data = await shopifyClient.request<{
    productByHandle: ShopifyProduct | null
  }>(query, { handle })

  return data.productByHandle
}

export async function getCollection(handle: string, first = 20): Promise<ShopifyCollection | null> {
  const query = gql`
    ${PRODUCT_FRAGMENT}
    query GetCollection($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        id
        handle
        title
        description
        image {
          url
          altText
          width
          height
        }
        products(first: $first) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    }
  `

  const data = await shopifyClient.request<{
    collectionByHandle: ShopifyCollection | null
  }>(query, { handle, first })

  return data.collectionByHandle
}
