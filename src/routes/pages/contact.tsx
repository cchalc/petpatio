import { createFileRoute } from '@tanstack/react-router'
import { Container, Flex, Heading, Text, TextField, TextArea, Button, Card } from '@radix-ui/themes'
import { Mail } from 'lucide-react'

export const Route = createFileRoute('/pages/contact')({
  component: ContactPage,
})

function ContactPage() {
  return (
    <Container size="2" py="9">
      <Flex direction="column" gap="8">
        <Flex direction="column" gap="2" align="center" style={{ textAlign: 'center' }}>
          <Heading size="8">Contact Us</Heading>
          <Text size="3" color="gray">
            Questions? We'd love to hear from you.
          </Text>
        </Flex>

        <Card>
          <Flex direction="column" gap="4" p="6">
            <Flex direction="column" gap="2">
              <Text size="2" weight="medium">Name</Text>
              <TextField.Root size="3" placeholder="Your name" />
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="2" weight="medium">Email</Text>
              <TextField.Root size="3" placeholder="you@example.com" type="email" />
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="2" weight="medium">Message</Text>
              <TextArea size="3" placeholder="How can we help?" rows={5} />
            </Flex>
            <Button size="3">Send Message</Button>
          </Flex>
        </Card>

        <Flex direction="column" gap="3" align="center" style={{ textAlign: 'center' }}>
          <Flex align="center" gap="2">
            <Mail size={20} style={{ color: 'var(--accent-9)' }} />
            <Text size="3">support@petpatio.com</Text>
          </Flex>
          <Text size="2" color="gray">
            We typically respond within 24 hours.
          </Text>
        </Flex>
      </Flex>
    </Container>
  )
}
