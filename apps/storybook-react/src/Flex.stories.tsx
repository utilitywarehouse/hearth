import type { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, spaceTokens } from '@utilitywarehouse/hearth-react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Flex> = {
  title: 'Stories / Flex',
  component: Flex,
  argTypes: {
    children: { control: { type: 'text' } },
    as: { options: ['div', 'span'], control: { type: 'radio' } },
    display: { options: ['none', 'flex', 'inline-flex'], control: { type: 'radio' } },
    padding: { options: spaceTokens, control: { type: 'select' } },
    paddingInline: { options: spaceTokens, control: { type: 'select' } },
    paddingBlock: { options: spaceTokens, control: { type: 'select' } },
    paddingTop: { options: spaceTokens, control: { type: 'select' } },
    paddingRight: { options: spaceTokens, control: { type: 'select' } },
    paddingBottom: { options: spaceTokens, control: { type: 'select' } },
    paddingLeft: { options: spaceTokens, control: { type: 'select' } },
    gap: { options: spaceTokens, control: { type: 'select' } },
    width: { control: { type: 'text' } },
    minWidth: { control: { type: 'text' } },
    maxWidth: { control: { type: 'text' } },
    height: { control: { type: 'text' } },
    minHeight: { control: { type: 'text' } },
    maxHeight: { control: { type: 'text' } },
    color: { control: { type: 'text' } },
    backgroundColor: { control: { type: 'text' } },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof Flex>;

export const Workshop: Story = {
  render: args => (
    <Flex {...args}>
      <Box className="hearth-sb-Placeholder" padding="600" />
      <Box className="hearth-sb-Placeholder" padding="600" />
      <Box className="hearth-sb-Placeholder" padding="600" />
      <Box className="hearth-sb-Placeholder" padding="600" />
    </Flex>
  ),
  args: {
    gap: '200',
  },
};

export const ResponsiveGap: Story = {
  render: args => (
    <Flex {...args}>
      <Box className="hearth-sb-Placeholder" padding="600" />
      <Box className="hearth-sb-Placeholder" padding="600" />
      <Box className="hearth-sb-Placeholder" padding="600" />
    </Flex>
  ),
  args: {
    gap: {
      mobile: '200',
      tablet: '100',
      desktop: '300',
      wide: '600',
    },
    direction: 'column',
  },
};
