import { createFileRoute } from '@tanstack/react-router'
import { Container, Flex, Heading, Text, Box } from '@radix-ui/themes'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    category: 'Product',
    questions: [
      {
        question: 'What is CocoTurf made of?',
        answer: 'CocoTurf is made from 100% natural coconut coir fibers, a sustainable byproduct of the coconut industry. It\'s completely plant-based and biodegradable.',
      },
      {
        question: 'What sizes are available?',
        answer: 'We offer three sizes: Small (18"x24") for dogs up to 15 lbs, Medium (24"x36") for dogs 15-30 lbs, and Large (36"x48") for dogs over 30 lbs or multi-dog households.',
      },
      {
        question: 'How long does CocoTurf last?',
        answer: 'With proper care, CocoTurf lasts 1-2 years, or about 100+ washes. That\'s the equivalent of thousands of disposable pee pads.',
      },
    ],
  },
  {
    category: 'Care & Usage',
    questions: [
      {
        question: 'How do I clean CocoTurf?',
        answer: 'For daily use, simply rinse with water and let dry. For deep cleaning, machine wash on cold with mild detergent and air dry. Do not use bleach or fabric softener.',
      },
      {
        question: 'How long does it take to dry?',
        answer: 'Air drying typically takes 4-6 hours depending on humidity. We recommend having two pads so you can rotate while one dries.',
      },
    ],
  },
  {
    category: 'Shipping & Returns',
    questions: [
      {
        question: 'Do you offer free shipping?',
        answer: 'Yes! We offer free shipping on all orders over $100. Standard shipping is $5.99 for orders under $100.',
      },
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, contact us for a full refund.',
      },
    ],
  },
]

export const Route = createFileRoute('/pages/faq')({
  component: FAQPage,
})

function FAQPage() {
  return (
    <Container size="2" py="9">
      <Flex direction="column" gap="8">
        <Flex direction="column" gap="2" align="center" style={{ textAlign: 'center' }}>
          <Heading size="8">Frequently Asked Questions</Heading>
          <Text size="3" color="gray">
            Everything you need to know about CocoTurf.
          </Text>
        </Flex>

        {faqs.map((category) => (
          <Flex key={category.category} direction="column" gap="4">
            <Heading size="5">{category.category}</Heading>
            <Accordion.Root type="single" collapsible>
              {category.questions.map((faq, index) => (
                <Accordion.Item
                  key={index}
                  value={`${category.category}-${index}`}
                  style={{ borderBottom: '1px solid var(--gray-4)' }}
                >
                  <Accordion.Trigger
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <Text size="3" weight="medium">{faq.question}</Text>
                    <ChevronDown size={20} style={{ color: 'var(--gray-9)', flexShrink: 0 }} />
                  </Accordion.Trigger>
                  <Accordion.Content style={{ paddingBottom: 16 }}>
                    <Text size="2" color="gray">{faq.answer}</Text>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Flex>
        ))}
      </Flex>
    </Container>
  )
}
