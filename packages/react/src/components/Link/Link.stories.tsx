import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex/Flex';
import { Link } from './Link';
import type { LinkProps } from './Link.props';
import {
  DownloadSmallIcon,
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof Link> = {
  title: 'Components / Link',
  component: Link,
  argTypes: {
    children: { control: { type: 'text' } },
    href: { control: { type: 'text' } },
    target: { control: { type: 'text' } },
    hideOpenIcon: { control: { type: 'boolean' } },
  },
  args: {
    children: 'Link',
    href: '#',
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Playground: Story = {};

export const OpenInNewTab: Story = {
  args: {
    target: '_blank',
  },
  render: args => (
    <Flex gap="600">
      <Link {...args}>Visit help pages</Link>
      <Link {...args} hideOpenIcon>
        Go to help
        <ChevronRightSmallIcon />
      </Link>
    </Flex>
  ),
};

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
    </Flex>
  ),
};

export const AsButton: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="300">
        <Link asChild>
          <button onClick={() => alert('Hello world!')}>
            View UW services
            <ChevronRightSmallIcon />
          </button>
        </Link>
        <Link asChild>
          <button aria-disabled onClick={e => e.preventDefault()}>
            View UW services
            <ChevronRightSmallIcon />
          </button>
        </Link>
      </Flex>
    );
  },
};

export const Inverted: Story = {
  render: args => (
    <Flex gap="400" backgroundColor="brand" padding="400">
      <Link {...args} inverted>
        Inverted Link
      </Link>
    </Flex>
  ),
};

export const LengthyContent: Story = {
  args: {
    href: 'https://www.tate.org.uk/art/artists/agnes-martin-1583',
    children:
      'Agnes Bernice Martin was an American abstract painter known for her minimalist style and abstract expressionism.',
  },
  render: (args: Pick<LinkProps, 'children' | 'href'>) => (
    <Flex width="500px">
      <Link {...args}>{args.children}</Link>
    </Flex>
  ),
};
