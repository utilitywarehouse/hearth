import { Meta, StoryObj } from '@storybook/react-native';
import { ComponentProps } from 'react';
import { VariantTitle } from '../../../docs/components';
import { Flex } from '../Flex';
import { Roundel } from './';

const meta: Meta<typeof Roundel> = {
  title: 'Stories / Roundel',
  component: Roundel,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['success', 'pending', 'error'],
    },
  },
  args: {
    variant: 'success',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: ComponentProps<typeof Roundel>) => <Roundel {...args} />,
};

export const Variants: Story = {
  parameters: {
    controls: { exclude: ['variant'] },
  },
  render: () => (
    <Flex direction="column" spacing="md" alignItems="center">
      <VariantTitle title="Success">
        <Roundel variant="success" />
      </VariantTitle>
      <VariantTitle title="Pending">
        <Roundel variant="pending" />
      </VariantTitle>
      <VariantTitle title="Error">
        <Roundel variant="error" />
      </VariantTitle>
    </Flex>
  ),
};
