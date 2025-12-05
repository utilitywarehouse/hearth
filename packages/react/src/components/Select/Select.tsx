'use client';

import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { SelectProps } from './Select.props';
import { Select as RadixSelect, ScrollArea as RadixScrollArea } from 'radix-ui';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { useIds } from '../../hooks/use-ids';
import { FormField } from '../FormField/FormField';

const COMPONENT_NAME = 'Select';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SelectElement = ElementRef<'button'>;

export const Select = React.forwardRef<SelectElement, SelectProps>((props, ref) => {
  const {
    className,
    children,
    placeholder,
    validationStatus,
    validationText,
    label,
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
    helperText,
    validationText: showValidation ? validationText : undefined,
    validationStatus: showValidation ? validationStatus : undefined,
    required,
  };

  return (
    <FormField
      className={clsx(componentClassName, className)}
      data-disabled={disabled ? '' : undefined}
      {...formFieldProps}
    >
      <RadixSelect.Root {...selectProps}>
        <RadixSelect.Trigger
          id={id}
          ref={ref}
          className={`${componentClassName}Trigger`}
          disabled={disabled}
        >
          <RadixSelect.Value className={`${componentClassName}Value`} placeholder={placeholder} />
          <RadixSelect.Icon className={`${componentClassName}TriggerIcon`}>
            <ExpandSmallIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            className={`${componentClassName}Content`}
            position="popper"
            side="bottom"
            sideOffset={4}
          >
            <RadixScrollArea.Root className="hearth-ScrollAreaRoot" type="auto">
              <RadixSelect.Viewport className={`${componentClassName}Viewport`}>
                <RadixScrollArea.Viewport className="hearth-ScrollAreaViewport">
                  {children}
                </RadixScrollArea.Viewport>
              </RadixSelect.Viewport>
              <RadixScrollArea.Scrollbar
                className="hearth-ScrollAreaScrollbar"
                orientation="vertical"
              >
                <RadixScrollArea.Thumb className="hearth-ScrollAreaThumb" />
              </RadixScrollArea.Scrollbar>
            </RadixScrollArea.Root>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </FormField>
  );
});

Select.displayName = COMPONENT_NAME;
