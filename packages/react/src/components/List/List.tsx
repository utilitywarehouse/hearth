import * as React from 'react';
import clsx from 'clsx';
import { type ListProps } from './List.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { Card } from '../Card/Card';
import { Box } from '../Box/Box';
import { useIds } from '../../hooks/use-ids';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { SectionHeader } from '../SectionHeader/SectionHeader';

const componentName = 'List';
const componentClassName = withGlobalPrefix(componentName);

type ListElement = ElementRef<'ol'>;

export const List = React.forwardRef<ListElement, ListProps>((props, ref) => {
  const {
    as: Tag = 'ul',
    className,
    colorScheme = undefined,
    heading,
    headingElement: HeadingEl = 'div',
    helperText,
    linkText,
    linkHref,
    children,
    variant,
    id: providedId,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    ...listProps
  } = extractProps(props, marginPropDefs);
  const { id, labelId, helperTextId } = useIds({
    providedId,
    prefix: 'list',
  });
  const listAriaProps = {
    id,
    ['aria-labelledby']: ariaLabelledby ?? (Boolean(heading) ? labelId : undefined),
    ['aria-describedby']: ariaDescribedby ?? (Boolean(helperText) ? helperTextId : undefined),
  };

  return (
    <div className={clsx(componentClassName, className)}>
      <SectionHeader
        id="listHeader"
        helperText={helperText}
        heading={heading}
        linkHref={linkHref}
        linkText={linkText}
        as={HeadingEl}
      />
      {variant === undefined || colorScheme === undefined ? (
        <Box asChild className="hearth-ListContainer">
          <Tag role="list" ref={ref} {...listProps} {...listAriaProps}>
            {children}
          </Tag>
        </Box>
      ) : (
        <Card
          className="hearth-ListContainer"
          paddingNone
          variant={variant}
          colorScheme={colorScheme}
        >
          <Tag role="list" ref={ref} {...listProps} {...listAriaProps}>
            {children}
          </Tag>
        </Card>
      )}
    </div>
  );
});

List.displayName = componentName;
