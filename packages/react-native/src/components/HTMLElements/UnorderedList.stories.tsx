import { Meta, StoryObj } from '@storybook/react-native';
import { TickMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { primitive } from '@utilitywarehouse/hearth-tokens/js';
import { Image, View } from 'react-native';
import ListItem from './ListItem';
import UnorderedList from './UnorderedList';

const gap = {
  options: Object.keys(primitive.space),
  control: 'select',
  description: 'Gap between list items.',
};

const meta = {
  title: 'Stories / UnorderedList',
  component: UnorderedList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    gap,
  },
  args: {
    gap: '100',
    children: undefined,
  },
} satisfies Meta<typeof UnorderedList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ ...args }) => (
    <UnorderedList {...args}>
      <ListItem>List item 1</ListItem>
      <ListItem>List item 2</ListItem>
      <ListItem>List item 3</ListItem>
    </UnorderedList>
  ),
};

export const WithCustomGap: Story = {
  args: {
    gap: '400',
  },
  render: ({ ...args }) => (
    <UnorderedList {...args}>
      <ListItem>List item 1 with larger gap</ListItem>
      <ListItem>List item 2 with larger gap</ListItem>
      <ListItem>List item 3 with larger gap</ListItem>
    </UnorderedList>
  ),
};

export const WithCustomIcon: Story = {
  render: ({ ...args }) => {
    return (
      <UnorderedList
        {...args}
        listStyleIcon={TickMediumIcon}
        listStyleColour="feedbackDangerSurfaceDefault"
      >
        <ListItem>List item 1 with icon</ListItem>
        <ListItem>List item 2 with icon</ListItem>
        <ListItem>
          List item 3 with icon is a long example to test alignment, lorem ipsum dolor sit amet
        </ListItem>
      </UnorderedList>
    );
  },
};

export const WithCustomImage: Story = {
  render: ({ ...args }) => (
    <UnorderedList
      {...args}
      listStyleImage={
        <Image
          source={{ uri: 'https://placehold.co/20x20.png' }}
          style={{ width: 20, height: 20 }}
        />
      }
    >
      <ListItem>List item 1 with image</ListItem>
      <ListItem>List item 2 with image</ListItem>
    </UnorderedList>
  ),
};

export const WithIndividualItemOverride: Story = {
  render: ({ ...args }) => {
    const CheckIcon = (props: any) => (
      <View
        style={{
          width: props.width,
          height: props.height,
          backgroundColor: 'green',
          borderRadius: 10,
        }}
      />
    );
    return (
      <UnorderedList {...args}>
        <ListItem>Default bullet item</ListItem>
        <ListItem listStyleIcon={CheckIcon}>Success item</ListItem>
        <ListItem listStyleColour="blue600">Colored bullet item</ListItem>
      </UnorderedList>
    );
  },
};
