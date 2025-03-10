import type { Meta, StoryObj } from '@storybook/react';
import { BodyText, Flex, Strong } from '@utilitywarehouse/hearth-react';

const sizes = ['sm', 'md', 'lg'] as const;

const meta: Meta<typeof Strong> = {
  title: 'Stories / Strong',
  component: Strong,
  parameters: {
    docs: {
      description: {
        component:
          "The `Strong` component is based on the HTML `strong` element and is used to indicate text that is of strong importance, seriousness, or urgency. `Strong` should be wrapped in a `BodyText` component, and will inherit it's styles from it's parent. You can also use this component within the `Heading` component, however as `Heading` has only one font-weight there will be no visual distinction, and so this is discouraged.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Strong>;

export const KitchenSink: Story = {
  render: () => (
    <Flex direction="column" gap="100">
      {sizes.map(size => (
        <BodyText key={size} size={size}>
          The most important thing to remember is, <Strong>stay positive</Strong>.
        </BodyText>
      ))}
    </Flex>
  ),
};
