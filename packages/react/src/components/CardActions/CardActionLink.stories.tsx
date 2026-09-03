import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { Card } from '../Card/Card';
import { CardActionLink } from './CardActionLink';
import { ElectricityMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof CardActionLink> = {
  title: 'Components / Card / CardActionLink',
  component: CardActionLink,
  argTypes: {
    heading: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
  },
  args: {
    heading: 'Electricity',
    helperText: 'Last reading: 30th Oct',
    href: '#',
  },
};

export default meta;
type Story = StoryObj<typeof CardActionLink>;

export const Playground: Story = {
  render: args => (
    <Card width="300px">
      <CardActionLink
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
