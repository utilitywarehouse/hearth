<<<<<<< HEAD
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '@utilitywarehouse/hearth-react';

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
  render: args => (
    <Grid
      {...args}
      container
      width={{ mobile: '360px', tablet: '744px', desktop: '1096px' }}
      padding={{ mobile: '200', tablet: '400' }}
      gap="200"
    >
      <Grid className="hearth-sb-Placeholder" size="4" />
      <Grid className="hearth-sb-Placeholder" size="4" />
      <Grid className="hearth-sb-Placeholder" size={{ mobile: '4', tablet: '8', desktop: '4' }} />
    </Grid>
  ),
};

export const ResponsiveProps: Story = {
  args: {
    children: 'Responsive props',
    columns: {
      mobile: '4',
      tablet: '8',
      desktop: '12',
    },
  },
};
||||||| parent of edb494f (add `Grid` component)
=======
import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '@utilitywarehouse/hearth-react';

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
  render: args => (
    <Grid
      {...args}
      container
      width={{ mobile: '360px', tablet: '744px', desktop: '1096px' }}
      padding={{ mobile: '200', tablet: '400' }}
    >
      <Grid className="hearth-sb-Placeholder" size="4" column="3 / -1" />
      <Grid className="hearth-sb-Placeholder" size="4" />
      <Grid className="hearth-sb-Placeholder" size={{ mobile: '4', tablet: '8', desktop: '4' }} />
    </Grid>
  ),
};

export const ResponsiveProps: Story = {
  args: {
    children: 'Responsive props',
    columns: {
      mobile: '4',
      tablet: '8',
      desktop: '12',
    },
  },
};
>>>>>>> edb494f (add `Grid` component)
