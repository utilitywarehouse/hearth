import type { Meta, StoryObj } from '@storybook/react-vite';
import { BodyText } from '../BodyText/BodyText';
import { DetailText } from '../DetailText/DetailText';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { Card } from './Card';
import { CardContent } from './CardContent';
import { TickCircleSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof CardContent> = {
  title: 'Components / Card / CardContent',
  component: CardContent,
};

export default meta;
type Story = StoryObj<typeof CardContent>;

export const Playground: Story = {
  render: args => (
    <Card width="fit-content">
      <CardContent {...args} direction="column" spacing="lg">
        <Heading size="md" as="h2">
          Your December bill
        </Heading>
        <Flex direction="column" spacing="sm">
          <DetailText size="4xl">£110.00</DetailText>
          <Flex gap="50" alignItems="center">
            <TickCircleSmallIcon />
            <BodyText size="md">Your Direct Debit is ready to go</BodyText>
          </Flex>
        </Flex>
      </CardContent>
    </Card>
  ),
};
