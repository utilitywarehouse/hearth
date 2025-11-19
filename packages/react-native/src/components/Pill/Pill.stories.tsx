import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { HeartMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Pill } from '.';
import { VariantTitle } from '../../../docs/components';
import { Flex } from '../Flex';

const meta = {
  title: 'Stories / Pill',
  component: Pill,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: 'Label',
    selected: false,
  },
  render: props => {
    const [selected, setSelected] = useState(props.selected);
    return <Pill {...props} selected={selected} onPress={() => setSelected(!selected)} />;
  },
};

export const States: Story = {
  args: {
    label: 'Label',
    selected: false,
  },
  parameters: {
    controls: { exclude: ['label', 'icon', 'selected'] },
  },
  render: () => {
    const [selected1, setSelected1] = useState(false);
    const [selected2, setSelected2] = useState(true);
    const [selected3, setSelected3] = useState(false);
    const [selected4, setSelected4] = useState(true);

    return (
      <Flex space="xl" direction="column" align="center">
        <VariantTitle title="Unselected">
          <Flex direction="row" space="sm">
            <Pill label="Label" selected={selected1} onPress={() => setSelected1(!selected1)} />
          </Flex>
        </VariantTitle>
        <VariantTitle title="Selected">
          <Flex direction="row" space="sm">
            <Pill label="Label" selected={selected2} onPress={() => setSelected2(!selected2)} />
          </Flex>
        </VariantTitle>
        <VariantTitle title="With Icon - Unselected">
          <Flex direction="row" space="sm">
            <Pill
              label="New"
              icon={HeartMediumIcon}
              selected={selected3}
              onPress={() => setSelected3(!selected3)}
            />
          </Flex>
        </VariantTitle>
        <VariantTitle title="With Icon - Selected">
          <Flex direction="row" space="sm">
            <Pill
              label="New"
              icon={HeartMediumIcon}
              selected={selected4}
              onPress={() => setSelected4(!selected4)}
            />
          </Flex>
        </VariantTitle>
      </Flex>
    );
  },
};
