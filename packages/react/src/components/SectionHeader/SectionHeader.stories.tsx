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

/** Kitchen sink example showing all props in use, including a Link as trailingContent. */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => {
    return (
      <Flex width="600px" gap="400" direction="column">
        <SectionHeader
          {...args}
          trailingContent={
            <Link>
              Link text
              <ChevronRightSmallIcon />
            </Link>
          }
        />
        <SectionHeader {...args} trailingContent={<Badge size="sm">Badge</Badge>} />
        <SectionHeader
          {...args}
          trailingContent={
            <Button size="sm" variant="outline" colorScheme="functional">
              Button
            </Button>
          }
        />
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
        <SectionHeader {...args} validationStatus="invalid" validationText="Validation text" />
      </Flex>
    );
  },
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
    interactions: { disable: true },
  },
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

/** Set direction to a responsive value to switch between row and column layout per breakpoint. */
export const ResponsiveDirection: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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

/** Pass a Badge as trailingContent to flag status alongside the heading. */
export const WithBadge: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => {
    return (
      <Flex width="600px">
        <SectionHeader {...args} trailingContent={<Badge size="sm">Badge</Badge>} />
      </Flex>
    );
  },
};

/** Pass a Button as trailingContent for a primary action tied to the section. */
export const WithButton: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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

/** Pass a Link as trailingContent, with the icon placed before or after the label. */
export const CustomLink: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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

/** Set validationStatus and validationText to surface a validation message. */
export const ValidationText: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: {
    validationStatus: 'invalid',
    validationText: 'Validation text',
  },
  render: args => {
    return (
      <Flex width="600px">
        <SectionHeader {...args} />
      </Flex>
    );
  },
};
