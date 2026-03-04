import { Meta, StoryObj } from '@storybook/react-native';
import type { ComponentProps } from 'react';
import { ProgressBar } from '.';
import { VariantTitle } from '../../../docs/components';
import { Box } from '../Box';

const meta = {
  title: 'Stories / ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      options: ['linear', 'circular'],
      control: 'select',
      description: 'The progress bar variant.',
    },
    colorScheme: {
      options: ['default', 'success', 'danger'],
      control: 'select',
      description: 'The color scheme for the progress indicator.',
    },
    size: {
      options: ['sm', 'md'],
      control: 'select',
      description: 'The circular size. Only applies to the circular variant.',
    },
  },
  args: {
    variant: 'linear',
    colorScheme: 'default',
    size: 'md',
    value: 35,
    min: 0,
    max: 100,
    label: 'Progress',
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;
type ProgressBarStoryArgs = ComponentProps<typeof ProgressBar>;

export const Playground: Story = {};

export const Variants: Story = {
  args: {
    value: 55,
    label: 'Downloads',
  },
  render: (args: ProgressBarStoryArgs) => (
    <Box gap="300" style={{ width: 260 }}>
      <VariantTitle title="Linear">
        <ProgressBar {...args} variant="linear" />
      </VariantTitle>
      <VariantTitle title="Circular">
        <ProgressBar {...args} variant="circular" />
      </VariantTitle>
    </Box>
  ),
};

export const ColorSchemes: Story = {
  args: {
    value: 72,
    label: 'Storage',
    variant: 'linear',
  },
  render: (args: ProgressBarStoryArgs) => (
    <Box gap="300" style={{ width: 260 }}>
      <VariantTitle title="Default">
        <ProgressBar {...args} colorScheme="default" />
      </VariantTitle>
      <VariantTitle title="Success">
        <ProgressBar {...args} colorScheme="success" />
      </VariantTitle>
      <VariantTitle title="Danger">
        <ProgressBar {...args} colorScheme="danger" />
      </VariantTitle>
    </Box>
  ),
};

export const CircularSizes: Story = {
  args: {
    value: 65,
    label: 'Usage',
    variant: 'circular',
  },
  render: (args: ProgressBarStoryArgs) => (
    <Box gap="300">
      <VariantTitle title="Small">
        <ProgressBar {...args} size="sm" />
      </VariantTitle>
      <VariantTitle title="Medium">
        <ProgressBar {...args} size="md" />
      </VariantTitle>
    </Box>
  ),
};

export const CustomValueLabels: Story = {
  args: {
    value: 68,
    max: 100,
    label: 'Data allowance',
    variant: 'linear',
    formatValueText: (value: number, { max }: { max: number }) => `${max - value}GB remaining`,
  },
  render: (args: ProgressBarStoryArgs) => (
    <Box style={{ width: 260 }}>
      <ProgressBar {...args} />
    </Box>
  ),
};
