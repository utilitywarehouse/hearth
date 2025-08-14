import * as React from 'react';

import clsx from 'clsx';

import { sectionHeaderPropDefs, SectionHeaderProps } from './SectionHeader.props';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { textWrapPropDefs } from '../../props/text-wrap.props';
import { marginPropDefs } from '../../props/margin.props';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { DetailText } from '../DetailText/DetailText';
import { Flex } from '../Flex/Flex';
import { HelperText } from '../HelperText/HelperText';
import { Link } from '../Link/Link';
import { useIds } from '../../hooks/use-ids';

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
        <Flex direction="column" flexGrow="1">
          <DetailText asChild size="lg" id={labelId}>
            <SectionHeaderEl>{heading}</SectionHeaderEl>
          </DetailText>
          {helperText ? (
            <HelperText id={helperTextId} disableUserSelect>
              {helperText}
            </HelperText>
          ) : null}
        </Flex>
        {showLink ? (
          <Link href={linkHref}>
            {linkText}
            <ChevronRightSmallIcon />
          </Link>
        ) : null}
      </div>
    );
  }
);

SectionHeader.displayName = componentName;
