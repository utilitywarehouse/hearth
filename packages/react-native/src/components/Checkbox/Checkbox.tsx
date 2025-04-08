import React, { ElementRef } from 'react';
import { createCheckbox } from '@gluestack-ui/checkbox';
import StyledCheckbox from './CheckboxRoot';
import StyledCheckboxIndicator from './CheckboxIndicator';
import StyledCheckboxIcon from './CheckboxIcon';
import StyledCheckboxLabel from './CheckboxLabel';
import StyledCheckboxGroup from './CheckboxGroupRoot';
import { forwardRef } from 'react';
import CheckboxProps from './Checkbox.props';
import { Pressable } from 'react-native';
import { Helper } from '../Helper';
import { useCheckboxGroupContext } from './CheckboxGroup.context';
import { useFormFieldContext } from '../FormField';
import CheckboxCardRoot from './CheckboxCardRoot';
import CheckboxTextContent from './CheckboxTextContent';

const CheckboxComponent = createCheckbox({
  Root: StyledCheckbox,
  Group: StyledCheckboxGroup,
  Indicator: StyledCheckboxIndicator,
  Icon: StyledCheckboxIcon,
  Label: StyledCheckboxLabel,
});

const CheckboxGroup = CheckboxComponent.Group;
const CheckboxIndicator = CheckboxComponent.Indicator;
const CheckboxIcon = CheckboxComponent.Icon;
const CheckboxLabel = CheckboxComponent.Label;

CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxIndicator.displayName = 'CheckboxIndicator';
CheckboxIcon.displayName = 'CheckboxIcon';
CheckboxLabel.displayName = 'CheckboxLabel';

const Checkbox = forwardRef<ElementRef<typeof Pressable>, CheckboxProps>(
  (
    {
      children,
      label,
      disabled,
      checked,
      helperIcon,
      helperText,
      invalidText,
      validText,
      validationStatus: validation,
      showValidationIcon,
      type = 'default',
      ...props
    },
    ref
  ) => {
    const { validationStatus: fieldValidationStatus } = useFormFieldContext();
    const { validationStatus: groupValidationStatus, type: groupType } = useCheckboxGroupContext();
    const validationStatus =
      fieldValidationStatus ?? groupValidationStatus ?? validation ?? 'initial';
    const checkboxType = groupType ?? type;
    const checkboxChildren = children ? (
      children
    ) : (
      <>
        <CheckboxIndicator>
          <CheckboxIcon />
        </CheckboxIndicator>
        <CheckboxTextContent>
          {!!label && <CheckboxLabel>{label}</CheckboxLabel>}
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
        </CheckboxTextContent>
      </>
    );
    return (
      // @ts-expect-error - ref is not a valid prop for Pressable
      <CheckboxComponent ref={ref} {...props} isDisabled={disabled} isChecked={checked}>
        {checkboxType === 'card' ? (
          <CheckboxCardRoot>{checkboxChildren}</CheckboxCardRoot>
        ) : (
          checkboxChildren
        )}
      </CheckboxComponent>
    );
  }
);

const CheckboxCard = forwardRef<ElementRef<typeof Pressable>, CheckboxProps>(
  ({ type = 'card', ...props }, ref) => {
    return <Checkbox {...props} ref={ref} type={type} />;
  }
);

CheckboxCard.displayName = 'CheckboxCard';

Checkbox.displayName = 'Checkbox';

export { Checkbox, CheckboxGroup, CheckboxIndicator, CheckboxIcon, CheckboxLabel, CheckboxCard };

export default Checkbox;
