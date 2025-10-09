import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { Box } from '../Box/Box';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { DescriptionListProps } from './DescriptionList.props';
import { DescriptionListContext } from './DescriptionList.context';

const COMPONENT_NAME = 'DescriptionList';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type DescriptionListElement = ElementRef<'dl'>;

export const DescriptionList = React.forwardRef<DescriptionListElement, DescriptionListProps>(
  (props, ref) => {
    const {
      className,
      heading,
      headingElement,
      helperText,
      link,
      children,
      direction,
      ...listProps
    } = extractProps(props, marginPropDefs);

    const headerProps = {
      heading,
      headingElement,
      helperText,
      link,
    };

    return (
      <div className={clsx(componentClassName, className)}>
        {heading ? <SectionHeader {...headerProps} /> : null}
        <Box asChild className="hearth-ListContainer" role="list">
          <dl ref={ref} {...listProps}>
            <DescriptionListContext.Provider value={{ direction }}>
              {children}
            </DescriptionListContext.Provider>
          </dl>
        </Box>
      </div>
    );
  }
);

DescriptionList.displayName = COMPONENT_NAME;
