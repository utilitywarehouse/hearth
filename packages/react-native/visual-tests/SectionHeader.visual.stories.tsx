import type { Meta, StoryObj } from '@storybook/react-native';
import { SettingsMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Link } from '../src/components/Link';
import { SectionHeader } from '../src/components/SectionHeader';
import { VTGrid } from './_support';

const meta = {
  title: 'Visual Tests/SectionHeader',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <VTGrid>
      <SectionHeader heading="Heading" helperText="Helper" />
      <SectionHeader
        heading="Heading"
        helperText="Helper"
        trailingContent={<Link>See more</Link>}
      />
      <SectionHeader
        heading="Heading"
        helperText="Helper"
        trailingContent={
          <Link icon={SettingsMediumIcon} iconPosition="left">
            Settings
          </Link>
        }
      />
      <SectionHeader heading="Heading" helperText="Helper" badge={{ text: 'New' }} />
      <SectionHeader
        heading="Heading"
        helperText="Helper"
        trailingContent={<Link>More</Link>}
        badge={{ text: 'New' }}
      />
      <SectionHeader heading="Heading" helperText="Helper" invalidText="Invalid text" />
    </VTGrid>
  ),
};
