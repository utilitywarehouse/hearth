import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import type { RadioCardProps } from './RadioCard.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { useIds } from '../../hooks/use-ids';
import { Label } from '../Label/Label';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { RadioGroup as RadixRadioGroup } from 'radix-ui';

const componentName = 'RadioCard';
const componentClassName = withGlobalPrefix(componentName);

type RadioCardElement = ElementRef<'button'>;

export const RadioCard = React.forwardRef<RadioCardElement, RadioCardProps>((props, ref) => {
  const {
    className,
    children,
    id: providedId,
    label,
    'aria-labelledby': ariaLabelledby,
    ...radioCardProps
  } = extractProps(props, marginPropDefs);
  const { id, labelId } = useIds({ providedId, prefix: 'radio' });
  return (
    <RadixRadioGroup.Item
      ref={ref}
      className={clsx(componentClassName, className)}
      {...radioCardProps}
      id={id}
      aria-labelledby={ariaLabelledby ? ariaLabelledby : label ? labelId : undefined}
    >
      <div className="hearth-RadioContainer">
        <div className="hearth-RadioItem">
          <RadixRadioGroup.Indicator className="hearth-RadioIndicator" />
        </div>
        <Label id={labelId} htmlFor={id} disableUserSelect fontWeight="semibold">
          {label}
        </Label>
      </div>
      {children}
    </RadixRadioGroup.Item>
  );
});

RadioCard.displayName = componentName;
