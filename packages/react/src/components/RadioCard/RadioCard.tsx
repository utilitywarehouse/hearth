import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import type { RadioCardProps } from './RadioCard.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { SelectableCard } from '../SelectableCard/SelectableCard';
import { Radio } from '../Radio/Radio';
import { CardAction } from '../Card/CardAction';

const componentName = 'RadioCard';
const componentClassName = withGlobalPrefix(componentName);

type RadioCardElement = ElementRef<'button'>;

/**
 * `RadioCard` can be used to choose between a set of more than two options.
 *
 * `RadioCard` should always be used with a `RadioGroup` or `RadioGridGroup` to
 * handle the state control and layout.
 *
 * `RadioCard` is, by default, appropriately labelled when using
 * the `label` prop, if you do not provide a label, you must specify an
 * `aria-label` or `aria-labelledby` for accessibility.
 */
export const RadioCard = React.forwardRef<RadioCardElement, RadioCardProps>(
  ({ className, disabled, children, ...props }, ref) => {
    return (
      <SelectableCard
        className={clsx(componentClassName, className)}
        data-disabled={disabled ? '' : undefined}
        direction="column"
        gap="150"
      >
        <CardAction>
          <Radio ref={ref} {...props} disabled={disabled} labelFontWeight="semibold" />
        </CardAction>
        {children}
      </SelectableCard>
    );
  }
);

RadioCard.displayName = componentName;
