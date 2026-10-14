import Animated from 'react-native-reanimated';
import type { AnimatedStyle } from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';
import { StyleSheet } from 'react-native-unistyles';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import useTheme from '../../hooks/useTheme';
import { BodyText } from '../BodyText';
import { CARET_HEIGHT, CARET_WIDTH } from './BarChart.constants';

interface BarChartTooltipProps {
  label: string;
  value: string;
  caretStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

// A plain object rather than a Unistyles style: on web, Unistyles styles are dropped when passed to
// a Reanimated component, which would leave the caret in the flex row instead of below the tooltip.
const CARET_BASE_STYLE: ViewStyle = {
  position: 'absolute',
  left: 0,
  bottom: -CARET_HEIGHT,
  pointerEvents: 'none',
};

const BarChartTooltip = ({ label, value, caretStyle }: BarChartTooltipProps) => {
  const { components } = useTheme();

  return (
    <View accessibilityLiveRegion="polite" style={styles.container}>
      <BodyText size="md" color="inverted">
        {label}
      </BodyText>
      <BodyText size="lg" weight="semibold" color="inverted">
        {value}
      </BodyText>
      <Animated.View style={[CARET_BASE_STYLE, caretStyle]}>
        <Svg
          width={CARET_WIDTH}
          height={CARET_HEIGHT}
          viewBox={`0 0 ${CARET_WIDTH} ${CARET_HEIGHT}`}
        >
          <Path
            d={`M0 0 L${CARET_WIDTH} 0 L${CARET_WIDTH / 2} ${CARET_HEIGHT} Z`}
            fill={components.tooltip.backgroundColor}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

BarChartTooltip.displayName = 'BarChartTooltip';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.components.tooltip.backgroundColor,
    borderRadius: theme.components.tooltip.borderRadius,
    paddingHorizontal: theme.components.tooltip.paddingHorizontal,
    paddingVertical: theme.components.tooltip.paddingVertical,
    gap: theme.components.tooltip.gapHorizontal,
  },
}));

export default BarChartTooltip;
