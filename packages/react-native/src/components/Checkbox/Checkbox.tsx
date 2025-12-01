import { createCheckbox } from '@gluestack-ui/checkbox';
import { useFormFieldContext } from '../FormField';
import { Helper } from '../Helper';
import CheckboxProps from './Checkbox.props';
import { useCheckboxGroupContext } from './CheckboxGroup.context';
import StyledCheckboxGroup from './CheckboxGroupRoot';
import StyledCheckboxIcon from './CheckboxIcon';
import StyledCheckboxIndicator from './CheckboxIndicator';
import StyledCheckboxLabel from './CheckboxLabel';
import StyledCheckbox from './CheckboxRoot';
import CheckboxTextContent from './CheckboxTextContent';
import CheckboxTileRoot from './CheckboxTileRoot';

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

const Checkbox = ({
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
  image,
  ...props
}: CheckboxProps) => {
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
      {image ? image : null}
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
    // @ts-expect-error - type
    <CheckboxComponent {...props} isDisabled={disabled} isChecked={checked}>
      {checkboxType === 'tile' ? (
        <CheckboxTileRoot>{checkboxChildren}</CheckboxTileRoot>
      ) : (
        checkboxChildren
      )}
    </CheckboxComponent>
  );
};
const CheckboxTile = ({ type = 'tile', ...props }: CheckboxProps) => {
  return <Checkbox {...props} type={type} />;
};

CheckboxTile.displayName = 'CheckboxTile';

Checkbox.displayName = 'Checkbox';

export { Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel, CheckboxTile };

export default Checkbox;
