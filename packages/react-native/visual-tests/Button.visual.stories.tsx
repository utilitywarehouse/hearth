import type { Meta, StoryObj } from '@storybook/react-native';
import { Button } from '../src/components/Button';
import { VTGrid, VTInvertedStrip, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Button',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const Solid = () => (
  <VTGrid>
    <VTRow label="Emphasis">
      <Button variant="emphasis" text="Emphasis" />
    </VTRow>
    <VTRow label="Solid highlight">
      <Button text="Highlight" />
    </VTRow>
    <VTRow label="Solid affirmative">
      <Button colorScheme="affirmative" text="Affirmative" />
    </VTRow>
    <VTRow label="Solid destructive">
      <Button colorScheme="destructive" text="Destructive" />
    </VTRow>
  </VTGrid>
);

export const Variants: Story = { render: () => <Solid /> };

export const VariantsDark: Story = {
  parameters: { colorMode: 'dark' },
  render: () => <Solid />,
};

export const OutlineAndGhost: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Functional">
        <Button variant="outline" colorScheme="functional" text="Outline" />
        <Button variant="ghost" colorScheme="functional" text="Ghost" />
      </VTRow>
      <VTRow label="Affirmative">
        <Button variant="outline" colorScheme="affirmative" text="Outline" />
        <Button variant="ghost" colorScheme="affirmative" text="Ghost" />
      </VTRow>
      <VTRow label="Destructive">
        <Button variant="outline" colorScheme="destructive" text="Outline" />
        <Button variant="ghost" colorScheme="destructive" text="Ghost" />
      </VTRow>
    </VTGrid>
  ),
};

export const States: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Disabled">
        <Button disabled text="Solid" />
        <Button disabled variant="outline" colorScheme="functional" text="Outline" />
      </VTRow>
      <VTRow label="Loading">
        <Button loading text="Loading" />
      </VTRow>
      <VTRow label="Pressed">
        <Button pressed text="Solid" />
        <Button pressed variant="outline" colorScheme="functional" text="Outline" />
      </VTRow>
      <VTRow label="Small">
        <Button size="sm" text="Small" />
        <Button size="sm" variant="ghost" colorScheme="functional" text="Ghost" />
      </VTRow>
    </VTGrid>
  ),
};

export const Inverted: Story = {
  render: () => (
    <VTInvertedStrip>
      <VTGrid>
        <VTRow label="Emphasis">
          <Button inverted variant="emphasis" text="Emphasis" />
        </VTRow>
        <VTRow label="Solid">
          <Button inverted text="Solid" />
        </VTRow>
        <VTRow label="Outline and ghost">
          <Button inverted variant="outline" colorScheme="functional" text="Outline" />
          <Button inverted variant="ghost" colorScheme="functional" text="Ghost" />
        </VTRow>
      </VTGrid>
    </VTInvertedStrip>
  ),
};
