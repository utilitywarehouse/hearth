import type { Meta, StoryObj } from '@storybook/react';
import { Link, Flex } from '@utilitywarehouse/hearth-react';
import {
  DownloadSmallIcon,
  OpenSmallIcon,
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof Link> = {
  title: 'Stories / Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component:
          'Links are used to navigate a user to another page or website, another place on the same page, or to open a link in a new tab.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    href: { control: { type: 'text' } },
  },
  args: {
    children: 'Link',
    href: '#',
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Playground: Story = {};

export const WithIcons: Story = {
  render: args => (
    <Flex gap="600">
      <Link {...args}>
        Download Bill
        <DownloadSmallIcon />
      </Link>
      <Link {...args}>
        <ChevronLeftSmallIcon />
        Back to Dashboard
      </Link>
      <Link {...args}>
        Open in new tab
        <OpenSmallIcon />
      </Link>
    </Flex>
  ),
};

export const AsButton: Story = {
  render: () => (
    <Link asChild>
      <button onClick={() => alert('Hello world!')}>
        View UW services
        <ChevronRightSmallIcon />
      </button>
    </Link>
  ),
};

export const Inverted: Story = {
  render: args => (
    <Flex gap="400" backgroundColor="uwPurple" padding="400">
      <Link {...args} inverted>
        Inverted Link
      </Link>
    </Flex>
  ),
};

export const LengthyContent: Story = {
  render: args => (
    <Flex width="500px">
      <Link {...args}>{args.children}</Link>
    </Flex>
  ),
  args: {
    href: 'https://www.tate.org.uk/art/artists/agnes-martin-1583',
    children:
      'Agnes Bernice Martin was an American abstract painter known for her minimalist style and abstract expressionism.',
  },
};
