import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { Card } from '../Card/Card';
import { CardActionButton } from './CardActionButton';
import { CardActions } from './CardActions';
import {
  HomeAndBoilerMediumIcon,
  HomeInsuranceMediumIcon,
  MoneyMediumIcon,
  QuestionMarkMediumIcon,
  TickCircleSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';
import { CardContent } from '../Card/CardContent';
import { Heading } from '../Heading/Heading';
import { Flex } from '../Flex/Flex';
import { DetailText } from '../DetailText/DetailText';
import { BodyText } from '../BodyText/BodyText';
import { CardActionLink } from './CardActionLink';

const meta: Meta<typeof CardActions> = {
  title: 'Components / Card / CardActions',
  component: CardActions,
};

export default meta;
type Story = StoryObj<typeof CardActions>;

/** Use direction to lay out a list of CardActionButtons in a column instead of a row. */
export const Playground: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Card width="500px">
      <CardActions {...args} direction="column">
        <CardActionButton
          leadingIcon={<HomeInsuranceMediumIcon />}
          leadingIconContainerColorScheme="insurance"
          heading="Home insurance"
          helperText="B12ABCD34"
          badge={
            <Badge size="sm" colorScheme="positive">
              Live
            </Badge>
          }
          badgePlacement="right"
        />
        <CardActionButton
          disabled
          leadingIcon={<HomeAndBoilerMediumIcon />}
          leadingIconContainerColorScheme="insurance"
          heading="Boiler & home cover"
          helperText="B12ABCD37"
          badge={
            <Badge size="sm" colorScheme="positive">
              Live
            </Badge>
          }
          badgePlacement="right"
        />
      </CardActions>
    </Card>
  ),
};

/** Use direction to lay out a list of CardActionButtons in a column instead of a row. */
export const WithLongText: Story = {
  name: 'CardAction with long text',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  globals: { viewport: { value: 'mobile' } },
  render: args => (
    <Card variant="emphasis" colorScheme="neutralStrong">
      <CardContent direction="column" gap={{ mobile: '200', tablet: '150' }} paddingBottomNone>
        <Heading size="md" as="h2">
          Monthly energy payment
        </Heading>
        <Flex
          direction={{ mobile: 'column', tablet: 'row' }}
          gap={{ mobile: '100', tablet: '200' }}
          alignItems={{ mobile: 'start', tablet: 'center' }}
        >
          <DetailText size="4xl">£173.00</DetailText>
          <Flex gap="50" alignItems="center">
            <TickCircleSmallIcon />
            <BodyText size="md">Matches our recommended £173.00</BodyText>
          </Flex>
        </Flex>
        <BodyText size="md">Applied from June bill (covering usage in May)</BodyText>
      </CardContent>
      <CardActions direction={{ mobile: 'column', tablet: 'row' }}>
        <CardActionButton
          disabled
          heading="Adjust payment"
          leadingIcon={<MoneyMediumIcon />}
          leadingIconContainerColorScheme="energy"
        />
        <CardActionLink
          heading="How we worked out your recommended amount"
          leadingIcon={<QuestionMarkMediumIcon />}
          leadingIconContainerColorScheme="energy"
        />
      </CardActions>
    </Card>
  ),
};
