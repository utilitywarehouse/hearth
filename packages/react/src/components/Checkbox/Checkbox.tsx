import * as React from 'react';
import clsx from 'clsx';
import type { CheckboxProps } from './Checkbox.props';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { HelperText } from '../HelperText/HelperText';
import type { ElementRef } from 'react';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { useIds } from '../../hooks/use-ids';
import { marginPropDefs } from '../../props/margin.props';
import { extractProps } from '../../helpers/extract-props';
import { Checkbox as RadixCheckbox } from 'radix-ui';
import { useCheckboxGroup } from '../CheckboxGroup/CheckboxGroup.context';
import { useFormGroupBase } from '../FormGroupBase/FormGroupBase.context';

const componentName = 'Checkbox';
const componentClassName = withGlobalPrefix(componentName);

export type CheckboxElement = ElementRef<'button'>;

export const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>((props, ref) => {
  const {
    id: providedId,
    label,
    helperText,
    className,
    disabled,
    onCheckedChange,
    value = 'on',
    'aria-labelledby': ariaLabelledby,
    image: CheckboxImage,
    ...checkboxProps
  } = extractProps(props, marginPropDefs);
  const { id, labelId, helperTextId } = useIds({ providedId, prefix: 'checkbox' });
  const context = useFormGroupBase();
  const checkboxContext = useCheckboxGroup();
  const checked = checkboxContext?.value?.includes(value);
  const hasGroupHelperText = context?.hasGroupHelperText;
  const ariaDescribedby = context ? context['aria-describedby'] : '';
  const showHelperText = !hasGroupHelperText && !!helperText;
  const showLabel = !!label;
  const showImage = !!CheckboxImage;

  return (
    <Flex
      gap="100"
      className={clsx(componentClassName, className)}
      data-disabled={disabled ? '' : undefined}
    >
      <RadixCheckbox.Root
        ref={ref}
        className="hearth-CheckboxRoot"
        name={checkboxContext?.name}
        checked={checked}
        value={value}
        {...checkboxProps}
        id={id}
        disabled={disabled}
        aria-describedby={showHelperText ? helperTextId : ariaDescribedby}
        aria-labelledby={ariaLabelledby || showLabel ? labelId : undefined}
        onCheckedChange={(checked: boolean) => {
          if (context) {
            if (checked) {
              checkboxContext?.onItemCheck(value);
            } else {
              checkboxContext?.onItemUncheck(value);
            }
          }
          if (onCheckedChange) {
            onCheckedChange(checked);
          }
        }}
      >
        <RadixCheckbox.Indicator asChild className="hearth-CheckboxIndicator">
          <TickSmallIcon />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {showLabel ? (
        <Flex direction="column" gap="50">
          <Flex direction="row" className="hearth-CheckboxLabel">
            {showImage ? <CheckboxImage /> : null}
            <Label id={labelId} htmlFor={id} disableUserSelect>
              {label}
            </Label>
          </Flex>
          {showHelperText ? (
            <HelperText id={helperTextId} disableUserSelect>
              {helperText}
            </HelperText>
          ) : null}
        </Flex>
      ) : null}
    </Flex>
  );
});

Checkbox.displayName = componentName;
