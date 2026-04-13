import { createFileRoute } from '@tanstack/react-router'
import { Container, Flex, Heading, Text, Grid, Box } from '@radix-ui/themes'

export const Route = createFileRoute('/pages/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <Container size="2" py="9">
      <Flex direction="column" gap="8">
        <Flex direction="column" gap="4" align="center" style={{ textAlign: 'center' }}>
          <Heading size="8">About PetPatio</Heading>
          <Text size="4" color="gray" style={{ maxWidth: 600 }}>
            We're building premium pet gear for the modern home. No gimmicks, no cutesy marketing — just products that perform.
          </Text>
        </Flex>

        <Grid columns={{ initial: '1', md: '2' }} gap="8" py="6">
          <Flex direction="column" gap="3">
            <Heading size="5">Our Mission</Heading>
            <Text size="2" color="gray" style={{ lineHeight: 1.7 }}>
              We believe pet products don't have to be an eyesore. PetPatio combines thoughtful design with genuine performance to create gear you'll actually want in your home.
            </Text>
          </Flex>
          <Flex direction="column" gap="3">
            <Heading size="5">Our Approach</Heading>
            <Text size="2" color="gray" style={{ lineHeight: 1.7 }}>
              Every product starts with a problem worth solving. We obsess over materials, test relentlessly, and only launch when we're confident it's the best solution available.
            </Text>
          </Flex>
        </Grid>

        <Box p="8" style={{ backgroundColor: 'var(--accent-3)', borderRadius: 'var(--radius-4)' }}>
          <Flex direction="column" gap="3" align="center" style={{ textAlign: 'center' }}>
            <Heading size="5">The Nike of Pet Gear</Heading>
            <Text size="2" color="gray" style={{ maxWidth: 500 }}>
              We're not interested in being cute. We're interested in being the best. Premium materials, thoughtful design, and relentless attention to detail.
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Container>
  )
}
