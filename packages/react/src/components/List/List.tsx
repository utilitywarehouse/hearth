import clsx from 'clsx';
import type { ListProps } from './List.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Card } from '../Card/Card';
import { Box } from '../Box/Box';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { SectionHeader } from '../SectionHeader/SectionHeader';

const COMPONENT_NAME = 'List';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const List = (props: ListProps) => {
  const {
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
    <div className={clsx(componentClassName, className)}>
      {heading ? <SectionHeader {...sectionHeaderProps} /> : null}
      {variant === undefined || colorScheme === undefined ? (
        <Box asChild className="hearth-ListContainer" role="list">
          <Tag {...listProps}>{children}</Tag>
        </Box>
      ) : (
        <Card
          className="hearth-ListContainer"
          paddingNone
          variant={variant}
          colorScheme={colorScheme}
        >
          <Tag role="list" {...listProps}>
            {children}
          </Tag>
        </Card>
      )}
    </div>
  );
};

List.displayName = COMPONENT_NAME;
