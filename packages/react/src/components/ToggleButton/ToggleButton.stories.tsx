import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { BodyText } from '../BodyText/BodyText';
import { Box } from '../Box/Box';
import { DetailText } from '../DetailText/DetailText';
import { Divider } from '../Divider/Divider';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { ToggleGroup } from '../ToggleGroup/ToggleGroup';
import { ToggleButton } from './ToggleButton';

const meta: Meta<typeof ToggleButton> = {
  title: 'Components / ToggleButton',
  component: ToggleButton,
  argTypes: {
    children: { control: { type: 'text' } },
  },
  args: {
    value: 'one',
    children: 'Label',
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true }, chromatic: { disableSnapshot: false } },
  render: () => (
    <Flex direction="column" gap="200">
      <BodyText as="p" size="md" weight="semibold">
        Unselected
      </BodyText>
      <ToggleGroup type="single" gap="200">
        <ToggleButton value="one">Label</ToggleButton>
        <ToggleButton value="two">Label</ToggleButton>
        <ToggleButton value="three">Label</ToggleButton>
      </ToggleGroup>
      <BodyText as="p" size="md" weight="semibold">
        Selected
      </BodyText>
      <ToggleGroup type="single" defaultValue="one" gap="200">
        <ToggleButton value="one">Label</ToggleButton>
        <ToggleButton value="two">Label</ToggleButton>
        <ToggleButton value="three">Label</ToggleButton>
      </ToggleGroup>
    </Flex>
  ),
};

export const Playground: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: args => (
    <ToggleGroup type="single" gap="200">
      <ToggleButton {...args} value="one" />
      <ToggleButton {...args} value="two" />
      <ToggleButton {...args} value="three" />
    </ToggleGroup>
  ),
};

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" gap="200">
      {['One', 'Two', 'Three', 'Four'].map(label => (
        <ToggleButton key={label} value={label.toLowerCase()}>
          {label}
        </ToggleButton>
      ))}
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" gap="200">
      {['One', 'Two', 'Three', 'Four'].map(label => (
        <ToggleButton key={label} value={label.toLowerCase()}>
          {label}
        </ToggleButton>
      ))}
    </ToggleGroup>
  ),
};

const tariffs = [
  {
    id: 'fixed',
    name: 'Fixed',
    price: '£163.00',
    description: 'Lock in your energy rates until December 2025',
  },
  {
    id: 'variable',
    name: 'Variable',
    price: '£153.00',
    description: 'Rates that move with the market — could go up or down',
  },
  {
    id: 'green',
    name: 'Green',
    price: '£171.00',
    description: '100% renewable electricity matched to your usage',
  },
];

export const TariffComparison: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => {
    const [selected, setSelected] = useState<string>('fixed');
    return (
      <Box maxWidth="800px">
        <ToggleGroup
          type="single"
          value={selected}
          onValueChange={(value: string) => {
            if (value) setSelected(value);
          }}
          gap="300"
        >
          {tariffs.map(tariff => (
            <Flex key={tariff.id} direction="column" gap="200" flex="1">
              <Flex direction="row" gap="100" alignItems="baseline">
                <DetailText size="3xl">{tariff.price}</DetailText>
                <BodyText size="md" color="secondary" as="span">
                  /month est.
                </BodyText>
              </Flex>
              <Heading size="sm" as="h3">
                {tariff.name}
              </Heading>
              <BodyText as="p" size="md">
                {tariff.description}
              </BodyText>
              <Divider />
              <ToggleButton value={tariff.id} style={{ width: '100%' }}>
                {selected === tariff.id ? 'Selected plan' : 'Select plan'}
              </ToggleButton>
            </Flex>
          ))}
        </ToggleGroup>
      </Box>
    );
  },
};

export const InsideGrid: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('fixed');
    return (
      <Box maxWidth="800px">
        <ToggleGroup
          type="single"
          value={selected}
          onValueChange={(value: string) => {
            if (value) setSelected(value);
          }}
          gap="300"
          direction={{ mobile: 'column', tablet: 'row' }}
        >
          {tariffs.map(tariff => (
            <Flex key={tariff.id} direction="column" gap="200" flex="1">
              <Heading size="sm" as="h3">
                {tariff.name}
              </Heading>
              <DetailText size="3xl">{tariff.price}</DetailText>
              <ToggleButton value={tariff.id}>
                {selected === tariff.id ? 'Selected' : 'Select'}
              </ToggleButton>
            </Flex>
          ))}
        </ToggleGroup>
      </Box>
    );
  },
};
