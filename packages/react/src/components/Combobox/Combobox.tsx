'use client';

import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { useIds } from '../../hooks/use-ids';
import { FormField } from '../FormField/FormField';
import { ComboboxProps } from './Combobox.props';
import { Combobox as BaseUICombobox } from '@base-ui-components/react/combobox';
import { InputBase } from '../InputBase/InputBase';
import { TextInputSlot } from '../TextInputSlot/TextInputSlot';
import {
  CloseSmallIcon,
  ExpandSmallIcon,
  SearchMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';
import { ComboboxItem } from './ComboboxItem';
import { ScrollArea as RadixScrollArea } from 'radix-ui';

const COMPONENT_NAME = 'Combobox';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Combobox = (props: ComboboxProps) => {
  const {
    className,
    children,
    triggerOnlyOnType,
    validationStatus,
    validationText,
    label,
    helperText,
    id: providedId,
    disabled,
    required,
    ...comboboxProps
  } = extractProps(props, marginPropDefs);

  const { id, labelId, helperTextId, validationTextId } = useIds({
    providedId,
    prefix: 'combobox',
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
      <BaseUICombobox.Root openOnInputClick={!triggerOnlyOnType} {...comboboxProps}>
        <BaseUICombobox.Input
          render={
            <InputBase id={id}>
              <TextInputSlot placement="prefix">
                <SearchMediumIcon />
              </TextInputSlot>
              <BaseUICombobox.Clear
                aria-label="Clear selection"
                render={
                  <TextInputSlot placement="suffix">
                    <CloseSmallIcon />
                  </TextInputSlot>
                }
              />
              {triggerOnlyOnType ? null : (
                <BaseUICombobox.Trigger
                  aria-label="Open popup"
                  render={
                    <TextInputSlot placement="suffix">
                      <ExpandSmallIcon />
                    </TextInputSlot>
                  }
                />
              )}
            </InputBase>
          }
        />

        <BaseUICombobox.Portal>
          <BaseUICombobox.Positioner side="bottom" sideOffset={16} align="start" alignOffset={-46}>
            <BaseUICombobox.Popup className={`${componentClassName}Popup`}>
              {/* <Combobox.Status /> */}
              {/* <Combobox.Empty /> */}
              <RadixScrollArea.Root className="hearth-ScrollAreaRoot" type="auto">
                <RadixScrollArea.Viewport className="hearth-ScrollAreaViewport">
                  <BaseUICombobox.List className={`${componentClassName}List`}>
                    {children
                      ? children
                      : (item: string) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                  </BaseUICombobox.List>
                </RadixScrollArea.Viewport>
                <RadixScrollArea.Scrollbar
                  className="hearth-ScrollAreaScrollbar"
                  orientation="vertical"
                >
                  <RadixScrollArea.Thumb className="hearth-ScrollAreaThumb" />
                </RadixScrollArea.Scrollbar>
              </RadixScrollArea.Root>
            </BaseUICombobox.Popup>
          </BaseUICombobox.Positioner>
        </BaseUICombobox.Portal>
      </BaseUICombobox.Root>
    </FormField>
  );
};

Combobox.displayName = COMPONENT_NAME;
