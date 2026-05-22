import { Source } from '@storybook/addon-docs/blocks';
import { Box } from '../../components/Box/Box';
import { Flex } from '../../components/Flex/Flex';

interface DocExampleProps {
  of: React.ComponentType;
}

export const DocExample = ({ of: Component }: DocExampleProps) => {
  const source = (Component as Record<string, unknown>).__source as string | undefined;

  return (
    <Flex direction="column" gap="0">
      <Box
        padding="400"
        borderWidth="1"
        borderStyle="solid"
        borderColor="subtle"
        borderRadius="sm"
      >
        <Component />
      </Box>
      {source && <Source code={source} language="tsx" />}
    </Flex>
  );
};
