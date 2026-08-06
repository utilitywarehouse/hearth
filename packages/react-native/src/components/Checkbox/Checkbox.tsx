import { useFormFieldContext } from '../FormField';
import { Helper } from '../Helper';
import CheckboxProps from './Checkbox.props';
import { useCheckboxGroupContext } from './CheckboxGroup.context';
import CheckboxIconComponent from './CheckboxIcon';
import CheckboxIndicatorComponent from './CheckboxIndicator';
import CheckboxLabelComponent from './CheckboxLabel';
import CheckboxRootComponent from './CheckboxRoot';
import CheckboxTextContent from './CheckboxTextContent';
import CheckboxTileRoot from './CheckboxTileRoot';

const CheckboxIndicator = CheckboxIndicatorComponent;
const CheckboxIcon = CheckboxIconComponent;
const CheckboxLabel = CheckboxLabelComponent;

const Checkbox = ({
  children,
  label,
  disabled,
  checked: ownChecked,
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
}: CheckboxProps) => {
  const { validationStatus: fieldValidationStatus } = useFormFieldContext();
  const {
    validationStatus: groupValidationStatus,
    type: groupType,
    disabled: groupDisabled,
    selectedValues,
    select,
  } = useCheckboxGroupContext();
  const validationStatus =
    fieldValidationStatus ?? groupValidationStatus ?? validation ?? 'initial';
  const checkboxType = groupType ?? type;
  const checkboxDisabled = groupDisabled ?? disabled;
  const stringValue = (value ?? '').toString();
  const checked = selectedValues ? selectedValues.includes(stringValue) : !!ownChecked;

  const handlePress = () => {
    if (checkboxDisabled) return;
    select?.(stringValue);
    onChange?.(!checked);
  };

  const checkboxChildren = children ? (
    children
  ) : (
    <>
      <CheckboxIndicator>
        <CheckboxIcon />
      </CheckboxIndicator>
      {image ? image : null}
      <CheckboxTextContent>
        {!!label && <CheckboxLabel>{label}</CheckboxLabel>}
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
      </CheckboxTextContent>
    </>
  );
  return (
    <CheckboxRootComponent
      {...props}
      value={value}
      disabled={checkboxDisabled}
      checked={checked}
      onPress={handlePress}
    >
      {checkboxType === 'tile' ? (
        <CheckboxTileRoot>{checkboxChildren}</CheckboxTileRoot>
      ) : (
        checkboxChildren
      )}
    </CheckboxRootComponent>
  );
};
const CheckboxTile = ({ type = 'tile', ...props }: CheckboxProps) => {
  return <Checkbox {...props} type={type} />;
};

CheckboxTile.displayName = 'CheckboxTile';

Checkbox.displayName = 'Checkbox';

export { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel, CheckboxTile };

export default Checkbox;
