import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { InputSlotProps } from './InputSlot.props';
import { Slot } from 'radix-ui';

const COMPONENT_NAME = 'InputSlot';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const InputSlot = ({
  className,
  children,
  placement,
  asChild,
  ...props
}: InputSlotProps) => {
  const Component = asChild ? Slot.Root : 'div';
  return (
    <Component className={cn(componentClassName, className)} data-placement={placement} {...props}>
      {children}
    </Component>
  );
};

InputSlot.displayName = COMPONENT_NAME;
