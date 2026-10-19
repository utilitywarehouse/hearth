import type { Meta, StoryObj } from '@storybook/react-native';
import { ElectricitySmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { BodyText } from '../src/components/BodyText';
import { InlineLink } from '../src/components/InlineLink';
import { Link } from '../src/components/Link';
import { VTGrid, VTInvertedStrip, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Link & InlineLink',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Links: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Link">
        <Link>Default</Link>
        <Link showIcon={false}>No icon</Link>
      </VTRow>
      <VTRow label="Icon position">
        <Link iconPosition="left">Left</Link>
        <Link icon={ElectricitySmallIcon}>Custom</Link>
      </VTRow>
      <VTRow label="Disabled">
        <Link disabled>Disabled</Link>
        <InlineLink disabled>Disabled</InlineLink>
      </VTRow>
      <VTRow label="InlineLink">
        <BodyText>
          Read the <InlineLink>terms</InlineLink> here.
        </BodyText>
      </VTRow>
      <VTInvertedStrip>
        <VTGrid>
          <VTRow label="Inverted Link">
            <Link inverted>Default</Link>
            <Link inverted iconPosition="left">
              Left
            </Link>
            <Link inverted disabled>
              Disabled
            </Link>
          </VTRow>
          <VTRow label="Inverted InlineLink">
            <BodyText inverted>
              Read the <InlineLink inverted>terms</InlineLink> here.
            </BodyText>
          </VTRow>
        </VTGrid>
      </VTInvertedStrip>
    </VTGrid>
  ),
};
