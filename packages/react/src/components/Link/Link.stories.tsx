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

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
    interactions: { disable: true },
  },
};

/** Set target to "_blank" to open the link in a new tab; use hideOpenIcon to suppress the external-link icon. */
export const OpenInNewTab: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { target: '_blank' },
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

/** Pass an icon as a child, before or after the label, to add a leading or trailing icon. */
export const WithIcons: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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

/** Use asChild to render Link's styles on a native button element instead of an anchor. */
export const AsButton: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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

/** Set inverted to use Link on a brand-colored background. */
export const Inverted: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Flex gap="400" backgroundColor="brand" padding="400">
      <Link {...args} inverted>
        Inverted Link
      </Link>
    </Flex>
  ),
};

/** Link wraps naturally onto multiple lines when its content is long. */
export const LengthyContent: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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
