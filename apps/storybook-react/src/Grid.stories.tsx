import type { Meta, StoryObj } from '@storybook/react';
import { Box, colorTokens, Grid, spaceTokens } from '@utilitywarehouse/hearth-react';

const columnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;
const borderStyleValues = ['none', 'solid'] as const;
const borderWidthValues = ['0', '1', '2'] as const;
const borderRadiusValues = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;

const meta: Meta<typeof Grid> = {
  title: 'Stories / Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component:
          '`Grid` is a fundamental primitive, and should be used for CSS grid based layouts.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    as: { options: ['div', 'span'], control: { type: 'radio' } },
    columns: { options: columnsValues, control: { type: 'select' } },
    gap: { options: spaceTokens, control: { type: 'select' } },
    color: { options: colorTokens, control: { type: 'select' } },
    backgroundColor: { control: { type: 'text' } },
    borderColor: { options: colorTokens, control: { type: 'select' } },
    borderStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderTopColor: { options: colorTokens, control: { type: 'select' } },
    borderTopStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderTopWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderRightColor: { options: colorTokens, control: { type: 'select' } },
    borderRightStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderRightWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderBottomColor: { options: colorTokens, control: { type: 'select' } },
    borderBottomStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderBottomWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderLeftColor: { options: colorTokens, control: { type: 'select' } },
    borderLeftStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderLeftWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderRadius: { options: borderRadiusValues, control: { type: 'select' } },
    borderTopLeftRadius: { options: borderRadiusValues, control: { type: 'select' } },
    borderTopRightRadius: { options: borderRadiusValues, control: { type: 'select' } },
    borderBottomRightRadius: { options: borderRadiusValues, control: { type: 'select' } },
    borderBottomLeftRadius: { options: borderRadiusValues, control: { type: 'select' } },
    position: {
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      control: { type: 'select' },
    },
    inset: { control: { type: 'number' } },
    top: { control: { type: 'number' } },
    right: { control: { type: 'number' } },
    bottom: { control: { type: 'number' } },
    left: { control: { type: 'number' } },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof Grid>;

export const Playground: Story = {
  render: args => (
    <Grid {...args}>
      <Box className="hearth-sb-Placeholder" padding="400" />
      <Box className="hearth-sb-Placeholder" padding="400" />
      <Box className="hearth-sb-Placeholder" padding="400" />
      <Box className="hearth-sb-Placeholder" padding="400" />
      <Box className="hearth-sb-Placeholder" padding="400" />
      <Box className="hearth-sb-Placeholder" padding="400" />
    </Grid>
  ),
  args: {
    columns: '3',
    width: '600px',
    gap: '100',
  },
};

export const ResponsiveGrid: Story = {
  render: () => (
    <Grid
      defaultResponsiveColumns // columns={{ mobile: '4', tablet: '8', desktop: '12' }}
      width={{ mobile: '360px', tablet: '744px', desktop: '1096px' }}
      padding={{ mobile: '200', tablet: '400' }}
      gap="200"
    >
      <Box className="hearth-sb-Placeholder" gridColumnSpan="4" padding="400" />
      <Box className="hearth-sb-Placeholder" gridColumnSpan="4" padding="400" />
      <Box
        className="hearth-sb-Placeholder"
        gridColumnSpan={{ mobile: '4', tablet: '8', desktop: '4' }}
        padding="400"
      />
    </Grid>
  ),
};

export const Spacing: Story = {
  render: args => (
    <Grid {...args}>
      <Box className="hearth-sb-Placeholder" padding="600" />
      <Box className="hearth-sb-Placeholder" padding="600" />
      <Box className="hearth-sb-Placeholder" padding="600" />
    </Grid>
  ),
  args: {
    spacing: 'lg',
  },
};
