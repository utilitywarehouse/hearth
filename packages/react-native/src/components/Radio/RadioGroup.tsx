import React, { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Helper } from '../Helper';
import { Label } from '../Label';
import { RadioGroup as RadioGroupComponent } from './Radio';
import { RadioGroupContext } from './RadioGroup.context';
import RadioGroupProps from './RadioGroup.props';
import RadioGroupTextContent from './RadioGroupTextContent';

const RadioGroup = ({
  children,
  disabled,
  readonly,
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
}: RadioGroupProps) => {
  const value = useMemo(
    () => ({ disabled, validationStatus, type, direction }),
    [disabled, validationStatus, type, direction]
  );
  const showHeader = !!label || !!helperText || !!invalidText || !!validText;
  const childrenArray = React.Children.toArray(children as any);
  const childIsCard =
    type === 'tile' ||
    childrenArray.some(
      child =>
        React.isValidElement(child) &&
        // @ts-expect-error - child.type is not typed
        (child.props.type === 'tile' || child.type.displayName === 'RadioTile')
    );
  styles.useVariants({ type: childIsCard ? 'tile' : 'radio', direction });
  return (
    <RadioGroupContext.Provider value={value}>
      <RadioGroupComponent
        {...props}
        onChange={(groupValue: string) => {
          onChange?.(groupValue);
          onValueChange?.(groupValue);
        }}
        isDisabled={disabled}
        isReadOnly={readonly}
        isCard={childIsCard}
      >
        {showHeader && (
          <RadioGroupTextContent>
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
          </RadioGroupTextContent>
        )}
        <View style={[styles.container, styles.containerGap(gap)]}>{children}</View>
      </RadioGroupComponent>
    </RadioGroupContext.Provider>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'stretch',
    variants: {
      type: {
        radio: {
          gap: theme.components.radio.group.stack.gap,
        },
        tile: {
          gap: theme.components.radio.tile.group.stack.gap,
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
  containerGap: (gap: RadioGroupProps['gap']) => ({
    ...(gap ? { gap: theme.space[gap] } : {}),
  }),
}));

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
