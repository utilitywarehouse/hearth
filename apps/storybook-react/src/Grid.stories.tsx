import type { Meta, StoryObj } from '@storybook/react';
import { Box, Grid } from '@utilitywarehouse/hearth-react';

const columnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;

const meta: Meta<typeof Grid> = {
  title: 'Stories / Grid',
  component: Grid,
  parameters: { layout: 'centered' },
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
    <Grid
      defaultResponsiveColumns // columns={{ mobile: '4', tablet: '8', desktop: '12' }}
      width={{ mobile: '360px', tablet: '744px', desktop: '1096px' }}
      padding={{ mobile: '200', tablet: '400' }}
      gap="200"
    >
      <Box className="hearth-sb-Placeholder" gridItemColumns="4" />
      <Box className="hearth-sb-Placeholder" gridItemColumns="4" />
      <Box
        className="hearth-sb-Placeholder"
        gridItemColumns={{ mobile: '4', tablet: '8', desktop: '4' }}
      />
    </Grid>
  ),
};
