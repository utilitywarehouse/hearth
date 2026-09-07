import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { Card } from '../Card/Card';
import { CardActionButton } from './CardActionButton';
import { CardActions } from './CardActions';
import {
  HomeAndBoilerMediumIcon,
  HomeInsuranceMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof CardActions> = {
  title: 'Components / Card / CardActions',
  component: CardActions,
};

export default meta;
type Story = StoryObj<typeof CardActions>;

export const Playground: Story = {
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
