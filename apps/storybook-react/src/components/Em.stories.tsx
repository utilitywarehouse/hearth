import type { Meta, StoryObj } from '@storybook/react-vite';
import { BodyText, Em, Flex } from '@utilitywarehouse/hearth-react';

const sizes = ['sm', 'md', 'lg'] as const;

const meta: Meta<typeof Em> = {
  title: 'Stories / Em',
  component: Em,
  parameters: {
    docs: {
      description: {
        component:
          'The `Em` component is based on the HTML `em` element and is used to indicate text that has stress emphasis. `Em` should be wrapped in a `Text` component, and will inherit the parent styles. It should __not__ be used within the `Heading` component, as this will result in invalid HTML.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Em>;

export const KitchenSink: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <Flex direction="column" gap="100">
      {sizes.map(size => (
        <BodyText key={size} size={size}>
          We <Em>had</Em> to do something about it.
        </BodyText>
      ))}
    </Flex>
  ),
};
