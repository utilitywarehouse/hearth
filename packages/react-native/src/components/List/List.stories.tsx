import { Meta, StoryObj } from '@storybook/react-vite';
import { SettingsMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { FC, PropsWithChildren } from 'react';
import { List, ListAction, ListItem, ListItemIcon, ListItemTrailingIcon } from '.';
import { VariantTitle } from '../../../docs/components';
import { Flex } from '../Flex';
import { Link } from '../Link';
// import { Card } from '../Card';

const Card: FC<PropsWithChildren> = ({ children }) => <div>{children}</div>;

const meta = {
  title: 'Stories / List',
  component: List,
  argTypes: {
    container: {
      options: ['none', 'subtleWhite', 'subtleWarmWhite', 'emphasisWhite', 'emphasisWarmWhite'],
      control: 'select',
      description: 'The container variant to be displayed on the list.',
    },
    heading: {
      control: 'text',
      description:
        'The heading text to be displayed on the list. \n _Note: This is a playground prop, use heading on the SectionHeader component._',
    },
    helperText: {
      control: 'text',
      description:
        'The heading supporting text to be displayed on the list. \n _Note: This is a playground prop, use helperText on the SectionHeader component._',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the list item is disabled.',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the list item is in a loading state.',
    },
  },
  args: {
    container: 'none',
    heading: 'This is the list heading',
    helperText: 'Supporting text',
    disabled: false,
    loading: false,
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ container, ...args }) => {
    return (
      <List {...args} container={container}>
        {Array.from({ length: 4 }).map((_, index) => (
          <ListItem key={index} heading="List item text" helperText="Supporting text" />
        ))}
      </List>
    );
  },
};

export const WithAction: Story = {
  args: {
    container: 'subtleWhite',
  },
  render: ({ container, ...args }) => (
    <List {...args} container={container}>
      {Array.from({ length: 4 }).map((_, index) => (
        <ListItem key={index} heading="List item text" helperText="Supporting text" />
      ))}
      <ListAction heading="List action" onPress={() => console.log('List Action Pressed')} />
    </List>
  ),
};

export const KitchenSink: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    const list = [
      { text: 'List Item 1', helperText: 'Supporting Text 1' },
      { text: 'List Item 2', helperText: 'Supporting Text 2' },
      { text: 'List Item 3', helperText: 'Supporting Text 3' },
    ];
    return (
      <Flex space="sm" direction="column" style={{ width: '100%' }}>
        <VariantTitle title="List with title and supporting text">
          <List heading="List Heading" helperText="Supporting Text">
            {list.map((item, index) => (
              <ListItem key={index} heading={item.text} helperText={item.helperText} />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List with leading content">
          <List>
            {list.map((item, index) => (
              <ListItem
                key={index}
                heading={item.text}
                helperText={item.helperText}
                leadingContent={<ListItemIcon as={SettingsMediumIcon} />}
              />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List with trailing content">
          <List>
            {list.map((item, index) => (
              <ListItem
                key={index}
                heading={item.text}
                helperText={item.helperText}
                trailingContent={<ListItemTrailingIcon as={SettingsMediumIcon} />}
              />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List with pressable items">
          <List>
            {list.map((item, index) => (
              <ListItem
                key={index}
                heading={item.text}
                onPress={() => console.log('List Item Pressed')}
              />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List with disabled items">
          <List disabled>
            {list.map((item, index) => (
              <ListItem
                key={index}
                heading={item.text}
                helperText={item.helperText}
                leadingContent={<ListItemIcon as={SettingsMediumIcon} />}
                onPress={() => console.log('List Item Pressed')}
              />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List with loading items">
          <List loading>
            {list.map((item, index) => (
              <ListItem
                key={index}
                heading={item.text}
                helperText={item.helperText}
                leadingContent={<ListItemIcon as={SettingsMediumIcon} />}
                onPress={() => console.log('List Item Pressed')}
              />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List with heading link">
          <List
            heading="Heading"
            headerTrailingContent={<Link href="http://uw.co.uk">View all</Link>}
          >
            {list.map((item, index) => (
              <ListItem
                key={index}
                heading={item.text}
                helperText={item.helperText}
                leadingContent={<ListItemIcon as={SettingsMediumIcon} />}
                onPress={() => console.log('List Item Pressed')}
              />
            ))}
          </List>
        </VariantTitle>
      </Flex>
    );
  },
};
