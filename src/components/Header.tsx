// src/components/Header.tsx
import { Box, Container, Flex, Text, IconButton, Badge } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'
import { ShoppingCart, User, Menu } from 'lucide-react'

interface HeaderProps {
  cartItemCount?: number
  onCartClick?: () => void
  onMenuClick?: () => void
}

export function Header({ cartItemCount = 0, onCartClick, onMenuClick }: HeaderProps) {
  return (
    <Box
      style={{
        borderBottom: '1px solid var(--gray-4)',
        backgroundColor: 'var(--color-background)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
      py="4"
    >
      <Container size="4">
        <Flex align="center" justify="between">
          {/* Mobile menu button */}
          <Box display={{ initial: 'block', md: 'none' }}>
            <IconButton variant="ghost" size="3" onClick={onMenuClick}>
              <Menu size={24} />
            </IconButton>
          </Box>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Text size="6" weight="bold" style={{ color: 'var(--accent-9)' }}>
              PetPatio
            </Text>
          </Link>

          {/* Desktop Navigation */}
          <Flex gap="6" display={{ initial: 'none', md: 'flex' }}>
            {/* Routes will be created in later tasks */}
            <Link to={'/products' as '/'} style={{ textDecoration: 'none' }}>
              <Text size="3" color="gray" style={{ cursor: 'pointer' }}>
                Shop
              </Text>
            </Link>
            <Link to={'/pages/about' as '/'} style={{ textDecoration: 'none' }}>
              <Text size="3" color="gray" style={{ cursor: 'pointer' }}>
                About
              </Text>
            </Link>
            <Link to={'/pages/faq' as '/'} style={{ textDecoration: 'none' }}>
              <Text size="3" color="gray" style={{ cursor: 'pointer' }}>
                FAQ
              </Text>
            </Link>
          </Flex>

          {/* Actions */}
          <Flex gap="2" align="center">
            <IconButton variant="ghost" size="3">
              <User size={20} />
            </IconButton>
            <Box style={{ position: 'relative' }}>
              <IconButton variant="ghost" size="3" onClick={onCartClick}>
                <ShoppingCart size={20} />
              </IconButton>
              {cartItemCount > 0 && (
                <Badge
                  size="1"
                  color="purple"
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    minWidth: 18,
                    height: 18,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {cartItemCount}
                </Badge>
              )}
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
