import * as React from 'react';

import clsx from 'clsx';

import type { RadioGroupProps } from './RadioGroup.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import type { ElementRef } from 'react';
import { RadioGroupBase } from '../RadioGroupBase/RadioGroupBase';

const componentName = 'RadioGroup';
const componentClassName = withGlobalPrefix(componentName);

type RadioGroupElement = ElementRef<'div'>;

/**
 * The `RadioGroup` provides an accessible way to group and control a set of
 * `Radio` or `RadioTile` components, allowing the user to select one option
 * from a set. The `RadioGroup` is responsible for handling the value, helper
 * text, error state, error message, and disabled state, as well as determining
 * the presentation and selection of the items in the list. Follows the
 * [WAI-ARIA Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) for radio
 * groups not contained in a toolbar.
 */
export const RadioGroup = React.forwardRef<RadioGroupElement, RadioGroupProps>(
  ({ children, contentWidth = 'fit-content', direction = 'column', className, ...props }, ref) => {
    return (
      <RadioGroupBase
        ref={ref}
        className={clsx(componentClassName, className)}
        {...props}
        orientation={direction === 'column' ? 'vertical' : 'horizontal'}
      >
        <Flex className="uwp-RadioGroupContent" width={contentWidth} gap="16px">
          {children}
        </Flex>
      </RadioGroupBase>
    );
  }
);

RadioGroup.displayName = componentName;
