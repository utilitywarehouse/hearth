import RadioCardGroupProps from './RadioCardGroup.props';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Grid } from '../Grid';

const RadioCardGroup = ({
  children,
  gap = '200',
  style,
  flexDirection = 'row',
  flexWrap,
  justifyContent,
  alignItems,
  columns,
  ...props
}: RadioCardGroupProps) => {
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
  containerGap: (gap: RadioCardGroupProps['gap']) => ({
    ...(gap ? { gap: theme.space[gap] } : {}),
  }),
}));

RadioCardGroup.displayName = 'RadioCardGroup';

export default RadioCardGroup;
