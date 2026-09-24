'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import type { RadioProps } from './Radio.props';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { useIds } from '../../hooks/use-ids';
import { HelperText } from '../HelperText/HelperText';
import { useFormGroupBase } from '../FormGroupBase/FormGroupBase.context';

const COMPONENT_NAME = 'Radio';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type RadioElement = ComponentRef<'button'>;

/**
 * Use Radio to let a user select a single option from a set of mutually
 * exclusive choices, always as a child of RadioGroup. RadioTile is preferred
 * for most cases as it offers a larger, more prominent target — reach for
 * Radio only when a compact, plain radio button is needed.
 *
 * @summary A single radio button for selecting one option from a set, used within RadioGroup.
 */
export const Radio = forwardRef<RadioElement, RadioProps>(
  (
    {
      id: providedId,
      label,
      helperText,
      image,
      className,
      labelFontWeight,
      disabled,
      'aria-labelledby': ariaLabelledby,
      ...props
    },
    ref
  ) => {
    const { id, labelId, helperTextId } = useIds({ providedId, prefix: 'radio' });
    const { hasGroupHelperText, 'aria-describedby': ariaDescribedby } = useFormGroupBase();
    const showHelperText = Boolean(!hasGroupHelperText && helperText !== undefined);
    const showLabel = !!label;
    return (
      <div
        className={cn(componentClassName, className)}
        data-testid={componentClassName}
        data-disabled={disabled ? true : undefined}
      >
        <div className={`${componentClassName}Container`}>
          <RadioGroupPrimitive.Item
            ref={ref}
            {...props}
            // We're not following the same pattern as Button here, where we
            // use `aria-disabled` instead, as focusing the radio item
            // selects it. Screen readers users can still navigate to the
            // radio item using the virtual keyboard. At the same time
            // keyboard users will not need to tab through disabled radio
            // items, which is the expected behavior for radio groups.
            disabled={disabled}
            id={id}
            aria-describedby={showHelperText ? helperTextId : ariaDescribedby}
            aria-labelledby={ariaLabelledby ? ariaLabelledby : label ? labelId : undefined}
            className={`${componentClassName}Item`}
          >
            <RadioGroupPrimitive.Indicator className={`${componentClassName}Indicator`} />
          </RadioGroupPrimitive.Item>
        </div>
        {showLabel ? (
          <Flex direction="column" gap="50">
            <Label id={labelId} htmlFor={id} disableUserSelect fontWeight={labelFontWeight}>
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
      </div>
    );
  }
);

Radio.displayName = COMPONENT_NAME;
