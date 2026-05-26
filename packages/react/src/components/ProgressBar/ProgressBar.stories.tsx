import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex/Flex';
import { ProgressBar } from './ProgressBar';
import { useState, useEffect } from 'react';
import { StoryGallery } from '../../docs/storybook-components/StoryGallery';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components / ProgressBar',
  component: ProgressBar,
  argTypes: {
    colorScheme: { control: { type: 'radio' }, options: ['default', 'success', 'danger'] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  args: {
    colorScheme: 'default',
    label: 'Label',
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Playground: Story = {
  tags: ['!test'],
  parameters: { chromatic: { disableSnapshot: true } },
  render: (args: { value?: number }) => {
    const [value, setValue] = useState(20);

    // Simulate changes
    useEffect(() => {
      const interval = setInterval(() => {
        setValue(current => Math.min(100, Math.round(current + Math.random() * 25)));
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    return (
      <Flex direction="column" gap="400" width="600px">
        <ProgressBar {...args} variant="linear" value={args.value || value} />
        <Flex gap="400">
          <ProgressBar {...args} variant="circular" value={args.value || value} size="md" />
          <ProgressBar {...args} variant="circular" value={args.value || value} size="sm" />
        </Flex>
      </Flex>
    );
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <Flex gap="800" backgroundColor="secondary" padding="300" alignItems="center">
        <ProgressBar variant="linear" label="Linear progress bar" value={30} />
        <ProgressBar variant="circular" label="circular" value={30} />
      </Flex>
    );
  },
};

export const ColorSchemes: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="400">
        <ProgressBar variant="linear" label="Upload progress" value={90} />
        <ProgressBar variant="linear" label="Completed tasks" colorScheme="success" value={100} />
        <ProgressBar variant="linear" label="Storage usage" colorScheme="danger" value={10} />
        <Flex gap="400">
          <ProgressBar variant="circular" label="Upload" value={90} />
          <ProgressBar variant="circular" label="Completed" colorScheme="success" value={100} />
          <ProgressBar variant="circular" label="Storage" colorScheme="danger" value={10} />
        </Flex>
      </Flex>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <Flex gap="400" alignItems="center" padding="300" backgroundColor="secondary">
        <ProgressBar variant="circular" label="circular" value={30} />
        <ProgressBar variant="circular" size="sm" label="circular" value={30} />
        <ProgressBar
          variant="circular"
          size={{ mobile: 'sm', desktop: 'md' }}
          label="responsive"
          value={30}
        />
      </Flex>
    );
  },
};

export const FormatValueText: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="400">
        <ProgressBar
          variant="linear"
          label="Storage usage"
          value={87}
          formatValueText={(value: number) => `${value / 10}GB / 10GB`}
        />

        <ProgressBar
          variant="circular"
          label="files"
          value={15}
          max={50}
          formatValueText={(value: number) => `${value}/50`}
        />
      </Flex>
    );
  },
};

export const HideLabel: Story = {
  render: () => {
    return <ProgressBar label="Hidden label" value={60} hideLabel />;
  },
};

export const Gallery: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => {
    const stories = {
      Variants,
      ColorSchemes,
      Sizes,
      FormatValueText,
      HideLabel,
    };
    return <StoryGallery meta={meta} stories={stories} />;
  },
};
