import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import type { ListProps } from './List.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Card } from '../Card/Card';
import { Box } from '../Box/Box';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { useIds } from '../../hooks/use-ids';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'List';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListElement = ComponentRef<'ol'>;

/**
 * Use List to display a list of items, with support for visual variants,
 * colour schemes, a heading, and helper text. Use ListItem for simple text
 * content, or as a container for more complex or interactive content such as
 * ListItemContent, ListItemButton, or ListItemLink. `variant` and
 * `colorScheme` must be used together — if either is left `undefined`, the
 * list falls back to its default appearance.
 *
 * @summary A list of items with an optional heading, helper text, and style variants.
 */
export const List = forwardRef<ListElement, ListProps>((props, ref) => {
  const {
    id: providedId,
    as: Tag = 'ul',
    className,
    colorScheme = undefined,
    variant,
    heading,
    headingElement,
    helperText,
    trailingContent,
    validationText,
    validationStatus,
    children,
    paddingNone,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
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

  const { id, labelId } = useIds({ providedId, prefix: 'list' });

  const hasHeading = Boolean(heading);
  const ariaLabelledbyValue = ariaLabelledby ?? (hasHeading && !ariaLabel ? labelId : undefined);

  const attributeProps = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledbyValue,
    'data-padding-none': paddingNone ? '' : undefined,
  };

  return (
    <div className={cn(componentClassName, className)} data-testid={componentClassName}>
      {heading ? <SectionHeader id={labelId} {...sectionHeaderProps} /> : null}
      {variant === undefined || colorScheme === undefined ? (
        <Box
          asChild
          id={id}
          className={`${componentClassName}Container`}
          role="list"
          {...attributeProps}
        >
          <Tag ref={ref} {...listProps}>
            {children}
          </Tag>
        </Box>
      ) : (
        <Card
          className={`${componentClassName}Container`}
          paddingNone
          variant={variant}
          colorScheme={colorScheme}
        >
          <Tag ref={ref} role="list" id={id} {...listProps} {...attributeProps}>
            {children}
          </Tag>
        </Card>
      )}
    </div>
  );
});

List.displayName = COMPONENT_NAME;
