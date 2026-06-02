import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { Link } from '../Link/Link';
import { SectionHeader } from './SectionHeader';
import { SettingsSmallIcon, ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof SectionHeader> = {
  title: 'Components / SectionHeader',
  component: SectionHeader,
  argTypes: {
    helperText: { control: { type: 'text' } },
    heading: { control: { type: 'text' } },
  },
  args: {
    heading: 'Section header',
    helperText: 'Helper text',
  },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Playground: Story = {
  render: args => {
    return (
      <Flex width="600px">
        <SectionHeader
          {...args}
          trailingContent={
            <Link>
              Link text
              <ChevronRightSmallIcon />
            </Link>
          }
        />
      </Flex>
    );
  },
};

export const ResponsiveDirection: Story = {
  args: { direction: { mobile: 'column', tablet: 'row' } },
  render: args => {
    return (
      <Flex width="600px">
        <SectionHeader
          {...args}
          trailingContent={
            <Button size="sm" variant="outline" colorScheme="functional">
              Mark all as attended
            </Button>
          }
        />
      </Flex>
    );
  },
};

export const WithBadge: Story = {
  render: args => {
    return (
      <Flex width="600px">
        <SectionHeader {...args} trailingContent={<Badge size="sm">Badge</Badge>} />
      </Flex>
    );
  },
};

export const WithButton: Story = {
  render: args => {
    return (
      <Flex width="600px">
        <SectionHeader
          {...args}
          trailingContent={
            <Button size="sm" variant="outline" colorScheme="functional">
              Button
            </Button>
          }
        />
      </Flex>
    );
  },
};

export const CustomLink: Story = {
  render: () => {
    return (
      <Flex gap="600" direction="column" width="600px">
        <SectionHeader
          heading="With link"
          helperText="Includes icon"
          trailingContent={
            <Link href="#">
              See more
              <ChevronRightSmallIcon />
            </Link>
          }
        />
        <SectionHeader
          heading="Different icon and placement"
          trailingContent={
            <Link href="#">
              <SettingsSmallIcon />
              Settings
            </Link>
          }
        />
      </Flex>
    );
  },
};

export const ValidationText: Story = {
  render: args => {
    return (
      <Flex width="600px">
        <SectionHeader {...args} />
      </Flex>
    );
  },
  args: {
    validationStatus: 'invalid',
    validationText: 'Validation text',
  },
};
