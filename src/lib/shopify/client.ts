// src/lib/shopify/client.ts
import { GraphQLClient } from 'graphql-request'

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || process.env.SHOPIFY_STOREFRONT_TOKEN

if (!domain || !token) {
  console.warn('Shopify credentials not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN.')
}

const endpoint = `https://${domain}/api/2024-01/graphql.json`

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': token || '',
    'Content-Type': 'application/json',
  },
})
