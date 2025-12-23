'use client';

import { cn } from '../../helpers/cn';
import type { RadioCardProps } from './RadioCard.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { useIds } from '../../hooks/use-ids';
import { Label } from '../Label/Label';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';

const COMPONENT_NAME = 'RadioCard';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const RadioCard = (props: RadioCardProps) => {
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
      className={cn(componentClassName, className)}
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
};

RadioCard.displayName = COMPONENT_NAME;
