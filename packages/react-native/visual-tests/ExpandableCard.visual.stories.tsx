import type { Meta, StoryObj } from '@storybook/react-native';
import { SettingsMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { BodyText } from '../src/components/BodyText';
import {
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardExpandedContent,
  ExpandableCardHelperText,
  ExpandableCardIcon,
  ExpandableCardLeadingContent,
  ExpandableCardText,
  ExpandableCardTrigger,
} from '../src/components/ExpandableCard';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/ExpandableCard',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const content = (
  <>
    <BodyText>First line</BodyText>
    <BodyText>Second line</BodyText>
  </>
);

const noop = () => {};

/** Trigger and expanded content composed from the child parts, expanded and collapsed. */
export const Advanced: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Expanded">
        <ExpandableCard style={{ width: '100%' }}>
          <ExpandableCardTrigger onPress={noop} isExpanded>
            <ExpandableCardLeadingContent>
              <ExpandableCardIcon as={SettingsMediumIcon} />
            </ExpandableCardLeadingContent>
            <ExpandableCardContent>
              <ExpandableCardText>Expanded</ExpandableCardText>
              <ExpandableCardHelperText>Helper</ExpandableCardHelperText>
            </ExpandableCardContent>
          </ExpandableCardTrigger>
          <ExpandableCardExpandedContent isExpanded>{content}</ExpandableCardExpandedContent>
        </ExpandableCard>
      </VTRow>
      <VTRow label="Collapsed, no chevron">
        <ExpandableCard style={{ width: '100%' }}>
          <ExpandableCardTrigger onPress={noop} isExpanded={false} showChevron={false}>
            <ExpandableCardContent>
              <ExpandableCardText>Collapsed</ExpandableCardText>
              <ExpandableCardHelperText>Helper</ExpandableCardHelperText>
            </ExpandableCardContent>
          </ExpandableCardTrigger>
          <ExpandableCardExpandedContent isExpanded={false}>
            {content}
          </ExpandableCardExpandedContent>
        </ExpandableCard>
      </VTRow>
    </VTGrid>
  ),
};

export const Variants: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Subtle">
        <ExpandableCard
          expanded
          heading="Expanded"
          helperText="Helper"
          leadingIcon={SettingsMediumIcon}
          expandedContent={content}
          style={{ width: '100%' }}
        />
        <ExpandableCard
          expanded={false}
          heading="Collapsed"
          helperText="Helper"
          leadingIcon={SettingsMediumIcon}
          expandedContent={content}
          style={{ width: '100%' }}
        />
      </VTRow>
      <VTRow label="Emphasis">
        <ExpandableCard
          variant="emphasis"
          expanded
          heading="Expanded"
          helperText="Helper"
          leadingIcon={SettingsMediumIcon}
          expandedContent={content}
          style={{ width: '100%' }}
        />
        <ExpandableCard
          variant="emphasis"
          expanded={false}
          heading="Collapsed"
          helperText="Helper"
          leadingIcon={SettingsMediumIcon}
          expandedContent={content}
          style={{ width: '100%' }}
        />
      </VTRow>
      <VTRow label="Disabled">
        <ExpandableCard
          disabled
          expanded={false}
          heading="Disabled"
          expandedContent={content}
          style={{ width: '100%' }}
        />
      </VTRow>
    </VTGrid>
  ),
};
