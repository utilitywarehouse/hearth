import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useTabsContext } from './Tabs.context';
import type TabsListProps from './TabsList.props';

const Indicator = Animated.createAnimatedComponent(View);

const TabsList = ({ children, style, ...rest }: TabsListProps) => {
  const { size, indicatorSizeSV, indicatorXSV } = useTabsContext();
  styles.useVariants({ size });

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorXSV.value }],
    width: indicatorSizeSV.value,
  }));

  return (
    <View accessibilityRole="tablist" style={[styles.container, style]} {...rest}>
      {children}
      <Indicator
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[styles.indicatorBase, styles.indicatorHorizontal, indicatorStyle]}
      />
    </View>
  );
};

TabsList.displayName = 'TabsList';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.components.tabs.gap,
    borderBottomWidth: theme.components.tabs.divider.borderWidth,
    borderColor: theme.components.tabs.divider.color,
    variants: {
      size: {
        md: { paddingVertical: theme.space[25] },
        lg: { paddingVertical: theme.space[50] },
      },
    },
  },
  indicatorBase: {
    position: 'absolute',
    backgroundColor: theme.color.text.primary,
    borderRadius: theme.borderRadius.full,
  },
  indicatorHorizontal: {
    height: 6,
    borderTopLeftRadius: theme.components.tabs.item.selected.borderTopRadius,
    borderTopRightRadius: theme.components.tabs.item.selected.borderTopRadius,
    borderBottomLeftRadius: theme.components.tabs.item.selected.borderBottomRadius,
    borderBottomRightRadius: theme.components.tabs.item.selected.borderBottomRadius,
    backgroundColor: theme.color.surface.brand.default,
    bottom: 0,
    left: 0,
  },
}));

export default TabsList;
