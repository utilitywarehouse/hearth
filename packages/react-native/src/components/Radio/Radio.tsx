import RadioProps from './Radio.props';
import RadioIconComponent from './RadioIcon';
import RadioIndicatorComponent from './RadioIndicator';
import RadioLabelComponent from './RadioLabel';
import RadioRootComponent from './RadioRoot';

import { useFormFieldContext } from '../FormField';
import { Helper } from '../Helper';
import { resolveRadioType, resolveValidationStatus } from './Radio.utils';
import { useRadioGroupContext } from './RadioGroup.context';
import RadioTextContent from './RadioTextContent';
import RadioTileRoot from './RadioTileRoot';

const RadioIndicator = RadioIndicatorComponent;
const RadioIcon = RadioIconComponent;
const RadioLabel = RadioLabelComponent;

const Radio = ({
  children,
  label,
  disabled,
  helperIcon,
  helperText,
  badge,
  invalidText,
  validText,
  validationStatus: validation,
  showValidationIcon,
  type = 'default',
  image,
  value,
  onChange,
  ...props
}: RadioProps) => {
  const { validationStatus: fieldValidationStatus } = useFormFieldContext();
  const {
    validationStatus: groupValidationStatus,
    type: groupType,
    disabled: groupDisabled,
    selectedValue,
    select,
  } = useRadioGroupContext();
  const validationStatus = resolveValidationStatus({
    fieldValidationStatus,
    groupValidationStatus,
    validation,
  });
  const radioType = resolveRadioType({ groupType, type });
  const radioDisabled = groupDisabled ?? disabled;
  const checked = selectedValue === value;

  const handlePress = () => {
    if (radioDisabled) return;
    select?.(value);
    onChange?.(true);
  };

  const radioChildren = children ? (
    children
  ) : (
    <>
      <RadioIndicator>{checked && <RadioIcon />}</RadioIndicator>
      {image ? image : null}
      <RadioTextContent>
        {!!label && <RadioLabel>{label}</RadioLabel>}
        {!!helperText && <Helper disabled={disabled} icon={helperIcon} text={helperText} />}
        {badge ? badge : null}
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
    <RadioRootComponent
      {...props}
      value={value}
      disabled={radioDisabled}
      checked={checked}
      onPress={handlePress}
    >
      {radioType === 'tile' ? <RadioTileRoot>{radioChildren}</RadioTileRoot> : radioChildren}
    </RadioRootComponent>
  );
};

const RadioTile = ({ type = 'tile', ...props }: RadioProps) => <Radio {...props} type={type} />;

RadioTile.displayName = 'RadioTile';
Radio.displayName = 'Radio';

export { Radio, RadioIcon, RadioIndicator, RadioLabel, RadioTile };

export default Radio;
