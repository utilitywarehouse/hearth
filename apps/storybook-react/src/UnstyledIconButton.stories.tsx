import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
  Heading,
  Card,
  Box,
  UnstyledIconButton,
  Flex,
  BodyText,
} from '@utilitywarehouse/hearth-react';
import { CloseMediumIcon, CloseSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const sizes = ['md', 'sm'] as const;

const meta: Meta<typeof UnstyledIconButton> = {
  title: 'Stories / UnstyledIconButton',
  component: UnstyledIconButton,
  argTypes: {
    children: { control: { type: 'text' } },
    size: { control: { type: 'radio' }, options: sizes },
    disabled: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof UnstyledIconButton>;

export default meta;
type Story = StoryObj<typeof UnstyledIconButton>;

export const Playground: Story = {
  render: args => (
    <Flex direction="column">
      <Box padding="200">
        <UnstyledIconButton {...args}>
          {args.size === 'sm' ? <CloseSmallIcon /> : <CloseMediumIcon />}
        </UnstyledIconButton>
      </Box>
      <Box padding="200" backgroundColor="purple700">
        <UnstyledIconButton {...args} inverted>
          {args.size === 'sm' ? <CloseSmallIcon /> : <CloseMediumIcon />}
        </UnstyledIconButton>
      </Box>
    </Flex>
  ),
};

export const WithCard: Story = {
  render: () => (
    <Box width="365px">
      <Card>
        <Flex direction="column" gap="150">
          <Flex justifyContent="between" alignItems="center">
            <Heading>This is a dismissable card</Heading>
            <UnstyledIconButton label="close" size="md">
              <CloseMediumIcon />
            </UnstyledIconButton>
          </Flex>
          <BodyText size="md">
            An Unstyled Icon Button has been used as a trigger for the dismissible action.
          </BodyText>
        </Flex>
      </Card>
    </Box>
  ),
};
