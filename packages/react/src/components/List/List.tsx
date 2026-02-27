import { cn } from '../../helpers/cn';
import type { ListProps } from './List.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Card } from '../Card/Card';
import { Box } from '../Box/Box';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { useIds } from '../../hooks/use-ids';

const COMPONENT_NAME = 'List';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const List = (props: ListProps) => {
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

  const { id } = useIds({ providedId });

  const attributeProps = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby || id,
    'data-padding-none': paddingNone ? '' : undefined,
  };

  return (
    <div className={cn(componentClassName, className)}>
      {heading ? <SectionHeader id={id} {...sectionHeaderProps} /> : null}
      {variant === undefined || colorScheme === undefined ? (
        <Box asChild className={`${componentClassName}Container`} role="list" {...attributeProps}>
          <Tag {...listProps}>{children}</Tag>
        </Box>
      ) : (
        <Card
          className={`${componentClassName}Container`}
          paddingNone
          variant={variant}
          colorScheme={colorScheme}
        >
          <Tag role="list" {...listProps} {...attributeProps}>
            {children}
          </Tag>
        </Card>
      )}
    </div>
  );
};

List.displayName = COMPONENT_NAME;
