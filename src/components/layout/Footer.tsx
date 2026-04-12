// src/components/layout/Footer.tsx
import { Box, Container, Flex, Grid, Text, Link as RadixLink } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import { Instagram } from 'lucide-react'

export function Footer() {
  return (
    <Box style={{ backgroundColor: 'var(--gray-12)', color: 'var(--gray-1)' }} py="9">
      <Container size="4">
        <Grid columns={{ initial: '1', md: '4' }} gap="8">
          {/* Brand */}
          <Flex direction="column" gap="3">
            <Text size="5" weight="bold" style={{ color: 'var(--gray-1)' }}>
              PetPatio
            </Text>
            <Text size="2" style={{ color: 'var(--gray-6)' }}>
              Premium pet gear for the modern home.
            </Text>
          </Flex>

          {/* Shop */}
          <Flex direction="column" gap="3">
            <Text size="2" weight="bold" style={{ color: 'var(--gray-4)' }}>
              SHOP
            </Text>
            <Link to={'/products' as '/'} style={{ textDecoration: 'none' }}>
              <Text size="2" style={{ color: 'var(--gray-6)', cursor: 'pointer' }}>
                All Products
              </Text>
            </Link>
            <Link to={'/products/cocoturf' as '/'} style={{ textDecoration: 'none' }}>
              <Text size="2" style={{ color: 'var(--gray-6)', cursor: 'pointer' }}>
                CocoTurf
              </Text>
            </Link>
          </Flex>

          {/* Support */}
          <Flex direction="column" gap="3">
            <Text size="2" weight="bold" style={{ color: 'var(--gray-4)' }}>
              SUPPORT
            </Text>
            <Link to={'/pages/faq' as '/'} style={{ textDecoration: 'none' }}>
              <Text size="2" style={{ color: 'var(--gray-6)', cursor: 'pointer' }}>
                FAQ
              </Text>
            </Link>
            <Link to={'/pages/contact' as '/'} style={{ textDecoration: 'none' }}>
              <Text size="2" style={{ color: 'var(--gray-6)', cursor: 'pointer' }}>
                Contact
              </Text>
            </Link>
            <Link to={'/pages/about' as '/'} style={{ textDecoration: 'none' }}>
              <Text size="2" style={{ color: 'var(--gray-6)', cursor: 'pointer' }}>
                About
              </Text>
            </Link>
          </Flex>

          {/* Social */}
          <Flex direction="column" gap="3">
            <Text size="2" weight="bold" style={{ color: 'var(--gray-4)' }}>
              FOLLOW US
            </Text>
            <Flex gap="4">
              <RadixLink href="https://instagram.com/petpatio" target="_blank">
                <Instagram size={20} style={{ color: 'var(--gray-6)' }} />
              </RadixLink>
            </Flex>
          </Flex>
        </Grid>

        {/* Bottom */}
        <Flex
          justify="between"
          align="center"
          mt="8"
          pt="6"
          style={{ borderTop: '1px solid var(--gray-10)' }}
          direction={{ initial: 'column', md: 'row' }}
          gap="4"
        >
          <Text size="1" style={{ color: 'var(--gray-8)' }}>
            © {new Date().getFullYear()} PetPatio. All rights reserved.
          </Text>
          <Flex gap="4">
            <Text size="1" style={{ color: 'var(--gray-8)' }}>Visa</Text>
            <Text size="1" style={{ color: 'var(--gray-8)' }}>Mastercard</Text>
            <Text size="1" style={{ color: 'var(--gray-8)' }}>Amex</Text>
            <Text size="1" style={{ color: 'var(--gray-8)' }}>PayPal</Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
