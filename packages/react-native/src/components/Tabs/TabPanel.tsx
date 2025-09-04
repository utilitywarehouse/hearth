import { memo } from 'react';
import { Platform, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type TabPanelProps from './TabPanel.props';
import { useTabsContext } from './Tabs.context';

const TabPanel = ({ value, children, keepMounted, style, ...rest }: TabPanelProps) => {
  const { value: active } = useTabsContext();
  const isActive = active === value;
  if (!isActive && !keepMounted) return null;
  styles.useVariants({ active: isActive });
  return (
    <View
      {...(Platform.OS === 'web'
        ? {
            id: `tabpanel-${value}`,
            role: 'tabpanel',
            'aria-labelledby': `tab-${value}`,
            hidden: !isActive || undefined,
          }
        : { accessibilityRole: 'summary' })}
      importantForAccessibility={isActive ? undefined : 'no-hide-descendants'}
      accessibilityElementsHidden={isActive ? undefined : true}
      style={[styles.panel, style]}
      {...rest}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  panel: {
    width: '100%',
    paddingTop: theme.space[100],
    variants: {
      active: {
        true: { display: 'flex' },
        false: { display: 'none' },
      },
    },
  },
}));

export default memo(TabPanel);
