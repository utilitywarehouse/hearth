import { Button, Flex } from '@utilitywarehouse/hearth-react';

export const ActionRow = () => (
  <Flex gap="200">
    <Button variant="outline">Cancel</Button>
    <Button variant="solid">Confirm</Button>
  </Flex>
);
