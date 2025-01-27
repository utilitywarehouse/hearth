import type { Meta, StoryObj } from '@storybook/react';
import { Box, Flex, spaceTokens } from '@utilitywarehouse/hearth-react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Flex> = {
  title: 'Stories / Flex',
  component: Flex,
  parameters: { layout: 'centered' },
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
  args: {
    children: 'Flex',
    style: { border: '1px solid rebeccapurple' },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof Flex>;

export const Workshop: Story = {};

export const ResponsiveGap: Story = {
  render: args => (
    <Flex {...args}>
      <Box className="hearth-sb-Placeholder" width="400px" />
      <Box className="hearth-sb-Placeholder" width="400px" />
      <Box className="hearth-sb-Placeholder" width="400px" />
    </Flex>
  ),
  args: {
    gap: {
      mobile: '50',
      tablet: '100',
      desktop: '200',
      wide: '400',
    },
    children: '',
    style: { border: 'none' },
    direction: 'column',
  },
};
