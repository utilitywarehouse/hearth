import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Helper } from '../Helper';
import { Label } from '../Label';
import { CheckboxGroupContext } from './CheckboxGroup.context';
import CheckboxGroupProps from './CheckboxGroup.props';
import CheckboxGroupRoot from './CheckboxGroupRoot';
import CheckboxGroupTextContent from './CheckboxGroupTextContent';
import { resolveActiveSelection, toggleSelectedValue } from './CheckboxGroup.utils';

const CheckboxGroup = ({
  children,
  disabled,
  readonly,
  value: controlledValue,
  onChange,
  onValueChange,
  validationStatus,
  label,
  labelVariant = 'body',
  helperText,
  invalidText,
  validText,
  showValidationIcon = true,
  helperIcon,
  type,
  direction = 'column',
  gap,
  ...props
}: CheckboxGroupProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<string[]>([]);
  const selectedValues = resolveActiveSelection({
    controlledValue,
    uncontrolledValue,
  });
  const select = (itemValue: string) => {
    if (disabled || readonly) return;
    const nextValues = toggleSelectedValue(selectedValues, itemValue);
    if (controlledValue === undefined) setUncontrolledValue(nextValues);
    onChange?.(nextValues);
    onValueChange?.(nextValues);
  };
  const contextValue = useMemo(
    () => ({ disabled, validationStatus, type, direction, selectedValues, select }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, validationStatus, type, direction, selectedValues, readonly]
  );
  const showHeader = !!label || !!helperText || !!invalidText || !!validText;
  const childrenArray = React.Children.toArray(children as any);
  const childIsCard =
    type === 'tile' ||
    childrenArray.some(
      child =>
        React.isValidElement(child) &&
        // @ts-expect-error - child.type is not typed
        (child.props.type === 'tile' || child.type.displayName === 'CheckboxTile')
    );
  styles.useVariants({ type: childIsCard ? 'tile' : 'checkbox', direction });
  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <CheckboxGroupRoot {...props} isCard={childIsCard}>
        {showHeader && (
          <CheckboxGroupTextContent>
            {!!label && (
              <Label disabled={disabled} variant={labelVariant}>
                {label}
              </Label>
            )}
            {!!helperText && <Helper disabled={disabled} icon={helperIcon} text={helperText} />}
            {validationStatus === 'invalid' && !!invalidText && (
              <Helper
                showIcon={showValidationIcon}
                disabled={disabled}
                validationStatus="invalid"
                text={invalidText}
              />
            )}
            {validationStatus === 'valid' && !!validText && (
              <Helper
                disabled={disabled}
                showIcon={showValidationIcon}
                validationStatus="valid"
                text={validText}
              />
            )}
          </CheckboxGroupTextContent>
        )}
        <View style={[styles.container, styles.containerGap(gap)]}>{children}</View>
      </CheckboxGroupRoot>
    </CheckboxGroupContext.Provider>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'stretch',
    variants: {
      type: {
        checkbox: {
          gap: theme.components.checkbox.group.stack.gap,
        },
        tile: {
          gap: theme.components.checkbox.tile.group.stack.gap,
        },
      },
      direction: {
        column: {
          flexDirection: 'column',
        },
        row: {
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
      },
    },
  },
  containerGap: (gap: CheckboxGroupProps['gap']) => ({
    ...(gap ? { gap: theme.space[gap] } : {}),
  }),
}));

CheckboxGroup.displayName = 'CheckboxGroup';

export default CheckboxGroup;
