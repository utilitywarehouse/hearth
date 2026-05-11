import { createPressable } from '@gluestack-ui/pressable';
import { useCallback, useRef } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Icon } from '../Icon';
import type TabProps from './Tab.props';
import { useTabsContext } from './Tabs.context';

const Tab = ({
  value,
  children,
  icon,
  disabled,
  style,
  states,
  ...props
}: TabProps & { states?: { active?: boolean; disabled?: boolean } }) => {
  const {
    value: active,
    select,
    size,
    disabled: allDisabled,
    registerTabLayout,
  } = useTabsContext();
  const { active: pressed } = states || { active: false };
  const isActive = active === value;
  styles.useVariants({ size, pressed });
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
      // '_focus-visible': {
      //   ...theme.helpers.focusVisible,
      //   outlineOffset: -2,
      //   borderRadius: theme.borderRadius.sm,
      // },
      _active: {
        backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
      },
    },
    variants: {
      size: {
        md: { minHeight: theme.components.tabs.md.height },
        lg: { minHeight: theme.components.tabs.lg.height },
      },
      pressed: {
        true: {
          backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
        },
        false: {},
      },
    },
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

const PressableTab = createPressable({ Root: Tab });

PressableTab.displayName = 'Tab';

export default PressableTab;
