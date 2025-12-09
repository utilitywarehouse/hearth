'use client';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { useIds } from '../../hooks/use-ids';
import { FormField } from '../FormField/FormField';
import { ComboboxProps } from './Combobox.props';
import { Combobox as BaseUICombobox } from '@base-ui-components/react/combobox';
import { InputBase } from '../InputBase/InputBase';
import { InputSlot } from '../InputSlot/InputSlot';
import {
  CloseSmallIcon,
  ExpandSmallIcon,
  SearchMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';
import { ComboboxItem } from './ComboboxItem';
import { ScrollArea as RadixScrollArea } from 'radix-ui';
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
            <InputBase id={id} disabled={disabled}>
              <BaseUICombobox.Trigger
                disabled={disabled}
                render={
                  <InputSlot placement="prefix" asChild>
                    <UnstyledIconButton type="button" label="Open popup" disabled={disabled}>
                      <SearchMediumIcon />
                    </UnstyledIconButton>
                  </InputSlot>
                }
              />
              <BaseUICombobox.Clear
                render={
                  <InputSlot placement="suffix" asChild>
                    <UnstyledIconButton type="button" label="Clear selection" disabled={disabled}>
                      <CloseSmallIcon />
                    </UnstyledIconButton>
                  </InputSlot>
                }
              />
              {triggerOnlyOnType ? null : (
                <BaseUICombobox.Trigger
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

        <BaseUICombobox.Portal>
          <BaseUICombobox.Positioner side="bottom" sideOffset={16} align="start" alignOffset={-47}>
            <BaseUICombobox.Popup className={`${componentClassName}Popup`}>
              {statusText ? <BaseUICombobox.Status /> : null}
              {props.items ? (
                <ComboboxEmpty className={`${componentClassName}Empty`}>
                  {noOptionsFoundText}
                </ComboboxEmpty>
              ) : null}
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
}

Combobox.displayName = COMPONENT_NAME;
