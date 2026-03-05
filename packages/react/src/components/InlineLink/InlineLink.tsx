import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { InlineLinkProps } from './InlineLink.props';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { Slot } from 'radix-ui';
import { OpenSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const COMPONENT_NAME = 'InlineLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type InlineLinkElement = ComponentRef<'a'>;

export const InlineLink = forwardRef<InlineLinkElement, InlineLinkProps>((props, ref) => {
  const {
    className,
    color = 'default',
    children,
    asChild,
    hideOpenIcon,
    ...inlineLinkProps
  } = extractProps(props, marginPropDefs, textTransformPropDefs);
  return (
    <Slot.Root
      ref={ref}
      className={cn(componentClassName, className)}
      data-inverted={color === 'inverted' ? '' : undefined}
      data-inherit-color={color === 'inherit' ? '' : undefined}
      {...inlineLinkProps}
    >
      {asChild ? (
        children
      ) : (
        <a>
          {children}
          {inlineLinkProps.target === '_blank' ? (
            <>
              <span data-visually-hidden>(opens in new tab)</span>
              {hideOpenIcon ? null : <OpenSmallIcon />}
            </>
          ) : null}
        </a>
      )}
    </Slot.Root>
  );
});

InlineLink.displayName = COMPONENT_NAME;
