'use client';

import { cn } from '../../helpers/cn';
import { Slot } from 'radix-ui';
import type { LinkProps } from './Link.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { OpenSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const COMPONENT_NAME = 'Link';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Link = (props: LinkProps) => {
  const { className, asChild, inverted, children, hideOpenIcon, ...linkProps } = extractProps(
    props,
    marginPropDefs,
    textTransformPropDefs
  );
  return (
    <Slot.Root
      className={cn(componentClassName, className)}
      data-inverted={inverted ? '' : undefined}
      {...linkProps}
    >
      {asChild ? (
        children
      ) : (
        <a>
          {children}
          {linkProps.target === '_blank' && !hideOpenIcon ? (
            <OpenSmallIcon aria-hidden="true" />
          ) : null}
        </a>
      )}
    </Slot.Root>
  );
};

Link.displayName = COMPONENT_NAME;
