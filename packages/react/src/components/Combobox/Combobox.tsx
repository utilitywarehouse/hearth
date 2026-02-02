'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { useIds } from '../../hooks/use-ids';
import { FormField } from '../FormField/FormField';
import type { ComboboxProps } from './Combobox.props';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { InputBase } from '../InputBase/InputBase';
import { InputSlot } from '../InputSlot/InputSlot';
import {
  CloseSmallIcon,
  ExpandSmallIcon,
  SearchMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';
import { ComboboxItem } from './ComboboxItem';
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import { ComboboxEmpty } from './ComboboxEmpty';

const COMPONENT_NAME = 'Combobox';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export function Combobox<Value, Multiple extends boolean | undefined = false>(
  props: ComboboxProps<Value, Multiple>
) {
  const {
    className,
    children,
    triggerOnlyOnType,
    validationStatus,
    validationText,
    label,
    labelVariant,
    helperText,
    id: providedId,
    disabled,
    required,
    noOptionsFoundText,
    statusText,
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
      <ComboboxPrimitive.Root openOnInputClick={!triggerOnlyOnType} {...comboboxProps}>
        <ComboboxPrimitive.Input
          render={
            <InputBase id={id} disabled={disabled}>
              <ComboboxPrimitive.Trigger
                disabled={disabled}
                render={
                  <InputSlot placement="prefix" asChild>
                    <UnstyledIconButton type="button" label="Open popup" disabled={disabled}>
                      <SearchMediumIcon />
                    </UnstyledIconButton>
                  </InputSlot>
                }
              />
              <ComboboxPrimitive.Clear
                render={
                  <InputSlot placement="suffix" asChild>
                    <UnstyledIconButton type="button" label="Clear selection" disabled={disabled}>
                      <CloseSmallIcon />
                    </UnstyledIconButton>
                  </InputSlot>
                }
              />
              {triggerOnlyOnType ? null : (
                <ComboboxPrimitive.Trigger
                  disabled={disabled}
                  render={
                    <InputSlot placement="suffix" asChild>
                      <UnstyledIconButton type="button" label="Open popup" disabled={disabled}>
                        <ExpandSmallIcon />
                      </UnstyledIconButton>
                    </InputSlot>
                  }
                />
              )}
            </InputBase>
          }
        />

        <ComboboxPrimitive.Portal>
          <ComboboxPrimitive.Positioner
            side="bottom"
            sideOffset={16}
            align="start"
            alignOffset={-47}
          >
            <ComboboxPrimitive.Popup className={`${componentClassName}Popup`}>
              {statusText ? (
                <ComboboxPrimitive.Status>{statusText}</ComboboxPrimitive.Status>
              ) : null}
              {props.items ? (
                <ComboboxEmpty className={`${componentClassName}Empty`}>
                  {noOptionsFoundText}
                </ComboboxEmpty>
              ) : null}
              <ScrollAreaPrimitive.Root className={withGlobalPrefix('ScrollAreaRoot')} type="auto">
                <ScrollAreaPrimitive.Viewport className={withGlobalPrefix('ScrollAreaViewport')}>
                  <ComboboxPrimitive.List className={`${componentClassName}List`}>
                    {children
                      ? children
                      : (item: string) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                  </ComboboxPrimitive.List>
                </ScrollAreaPrimitive.Viewport>
                <ScrollAreaPrimitive.Scrollbar
                  className={withGlobalPrefix('ScrollAreaScrollbar')}
                  orientation="vertical"
                >
                  <ScrollAreaPrimitive.Thumb className={withGlobalPrefix('ScrollAreaThumb')} />
                </ScrollAreaPrimitive.Scrollbar>
              </ScrollAreaPrimitive.Root>
            </ComboboxPrimitive.Popup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      </ComboboxPrimitive.Root>
    </FormField>
  );
}

Combobox.displayName = COMPONENT_NAME;
