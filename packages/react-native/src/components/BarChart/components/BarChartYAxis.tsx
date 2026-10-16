import type { LayoutChangeEvent } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../../BodyText';
import { AXIS_LABEL_HEIGHT } from '../BarChart.constants';

interface BarChartYAxisProps {
  ticks: number[];
  plotHeight: number;
  formatLabel: (value: number) => string;
  onLayout: (event: LayoutChangeEvent) => void;
}

const BarChartYAxis = ({ ticks, plotHeight, formatLabel, onLayout }: BarChartYAxisProps) => (
  <View
    aria-hidden
    onLayout={onLayout}
    style={[styles.container, { height: plotHeight + AXIS_LABEL_HEIGHT }]}
  >
    {[...ticks].reverse().map(tick => (
      <BodyText key={tick} size="sm" numberOfLines={1} style={styles.label}>
        {formatLabel(tick)}
      </BodyText>
    ))}
  </View>
);

BarChartYAxis.displayName = 'BarChartYAxis';

const styles = StyleSheet.create(theme => ({
  container: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: theme.space[100],
  },
  label: {
    height: AXIS_LABEL_HEIGHT,
    textAlign: 'right',
  },
}));

export default BarChartYAxis;
