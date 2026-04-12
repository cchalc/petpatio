// src/lib/shopify/cart.ts
import { gql } from 'graphql-request'
import { shopifyClient } from './client'
import type { ShopifyCart } from './types'

const CART_FRAGMENT = gql`
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
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
              product {
                id
                handle
                title
                featuredImage {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

export async function createCart(): Promise<ShopifyCart> {
  const mutation = gql`
    ${CART_FRAGMENT}
    mutation CreateCart {
      cartCreate {
        cart {
          ...CartFields
        }
      }
    }
  `

  const data = await shopifyClient.request<{
    cartCreate: { cart: ShopifyCart }
  }>(mutation)

  return data.cartCreate.cart
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = gql`
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
  `

  const data = await shopifyClient.request<{
    cart: ShopifyCart | null
  }>(query, { cartId })

  return data.cart
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number
): Promise<ShopifyCart> {
  const mutation = gql`
    ${CART_FRAGMENT}
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
  `

  const data = await shopifyClient.request<{
    cartLinesAdd: { cart: ShopifyCart }
  }>(mutation, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  })

  return data.cartLinesAdd.cart
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const mutation = gql`
    ${CART_FRAGMENT}
    mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
  `

  const data = await shopifyClient.request<{
    cartLinesUpdate: { cart: ShopifyCart }
  }>(mutation, {
    cartId,
    lines: [{ id: lineId, quantity }],
  })

  return data.cartLinesUpdate.cart
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const mutation = gql`
    ${CART_FRAGMENT}
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
      }
    }
  `

  const data = await shopifyClient.request<{
    cartLinesRemove: { cart: ShopifyCart }
  }>(mutation, { cartId, lineIds })

  return data.cartLinesRemove.cart
}
