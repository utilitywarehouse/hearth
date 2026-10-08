import type { Meta, StoryObj } from '@storybook/react-native';
import { ElectricitySmallIcon, MobileSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from '../src/components/Button';
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

const VariantMatrix = () => (
  <VTGrid>
    <VTRow label="Emphasis">
      <Button variant="emphasis" text="Emphasis" />
    </VTRow>
    <VTRow label="Solid">
      <Button text="Highlight" />
      <Button colorScheme="affirmative" text="Affirm" />
      <Button colorScheme="destructive" text="Destruct" />
    </VTRow>
    <VTRow label="Outline">
      <Button variant="outline" colorScheme="functional" text="Function" />
      <Button variant="outline" colorScheme="affirmative" text="Affirm" />
      <Button variant="outline" colorScheme="destructive" text="Destruct" />
    </VTRow>
    <VTRow label="Ghost">
      <Button variant="ghost" colorScheme="functional" text="Function" />
      <Button variant="ghost" colorScheme="affirmative" text="Affirm" />
      <Button variant="ghost" colorScheme="destructive" text="Destruct" />
    </VTRow>
  </VTGrid>
);

export const Variants: Story = { render: () => <VariantMatrix /> };

export const VariantsDark: Story = {
  parameters: { colorMode: 'dark' },
  render: () => <VariantMatrix />,
};

export const States: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Sizes">
        <Button text="Medium" />
        <Button size="sm" text="Small" />
      </VTRow>
      <VTRow label="Loading and disabled">
        <Button loading text="Loading" />
        <Button disabled text="Disabled" />
      </VTRow>
      <VTRow label="Pressed">
        <Button pressed text="Solid" />
        <Button pressed variant="outline" colorScheme="functional" text="Outline" />
      </VTRow>
      <VTRow label="Icons">
        <Button icon={MobileSmallIcon} text="Left" />
        <Button icon={ElectricitySmallIcon} iconPosition="right" text="Right" />
      </VTRow>
      <VTInvertedStrip>
        <VTGrid>
          <VTRow label="Inverted">
            <Button inverted variant="emphasis" text="Emphasis" />
            <Button inverted text="Solid" />
          </VTRow>
          <VTRow label="Inverted outline, ghost, disabled">
            <Button inverted variant="outline" colorScheme="functional" text="Outline" />
            <Button inverted variant="ghost" colorScheme="functional" text="Ghost" />
            <Button inverted disabled text="Disabled" />
          </VTRow>
        </VTGrid>
      </VTInvertedStrip>
    </VTGrid>
  ),
};

/** Buttons composed from `ButtonIcon`, `ButtonText` and `ButtonSpinner` child parts. */
export const Advanced: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Icon and text">
        <Button>
          <ButtonIcon as={ElectricitySmallIcon} />
          <ButtonText>Left icon</ButtonText>
        </Button>
        <Button variant="outline" colorScheme="functional">
          <ButtonText>Right icon</ButtonText>
          <ButtonIcon as={MobileSmallIcon} />
        </Button>
      </VTRow>
      <VTRow label="Spinner">
        <Button disabled>
          <ButtonSpinner />
          <ButtonText>Loading</ButtonText>
        </Button>
      </VTRow>
    </VTGrid>
  ),
};
