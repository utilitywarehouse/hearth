import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../Avatar/Avatar';
import { Badge } from '../Badge/Badge';
import { BodyText } from '../BodyText/BodyText';
import { Box } from '../Box/Box';
import { DetailText } from '../DetailText/DetailText';
import { Flex } from '../Flex/Flex';
import { IconContainer } from '../IconContainer/IconContainer';
import { Link } from '../Link/Link';
import { Switch } from '../Switch/Switch';
import { List } from './List';
import { ListActionButton } from './ListActionButton';
import { ListActionLink } from './ListActionLink';
import { ListItem } from './ListItem';
import { ListItemButton } from './ListItemButton';
import { ListItemContent } from './ListItemContent';
import { ListItemLink } from './ListItemLink';
import {
  CashbackCardSmallIcon,
  ChevronRightSmallIcon,
  InfoMediumIcon,
  SettingsMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof List> = {
  title: 'Components / List',
  component: List,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [undefined, 'subtle', 'emphasis'],
    },
    as: {
      control: { type: 'radio' },
      options: ['ul', 'ol'],
    },
    colorScheme: {
      control: { type: 'radio' },
      options: [undefined, 'neutralStrong', 'neutralSubtle'],
    },
    headingElement: {
      control: { type: 'radio' },
      options: ['div', 'h1', 'h2', 'h3', 'h4'],
    },
  },
  args: {
    heading: 'List',
    headingElement: 'h1',
    helperText: 'Helper text',
    variant: undefined,
    colorScheme: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof List>;

/** Visual matrix of List variants and color schemes. */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Flex direction="column" gap="600">
      <Box width="300px">
        <List {...args}>
          <ListItem>List item</ListItem>
          <ListItem>List item</ListItem>
          <ListItem>List item</ListItem>
          <ListItem>List item</ListItem>
          <ListItem>List item</ListItem>
        </List>
      </Box>
      {(['subtle', 'emphasis'] as const).map(variant => (
        <Flex key={variant} gap="400">
          {(['neutralStrong', 'neutralSubtle'] as const).map(colorScheme => (
            <Box key={colorScheme} width="300px">
              <List
                {...args}
                key={`${variant}${colorScheme}`}
                variant={variant}
                colorScheme={colorScheme}
              >
                <ListItem>List item</ListItem>
                <ListItem>List item</ListItem>
                <ListItem>List item</ListItem>
                <ListItem>List item</ListItem>
                <ListItem>List item</ListItem>
              </List>
            </Box>
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Box width="400px">
      <List
        {...args}
        trailingContent={
          <Link href="#">
            Link
            <ChevronRightSmallIcon />
          </Link>
        }
      >
        <ListItem>List item</ListItem>
        <ListItem>
          <ListItemContent heading="List item" helperText="Helper text" />
        </ListItem>
        <ListItem>
          <ListItemButton
            heading="List item button"
            helperText="Helper text"
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem>
          <ListItemButton
            heading="List item button"
            helperText="Helper text"
            leadingContent={<SettingsMediumIcon />}
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem>
          <ListItemButton
            disabled
            heading="List item disabled button"
            helperText="Helper text"
            leadingContent={<SettingsMediumIcon />}
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem>
          <ListItemLink heading="List item as link" href="#" />
        </ListItem>
        <ListItem>
          <ListItemLink
            heading="List item link"
            helperText="Helper text"
            leadingContent={<SettingsMediumIcon />}
            href="#"
          />
        </ListItem>
        <ListItem>
          <ListActionButton>List action</ListActionButton>
        </ListItem>
        <ListItem>
          <ListActionButton disabled>Disabled list action</ListActionButton>
        </ListItem>
      </List>
    </Box>
  ),
  args: {
    variant: 'emphasis',
    colorScheme: 'neutralStrong',
  },
};

/** Set paddingNone to remove List's outer padding. */
export const PaddingNone: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Flex gap="400">
      <List {...args} paddingNone>
        <ListItem>List item</ListItem>
        <ListItem>
          <ListItemContent heading="List item" helperText="Helper text" />
        </ListItem>
        <ListItem>
          <ListItemButton
            heading="List item button"
            helperText="Helper text"
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem>
          <ListItemLink heading="List item as link" href="#" />
        </ListItem>
      </List>

      {(['subtle', 'emphasis'] as const).map(variant => (
        <List {...args} key={variant} variant={variant} colorScheme="neutralStrong" paddingNone>
          <ListItem>List item</ListItem>
          <ListItem>
            <ListItemContent heading="List item" helperText="Helper text" />
          </ListItem>
          <ListItem>
            <ListItemButton
              heading="List item button"
              helperText="Helper text"
              onClick={() => console.log('clickety click')}
            />
          </ListItem>
          <ListItem>
            <ListItemLink heading="List item as link" href="#" />
          </ListItem>
        </List>
      ))}
    </Flex>
  ),
};

/** Set leadingContent on ListItemContent to show an icon, IconContainer, or Avatar before the heading. */
export const LeadingContent: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: {
    heading: 'Leading Content',
    helperText: '',
    variant: 'subtle',
    colorScheme: 'neutralSubtle',
  },
  render: args => (
    <Box width="400px">
      <List {...args}>
        <ListItem>
          <ListItemContent heading="Icon leading content" leadingContent={<InfoMediumIcon />} />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="Icon leading content"
            helperText="Helper text"
            leadingContent={<InfoMediumIcon />}
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="Icon container leading content"
            leadingContent={
              <IconContainer variant="subtle" colorScheme="cashback" size="sm">
                <CashbackCardSmallIcon />
              </IconContainer>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="Icon container leading content"
            helperText="Helper text"
            leadingContent={
              <IconContainer variant="subtle" colorScheme="cashback" size="sm">
                <CashbackCardSmallIcon />
              </IconContainer>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemContent heading="Avatar leading content" leadingContent={<Avatar size="sm" />} />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="Avatar leading content"
            helperText="Helper text"
            leadingContent={<Avatar size="sm" />}
          />
        </ListItem>
      </List>
    </Box>
  ),
};

/** Set trailingContent on ListItemContent to show an icon, Switch, Link, or transaction amount after the heading. */
export const TrailingContent: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: {
    heading: 'Trailing Content',
    helperText: '',
    variant: 'subtle',
    colorScheme: 'neutralSubtle',
  },
  render: args => (
    <Box width="400px">
      <List {...args}>
        <ListItem>
          <ListItemContent
            heading="Trailing content"
            helperText="With custom icon"
            trailingContent={<InfoMediumIcon />}
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="Trailing content"
            helperText="With Switch"
            trailingContent={<Switch aria-label="list item switch" size="sm" />}
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="Trailing content"
            helperText="With Link"
            trailingContent={<Link href="#">Link</Link>}
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="Transaction trailing content"
            helperText="With multiple transactions"
            trailingContent={
              <Flex direction="column">
                <BodyText size="md" as="span">
                  -£100.00
                </BodyText>
                <BodyText size="md" as="span" style={{ color: 'var(--h-text-brand)' }}>
                  +£1.00 CB
                </BodyText>
              </Flex>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="Transaction trailing content"
            helperText="With a single transaction"
            trailingContent={
              <Flex>
                <BodyText size="md" as="span" style={{ color: 'var(--h-text-affirmative)' }}>
                  +£10.00
                </BodyText>
              </Flex>
            }
          />
        </ListItem>
      </List>
    </Box>
  ),
};

/** trailingContent accepts arbitrary custom content, such as multiple actions. */
export const CustomTrailingContent: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: {
    heading: 'Custom Trailing Content',
    helperText: '',
    variant: 'emphasis',
    colorScheme: 'neutralStrong',
  },
  render: args => {
    return (
      <Box width="800px">
        <List {...args}>
          <ListItem>
            <ListItemContent
              heading="February 2026"
              helperText="£100"
              trailingContent={
                <Flex alignItems="center" columnGap="400">
                  <Link asChild>
                    <button type="button">Download PDF</button>
                  </Link>
                  <Link asChild>
                    <button type="button">Open PDF</button>
                  </Link>
                </Flex>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemContent
              heading="March 2026"
              helperText="£100"
              trailingContent={
                <Flex alignItems="center" columnGap="400">
                  <Link asChild>
                    <button type="button">Download PDF</button>
                  </Link>
                  <Link asChild>
                    <button type="button">Open PDF</button>
                  </Link>
                </Flex>
              }
            />
          </ListItem>
        </List>
      </Box>
    );
  },
};

/** Every ListItemContent, ListItemButton, and ListItemLink variant combined in a single List. */
export const AllListItems: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: {
    variant: 'subtle',
    colorScheme: 'neutralSubtle',
  },
  render: args => (
    <Box width="400px">
      <List
        {...args}
        trailingContent={
          <Link href="#">
            Link
            <ChevronRightSmallIcon />
          </Link>
        }
      >
        <ListItem>List item</ListItem>
        <ListItem>
          <ListItemContent heading="List item content" helperText="with helper text" />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="List item content"
            helperText="with leading icon"
            leadingContent={<InfoMediumIcon />}
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="List item content"
            helperText="with leading icon container"
            leadingContent={
              <IconContainer variant="subtle" colorScheme="cashback" size="sm">
                <CashbackCardSmallIcon />
              </IconContainer>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="List item content"
            helperText="with trailing switch"
            trailingContent={<Switch aria-label="list item switch" size="sm" />}
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="List item content"
            helperText="with trailing link"
            trailingContent={<Link href="#">Link</Link>}
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="List item content"
            helperText="with trailing transaction"
            trailingContent={
              <Flex height="100%" direction="column" alignItems="end">
                <BodyText size="md" as="span">
                  -£100.00
                </BodyText>
                <BodyText size="md" as="span" style={{ color: 'var(--h-text-brand)' }}>
                  +£1.00 CB
                </BodyText>
              </Flex>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="List item content"
            helperText="With single trailing transaction"
            trailingContent={
              <>
                <BodyText size="md" as="span" style={{ color: 'var(--h-text-affirmative)' }}>
                  +£10.00
                </BodyText>
              </>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemButton
            heading="List item button"
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem>
          <ListItemButton
            heading="List item button"
            helperText="with helper text"
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem>
          <ListItemButton
            heading="List item button"
            helperText="with leading icon"
            leadingContent={<SettingsMediumIcon />}
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem>
          <ListItemButton
            heading="List item button"
            helperText="with leading icon container"
            leadingContent={
              <IconContainer variant="subtle" colorScheme="cashback" size="sm">
                <CashbackCardSmallIcon />
              </IconContainer>
            }
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem>
          <ListItemLink heading="List item as link" href="#" />
        </ListItem>
        <ListItem>
          <ListItemLink heading="List item link" helperText="with helper text" href="#" />
        </ListItem>
        <ListItem>
          <ListItemLink
            heading="List item link"
            helperText="with with leading icon"
            leadingContent={<SettingsMediumIcon />}
            href="#"
          />
        </ListItem>
        <ListItem>
          <ListItemLink
            heading="List item link"
            helperText="with with leading icon container"
            leadingContent={
              <IconContainer variant="subtle" colorScheme="cashback" size="sm">
                <CashbackCardSmallIcon />
              </IconContainer>
            }
            href="#"
          />
        </ListItem>
      </List>
    </Box>
  ),
};

/** A List made entirely of static ListItemContent items. */
export const ListItemContents: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { variant: 'emphasis', colorScheme: 'neutralSubtle' },
  render: args => (
    <Box width="300px">
      <List {...args}>
        <ListItem>
          <ListItemContent
            heading="List item content"
            leadingContent={<SettingsMediumIcon />}
            helperText="Helper text"
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="List item content"
            leadingContent={<SettingsMediumIcon />}
            helperText="Helper text"
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="List item content"
            leadingContent={<SettingsMediumIcon />}
            helperText="Helper text"
          />
        </ListItem>
      </List>
    </Box>
  ),
};

/** A List made entirely of ListItemLink items with long text. */
export const LongListItemContents: Story = {
  name: 'ListItemLinks with long text',
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { variant: 'emphasis', colorScheme: 'neutralSubtle' },
  globals: { viewport: { value: 'mobile' } },
  render: () => {
    const BUDGET_PLAN_SUPPORT_LIST_COPY = {
      HEADING: 'Need help?',
      ARTICLES: [
        {
          title: 'Why has my budget plan payment changed?',
          href: 'https://help.uw.co.uk/article/energy/about_my_bill/why-has-my-budget-plan-payment-changed',
        },
        {
          title: 'Why do I only see one balance and payment?',
          href: 'https://help.uw.co.uk/article/energy/about_my_bill/your-new-look-energy-budget-plan',
        },
        {
          title: "Fixed tariff vs budget plan - what's the difference?",
          href: 'https://help.uw.co.uk/article/energy/fixed-tariff-vs-budget-plan-whats-the-difference',
        },
        {
          title: 'What is a budget plan reconciliation?',
          href: 'https://help.uw.co.uk/article/energy/about_my_bill/what-is-a-budget-plan-reconciliation',
        },
        {
          title: 'How do I set up, cancel or review my budget-plan?',
          href: 'https://help.uw.co.uk/article/energy/about_my_bill/how-do-i-set-up-cancel-or-review-my-budget-plan',
        },
      ],
    };

    return (
      <Box width="300px">
        <List heading={BUDGET_PLAN_SUPPORT_LIST_COPY.HEADING} headingElement="h2">
          {BUDGET_PLAN_SUPPORT_LIST_COPY.ARTICLES.map(article => (
            <ListItem key={article.href}>
              <ListItemLink heading={article.title} href={article.href} target="_blank" />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  },
};

/** Pass a Switch as trailingContent to make a list item toggleable. */
export const ListItemContentWithSwitch: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { variant: 'emphasis', colorScheme: 'neutralStrong', heading: '', helperText: '' },
  render: args => (
    <Box width="300px">
      <List {...args}>
        <ListItem>
          <ListItemContent
            heading="List item content"
            helperText="Helper text"
            trailingContent={<Switch aria-label="list item switch" size="sm" />}
          />
        </ListItem>
      </List>
    </Box>
  ),
};

/** Pass a Link as trailingContent to make a list item navigable. */
export const ListItemContentWithLink: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { variant: 'emphasis', colorScheme: 'neutralStrong', heading: '', helperText: '' },
  render: args => (
    <Box width="300px">
      <List {...args}>
        <ListItem>
          <ListItemContent
            heading="List item content"
            helperText="Helper text"
            trailingContent={<Link href="#">Link</Link>}
          />
        </ListItem>
      </List>
    </Box>
  ),
};

/** Compose trailingContent with BodyText to show transaction amounts, e.g. for a billing or spend history list. */
export const ListItemContentWithTransaction: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { variant: 'emphasis', colorScheme: 'neutralStrong', heading: '', helperText: '' },
  render: args => (
    <Box width="300px">
      <List {...args}>
        <ListItem>
          <ListItemContent
            heading="Boots"
            helperText="5:30pm"
            trailingContent={
              <Flex direction="column" alignItems="end">
                <BodyText size="md" as="span">
                  -£100.00
                </BodyText>
                <BodyText size="md" as="span" color="brand">
                  +£1.00 CB
                </BodyText>
              </Flex>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="Top-up"
            helperText="4:00pm"
            trailingContent={
              <Flex alignSelf="start">
                <BodyText size="md" as="span" color="affirmative">
                  +£10.00
                </BodyText>
              </Flex>
            }
          />
        </ListItem>
      </List>
    </Box>
  ),
};

/** Set badge on ListItemContent, optionally with badgePlacement="top", to show a status Badge. */
export const ListItemContentWithBadge: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { variant: 'emphasis', colorScheme: 'neutralStrong', heading: '', helperText: '' },
  render: args => (
    <Box width="300px">
      <List {...args}>
        <ListItem>
          <ListItemContent
            heading="List item content"
            helperText="Helper text"
            badge={<Badge size="sm">Badge</Badge>}
          />
        </ListItem>
        <ListItem>
          <ListItemContent
            heading="List item content"
            helperText="Helper text"
            badgePlacement="top"
            badge={
              <Badge size="sm" marginBottom="100">
                Badge
              </Badge>
            }
          />
        </ListItem>
      </List>
    </Box>
  ),
};

/** A List made entirely of interactive ListItemButton items. */
export const ListItemButtons: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { variant: 'emphasis', colorScheme: 'neutralSubtle' },
  render: args => (
    <Box width="300px">
      <List {...args}>
        <ListItem>
          <ListItemButton heading="List item button" />
        </ListItem>
        <ListItem>
          <ListItemButton heading="List item button" />
        </ListItem>
        <ListItem>
          <ListItemButton heading="List item button" />
        </ListItem>
        <ListItem>
          <ListItemButton heading="List item button" />
        </ListItem>
        <ListItem>
          <ListItemButton heading="List item button" />
        </ListItem>
      </List>
    </Box>
  ),
};

/** A List made entirely of navigable ListItemLink items. */
export const ListItemLinks: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { variant: 'emphasis', colorScheme: 'neutralSubtle' },
  render: args => (
    <Box width="300px">
      <List {...args}>
        <ListItem>
          <ListItemLink heading="List item link" />
        </ListItem>
        <ListItem>
          <ListItemLink heading="List item link" />
        </ListItem>
        <ListItem>
          <ListItemLink heading="List item link" />
        </ListItem>
        <ListItem>
          <ListItemLink heading="List item link" />
        </ListItem>
        <ListItem>
          <ListItemLink heading="List item link" />
        </ListItem>
      </List>
    </Box>
  ),
};

/** Use ListActionLink or ListActionButton as the final item to append a standalone list-level action. */
export const ListActions: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { variant: 'emphasis', colorScheme: 'neutralSubtle' },
  render: args => (
    <Flex gap="400" width="700px">
      <List {...args}>
        <ListItem>
          <ListItemButton
            heading="List item"
            helperText="Helper text"
            leadingContent={<SettingsMediumIcon />}
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem>
          <ListItemButton
            heading="List item"
            helperText="Helper text"
            leadingContent={<SettingsMediumIcon />}
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem>
          <ListItemButton
            heading="List item"
            helperText="Helper text"
            leadingContent={<SettingsMediumIcon />}
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem>
          <ListActionLink href="#">List action link</ListActionLink>
        </ListItem>
      </List>

      <List {...args}>
        <ListItem>
          <ListItemButton
            heading="List item"
            helperText="Helper text"
            leadingContent={<SettingsMediumIcon />}
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem>
          <ListItemButton
            heading="List item"
            helperText="Helper text"
            leadingContent={<SettingsMediumIcon />}
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem>
          <ListItemButton
            heading="List item"
            helperText="Helper text"
            leadingContent={<SettingsMediumIcon />}
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem>
          <ListActionButton>List action button</ListActionButton>
        </ListItem>
      </List>
    </Flex>
  ),
};

/** List items can render arbitrary custom content instead of the built-in item components. */
export const CustomContent: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  args: { heading: undefined, helperText: undefined },
  render: args => {
    const events = [
      {
        date: { month: 'Nov', day: '27' },
        type: 'Buzz Event',
        title: 'Newcastle Buzz Event',
        location: 'Newcastle Upon Tyne',
      },
      {
        date: { month: 'Nov', day: '27' },
        type: 'Buzz Event',
        title: 'Barnsley Buzz Event',
        location: 'Barnsley',
      },
      {
        date: { month: 'Nov', day: '28' },
        type: 'Training & Insights',
        title: 'Networking Masterclass',
        location: 'Virtual',
      },
      {
        date: { month: 'Nov', day: '30' },
        type: 'Training & Insights',
        title: 'Leading with Cashback Webinar',
        location: 'Virtual',
      },
    ];
    return (
      <List {...args} aria-label="Partner events">
        {events.map(event => (
          <ListItem key={event.title}>
            <Flex direction="column" width="44px" textAlign="center">
              <BodyText size="md">{event.date.month}</BodyText>
              <DetailText size="2xl">{event.date.day}</DetailText>
            </Flex>

            <ListItemButton
              heading={event.title}
              helperText={event.location}
              badgePlacement="top"
              badge={
                <Badge
                  colorScheme={event.type.includes('Buzz') ? 'positive' : 'info'}
                  size="sm"
                  marginBottom="100"
                >
                  {event.type}
                </Badge>
              }
            />
          </ListItem>
        ))}
      </List>
    );
  },
};
