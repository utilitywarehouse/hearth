import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { DescriptionListProps } from './DescriptionList.props';
import { DescriptionListContext } from './DescriptionList.context';
import { Flex } from '../Flex/Flex';

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
        <Flex asChild className="hearth-DescriptionListContainer" role="list">
          <dl role="list" ref={ref} {...listProps}>
            <DescriptionListContext.Provider value={{ direction }}>
              {children}
            </DescriptionListContext.Provider>
          </dl>
        </Flex>
      </div>
    );
  }
);

DescriptionList.displayName = COMPONENT_NAME;
