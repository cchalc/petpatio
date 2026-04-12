import { Box, Text } from '@radix-ui/themes'

export function AnnouncementBar() {
  return (
    <Box
      style={{
        backgroundColor: 'var(--gray-12)',
        color: 'var(--gray-1)',
      }}
      py="2"
    >
      <Text size="2" align="center" weight="medium" style={{ display: 'block' }}>
        Free shipping on all orders $100+
      </Text>
    </Box>
  )
}
