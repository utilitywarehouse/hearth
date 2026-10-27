'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import type { SelectProps } from './Select.props';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { useIds } from '../../hooks/use-ids';
import { mergeIds } from '../../helpers/merge-ids';
import { FormField } from '../FormField/FormField';

const COMPONENT_NAME = 'Select';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SelectElement = ComponentRef<'button'>;

/**
 * Use Select to let users choose a single option from a list, when the choice
 * requires a final submit action to confirm — for a choice that applies
 * immediately, consider SegmentedControl instead. Wrap SelectItem children to
 * define the options, and always provide a `label`.
 *
 * @summary A dropdown for selecting a single option from a list of choices.
 */
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
    'aria-describedby': ariaDescribedby,
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

  const isInvalid = showValidation && validationStatus === 'invalid';

  const ariaDescribedbyValue = mergeIds(
    ariaDescribedby,
    helperText ? helperTextId : undefined,
    showValidation && validationStatus !== undefined && validationText !== undefined
      ? validationTextId
      : undefined
  );

  return (
    <FormField
      className={cn(componentClassName, className)}
      data-disabled={disabled ? '' : undefined}
      data-testid={componentClassName}
      {...formFieldProps}
    >
      <SelectPrimitive.Root {...selectProps}>
        <SelectPrimitive.Trigger
          id={id}
          ref={ref}
          className={`${componentClassName}Trigger`}
          disabled={disabled}
          aria-describedby={ariaDescribedbyValue}
          aria-invalid={isInvalid ? true : undefined}
          aria-errormessage={
            isInvalid && validationText !== undefined ? validationTextId : undefined
          }
        >
          <SelectPrimitive.Value placeholder={placeholder} data-truncate />
          <SelectPrimitive.Icon className={`${componentClassName}TriggerIcon`}>
            <ExpandSmallIcon />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Positioner side="bottom" sideOffset={4} alignItemWithTrigger={false}>
            <SelectPrimitive.Popup className={`${componentClassName}Content`}>
              <ScrollAreaPrimitive.Root className={withGlobalPrefix('ScrollAreaRoot')}>
                <ScrollAreaPrimitive.Viewport className={withGlobalPrefix('ScrollAreaViewport')}>
                  <SelectPrimitive.List className={`${componentClassName}List`}>
                    {children}
                  </SelectPrimitive.List>
                </ScrollAreaPrimitive.Viewport>
                <ScrollAreaPrimitive.Scrollbar
                  className={withGlobalPrefix('ScrollAreaScrollbar')}
                  orientation="vertical"
                >
                  <ScrollAreaPrimitive.Thumb className={withGlobalPrefix('ScrollAreaThumb')} />
                </ScrollAreaPrimitive.Scrollbar>
              </ScrollAreaPrimitive.Root>
            </SelectPrimitive.Popup>
          </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </FormField>
  );
});

Select.displayName = COMPONENT_NAME;
