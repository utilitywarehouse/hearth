import type { Meta, StoryObj } from '@storybook/react-native';
import {
  BroadbandMediumIcon,
  ElectricityMediumIcon,
  HomeMediumIcon,
  MobileMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { useUnistyles } from 'react-native-unistyles';
import { Icon } from '../src/components/Icon';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Icon',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const IconStates = () => {
  const { theme } = useUnistyles();
  return (
    <VTGrid>
      <VTRow label="Sizes 16, 24, 32, 48">
        <Icon as={MobileMediumIcon} size={16} color={theme.color.border.strong} />
        <Icon as={MobileMediumIcon} size={24} color={theme.color.border.strong} />
        <Icon as={MobileMediumIcon} size={32} color={theme.color.border.strong} />
        <Icon as={MobileMediumIcon} size={48} color={theme.color.border.strong} />
      </VTRow>
      <VTRow label="Width and height">
        <Icon as={HomeMediumIcon} width={24} height={24} color={theme.color.border.strong} />
        <Icon as={HomeMediumIcon} width={40} height={40} color={theme.color.border.strong} />
      </VTRow>
      <VTRow label="Colours">
        <Icon as={ElectricityMediumIcon} size={32} color={theme.color.energyBlue['700']} />
        <Icon as={MobileMediumIcon} size={32} color={theme.color.mobileRose['800']} />
        <Icon as={BroadbandMediumIcon} size={32} color={theme.color.broadbandGreen['800']} />
        <Icon as={HomeMediumIcon} size={32} color={theme.color.insuranceOrange['800']} />
      </VTRow>
    </VTGrid>
  );
};

/** Hearth `Icon` wrapper: sizes, explicit dimensions and theme colours. */
export const States: Story = {
  render: () => <IconStates />,
};
