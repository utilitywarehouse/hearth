import { Meta, StoryObj } from '@storybook/react-native';
import { Card } from '.';
import { BodyText } from '../BodyText';
import { Button } from '../Button';
import { Heading } from '../Heading';
import CardPressHandler from './CardPressHandler';

const meta: Meta<typeof CardPressHandler> = {
  title: 'Stories / CardPressHandler',
  component: CardPressHandler,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CardPressHandler>;

export const Playground: Story = {
  render: () => (
    <Card
      variant="emphasis"
      colorScheme="neutralSubtle"
      spacing="md"
      flexDirection="column"
      alignItems="stretch"
    >
      <Heading size="md">Heading</Heading>
      <BodyText>
        Wraps a child in a Card so it can inherit the Card&apos;s press handler instead of the
        Card becoming pressable itself.
      </BodyText>
      <CardPressHandler>
        <Button onPress={() => console.log('pressed')}>Press me</Button>
      </CardPressHandler>
    </Card>
  ),
};
