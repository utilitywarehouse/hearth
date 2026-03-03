'use client';

import { cn } from '../../helpers/cn';
import type { RadioTileProps } from './RadioTile.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { useIds } from '../../hooks/use-ids';
import { Label } from '../Label/Label';
import { HelperText } from '../HelperText/HelperText';
import { Flex } from '../Flex/Flex';
import { useFormGroupBase } from '../FormGroupBase/FormGroupBase.context';
import { Box } from '../Box/Box';

const COMPONENT_NAME = 'RadioTile';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const RadioTile = ({
  className,
  id: providedId,
  label,
  helperText,
  image,
  'aria-labelledby': ariaLabelledby,
  badge,
  flex,
  flexBasis,
  flexShrink,
  flexGrow,
  ...props
}: RadioTileProps) => {
  const { id, labelId, helperTextId } = useIds({ providedId, prefix: 'radio' });
  const { hasGroupHelperText, 'aria-describedby': ariaDescribedby } = useFormGroupBase();
  const showHelperText = Boolean(!hasGroupHelperText && helperText !== undefined);
  const flexItemProps = { flex, flexBasis, flexShrink, flexGrow };
  return (
    <Box asChild {...flexItemProps}>
      <RadioGroupPrimitive.Item
        className={cn(componentClassName, className)}
        {...props}
        id={id}
        aria-describedby={showHelperText ? helperTextId : ariaDescribedby}
        aria-labelledby={ariaLabelledby ? ariaLabelledby : label ? labelId : undefined}
      >
        <div className={withGlobalPrefix('RadioContainer')}>
          <div className={withGlobalPrefix('RadioItem')}>
            <RadioGroupPrimitive.Indicator className={withGlobalPrefix('RadioIndicator')} />
          </div>
          <Flex direction="column" alignItems="start">
            <Label id={labelId} htmlFor={id} disableUserSelect>
              {image}
              {label}
            </Label>
            {showHelperText ? (
              <HelperText id={helperTextId} disableUserSelect>
                {helperText}
              </HelperText>
            ) : null}
            {badge}
          </Flex>
        </div>
      </RadioGroupPrimitive.Item>
    </Box>
  );
};

RadioTile.displayName = COMPONENT_NAME;
