import { ComponentPropsWithRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';

const COMPONENT_NAME = 'ModalContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ModalContent = ({ className, children, ...props }: ComponentPropsWithRef<'div'>) => {
  return (
    <div className={cn(componentClassName, className)} {...props}>
      <ScrollAreaPrimitive.Root className={`${componentClassName}ScrollAreaRoot`} type="auto">
        <ScrollAreaPrimitive.Viewport className={`${componentClassName}ScrollAreaViewport`}>
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar
          orientation="vertical"
          className={`${componentClassName}ScrollAreaScrollbar`}
        >
          <ScrollAreaPrimitive.Thumb className={`${componentClassName}ScrollAreaThumb`} />
        </ScrollAreaPrimitive.Scrollbar>
      </ScrollAreaPrimitive.Root>
    </div>
  );
};

ModalContent.displayName = COMPONENT_NAME;
