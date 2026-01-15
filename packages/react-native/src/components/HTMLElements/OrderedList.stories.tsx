import { Meta, StoryObj } from '@storybook/react-vite';
import { primitive } from '@utilitywarehouse/hearth-tokens/js';
import { View } from 'react-native';
import { InputType } from 'storybook/internal/types';
import { SpaceValue } from '../../types';
import ListItem from './ListItem';
import OrderedList from './OrderedList';

const gap: InputType = {
  options: Object.keys(primitive.space),
  control: 'select',
  description: 'Gap between list items.',
};

const meta = {
  title: 'Stories / OrderedList',
  component: OrderedList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: false }, // Children will be provided by the render function
    gap,
  },
  args: {
    gap: '100',
    children: undefined,
  },
} satisfies Meta<typeof OrderedList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <OrderedList {...args}>
      <ListItem>List item 1</ListItem>
      <ListItem>List item 2</ListItem>
      <ListItem>List item 3</ListItem>
    </OrderedList>
  ),
};

export const WithCustomGap: Story = {
  args: {
    gap: '400' as SpaceValue,
    children: undefined,
  },
  render: ({ ...args }) => (
    <OrderedList {...args}>
      <ListItem>List item 1 with larger gap</ListItem>
      <ListItem>List item 2 with larger gap</ListItem>
      <ListItem>List item 3 with larger gap</ListItem>
    </OrderedList>
  ),
};

export const WithColoredNumbers: Story = {
  render: ({ ...args }) => (
    <OrderedList {...args} listStyleColour="piggyPink300">
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
    </OrderedList>
  ),
};

export const WithIconOverride: Story = {
  render: ({ ...args }) => {
    const CustomIcon = (props: any) => (
      <View
        style={{
          width: props.width,
          height: props.height,
          backgroundColor: props.color || 'blue',
          borderRadius: 4,
        }}
      />
    );
    return (
      <OrderedList {...args} listStyleIcon={CustomIcon}>
        <ListItem>Item 1 (overridden)</ListItem>
        <ListItem>Item 2 (overridden)</ListItem>
      </OrderedList>
    );
  },
};
