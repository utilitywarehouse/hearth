import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { Card } from '../Card/Card';
import { CardActionButton } from './CardActionButton';
import { ElectricityMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof CardActionButton> = {
  title: 'Components / Card / CardActionButton',
  component: CardActionButton,
  argTypes: {
    heading: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    heading: 'Electricity',
    helperText: 'Last reading: 30th Oct',
  },
};

export default meta;
type Story = StoryObj<typeof CardActionButton>;

export const Playground: Story = {
  render: args => (
    <Card width="300px">
      <CardActionButton
        {...args}
        leadingIcon={<ElectricityMediumIcon />}
        leadingIconContainerColorScheme="energy"
        badge={
          <Badge colorScheme="info" size="sm">
            Smart meter
          </Badge>
        }
        badgePlacement="middle"
      />
    </Card>
  ),
};
