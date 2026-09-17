'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import type { RadioCardProps } from './RadioCard.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { useIds } from '../../hooks/use-ids';
import { Label } from '../Label/Label';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'RadioCard';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type RadioCardElement = ComponentRef<'button'>;

/**
 * Use RadioCard within a RadioGroup to present a radio option in a card-like
 * visual style, when the option is a primary focus of the UI or benefits from
 * additional explanatory content — unlike RadioTile, it accepts children. For
 * simpler grouped options use RadioTile instead.
 *
 * @summary A card-styled radio option for use within RadioGroup, supporting additional content.
 */
export const RadioCard = forwardRef<RadioCardElement, RadioCardProps>((props, ref) => {
  const {
    className,
    children,
    id: providedId,
    label,
    'aria-labelledby': ariaLabelledby,
    image,
    ...radioCardProps
  } = extractProps(props, marginPropDefs);
  const { id, labelId } = useIds({ providedId, prefix: 'radio' });
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(componentClassName, className)}
      data-testid={componentClassName}
      {...radioCardProps}
      id={id}
      aria-labelledby={ariaLabelledby ? ariaLabelledby : label ? labelId : undefined}
    >
      <div className={withGlobalPrefix('RadioContainer')}>
        <div className={withGlobalPrefix('RadioItem')}>
          <RadioGroupPrimitive.Indicator className={withGlobalPrefix('RadioIndicator')} />
        </div>
        <Label id={labelId} htmlFor={id} disableUserSelect fontWeight="semibold">
          {image}
          {label}
        </Label>
      </div>
      {children}
    </RadioGroupPrimitive.Item>
  );
});

RadioCard.displayName = COMPONENT_NAME;
