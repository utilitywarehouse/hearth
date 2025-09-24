import * as React from 'react';

import clsx from 'clsx';

import type { RadioProps } from './Radio.props';

import { RadioGroup as RadixRadioGroup } from 'radix-ui';
import { withClassnameGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { useIds } from '../../hooks/use-ids';
import { HelperText } from '../HelperText/HelperText';
import type { ElementRef } from 'react';
import { useFormGroupBase } from '../FormGroupBase/FormGroupBase.context';

const componentName = 'Radio';
const componentClassName = withClassnameGlobalPrefix(componentName);

type RadioElement = ElementRef<'button'>;

/**
 * `Radio` can be used to choose between a set of more than two options.
 *
 * `Radio` should always be used with a `RadioGroup` or `RadioGridGroup` to
 * handle the state control and layout.
 *
 * `Radio` is, by default, appropriately labelled when using
 * the `label` prop, if you do not provide a label, you must specify an
 * `aria-label` or `aria-labelledby` for accessibility.
 *
 * > This component does not need to be wrapped in a `ThemeProvider` and can be used standalone with other component libraries.
 */
export const Radio = React.forwardRef<RadioElement, RadioProps>(
  (
    {
      id: providedId,
      label,
      helperText,
      image,
      className,
      labelFontWeight,
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
      <div className={clsx(componentClassName, className)}>
        <div className="hearth-RadioContainer">
          <RadixRadioGroup.Item
            ref={ref}
            {...props}
            id={id}
            aria-describedby={showHelperText ? helperTextId : ariaDescribedby}
            aria-labelledby={ariaLabelledby ? ariaLabelledby : label ? labelId : undefined}
            className="hearth-RadioItem"
          >
            <RadixRadioGroup.Indicator className="hearth-RadioIndicator" />
          </RadixRadioGroup.Item>
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

Radio.displayName = componentName;
