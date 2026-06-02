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

export const Playground: Story = {
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

export const KitchenSink: Story = {
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

export const PaddingNone: Story = {
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

export const LeadingContent: Story = {
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

export const TrailingContent: Story = {
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

export const CustomTrailingContent: Story = {
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

export const AllListItems: Story = {
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
  args: {
    variant: 'subtle',
    colorScheme: 'neutralSubtle',
  },
};

export const ListItemContents: Story = {
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
  args: { variant: 'emphasis', colorScheme: 'neutralSubtle' },
};

export const ListItemContentWithSwitch: Story = {
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
  args: { variant: 'emphasis', colorScheme: 'neutralStrong', heading: '', helperText: '' },
};

export const ListItemContentWithLink: Story = {
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
  args: { variant: 'emphasis', colorScheme: 'neutralStrong', heading: '', helperText: '' },
};

export const ListItemContentWithTransaction: Story = {
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
  args: { variant: 'emphasis', colorScheme: 'neutralStrong', heading: '', helperText: '' },
};

export const ListItemContentWithBadge: Story = {
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
  args: { variant: 'emphasis', colorScheme: 'neutralStrong', heading: '', helperText: '' },
};

export const ListItemButtons: Story = {
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
  args: { variant: 'emphasis', colorScheme: 'neutralSubtle' },
};

export const ListItemLinks: Story = {
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
  args: { variant: 'emphasis', colorScheme: 'neutralSubtle' },
};

export const ListActions: Story = {
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
  args: { variant: 'emphasis', colorScheme: 'neutralSubtle' },
};

export const CustomContent: Story = {
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
