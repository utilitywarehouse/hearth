import React, { ElementRef } from 'react';
import { createRadio } from '@gluestack-ui/radio';
import StyledRadio from './RadioRoot';
import StyledRadioIndicator from './RadioIndicator';
import StyledRadioIcon from './RadioIcon';
import StyledRadioLabel from './RadioLabel';
import StyledRadioGroup from './RadioGroupRoot';
import { forwardRef } from 'react';
import RadioProps from './Radio.props';
import { Pressable } from 'react-native';
import { Helper } from '../Helper';
import { useRadioGroupContext } from './RadioGroup.context';
import { useFormFieldContext } from '../FormField';
import RadioCardRoot from './RadioCardRoot';
import RadioTextContent from './RadioTextContent';

const RadioComponent = createRadio({
  Root: StyledRadio,
  Group: StyledRadioGroup,
  Indicator: StyledRadioIndicator,
  Icon: StyledRadioIcon,
  Label: StyledRadioLabel,
});

const RadioGroup = RadioComponent.Group;
const RadioIndicator = RadioComponent.Indicator;
const RadioIcon = RadioComponent.Icon;
const RadioLabel = RadioComponent.Label;

RadioGroup.displayName = 'RadioGroup';
RadioIndicator.displayName = 'RadioIndicator';
RadioIcon.displayName = 'RadioIcon';
RadioLabel.displayName = 'RadioLabel';

const Radio = forwardRef<ElementRef<typeof Pressable>, RadioProps>(
  (
    {
      children,
      label,
      disabled,
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
    const { validationStatus: groupValidationStatus, type: groupType } = useRadioGroupContext();
    const validationStatus =
      fieldValidationStatus ?? groupValidationStatus ?? validation ?? 'initial';
    const radioType = groupType ?? type;
    const radioChildren = children ? (
      children
    ) : (
      <>
        <RadioIndicator>
          <RadioIcon />
        </RadioIndicator>
        <RadioTextContent>
          {!!label && <RadioLabel>{label}</RadioLabel>}
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
        </RadioTextContent>
      </>
    );
    return (
      // @ts-expect-error - ref is not a valid prop for Pressable
      <RadioComponent ref={ref} {...props} isDisabled={disabled}>
        {radioType === 'card' ? <RadioCardRoot>{radioChildren}</RadioCardRoot> : radioChildren}
      </RadioComponent>
    );
  }
);

const RadioCard = forwardRef<ElementRef<typeof Pressable>, RadioProps>(
  ({ type = 'card', ...props }, ref) => {
    return <Radio {...props} ref={ref} type={type} />;
  }
);

RadioCard.displayName = 'RadioCard';
Radio.displayName = 'default';

export { Radio, RadioGroup, RadioIndicator, RadioIcon, RadioLabel, RadioCard };

export default Radio;
