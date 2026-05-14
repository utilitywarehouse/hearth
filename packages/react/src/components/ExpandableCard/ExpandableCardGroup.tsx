'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import type { ExpandableCardGroupProps } from './ExpandableCardGroup.props';
import { SectionHeader } from '../SectionHeader/SectionHeader';

const COMPONENT_NAME = 'ExpandableCardGroup';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ExpandableCardGroupElement = ComponentRef<'div'>;

export const ExpandableCardGroup = forwardRef<ExpandableCardGroupElement, ExpandableCardGroupProps>(
  (props, ref) => {
    const {
      className,
      heading,
      headingElement = 'h2',
      helperText,
      trailingContent,
      children,
      ...restProps
    } = extractProps(props, marginPropDefs);

    return (
      <div ref={ref} className={cn(componentClassName, className)} data-testid={componentClassName} {...restProps}>
        {heading ? (
          <SectionHeader
            heading={heading}
            headingElement={headingElement}
            helperText={helperText}
            trailingContent={trailingContent}
          />
        ) : null}
        {children}
      </div>
    );
  }
);

ExpandableCardGroup.displayName = COMPONENT_NAME;
