import { CloseSmallIcon, TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { Badge } from './Badge';

export const VariantsExample = () => (
  <Flex gap="200">
    <Badge variant="subtle">Subtle</Badge>
    <Badge variant="emphasis">Emphasis</Badge>
    <Badge variant="outline">Outline</Badge>
  </Flex>
);

export const SizesExample = () => (
  <Flex gap="200" alignItems="center">
    <Badge size="sm">Small</Badge>
    <Badge size="md">Medium</Badge>
    <Badge size={{ mobile: 'sm', desktop: 'md' }}>Responsive</Badge>
  </Flex>
);

export const ColorSchemesExample = () => (
  <Flex gap="200" wrap="wrap">
    <Badge colorScheme="info">Info</Badge>
    <Badge colorScheme="positive">Positive</Badge>
    <Badge colorScheme="danger">Danger</Badge>
    <Badge colorScheme="warning">Warning</Badge>
    <Badge colorScheme="functional">Functional</Badge>
    <Badge colorScheme="energy">Energy</Badge>
    <Badge colorScheme="mobile">Mobile</Badge>
    <Badge colorScheme="broadband">Broadband</Badge>
  </Flex>
);

export const FlatBaseExample = () => (
  <Box>
    <Flex justifyContent="end" paddingRight="300" width="400px">
      <Badge colorScheme="positive" variant="emphasis" flatBase>
        Multi SIM offer
      </Badge>
    </Flex>
    <Box
      width="400px"
      height="200px"
      backgroundColor="primary"
      borderColor="subtle"
      borderStyle="solid"
      borderWidth="2"
      borderRadius="sm"
    />
  </Box>
);

export const IconsExample = () => (
  <Flex gap="200">
    <Badge colorScheme="positive">
      <TickSmallIcon />
      Success
    </Badge>
    <Badge colorScheme="danger">
      <CloseSmallIcon />
      Unsuccessful
    </Badge>
  </Flex>
);
