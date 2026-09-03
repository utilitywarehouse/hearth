import type { Meta, StoryObj } from '@storybook/react-vite';
import { BodyText } from '../BodyText/BodyText';
import { Box } from '../Box/Box';
import { ExpandableCard } from './ExpandableCard';
import { ExpandableCardGroup } from './ExpandableCardGroup';
import {
  BroadbandMediumIcon,
  MobileMediumIcon,
  SettingsMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';

const meta: Meta<typeof ExpandableCardGroup> = {
  title: 'Components / ExpandableCard / ExpandableCardGroup',
  component: ExpandableCardGroup,
  argTypes: {
    heading: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
  },
  args: {
    heading: 'My services',
    helperText: 'Manage your UW services',
  },
};

export default meta;
type Story = StoryObj<typeof ExpandableCardGroup>;

export const Playground: Story = {
  render: args => (
    <Box width="400px" marginX="auto">
      <ExpandableCardGroup {...args}>
        <ExpandableCard
          heading="Broadband"
          helperText="Manage your broadband settings"
          leadingIcon={<BroadbandMediumIcon aria-hidden />}
          leadingIconContainerColorScheme="broadband"
        >
          <BodyText size="md">Your broadband plan details and settings appear here.</BodyText>
        </ExpandableCard>
        <ExpandableCard
          heading="Mobile"
          helperText="Manage your mobile settings"
          leadingIcon={<MobileMediumIcon aria-hidden />}
          leadingIconContainerColorScheme="mobile"
        >
          <BodyText size="md">Your mobile plan details and settings appear here.</BodyText>
        </ExpandableCard>
        <ExpandableCard
          heading="Settings"
          helperText="General account settings"
          leadingIcon={<SettingsMediumIcon aria-hidden />}
          leadingIconContainerColorScheme="highlight"
        >
          <BodyText size="md">Your account settings appear here.</BodyText>
        </ExpandableCard>
      </ExpandableCardGroup>
    </Box>
  ),
};
