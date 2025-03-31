import React, { forwardRef, useMemo } from 'react';
import { RadioGroup as RadioGroupComponent } from './Radio';
import RadioGroupProps from './RadioGroup.props';
import { RadioGroupContext } from './RadioGroup.context';
import { View } from 'react-native';
import { Label } from '../Label';
import { Flex } from '../Flex';
import { Helper } from '../Helper';
import { StyleSheet } from 'react-native-unistyles';

const RadioGroup = forwardRef<View, RadioGroupProps>(
  (
    {
      children,
      disabled,
      readonly,
      validationStatus,
      label,
      helperText,
      invalidText,
      validText,
      showValidationIcon,
      helperIcon,
      type,
      direction = 'column',
      ...props
    },
    ref
  ) => {
    const value = useMemo(
      () => ({ disabled, validationStatus, type }),
      [disabled, validationStatus, type]
    );
    const showHeader = !!label || !!helperText || !!invalidText || !!validText;
    const childrenArray = React.Children.toArray(children);
    const childIsCard =
      type === 'card' ||
      childrenArray.some(child => React.isValidElement(child) && child.props.type === 'card');
    styles.useVariants({ type: childIsCard ? 'card' : 'radio', direction });
    return (
      <RadioGroupContext.Provider value={value}>
        <RadioGroupComponent
          // @ts-ignore
          ref={ref}
          {...props}
          isDisabled={disabled}
          isReadOnly={readonly}
          isCard={childIsCard}
        >
          {showHeader && (
            <Flex direction="column" space="none">
              {!!label && <Label disabled={disabled}>{label}</Label>}
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
            </Flex>
          )}
          <View style={styles.container}>{children}</View>
        </RadioGroupComponent>
      </RadioGroupContext.Provider>
    );
  }
);

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'stretch',
    variants: {
      type: {
        radio: {
          gap: theme.space['400'],
        },
        card: {
          gap: theme.space['100'],
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
}));

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
