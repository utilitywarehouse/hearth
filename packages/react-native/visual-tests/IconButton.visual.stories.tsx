import type { Meta, StoryObj } from '@storybook/react-native';
import { MobileSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { IconButton } from '../src/components/IconButton';
import { VTGrid, VTInvertedStrip, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/IconButton',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const icon = MobileSmallIcon;

export const IconButtons: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Emphasis and solid">
        <IconButton icon={icon} variant="emphasis" accessibilityLabel="Emphasis" />
        <IconButton icon={icon} accessibilityLabel="Highlight" />
        <IconButton icon={icon} colorScheme="affirmative" accessibilityLabel="Affirmative" />
        <IconButton icon={icon} colorScheme="destructive" accessibilityLabel="Destructive" />
      </VTRow>
      <VTRow label="Outline">
        <IconButton
          icon={icon}
          variant="outline"
          colorScheme="functional"
          accessibilityLabel="Functional"
        />
        <IconButton
          icon={icon}
          variant="outline"
          colorScheme="affirmative"
          accessibilityLabel="Affirmative"
        />
        <IconButton
          icon={icon}
          variant="outline"
          colorScheme="destructive"
          accessibilityLabel="Destructive"
        />
      </VTRow>
      <VTRow label="Ghost">
        <IconButton
          icon={icon}
          variant="ghost"
          colorScheme="functional"
          accessibilityLabel="Functional"
        />
        <IconButton
          icon={icon}
          variant="ghost"
          colorScheme="affirmative"
          accessibilityLabel="Affirmative"
        />
        <IconButton
          icon={icon}
          variant="ghost"
          colorScheme="destructive"
          accessibilityLabel="Destructive"
        />
      </VTRow>
      <VTRow label="Small">
        <IconButton size="sm" icon={icon} variant="emphasis" accessibilityLabel="Emphasis" />
        <IconButton size="sm" icon={icon} accessibilityLabel="Highlight" />
        <IconButton
          size="sm"
          icon={icon}
          variant="outline"
          colorScheme="functional"
          accessibilityLabel="Outline"
        />
        <IconButton
          size="sm"
          icon={icon}
          variant="ghost"
          colorScheme="functional"
          accessibilityLabel="Ghost"
        />
      </VTRow>
      <VTRow label="Loading and disabled">
        <IconButton icon={icon} loading accessibilityLabel="Loading" />
        <IconButton icon={icon} disabled accessibilityLabel="Disabled" />
      </VTRow>
      <VTInvertedStrip>
        <VTRow label="Inverted">
          <IconButton icon={icon} inverted variant="emphasis" accessibilityLabel="Emphasis" />
          <IconButton icon={icon} inverted accessibilityLabel="Solid" />
          <IconButton
            icon={icon}
            inverted
            variant="outline"
            colorScheme="functional"
            accessibilityLabel="Outline"
          />
          <IconButton
            icon={icon}
            inverted
            variant="ghost"
            colorScheme="functional"
            accessibilityLabel="Ghost"
          />
        </VTRow>
      </VTInvertedStrip>
    </VTGrid>
  ),
};
