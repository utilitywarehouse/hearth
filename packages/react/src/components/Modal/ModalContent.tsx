import * as React from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';

const COMPONENT_NAME = 'ModalContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ModalContent = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<'div'>) => {
  return (
    <div className={cn(componentClassName, className)} {...props}>
      <ScrollAreaPrimitive.Root className={`${componentClassName}ScrollAreaRoot`} type="auto">
        <ScrollAreaPrimitive.Viewport className={`${componentClassName}ScrollAreaViewport`}>
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar orientation="vertical" />
      </ScrollAreaPrimitive.Root>
    </div>
  );
};

ModalContent.displayName = COMPONENT_NAME;
