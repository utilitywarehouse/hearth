import type { Meta, StoryObj } from '@storybook/react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  RadioTile,
} from '../src/components/Radio';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Radio',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

const Cell = ({ children }: { children: ReactNode }) => (
  <View style={{ width: '48%' }}>{children}</View>
);

/** Radio: selected, disabled, validation and tile variants. */
export const States: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Radio">
        <Cell>
          <RadioGroup value="a" onValueChange={noop}>
            <Radio value="a" label="Selected" />
            <Radio value="b" label="Unselected" />
          </RadioGroup>
        </Cell>
        <Cell>
          <RadioGroup value="a" onValueChange={noop} disabled>
            <Radio value="a" label="Disabled on" />
            <Radio value="b" label="Disabled" />
          </RadioGroup>
        </Cell>
        <Cell>
          <RadioGroup value="a" onValueChange={noop} validationStatus="valid">
            <Radio value="a" label="Valid" validText="Valid text" />
          </RadioGroup>
        </Cell>
        <Cell>
          <RadioGroup value="b" onValueChange={noop} validationStatus="invalid">
            <Radio value="a" label="Invalid" invalidText="Invalid text" />
          </RadioGroup>
        </Cell>
      </VTRow>
      <VTRow label="Radio tile">
        <View style={{ width: '100%' }}>
          <RadioGroup value="a" onValueChange={noop} type="tile" direction="row">
            <Radio value="a" label="Tile on" />
            <Radio value="b" label="Tile" />
          </RadioGroup>
        </View>
      </VTRow>
    </VTGrid>
  ),
};

/** Radio built from its child parts: RadioIndicator, RadioIcon, RadioLabel and RadioTile. */
export const Advanced: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Radio child parts">
        <Cell>
          <RadioGroup value="a" onValueChange={noop}>
            <Radio value="a" aria-label="Selected">
              <RadioIndicator>
                <RadioIcon />
              </RadioIndicator>
              <RadioLabel>Selected</RadioLabel>
            </Radio>
            <Radio value="b" aria-label="Unselected">
              <RadioIndicator>
                <RadioIcon />
              </RadioIndicator>
              <RadioLabel>Unselected</RadioLabel>
            </Radio>
          </RadioGroup>
        </Cell>
        <Cell>
          <RadioGroup value="a" onValueChange={noop} disabled>
            <Radio value="a" aria-label="Disabled on">
              <RadioIndicator>
                <RadioIcon />
              </RadioIndicator>
              <RadioLabel>Disabled on</RadioLabel>
            </Radio>
            <Radio value="b" aria-label="Disabled">
              <RadioIndicator>
                <RadioIcon />
              </RadioIndicator>
              <RadioLabel>Disabled</RadioLabel>
            </Radio>
          </RadioGroup>
        </Cell>
      </VTRow>
      <VTRow label="Radio tile child parts">
        <View style={{ width: '100%' }}>
          <RadioGroup value="a" onValueChange={noop} type="tile">
            <Radio value="a" aria-label="Tile on">
              <RadioIndicator>
                <RadioIcon />
              </RadioIndicator>
              <RadioLabel>Tile on</RadioLabel>
            </Radio>
            <RadioTile value="b" aria-label="Tile">
              <RadioIndicator>
                <RadioIcon />
              </RadioIndicator>
              <RadioLabel>Tile</RadioLabel>
            </RadioTile>
          </RadioGroup>
        </View>
      </VTRow>
    </VTGrid>
  ),
};
