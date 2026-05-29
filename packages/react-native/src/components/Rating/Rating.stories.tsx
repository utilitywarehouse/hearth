import { Meta, StoryObj } from '@storybook/react-native';
import type { ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import { Rating } from '.';
import { VariantTitle } from '../../../docs/components';
import { Box } from '../Box';

type RatingStoryProps = ComponentProps<typeof Rating>;

const meta = {
  title: 'Stories / Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 5, step: 1 },
    },
    defaultValue: {
      control: { type: 'number', min: 0, max: 5, step: 1 },
    },
    labels: {
      control: 'object',
    },
    rangeLabels: {
      control: 'object',
    },
    hideLabel: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    variant: {
      options: ['stars', 'emojis'],
      control: 'radio',
    },
  },
  args: {
    value: 3,
    hideLabel: false,
    disabled: false,
    variant: 'stars',
  },
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ value: initialValue, onChange, ...args }: RatingStoryProps) => {
    const [value, setValue] = useState(initialValue ?? 0);

    useEffect(() => {
      setValue(initialValue ?? 0);
    }, [initialValue]);

    return (
      <Rating
        {...args}
        value={value}
        onChange={nextValue => {
          setValue(nextValue);
          onChange?.(nextValue);
        }}
      />
    );
  },
};

export const Variants: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => (
    <Box gap="300">
      <VariantTitle title="Default">
        <Rating value={3} />
      </VariantTitle>
      <VariantTitle title="Custom Labels">
        <Rating
          value={4}
          labels={{
            0: 'Not rated',
            1: 'Terrible',
            2: 'Poor',
            3: 'OK',
            4: 'Great',
            5: 'Outstanding',
          }}
        />
      </VariantTitle>
      <VariantTitle title="Hidden Label">
        <Rating value={2} hideLabel />
      </VariantTitle>
      <VariantTitle title="Disabled">
        <Rating value={5} disabled />
      </VariantTitle>
      <VariantTitle title="Emojis">
        <Rating value={4} variant="emojis" />
      </VariantTitle>
      <VariantTitle title="Emojis (No Selection)">
        <Rating value={0} variant="emojis" />
      </VariantTitle>
      <VariantTitle title="Emojis (Disabled)">
        <Rating value={3} variant="emojis" disabled />
      </VariantTitle>
    </Box>
  ),
};
