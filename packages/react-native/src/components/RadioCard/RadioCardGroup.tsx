import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
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
  isDisabled: _isDisabled,
  ...props
}: RadioCardGroupProps & { isDisabled?: boolean }) => {
  const context = useMemo(() => {
    return { flexDirection, flexWrap, justifyContent, alignItems, disabled };
  }, [flexDirection, flexWrap, justifyContent, alignItems, disabled]);
  return columns ? (
    <RadioCardGroupContext.Provider value={context}>
      <Grid {...props} gap={gap} columns={columns} style={style}>
        {children as any}
      </Grid>
    </RadioCardGroupContext.Provider>
  ) : (
    <RadioCardGroupContext.Provider value={context}>
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
