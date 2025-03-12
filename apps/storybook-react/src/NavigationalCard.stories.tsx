import type { Meta, StoryObj } from '@storybook/react';
import { NavigationalCard } from '@utilitywarehouse/hearth-react';

const variants = ['emphasis', 'subtle'] as const;
const colorSchemes = ['white', 'warmWhite'] as const;

const meta: Meta<typeof NavigationalCard> = {
  title: 'Stories / NavigationalCard',
  component: NavigationalCard,
  parameters: {
    docs: {
      description: {
        component:
          'Links are used to navigate a user to another page or website, another place on the same page, or to open a link in a new tab.',
      },
    },
  },
  argTypes: {
    variant: { control: { type: 'radio' }, options: variants },
    colorScheme: { control: { type: 'radio' }, options: colorSchemes },
    title: { control: { type: 'text' } },
    content: { control: { type: 'text' } },
    href: { control: { type: 'text' } },
    linkLabel: { control: { type: 'text' } },
  },
  args: {
    variant: 'subtle',
    colorScheme: 'warmWhite',
    title: 'Refer a friend and save money',
    content: 'Tell your friends about UW and save up to £50 off your bill',
    linkLabel: 'Find out more',
    href: '#',
    width: '390px',
  },
};

export default meta;
type Story = StoryObj<typeof NavigationalCard>;

export const Playground: Story = {};
