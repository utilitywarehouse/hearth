import type { Meta, StoryObj } from '@storybook/react-native';
import {
  ElectricityMediumIcon,
  SettingsMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { Badge } from '../src/components/Badge';
import { IconContainer } from '../src/components/IconContainer';
import { Link } from '../src/components/Link';
import { List, ListItem, ListItemIcon } from '../src/components/List';
import { Switch } from '../src/components/Switch';
import { VTGrid } from './_support';

const meta = {
  title: 'Visual Tests/List',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

const Lists = () => {
  const { theme } = useUnistyles();
  return (
    <View style={{ gap: theme.space[150] }}>
      <List
        heading="Heading"
        helperText="Helper"
        headerTrailingContent={<Link onPress={noop}>View all</Link>}
      >
        <ListItem
          heading="Item"
          helperText="Helper"
          leadingContent={<ListItemIcon as={SettingsMediumIcon} />}
          onPress={noop}
        />
        <ListItem heading="Item" leadingContent={<ListItemIcon as={SettingsMediumIcon} />} />
      </List>
      <List container="subtleWhite">
        <ListItem
          heading="Badge"
          leadingContent={
            <IconContainer
              icon={ElectricityMediumIcon}
              size="md"
              variant="emphasis"
              color="energy"
            />
          }
          badge={<Badge text="Meter" />}
        />
        <ListItem
          heading="Switch"
          trailingContent={<Switch size="small" value onValueChange={noop} />}
        />
        <ListItem heading="Numeric" numericValue="8,542" />
        <ListItem heading="Link" trailingContent={<Link onPress={noop}>View</Link>} />
      </List>
    </View>
  );
};

export const Variants: Story = { render: () => <Lists /> };

export const VariantsDark: Story = {
  parameters: { colorMode: 'dark' },
  render: () => <Lists />,
};

export const Containers: Story = {
  render: () => (
    <VTGrid>
      <List container="emphasisWhite">
        <ListItem heading="Emphasis white" />
      </List>
      <List container="subtleWarmWhite">
        <ListItem heading="Subtle warm" />
      </List>
      <List container="emphasisWarmWhite">
        <ListItem heading="Emphasis warm" />
      </List>
    </VTGrid>
  ),
};
