'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import type { ComboboxEmptyProps } from './ComboboxEmpty.props';

const COMPONENT_NAME = 'ComboboxEmpty';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ComboboxEmpty = ({
  className,
  children = 'No options found',
  ...props
}: ComboboxEmptyProps) => {
  return (
    <ComboboxPrimitive.Empty className={cn(componentClassName, className)} {...props}>
      {children}
    </ComboboxPrimitive.Empty>
  );
};

ComboboxEmpty.displayName = COMPONENT_NAME;
