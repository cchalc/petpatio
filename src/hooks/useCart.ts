// src/hooks/useCart.ts
import { useState, useEffect, useCallback } from 'react'
import {
  createCart,
  getCart,
  addToCart as addToCartApi,
  updateCartLine,
  removeFromCart as removeFromCartApi,
} from '../lib/shopify/cart'
import type { ShopifyCart } from '../lib/shopify/types'

const CART_ID_KEY = 'petpatio-cart-id'

export function useCart() {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Initialize cart on mount
  useEffect(() => {
    async function initCart() {
      setIsLoading(true)
      try {
        const storedCartId = localStorage.getItem(CART_ID_KEY)

        if (storedCartId) {
          const existingCart = await getCart(storedCartId)
          if (existingCart) {
            setCart(existingCart)
            setIsLoading(false)
            return
          }
        }

        // Create new cart if none exists
        const newCart = await createCart()
        localStorage.setItem(CART_ID_KEY, newCart.id)
        setCart(newCart)
      } catch (error) {
        console.error('Failed to initialize cart:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initCart()
  }, [])

  const addToCart = useCallback(async (variantId: string, quantity = 1) => {
    if (!cart) return

    setIsLoading(true)
    try {
      const updatedCart = await addToCartApi(cart.id, variantId, quantity)
      setCart(updatedCart)
      setIsDrawerOpen(true)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return

    setIsLoading(true)
    try {
      if (quantity <= 0) {
        const updatedCart = await removeFromCartApi(cart.id, [lineId])
        setCart(updatedCart)
      } else {
        const updatedCart = await updateCartLine(cart.id, lineId, quantity)
        setCart(updatedCart)
      }
    } catch (error) {
      console.error('Failed to update quantity:', error)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return

    setIsLoading(true)
    try {
      const updatedCart = await removeFromCartApi(cart.id, [lineId])
      setCart(updatedCart)
    } catch (error) {
      console.error('Failed to remove item:', error)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])

  return {
    cart,
    isLoading,
    isDrawerOpen,
    addToCart,
    updateQuantity,
    removeItem,
    openDrawer,
    closeDrawer,
    checkoutUrl: cart?.checkoutUrl,
    itemCount: cart?.totalQuantity ?? 0,
  }
}
