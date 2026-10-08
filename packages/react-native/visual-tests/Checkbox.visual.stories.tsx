import type { Meta, StoryObj } from '@storybook/react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxTile,
} from '../src/components/Checkbox';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Checkbox',
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

/** Checkbox: default, disabled, validation and tile variants. */
export const States: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Checkbox">
        <Cell>
          <Checkbox value="a" label="Unchecked" checked={false} onChange={noop} />
        </Cell>
        <Cell>
          <Checkbox value="b" label="Checked" checked onChange={noop} />
        </Cell>
        <Cell>
          <Checkbox value="c" label="Disabled" checked={false} disabled onChange={noop} />
        </Cell>
        <Cell>
          <Checkbox value="d" label="Disabled on" checked disabled onChange={noop} />
        </Cell>
      </VTRow>
      <VTRow label="Checkbox validation">
        <Cell>
          <Checkbox
            value="e"
            label="Valid"
            checked
            validationStatus="valid"
            validText="Valid text"
            onChange={noop}
          />
        </Cell>
        <Cell>
          <Checkbox
            value="f"
            label="Invalid"
            checked={false}
            validationStatus="invalid"
            invalidText="Invalid text"
            onChange={noop}
          />
        </Cell>
      </VTRow>
      <VTRow label="Checkbox tile">
        <Cell>
          <Checkbox type="tile" value="g" label="Tile" checked={false} onChange={noop} />
        </Cell>
        <Cell>
          <Checkbox type="tile" value="h" label="Tile on" checked onChange={noop} />
        </Cell>
        <Cell>
          <Checkbox type="tile" value="i" label="Disabled" checked disabled onChange={noop} />
        </Cell>
        <Cell>
          <Checkbox
            type="tile"
            value="j"
            label="Invalid"
            checked={false}
            validationStatus="invalid"
            onChange={noop}
          />
        </Cell>
      </VTRow>
    </VTGrid>
  ),
};

/** Checkbox built from its child parts: CheckboxIndicator, CheckboxIcon, CheckboxLabel, CheckboxTile and CheckboxGroup. */
export const Advanced: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Checkbox child parts">
        <Cell>
          <Checkbox value="a" aria-label="Unchecked" checked={false} onChange={noop}>
            <CheckboxIndicator>
              <CheckboxIcon />
            </CheckboxIndicator>
            <CheckboxLabel>Unchecked</CheckboxLabel>
          </Checkbox>
        </Cell>
        <Cell>
          <Checkbox value="b" aria-label="Checked" checked onChange={noop}>
            <CheckboxIndicator>
              <CheckboxIcon />
            </CheckboxIndicator>
            <CheckboxLabel>Checked</CheckboxLabel>
          </Checkbox>
        </Cell>
        <Cell>
          <Checkbox value="c" aria-label="Disabled on" checked disabled onChange={noop}>
            <CheckboxIndicator>
              <CheckboxIcon />
            </CheckboxIndicator>
            <CheckboxLabel>Disabled on</CheckboxLabel>
          </Checkbox>
        </Cell>
        <Cell>
          <CheckboxTile value="d" aria-label="Tile on" checked onChange={noop}>
            <CheckboxIndicator>
              <CheckboxIcon />
            </CheckboxIndicator>
            <CheckboxLabel>Tile on</CheckboxLabel>
          </CheckboxTile>
        </Cell>
      </VTRow>
      <VTRow label="Checkbox group child parts">
        <View style={{ width: '100%' }}>
          <CheckboxGroup
            aria-label="Fruit"
            label="Which fruit do you enjoy?"
            value={['apple']}
            onValueChange={noop}
          >
            <Checkbox value="apple" aria-label="Apple">
              <CheckboxIndicator>
                <CheckboxIcon />
              </CheckboxIndicator>
              <CheckboxLabel>Apple</CheckboxLabel>
            </Checkbox>
            <Checkbox value="banana" aria-label="Banana">
              <CheckboxIndicator>
                <CheckboxIcon />
              </CheckboxIndicator>
              <CheckboxLabel>Banana</CheckboxLabel>
            </Checkbox>
          </CheckboxGroup>
        </View>
      </VTRow>
    </VTGrid>
  ),
};
