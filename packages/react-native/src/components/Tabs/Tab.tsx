import { useCallback, useRef } from 'react';
import { Platform, Pressable, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Icon } from '../Icon';
import type TabProps from './Tab.props';
import { useTabsContext } from './Tabs.context';

const Tab = ({ value, children, icon, disabled, style, ...props }: TabProps) => {
  const {
    value: active,
    select,
    size,
    disabled: allDisabled,
    registerTabLayout,
  } = useTabsContext();
  const isActive = active === value;
  styles.useVariants({ size });
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
      style={({ pressed }) => [styles.tab, pressed && styles.tabPressed, style as ViewStyle]}
      {...(Platform.OS === 'web'
        ? { id: `tab-${value}`, 'aria-controls': `tabpanel-${value}`, 'aria-selected': isActive }
        : null)}
      {...props}
    >
      <View style={styles.content}>
        {icon ? <Icon as={icon} /> : null}
        <BodyText size={size} weight="semibold">
          {children}
        </BodyText>
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
    paddingHorizontal: theme.components.tabs.item.paddingHorizontal,
    paddingVertical: theme.components.tabs.item.paddingVertical,
    _web: {
      _hover: {
        backgroundColor: theme.color.interactive.neutral.surface.subtle.hover,
      },
      '_focus-visible': {
        ...theme.helpers.focusVisible,
        outlineOffset: -2,
        borderRadius: theme.borderRadius.sm,
      },
      _active: {
        backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
      },
    },
    variants: {
      size: {
        md: { minHeight: theme.components.tabs.md.height },
        lg: { minHeight: theme.components.tabs.lg.height },
      },
    },
  },
  tabPressed: {
    backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.components.tabs.item.gap,
  },
  badge: {
    marginLeft: theme.space[25],
  },
}));

export default Tab;
