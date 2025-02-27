import React, { FC, PropsWithChildren } from 'react';
import { List, ListItem, ListItemIcon, ListItemTrailingIcon } from '.';
import { Meta, StoryObj } from '@storybook/react';
import { VariantTitle } from '../../../docs/components';
import { SettingsMediumIcon } from '../../../docs/components/icons';
import { Flex } from '../Flex';
// import { Card } from '../Card';

const Card: FC<PropsWithChildren> = ({ children }) => <div>{children}</div>;

const meta = {
  title: 'Stories / List',
  component: List,
  argTypes: {
    container: {
      options: ['full', 'card'],
      control: 'select',
      description: 'The container variant to be displayed on the list.',
    },
    headingText: {
      control: 'text',
      description:
        'The heading text to be displayed on the list. \n _Note: This is a playground prop, use title on the ListHeading component._',
    },
    headingSupportingText: {
      control: 'text',
      description:
        'The heading supporting text to be displayed on the list. \n _Note: This is a playground prop, use _listItemSupportingText on the ListHeading component._',
    },
    divider: {
      control: 'boolean',
      description: 'Whether to display a divider below the list item.',
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
    headingText: 'This is the list heading',
    headingSupportingText: 'Supporting text',
    divider: true,
    disabled: false,
    loading: false,
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ container, divider, ...args }) => {
    const listItems = Array.from({ length: 4 }).map((_, index) => (
      <ListItem
        key={index}
        text="List item text"
        supportingText="Supporting text"
        divider={container === 'none' ? divider : divider && index !== 3}
      />
    ));
    return (
      <List {...args} container={container}>
        {container !== 'none' && <Card>{listItems}</Card>}
        {container === 'none' && listItems}
      </List>
    );
  },
};

export const KitchenSink: Story = {
  parameters: {
    controls: { include: [] },
  },
  render: () => {
    const list = [
      { text: 'List Item 1', supportingText: 'Supporting Text 1' },
      { text: 'List Item 2', supportingText: 'Supporting Text 2' },
      { text: 'List Item 3', supportingText: 'Supporting Text 3' },
    ];
    return (
      <Flex space="sm" direction="column" style={{ width: '100%' }}>
        <VariantTitle title="List with title and supporting text">
          <List headingText="List Heading" headingSupportingText="Supporting Text">
            {list.map((item, index) => (
              <ListItem key={index} text={item.text} supportingText={item.supportingText} />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List with leading content">
          <List>
            {list.map((item, index) => (
              <ListItem
                key={index}
                text={item.text}
                supportingText={item.supportingText}
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
                text={item.text}
                supportingText={item.supportingText}
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
                text={item.text}
                onPress={() => console.log('List Item Pressed')}
              />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List without divider">
          <List divider={false}>
            {list.map((item, index) => (
              <ListItem
                key={index}
                text={item.text}
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
                text={item.text}
                supportingText={item.supportingText}
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
                text={item.text}
                supportingText={item.supportingText}
                leadingContent={<ListItemIcon as={SettingsMediumIcon} />}
                onPress={() => console.log('List Item Pressed')}
              />
            ))}
          </List>
        </VariantTitle>
        <VariantTitle title="List with heading link">
          <List headingText="Heading" headingLinkText="View all" headingLinkHref="http://uw.co.uk">
            {list.map((item, index) => (
              <ListItem
                key={index}
                text={item.text}
                supportingText={item.supportingText}
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
