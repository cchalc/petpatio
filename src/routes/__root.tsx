// src/routes/__root.tsx
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { Theme, Box, Container, Flex, Heading, Text } from '@radix-ui/themes'

import { Header } from '../components/Header'
import { Footer } from '../components/layout/Footer'
import { AnnouncementBar } from '../components/layout/AnnouncementBar'
import { CartDrawer } from '../components/layout/CartDrawer'
import { CartProvider, useCartContext } from '../contexts/CartContext'

import radixCss from '@radix-ui/themes/styles.css?url'
import interCss from '@fontsource/inter/latin.css?url'
import typographyCss from '/typography.css?url'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'PetPatio — Premium Pet Gear' },
    ],
    links: [
      { rel: 'stylesheet', href: radixCss },
      { rel: 'stylesheet', href: interCss },
      { rel: 'stylesheet', href: typographyCss },
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function NotFound() {
  return (
    <Container size="2" py="9">
      <Flex direction="column" gap="2" align="center">
        <Heading size="8">404</Heading>
        <Text color="gray">Page not found</Text>
      </Flex>
    </Container>
  )
}

function AppLayout() {
  const { cart, isLoading, isDrawerOpen, openDrawer, closeDrawer, updateQuantity, removeItem, itemCount } = useCartContext()

  return (
    <Flex direction="column" style={{ minHeight: '100vh' }}>
      <AnnouncementBar />
      <Header cartItemCount={itemCount} onCartClick={openDrawer} />
      <Box style={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
      <CartDrawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        isLoading={isLoading}
      />
    </Flex>
  )
}

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Theme accentColor="purple" grayColor="slate" radius="medium">
          <CartProvider>
            <AppLayout />
          </CartProvider>
        </Theme>
        <Scripts />
      </body>
    </html>
  )
}
