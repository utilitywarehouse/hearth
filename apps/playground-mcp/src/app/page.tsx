import { BodyText, Flex, Heading, InlineLink } from '@utilitywarehouse/hearth-react';

export default function Home() {
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Flex direction="column" spacing="md" alignItems="center">
        <Heading as="h1" size="xl">
          Hearth MCP
        </Heading>
        <BodyText>
          Storybook MCP server running at <InlineLink>http://localhost:6060/mcp</InlineLink>
        </BodyText>
      </Flex>
    </Flex>
  );
}
