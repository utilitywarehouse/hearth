import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Card, DetailText, Flex, SectionHeader } from '@utilitywarehouse/hearth-react';

const meta: Meta<typeof SectionHeader> = {
  title: 'Stories / Section Header',
  component: SectionHeader,
  parameters: {
    docs: {
      description: {
        component:
          'Use the `Section Header` component to help define and separate content within a screen. It provides structure, clarity, and improves page scannability for users. It is nested within components, such as List, but can be used outside of components too.',
      },
    },
  },
  argTypes: {
    linkText: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    heading: { control: { type: 'text' } },
  },
  args: {
    heading: 'Section header',
    helperText: 'Helper text',
    linkHref: '#',
    linkText: 'Link text',
  },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Playground: Story = {
  render: args => {
    return <SectionHeader {...args} />;
  },
};

export const CustomContent: Story = {
  render: args => {
    return (
      <>
        <SectionHeader {...args} />
        <Flex paddingTop="100" gap="50">
          <Box width="300px">
            <Card colorScheme="white" variant="emphasis">
              <DetailText size="sm">
                Why Octopuses Can Taste With Their Arms and What It Means for Science
              </DetailText>
            </Card>
          </Box>
          <Box width="300px">
            <Card colorScheme="white" variant="emphasis">
              <DetailText size="sm">
                How a Village in Norway Runs Entirely on Cheese Waste Energy
              </DetailText>
            </Card>
          </Box>
          <Box width="300px">
            <Card colorScheme="white" variant="emphasis">
              <DetailText size="sm">
                The Secret History of the World's Oldest Known Board Game
              </DetailText>
            </Card>
          </Box>
        </Flex>
      </>
    );
  },
  args: {
    helperText: '',
    heading: 'Latest News',
    linkText: 'View all articles',
  },
};
