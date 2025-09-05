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
import { Flex } from '../Flex/Flex';

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
    image: RadioImage,
    ...radioCardProps
  } = extractProps(props, marginPropDefs);
  const { id, labelId } = useIds({ providedId, prefix: 'radio' });
  const showImage = !!RadioImage;
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

        <Flex direction="row" className="hearth-RadioLabel">
          {showImage ? <RadioImage /> : null}
          <Label id={labelId} htmlFor={id} disableUserSelect fontWeight="semibold">
            {label}
          </Label>
        </Flex>
      </div>
      {children}
    </RadixRadioGroup.Item>
  );
});

RadioCard.displayName = componentName;
