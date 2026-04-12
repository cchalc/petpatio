// src/components/home/HeroSlideshow.tsx
import { Box, Container, Flex, Heading, Text, Button } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'

export function HeroSlideshow() {
  return (
    <Box
      style={{
        backgroundColor: 'var(--accent-3)',
        backgroundImage: 'linear-gradient(135deg, var(--accent-3) 0%, var(--accent-4) 100%)',
      }}
      py="9"
    >
      <Container size="4">
        <Flex
          direction="column"
          align="center"
          gap="5"
          py="9"
          style={{ textAlign: 'center' }}
        >
          <Text size="2" weight="medium" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Introducing
          </Text>
          <Heading size="9" weight="bold">
            CocoTurf
          </Heading>
          <Text size="5" color="gray" style={{ maxWidth: 500 }}>
            The last pee pad you'll ever buy. Plant-based. Reusable. Built to perform.
          </Text>
          <Flex gap="4" mt="4">
            <Link to={'/products' as '/'} style={{ textDecoration: 'none' }}>
              <Button size="4">Shop Now</Button>
            </Link>
            <Link to={'/pages/about' as '/'} style={{ textDecoration: 'none' }}>
              <Button size="4" variant="outline">Learn More</Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
