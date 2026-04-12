// src/contexts/CartContext.tsx
import { createContext, useContext, type ReactNode } from 'react'
import { useCart } from '../hooks/useCart'
import type { ShopifyCart } from '../lib/shopify/types'

interface CartContextValue {
  cart: ShopifyCart | null
  isLoading: boolean
  isDrawerOpen: boolean
  addToCart: (variantId: string, quantity?: number) => Promise<void>
  updateQuantity: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  openDrawer: () => void
  closeDrawer: () => void
  checkoutUrl: string | undefined
  itemCount: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart()

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}
