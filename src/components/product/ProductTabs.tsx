import { Tabs, Box, Text } from '@radix-ui/themes'
import type { ShopifyProduct } from '../../lib/shopify/types'

interface ProductTabsProps {
  product: ShopifyProduct
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs.Root defaultValue="description">
      <Tabs.List>
        <Tabs.Trigger value="description">Description</Tabs.Trigger>
        <Tabs.Trigger value="details">Details</Tabs.Trigger>
        <Tabs.Trigger value="care">Care & Usage</Tabs.Trigger>
      </Tabs.List>

      <Box pt="4">
        <Tabs.Content value="description">
          <Text size="2" color="gray" style={{ lineHeight: 1.7 }}>
            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          </Text>
        </Tabs.Content>

        <Tabs.Content value="details">
          <Text size="2" color="gray" style={{ lineHeight: 1.7 }}>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li>100% plant-based coconut coir fibers</li>
              <li>Machine washable up to 100+ times</li>
              <li>Natural antimicrobial properties</li>
              <li>Suitable for dogs up to 30 lbs</li>
              <li>Dimensions vary by size</li>
            </ul>
          </Text>
        </Tabs.Content>

        <Tabs.Content value="care">
          <Text size="2" color="gray" style={{ lineHeight: 1.7 }}>
            <ol style={{ paddingLeft: 20, margin: 0 }}>
              <li>Rinse with water after each use</li>
              <li>For deep cleaning, machine wash on cold</li>
              <li>Air dry completely before next use</li>
              <li>Do not use bleach or fabric softener</li>
            </ol>
          </Text>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  )
}
