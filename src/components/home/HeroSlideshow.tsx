// src/components/home/HeroSlideshow.tsx
import { Box, Container, Flex, Grid, Heading, Text, Button } from '@radix-ui/themes'
import { Link } from '@tanstack/react-router'

const HERO_IMAGE = 'https://www.petpatio.com/cdn/shop/files/dog-10copy_8c759ae0-9a6d-4e92-8218-f7f8155856ec.jpg?v=1768506600&width=800'

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
        <Grid columns={{ initial: '1', md: '2' }} gap="8" align="center" py="6">
          {/* Text content */}
          <Flex direction="column" gap="5">
            <Text size="2" weight="medium" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Introducing
            </Text>
            <Heading size="9" weight="bold">
              CocoTurf
            </Heading>
            <Text size="5" color="gray" style={{ maxWidth: 500 }}>
              The last pee pad you'll ever buy. Plant-based. Reusable. Built to perform.
            </Text>
            <Flex gap="4" mt="2">
              <Link to={'/products' as '/'} style={{ textDecoration: 'none' }}>
                <Button size="4">Shop Now</Button>
              </Link>
              <Link to={'/pages/about' as '/'} style={{ textDecoration: 'none' }}>
                <Button size="4" variant="outline">Learn More</Button>
              </Link>
            </Flex>
          </Flex>

          {/* Hero image */}
          <Box
            style={{
              borderRadius: 'var(--radius-4)',
              overflow: 'hidden',
              aspectRatio: '1',
            }}
          >
            <img
              src={HERO_IMAGE}
              alt="Dog using CocoTurf pee pad"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
