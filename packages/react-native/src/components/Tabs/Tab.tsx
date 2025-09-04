import { useCallback, useRef } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { DetailText } from '../DetailText';
import { Icon } from '../Icon';
import type TabProps from './Tab.props';
import { useTabsContext } from './Tabs.context';

const Tab = ({ value, children, icon, disabled, badge, style, ...props }: TabProps) => {
  const {
    value: active,
    select,
    size,
    disabled: allDisabled,
    registerTabLayout,
  } = useTabsContext();
  const isActive = active === value;
  styles.useVariants({ size, active: isActive, disabled: !!(disabled || allDisabled) });
  const ref = useRef<View | null>(null);
  const handlePress = () => {
    if (disabled || allDisabled) return;
    select(value);
  };
  const handleLayout = useCallback(
    (e: any) => {
      const { x, y, width, height } = e.nativeEvent.layout;
      registerTabLayout(value, { x, y, width, height });
    },
    [value, registerTabLayout]
  );
  return (
    <Pressable
      ref={ref}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled: !!(disabled || allDisabled) }}
      onPress={handlePress}
      onLayout={handleLayout}
      style={[styles.tab, style]}
      {...(Platform.OS === 'web'
        ? { id: `tab-${value}`, 'aria-controls': `tabpanel-${value}` }
        : null)}
      {...props}
    >
      <View style={styles.content}>
        {icon ? <Icon as={icon} /> : null}
        <DetailText style={styles.label}>{children}</DetailText>
      </View>
    </Pressable>
  );
};

Tab.displayName = 'Tab';

const styles = StyleSheet.create(theme => ({
  tab: {
    position: 'relative',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      orientation: {
        horizontal: { justifyContent: 'center' },
        vertical: { justifyContent: 'flex-start' },
      },
      size: {
        md: { height: theme.components.tabs.md.height },
        lg: { height: theme.components.tabs.lg.height },
      },
      disabled: {
        true: { opacity: 0.5 },
        false: {},
      },
    },
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.components.tabs.item.gap,
  },
  label: {
    color: theme.color.text.secondary,
    variants: {
      active: {
        true: { color: theme.color.text.primary },
        false: {},
      },
    },
  },
  badge: {
    marginLeft: theme.space[25],
  },
  // Indicator handled by parent
}));

export default Tab;
