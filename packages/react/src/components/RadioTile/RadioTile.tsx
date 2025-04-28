import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import type { RadioTileProps } from './RadioTile.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { SelectableCard } from '../SelectableCard/SelectableCard';
import { Radio } from '../Radio/Radio';
import { CardAction } from '../Card/CardAction';

const componentName = 'RadioTile';
const componentClassName = withGlobalPrefix(componentName);

type RadioTileElement = ElementRef<'button'>;

/**
 * `RadioTile` can be used to choose between a set of more than two options.
 *
 * `RadioTile` should always be used with a `RadioGroup` or `RadioGridGroup` to
 * handle the state control and layout.
 *
 * `RadioTile` is, by default, appropriately labelled when using
 * the `label` prop, if you do not provide a label, you must specify an
 * `aria-label` or `aria-labelledby` for accessibility.
 */
export const RadioTile = React.forwardRef<RadioTileElement, RadioTileProps>(
  ({ className, ...props }, ref) => {
    return (
      <SelectableCard className={clsx(componentClassName, className)} compact>
        <CardAction>
          <Radio ref={ref} {...props} />
        </CardAction>
      </SelectableCard>
    );
  }
);

RadioTile.displayName = componentName;
