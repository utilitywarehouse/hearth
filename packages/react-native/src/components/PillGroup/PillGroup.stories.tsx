import { Meta, StoryObj } from '@storybook/react-vite';
import { HeartMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useState } from 'react';
import { PillGroup } from '.';
import { VariantTitle } from '../../../docs/components';
import { BodyText } from '../BodyText';
import { Flex } from '../Flex';
import { Pill } from './Pill';

const meta = {
  title: 'Stories / PillGroup',
  component: PillGroup,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PillGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    wrap: false,
    multiple: false,
    value: '2',
    children: <></>,
  },
  parameters: {
    controls: { exclude: ['value', 'onChange', 'style', 'children'] },
  },
  render: props => {
    const [value, setValue] = useState<string | string[]>(props.value || '');

    return (
      <PillGroup {...props} value={value} onChange={setValue}>
        <Pill value="1" label="All" />
        <Pill value="2" label="Energy" />
        <Pill value="3" label="Broadband" />
        <Pill value="4" label="Mobile" />
      </PillGroup>
    );
  },
};

export const PillStates: Story = {
  args: {
    value: '',
    children: <></>,
  },
  parameters: {
    controls: { exclude: ['value', 'onChange', 'multiple', 'wrap', 'style', 'children'] },
  },
  render: () => {
    const selectedValue = '2';

    return (
      <Flex spacing="xl" direction="column" align="center">
        <VariantTitle title="Unselected">
          <Flex direction="row" spacing="sm">
            <PillGroup value={selectedValue} onChange={() => {}}>
              <Pill value="1" label="Label" />
            </PillGroup>
          </Flex>
        </VariantTitle>
        <VariantTitle title="Selected">
          <Flex direction="row" spacing="sm">
            <PillGroup value={selectedValue} onChange={() => {}}>
              <Pill value="2" label="Label" />
            </PillGroup>
          </Flex>
        </VariantTitle>
        <VariantTitle title="With Icon - Unselected">
          <Flex direction="row" spacing="sm">
            <PillGroup value={selectedValue} onChange={() => {}}>
              <Pill value="1" label="New" icon={HeartMediumIcon} />
            </PillGroup>
          </Flex>
        </VariantTitle>
        <VariantTitle title="With Icon - Selected">
          <Flex direction="row" spacing="sm">
            <PillGroup value={selectedValue} onChange={() => {}}>
              <Pill value="2" label="New" icon={HeartMediumIcon} />
            </PillGroup>
          </Flex>
        </VariantTitle>
      </Flex>
    );
  },
};

export const WrapBehavior: Story = {
  args: {
    value: '',
    children: <></>,
  },
  parameters: {
    controls: { exclude: ['wrap', 'value', 'onChange', 'multiple'] },
  },
  render: () => {
    const [value1, setValue1] = useState<string>('2');
    const [value2, setValue2] = useState<string>('7');

    return (
      <Flex spacing="xl" direction="column" align="center">
        <VariantTitle title="Wrap: False">
          <PillGroup wrap={false} value={value1} onChange={setValue1}>
            <Pill value="1" label="New" />
            <Pill value="2" label="Some label" />
            <Pill value="3" label="Short" />
            <Pill value="4" label="Quite a long label" />
            <Pill value="5" label="Hmm, another label" />
          </PillGroup>
        </VariantTitle>
        <VariantTitle title="Wrap: True">
          <PillGroup wrap={true} value={value2} onChange={setValue2}>
            <Pill value="6" label="New" />
            <Pill value="7" label="Some label" />
            <Pill value="8" label="Short" />
            <Pill value="9" label="Quite a long label" />
            <Pill value="10" label="Hmm, another label" />
            <Pill value="11" label="Custom Range" />
            <Pill value="12" label="Last 7 Days" />
          </PillGroup>
        </VariantTitle>
      </Flex>
    );
  },
};

export const Multiple: Story = {
  args: {
    value: [],
    children: <></>,
  },
  parameters: {
    controls: { exclude: ['wrap', 'value', 'onChange', 'multiple'] },
  },
  render: () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['new', 'read']);

    return (
      <Flex spacing="lg" direction="column" align="center" style={{ maxWidth: 400 }}>
        <PillGroup wrap={true} multiple value={selectedCategories} onChange={setSelectedCategories}>
          <Pill value="unread" label="Unread" />
          <Pill value="new" label="New" icon={HeartMediumIcon} />
          <Pill value="favourites" label="My favourites" icon={HeartMediumIcon} />
          <Pill value="read" label="Read" />
          <Pill value="yesterday" label="Yesterday" />
          <Pill value="lastweek" label="Last Week" />
        </PillGroup>
        <BodyText>
          Selected: {selectedCategories.length}{' '}
          {selectedCategories.length === 1 ? 'category' : 'categories'}
        </BodyText>
      </Flex>
    );
  },
};
