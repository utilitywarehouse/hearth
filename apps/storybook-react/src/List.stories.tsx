import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Box,
  Flex,
  List,
  ListItem,
  ListItemContent,
  ListItemButton,
  ListItemLink,
  Badge,
  BodyText,
  DetailText,
  Link,
  IconContainer,
  Switch,
} from '@utilitywarehouse/hearth-react';
import {
  CashbackCardSmallIcon,
  ChevronRightSmallIcon,
  InfoMediumIcon,
  SettingsMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';
import { ListItemContentTransaction } from '@utilitywarehouse/hearth-react/src/index.js';

const meta: Meta<typeof List> = {
  title: 'Stories / List',
  component: List,
  parameters: {
    docs: {
      description: {
        component:
          'The `List` component is a flexible and customizable component for displaying a list of items. It supports various visual variants, color schemes, and additional features like helper text and links.',
      },
    },
  },
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
        link={
          <Link href="#">
            Link
            <ChevronRightSmallIcon />
          </Link>
        }
      >
        <ListItem>List item</ListItem>
        <ListItem aria-label="list item">
          <ListItemContent heading="List item" helperText="Helper text" />
        </ListItem>
        <ListItem aria-label="list item button">
          <ListItemButton
            heading="List item button"
            helperText="Helper text"
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem aria-label="list item button">
          <ListItemButton
            heading="List item button"
            helperText="Helper text"
            leadingContent={<SettingsMediumIcon />}
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem aria-label="list item link">
          <ListItemLink
            heading="List item link"
            helperText="Helper text"
            leadingContent={<SettingsMediumIcon />}
            href="#"
          />
        </ListItem>
        <ListItem aria-label="list item link">
          <ListItemLink heading="List item as link" href="#" />
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
        <Flex gap="400">
          {(['neutralStrong', 'neutralSubtle'] as const).map(colorScheme => (
            <Box width="300px">
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

export const AllListItems: Story = {
  render: args => (
    <Box width="400px">
      <List
        {...args}
        link={
          <Link href="#">
            Link
            <ChevronRightSmallIcon />
          </Link>
        }
      >
        <ListItem>List item</ListItem>
        <ListItem aria-label="list item">
          <ListItemContent heading="List item content" helperText="with helper text" />
        </ListItem>
        <ListItem aria-label="list item">
          <ListItemContent
            heading="List item content"
            helperText="with leading icon"
            leadingContent={<InfoMediumIcon />}
          />
        </ListItem>
        <ListItem aria-label="list item">
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
        <ListItem aria-label="list item">
          <ListItemContent
            heading="List item content"
            helperText="with trailing switch"
            trailingContent={<Switch aria-label="list item switch" size="sm" />}
          />
        </ListItem>
        <ListItem aria-label="list item">
          <ListItemContent
            heading="List item content"
            helperText="with trailing link"
            trailingContent={<Link href="#">Link</Link>}
          />
        </ListItem>
        <ListItem aria-label="list item button">
          <ListItemButton
            heading="List item button"
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem aria-label="list item button">
          <ListItemButton
            heading="List item button"
            helperText="with helper text"
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem aria-label="list item button">
          <ListItemButton
            heading="List item button"
            helperText="with leading icon"
            leadingContent={<SettingsMediumIcon />}
            onClick={() => console.log('clickety click')}
          />
        </ListItem>
        <ListItem aria-label="list item button">
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
        <ListItem aria-label="list item link">
          <ListItemLink heading="List item as link" href="#" />
        </ListItem>
        <ListItem aria-label="list item link">
          <ListItemLink heading="List item link" helperText="with helper text" href="#" />
        </ListItem>
        <ListItem aria-label="list item link">
          <ListItemLink
            heading="List item link"
            helperText="with with leading icon"
            leadingContent={<SettingsMediumIcon />}
            href="#"
          />
        </ListItem>
        <ListItem aria-label="list item link">
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
            heading="List item content"
            helperText="Helper text"
            trailingContent={<ListItemContentTransaction debit="100.00" credit="1.00 CB" />}
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

export const CustomContent: Story = {
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
          <ListItem
            aria-label={`${event.date.month} ${event.date.day} - ${event.title} - ${event.location}`}
          >
            <Flex direction="column" width="44px" textAlign="center">
              <BodyText size="md">{event.date.month}</BodyText>
              <DetailText size="2xl">{event.date.day}</DetailText>
            </Flex>
            <Flex direction="column" alignItems="start" gap="100" width="100%">
              <Badge colorScheme={event.type.includes('Buzz') ? 'positive' : 'info'} size="sm">
                {event.type}
              </Badge>
              <ListItemButton heading={event.title} helperText={event.location} />
            </Flex>
          </ListItem>
        ))}
      </List>
    );
  },
  args: { heading: undefined, helperText: undefined },
};
