'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import type { DescriptionListProps } from './DescriptionList.props';
import { DescriptionListContext } from './DescriptionList.context';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'DescriptionList';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const DescriptionList = (props: DescriptionListProps) => {
  const {
    className,
    heading,
    headingElement,
    helperText,
    trailingContent,
    children,
    direction,
    validationText,
    validationStatus,
    ...listProps
  } = extractProps(props, marginPropDefs);

  const sectionHeaderProps = {
    heading,
    headingElement,
    helperText,
    trailingContent,
    validationText,
    validationStatus,
  };

  return (
    <div className={cn(componentClassName, className)}>
      {heading ? <SectionHeader {...sectionHeaderProps} /> : null}
      <Flex asChild className={`${componentClassName}Container`} role="list">
        <dl role="list" {...listProps}>
          <DescriptionListContext.Provider value={{ direction }}>
            {children}
          </DescriptionListContext.Provider>
        </dl>
      </Flex>
    </div>
  );
};

DescriptionList.displayName = COMPONENT_NAME;
