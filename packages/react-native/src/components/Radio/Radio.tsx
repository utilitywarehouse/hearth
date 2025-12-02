import { createRadio } from '@gluestack-ui/radio';
import RadioProps from './Radio.props';
import StyledRadioGroup from './RadioGroupRoot';
import StyledRadioIcon from './RadioIcon';
import StyledRadioIndicator from './RadioIndicator';
import StyledRadioLabel from './RadioLabel';
import StyledRadio from './RadioRoot';

import { useFormFieldContext } from '../FormField';
import { Helper } from '../Helper';
import { useRadioGroupContext } from './RadioGroup.context';
import RadioTextContent from './RadioTextContent';
import RadioTileRoot from './RadioTileRoot';

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

const Radio = ({
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
  image,
  ...props
}: RadioProps) => {
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
      {image ? image : null}
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
    <RadioComponent {...props} isDisabled={disabled}>
      {radioType === 'tile' ? <RadioTileRoot>{radioChildren}</RadioTileRoot> : radioChildren}
    </RadioComponent>
  );
};

const RadioTile = ({ type = 'tile', ...props }: RadioProps) => <Radio {...props} type={type} />;

RadioTile.displayName = 'RadioTile';
Radio.displayName = 'Radio';

export { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, RadioTile };

export default Radio;
