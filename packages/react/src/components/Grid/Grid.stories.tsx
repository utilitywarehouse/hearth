import type { Meta, StoryObj } from '@storybook/react-vite';
import { spaceTokens } from '../../tokens/space';
import { Grid } from './Grid';
import { Placeholder } from '../../../docs/storybook-components/Placeholder';

const backgroundColorValues = ['primary', 'secondary', 'brand'] as const;
const columnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;
const borderStyleValues = ['none', 'solid'] as const;
const borderWidthValues = ['0', '1', '2'] as const;
const borderRadiusValues = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;
const borderColorValues = ['strong', 'subtle'] as const;
const colorValues = ['primary', 'secondary', 'brand', 'affirmative', 'inverted'] as const;

const meta: Meta<typeof Grid> = {
  title: 'Layout / Grid',
  component: Grid,
  argTypes: {
    children: { control: { type: 'text' } },
    as: { options: ['div', 'span'], control: { type: 'radio' } },
    columns: { options: columnsValues, control: { type: 'select' } },
    gap: { options: spaceTokens, control: { type: 'select' } },
    spacing: {
      options: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
    },
    rowSpacing: {
      options: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
    },
    columnSpacing: {
      options: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
    },
    color: { options: colorValues, control: { type: 'select' } },
    backgroundColor: { options: backgroundColorValues, control: { type: 'select' } },
    borderColor: { options: borderColorValues, control: { type: 'select' } },
    borderStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderTopColor: { options: borderColorValues, control: { type: 'select' } },
    borderTopStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderTopWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderRightColor: { options: borderColorValues, control: { type: 'select' } },
    borderRightStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderRightWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderBottomColor: { options: borderColorValues, control: { type: 'select' } },
    borderBottomStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderBottomWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderLeftColor: { options: borderColorValues, control: { type: 'select' } },
    borderLeftStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderLeftWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderRadius: { options: borderRadiusValues, control: { type: 'select' } },
    position: {
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      control: { type: 'select' },
    },
    inset: { control: { type: 'number' } },
    top: { control: { type: 'number' } },
    right: { control: { type: 'number' } },
    bottom: { control: { type: 'number' } },
    left: { control: { type: 'number' } },
    width: { control: { type: 'text' } },
    minWidth: { control: { type: 'text' } },
    maxWidth: { control: { type: 'text' } },
    height: { control: { type: 'text' } },
    minHeight: { control: { type: 'text' } },
    maxHeight: { control: { type: 'text' } },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof Grid>;

export const Playground: Story = {
  render: args => (
    <Grid {...args}>
      <Placeholder padding="400" />
      <Placeholder padding="400" />
      <Placeholder padding="400" />
      <Placeholder padding="400" />
      <Placeholder padding="400" />
      <Placeholder padding="400" />
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
      <Placeholder gridColumnSpan="4" padding="400" />
      <Placeholder gridColumnSpan="4" padding="400" />
      <Placeholder gridColumnSpan={{ mobile: '4', tablet: '8', desktop: '4' }} padding="400" />
    </Grid>
  ),
};

export const Spacing: Story = {
  render: args => (
    <Grid {...args}>
      <Placeholder padding="600" />
      <Placeholder padding="600" />
      <Placeholder padding="600" />
    </Grid>
  ),
  args: {
    spacing: 'lg',
  },
};
