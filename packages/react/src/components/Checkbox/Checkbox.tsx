'use client';

import { cn } from '../../helpers/cn';
import type { CheckboxProps } from './Checkbox.props';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { HelperText } from '../HelperText/HelperText';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { useIds } from '../../hooks/use-ids';
import { marginPropDefs } from '../../props/margin.props';
import { extractProps } from '../../helpers/extract-props';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { useCheckboxGroup } from '../CheckboxGroup/CheckboxGroup.context';
import { useFormGroupBase } from '../FormGroupBase/FormGroupBase.context';

const COMPONENT_NAME = 'Checkbox';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Checkbox = (props: CheckboxProps) => {
  const {
    id: providedId,
    label,
    helperText,
    className,
    disabled,
    onCheckedChange,
    value = 'on',
    'aria-labelledby': ariaLabelledby,
    image,
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

  return (
    <Flex className={cn(componentClassName, className)} data-disabled={disabled ? '' : undefined}>
      <CheckboxPrimitive.Root
        className={`${componentClassName}Root`}
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
        <CheckboxPrimitive.Indicator asChild className={`${componentClassName}Indicator`}>
          <TickSmallIcon />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {showLabel ? (
        <Flex direction="column" gap="50">
          <Label id={labelId} htmlFor={id} disableUserSelect>
            {image}
            {label}
          </Label>
          {showHelperText ? (
            <HelperText id={helperTextId} disableUserSelect>
              {helperText}
            </HelperText>
          ) : null}
        </Flex>
      ) : null}
    </Flex>
  );
};

Checkbox.displayName = COMPONENT_NAME;
