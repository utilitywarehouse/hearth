import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useSingleSelection } from '../../hooks/useSingleSelection';
import { Grid } from '../Grid';
import { RadioCardGroupContext } from './RadioCardGroup.context';
import RadioCardGroupProps from './RadioCardGroup.props';

const RadioCardGroup = ({
  children,
  gap = '200',
  style,
  flexDirection = 'row',
  flexWrap,
  justifyContent,
  alignItems,
  columns,
  disabled,
  value,
  onChange,
  onValueChange,
  ...props
}: RadioCardGroupProps) => {
  const { selectedValue, select } = useSingleSelection({
    value,
    disabled,
    onValueChange: groupValue => {
      onChange?.(groupValue);
      onValueChange?.(groupValue);
    },
  });
  const context = useMemo(
    () => ({
      flexDirection,
      flexWrap,
      justifyContent,
      alignItems,
      disabled,
      selectedValue,
      select,
    }),
    [flexDirection, flexWrap, justifyContent, alignItems, disabled, selectedValue, select]
  );
  return columns ? (
    <RadioCardGroupContext.Provider value={context}>
      <Grid {...props} accessibilityRole="radiogroup" gap={gap} columns={columns} style={style}>
        {children as any}
      </Grid>
    </RadioCardGroupContext.Provider>
  ) : (
    <RadioCardGroupContext.Provider value={context}>
      <View
        {...props}
        accessibilityRole="radiogroup"
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
    </RadioCardGroupContext.Provider>
  );
};

const styles = StyleSheet.create(theme => ({
  containerGap: (gap: RadioCardGroupProps['gap']) => ({
    ...(gap ? { gap: theme.space[gap] } : {}),
  }),
}));

RadioCardGroup.displayName = 'RadioCardGroup';

export default RadioCardGroup;
