'use client';

import clsx from 'clsx';
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

export const Radio = ({
  id: providedId,
  label,
  helperText,
  image,
  className,
  labelFontWeight,
  'aria-labelledby': ariaLabelledby,
  ...props
}: RadioProps) => {
  const { id, labelId, helperTextId } = useIds({ providedId, prefix: 'radio' });
  const { hasGroupHelperText, 'aria-describedby': ariaDescribedby } = useFormGroupBase();
  const showHelperText = Boolean(!hasGroupHelperText && helperText !== undefined);
  const showLabel = !!label;
  return (
    <div className={clsx(componentClassName, className)}>
      <div className="hearth-RadioContainer">
        <RadioGroupPrimitive.Item
          {...props}
          id={id}
          aria-describedby={showHelperText ? helperTextId : ariaDescribedby}
          aria-labelledby={ariaLabelledby ? ariaLabelledby : label ? labelId : undefined}
          className="hearth-RadioItem"
        >
          <RadioGroupPrimitive.Indicator className="hearth-RadioIndicator" />
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
};

Radio.displayName = COMPONENT_NAME;
