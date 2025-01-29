import type { Meta, StoryObj } from '@storybook/react';
import { Box, Grid } from '@utilitywarehouse/hearth-react';

const columnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;

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
  },
  args: {
    children: 'Box',
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof Grid>;

export const Workshop: Story = {
  render: () => (
    <Grid columns="3" width="600px" gap="100">
      <Box className="hearth-sb-Placeholder" padding="400" />
      <Box className="hearth-sb-Placeholder" padding="400" />
      <Box className="hearth-sb-Placeholder" padding="400" />
      <Box className="hearth-sb-Placeholder" padding="400" />
      <Box className="hearth-sb-Placeholder" padding="400" />
      <Box className="hearth-sb-Placeholder" padding="400" />
    </Grid>
  ),
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
