import { Flex, Text, Button } from '@radix-ui/themes'
import type { ShopifyProduct, ShopifyProductVariant } from '../../lib/shopify/types'

interface VariantPickerProps {
  product: ShopifyProduct
  selectedVariant: ShopifyProductVariant
  onVariantChange: (variant: ShopifyProductVariant) => void
}

export function VariantPicker({ product, selectedVariant, onVariantChange }: VariantPickerProps) {
  const variants = product.variants.edges.map(e => e.node)
  const options = product.options

  // Get selected options
  const selectedOptions = new Map(
    selectedVariant.selectedOptions.map(o => [o.name, o.value])
  )

  const handleOptionChange = (optionName: string, value: string) => {
    // Find variant matching new selection
    const newOptions = new Map(selectedOptions)
    newOptions.set(optionName, value)

    const matchingVariant = variants.find(v =>
      v.selectedOptions.every(o => newOptions.get(o.name) === o.value)
    )

    if (matchingVariant) {
      onVariantChange(matchingVariant)
    }
  }

  return (
    <Flex direction="column" gap="4">
      {options.map((option) => (
        <Flex key={option.name} direction="column" gap="2">
          <Text size="2" weight="medium">
            {option.name}
          </Text>
          <Flex gap="2" wrap="wrap">
            {option.values.map((value) => {
              const isSelected = selectedOptions.get(option.name) === value
              return (
                <Button
                  key={value}
                  variant={isSelected ? 'solid' : 'outline'}
                  size="2"
                  onClick={() => handleOptionChange(option.name, value)}
                >
                  {value}
                </Button>
              )
            })}
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}
