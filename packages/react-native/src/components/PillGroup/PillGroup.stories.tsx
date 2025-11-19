import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { HeartMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { PillGroup } from '.';
import { Pill } from '../Pill';
import { VariantTitle } from '../../../docs/components';
import { BodyText } from '../BodyText';
import { Flex } from '../Flex';
import { Heading } from '../Heading';

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
    children: <></>,
  },
  render: props => {
    const [selectedPills, setSelectedPills] = useState<string[]>(['2']);

    const togglePill = (id: string) => {
      setSelectedPills(prev =>
        prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
      );
    };

    return (
      <PillGroup {...props}>
        <Pill
          label="All"
          selected={selectedPills.includes('1')}
          onPress={() => togglePill('1')}
        />
        <Pill
          label="Energy"
          selected={selectedPills.includes('2')}
          onPress={() => togglePill('2')}
        />
        <Pill
          label="Broadband"
          selected={selectedPills.includes('3')}
          onPress={() => togglePill('3')}
        />
        <Pill
          label="Mobile"
          selected={selectedPills.includes('4')}
          onPress={() => togglePill('4')}
        />
      </PillGroup>
    );
  },
};

export const WrapBehavior: Story = {
  args: {
    wrap: false,
    children: <></>,
  },
  parameters: {
    controls: { exclude: ['wrap'] },
  },
  render: () => {
    const [selectedPills, setSelectedPills] = useState<string[]>(['2']);

    const togglePill = (id: string) => {
      setSelectedPills(prev =>
        prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
      );
    };

    return (
      <Flex space="xl" direction="column" align="center">
        <VariantTitle title="Wrap: False">
          <PillGroup wrap={false}>
            <Pill
              label="New"
              selected={selectedPills.includes('1')}
              onPress={() => togglePill('1')}
            />
            <Pill
              label="Some label"
              selected={selectedPills.includes('2')}
              onPress={() => togglePill('2')}
            />
            <Pill
              label="Short"
              selected={selectedPills.includes('3')}
              onPress={() => togglePill('3')}
            />
            <Pill
              label="Quite a long label"
              selected={selectedPills.includes('4')}
              onPress={() => togglePill('4')}
            />
            <Pill
              label="Hmm, another label"
              selected={selectedPills.includes('5')}
              onPress={() => togglePill('5')}
            />
          </PillGroup>
        </VariantTitle>
        <VariantTitle title="Wrap: True">
          <PillGroup wrap={true}>
            <Pill
              label="New"
              selected={selectedPills.includes('6')}
              onPress={() => togglePill('6')}
            />
            <Pill
              label="Some label"
              selected={selectedPills.includes('7')}
              onPress={() => togglePill('7')}
            />
            <Pill
              label="Short"
              selected={selectedPills.includes('8')}
              onPress={() => togglePill('8')}
            />
            <Pill
              label="Quite a long label"
              selected={selectedPills.includes('9')}
              onPress={() => togglePill('9')}
            />
            <Pill
              label="Hmm, another label"
              selected={selectedPills.includes('10')}
              onPress={() => togglePill('10')}
            />
            <Pill
              label="Custom Range"
              selected={selectedPills.includes('11')}
              onPress={() => togglePill('11')}
            />
            <Pill
              label="Last 7 Days"
              selected={selectedPills.includes('12')}
              onPress={() => togglePill('12')}
            />
          </PillGroup>
        </VariantTitle>
      </Flex>
    );
  },
};

export const FilterExample: Story = {
  args: {
    wrap: true,
    children: <></>,
  },
  parameters: {
    controls: { exclude: ['wrap'] },
  },
  render: () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['new', 'read']);

    const toggleCategory = (id: string) => {
      setSelectedCategories(prev =>
        prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
      );
    };

    return (
      <Flex space="lg" direction="column" align="center" style={{ maxWidth: 400 }}>
        <Heading size="md">Filter Options</Heading>
        <BodyText>Select categories to filter your content</BodyText>
        <PillGroup wrap={true}>
          <Pill
            label="All"
            selected={selectedCategories.includes('all')}
            onPress={() => toggleCategory('all')}
          />
          <Pill
            label="New"
            icon={HeartMediumIcon}
            selected={selectedCategories.includes('new')}
            onPress={() => toggleCategory('new')}
          />
          <Pill
            label="My favourites"
            icon={HeartMediumIcon}
            selected={selectedCategories.includes('favourites')}
            onPress={() => toggleCategory('favourites')}
          />
          <Pill
            label="Read"
            selected={selectedCategories.includes('read')}
            onPress={() => toggleCategory('read')}
          />
          <Pill
            label="Yesterday"
            selected={selectedCategories.includes('yesterday')}
            onPress={() => toggleCategory('yesterday')}
          />
          <Pill
            label="Last Week"
            selected={selectedCategories.includes('lastweek')}
            onPress={() => toggleCategory('lastweek')}
          />
        </PillGroup>
        <BodyText>
          Selected: {selectedCategories.length}{' '}
          {selectedCategories.length === 1 ? 'category' : 'categories'}
        </BodyText>
      </Flex>
    );
  },
};
