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
import { CloseMediumIcon, CloseSmallIcon } from '@utilitywarehouse/react-icons';

const meta: Meta<typeof UnstyledIconButton> = {
  title: 'Stories / UnstyledIconButton',
  component: UnstyledIconButton,
  argTypes: {
    children: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof UnstyledIconButton>;

export default meta;
type Story = StoryObj<typeof UnstyledIconButton>;

export const Playground: Story = {
  render: args => (
    <UnstyledIconButton {...args}>
      <CloseSmallIcon />
    </UnstyledIconButton>
  ),
};

export const WithCard: Story = {
  render: () => (
    <Box width="365px">
      <Card>
        <Flex direction="column" gap="150">
          <Flex justify="space-between" align="center">
            <Heading>This is a dismissable card</Heading>
            <UnstyledIconButton label="close">
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
