import ToggleButtonCardGroupProps from './ToggleButtonCardGroup.props';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Grid } from '../Grid';

const ToggleButtonCardGroup = ({
  children,
  gap = '200',
  style,
  flexDirection = 'row',
  flexWrap,
  justifyContent,
  alignItems,
  columns,
  ...props
}: ToggleButtonCardGroupProps) => {
  return columns ? (
    <Grid {...props} gap={gap} columns={columns} style={style}>
      {children as any}
    </Grid>
  ) : (
    <View
      {...props}
      style={[
        styles.containerGap(gap),
        {
          flexDirection,
          flexWrap,
          justifyContent,
          alignItems,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  containerGap: (gap: ToggleButtonCardGroupProps['gap']) => ({
    ...(gap ? { gap: theme.space[gap] } : {}),
  }),
}));

ToggleButtonCardGroup.displayName = 'ToggleButtonCardGroup';

export default ToggleButtonCardGroup;
