'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import type { SelectProps } from './Select.props';
import { Select as SelectPrimitive, ScrollArea as ScrollAreaPrimitive } from 'radix-ui';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { useIds } from '../../hooks/use-ids';
import { FormField } from '../FormField/FormField';

const COMPONENT_NAME = 'Select';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SelectElement = ComponentRef<'button'>;

export const Select = forwardRef<SelectElement, SelectProps>((props, ref) => {
  const {
    className,
    children,
    placeholder,
    validationStatus,
    validationText,
    label,
    labelVariant,
    helperText,
    id: providedId,
    disabled,
    required,
    ...selectProps
  } = extractProps(props, marginPropDefs);

  const { id, labelId, helperTextId, validationTextId } = useIds({
    providedId,
    prefix: 'select',
  });

  const showValidation = !disabled;

  const formFieldProps = {
    id,
    labelId,
    helperTextId,
    validationTextId,
    label,
    labelVariant,
    helperText,
    validationText: showValidation ? validationText : undefined,
    validationStatus: showValidation ? validationStatus : undefined,
    required,
  };

  return (
    <FormField
      className={cn(componentClassName, className)}
      data-disabled={disabled ? '' : undefined}
      {...formFieldProps}
    >
      <SelectPrimitive.Root {...selectProps}>
        <SelectPrimitive.Trigger
          id={id}
          ref={ref}
          className={`${componentClassName}Trigger`}
          disabled={disabled}
        >
          <SelectPrimitive.Value placeholder={placeholder} data-truncate />
          <SelectPrimitive.Icon className={`${componentClassName}TriggerIcon`}>
            <ExpandSmallIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={`${componentClassName}Content`}
            position="popper"
            side="bottom"
            sideOffset={4}
          >
            <ScrollAreaPrimitive.Root className={withGlobalPrefix('ScrollAreaRoot')} type="auto">
              <SelectPrimitive.Viewport className={`${componentClassName}Viewport`}>
                <ScrollAreaPrimitive.Viewport className={withGlobalPrefix('ScrollAreaViewport')}>
                  {children}
                </ScrollAreaPrimitive.Viewport>
              </SelectPrimitive.Viewport>
              <ScrollAreaPrimitive.Scrollbar
                className={withGlobalPrefix('ScrollAreaScrollbar')}
                orientation="vertical"
              >
                <ScrollAreaPrimitive.Thumb className={withGlobalPrefix('ScrollAreaThumb')} />
              </ScrollAreaPrimitive.Scrollbar>
            </ScrollAreaPrimitive.Root>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </FormField>
  );
});

Select.displayName = COMPONENT_NAME;
