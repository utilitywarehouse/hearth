import React, { forwardRef, useMemo } from 'react';
import { CheckboxGroup as CheckboxGroupComponent } from './Checkbox';
import CheckboxGroupProps from './CheckboxGroup.props';
import { CheckboxGroupContext } from './CheckboxGroup.context';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import CheckboxGroupTextContent from './CheckboxGroupTextContent';
import { Label } from '../Label';
import { Helper } from '../Helper';

const CheckboxGroup = forwardRef<View, CheckboxGroupProps>(
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
      showValidationIcon = true,
      helperIcon,
      type,
      direction = 'column',
      gap,
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
      childrenArray.some(
        child =>
          React.isValidElement(child) &&
          // @ts-expect-error - child.type is not typed
          (child.props.type === 'card' || child.type.displayName === 'CheckboxCard')
      );
    styles.useVariants({ type: childIsCard ? 'card' : 'checkbox', direction });
    return (
      <CheckboxGroupContext.Provider value={value}>
        <CheckboxGroupComponent
          // @ts-ignore
          ref={ref}
          {...props}
          isDisabled={disabled}
          isReadOnly={readonly}
          isCard={childIsCard}
        >
          {showHeader && (
            <CheckboxGroupTextContent>
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
            </CheckboxGroupTextContent>
          )}
          <View style={[styles.container, styles.containerGap(gap)]}>{children}</View>
        </CheckboxGroupComponent>
      </CheckboxGroupContext.Provider>
    );
  }
);

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'stretch',
    variants: {
      type: {
        checkbox: {
          gap: theme.components.checkbox.group.stack.gap,
        },
        card: {
          gap: theme.components.checkbox.card.group.stack.gap,
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
