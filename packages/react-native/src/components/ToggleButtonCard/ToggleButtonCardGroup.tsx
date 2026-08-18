import ToggleButtonCardGroupProps from './ToggleButtonCardGroup.props';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useSingleSelection } from '../../hooks/useSingleSelection';
import { Grid } from '../Grid';
import { ToggleButtonCardGroupContext } from './ToggleButtonCardGroup.context';

const ToggleButtonCardGroup = ({
  children,
  gap = '200',
  style,
  flexDirection = 'row',
  flexWrap,
  justifyContent,
  alignItems,
  columns,
  value,
  onChange,
  onValueChange,
  ...props
}: ToggleButtonCardGroupProps) => {
  const { selectedValue, select } = useSingleSelection({
    value,
    onValueChange: groupValue => {
      onChange?.(groupValue);
      onValueChange?.(groupValue);
    },
  });
  const contextValue = { selectedValue, select };
  return columns ? (
    <ToggleButtonCardGroupContext.Provider value={contextValue}>
      <Grid {...props} gap={gap} columns={columns} style={style}>
        {children as any}
      </Grid>
    </ToggleButtonCardGroupContext.Provider>
  ) : (
    <ToggleButtonCardGroupContext.Provider value={contextValue}>
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
    </ToggleButtonCardGroupContext.Provider>
  );
};

const styles = StyleSheet.create(theme => ({
  containerGap: (gap: ToggleButtonCardGroupProps['gap']) => ({
    ...(gap ? { gap: theme.space[gap] } : {}),
  }),
}));

ToggleButtonCardGroup.displayName = 'ToggleButtonCardGroup';

export default ToggleButtonCardGroup;
