import * as React from 'react';

import clsx from 'clsx';

import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { useIds } from '../../hooks/use-ids';
import { marginPropDefs } from '../../props/margin.props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { textWrapPropDefs } from '../../props/text-wrap.props';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { HelperText } from '../HelperText/HelperText';
import { Link } from '../Link/Link';
import { sectionHeaderPropDefs, SectionHeaderProps } from './SectionHeader.props';

const componentName = 'SectionHeader';
const componentClassName = withGlobalPrefix(componentName);

type SectionHeaderElement = ElementRef<'div'>;

export const SectionHeader = React.forwardRef<SectionHeaderElement, SectionHeaderProps>(
  ({ size, ...props }) => {
    const {
      className,
      heading,
      as: SectionHeaderEl = 'div',
      helperText,
      linkText,
      linkHref,
      linkIconPosition = 'right',
      linkShowIcon = true,
      linkTarget = '_self',
      linkIcon: SectionHeaderLinkIcon = ChevronRightSmallIcon,
      id: providedId,
    } = extractProps(
      { size, ...props },
      sectionHeaderPropDefs,
      textAlignPropDefs,
      textTransformPropDefs,
      textWrapPropDefs,
      marginPropDefs
    );
    const { labelId, helperTextId } = useIds({
      providedId,
      prefix: 'sectionHeader',
    });
    const showLink = linkHref && linkText;
    return (
      <div className={clsx(componentClassName, className)}>
        <Flex direction="column" flexGrow="1" className={clsx('hearth-SectionHeaderTextContent')}>
          <Heading asChild size="md" id={labelId}>
            <SectionHeaderEl>{heading}</SectionHeaderEl>
          </Heading>
          {helperText ? (
            <HelperText id={helperTextId} disableUserSelect>
              {helperText}
            </HelperText>
          ) : null}
        </Flex>
        {showLink ? (
          <Link href={linkHref} target={linkTarget}>
            {linkShowIcon && linkIconPosition === 'left' && <SectionHeaderLinkIcon />}
            {linkText}
            {linkShowIcon && linkIconPosition === 'right' && <SectionHeaderLinkIcon />}
          </Link>
        ) : null}
      </div>
    );
  }
);

SectionHeader.displayName = componentName;
