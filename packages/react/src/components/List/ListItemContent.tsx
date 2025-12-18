import { HelperText } from '../HelperText/HelperText';
import { Flex } from '../Flex/Flex';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ListItemContentProps } from './ListItemContent.props';
import clsx from 'clsx';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'ListItemContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ListItemContent = ({
  heading,
  leadingContent,
  trailingContent,
  helperText,
  className,
  badge,
  badgePlacement = 'bottom',
  children,
}: ListItemContentProps) => {
  return (
    <div className={clsx(componentClassName, className)}>
      {children ? (
        children
      ) : (
        <>
          {leadingContent ? leadingContent : null}
          <Flex
            direction={badgePlacement === 'top' ? 'column-reverse' : 'column'}
            flexGrow="1"
            alignItems="start"
          >
            <div>
              <BodyText size="lg">{heading}</BodyText>
              {helperText ? <HelperText>{helperText}</HelperText> : null}
            </div>
            {badge}
          </Flex>
          <div className={`${componentClassName}TrailingContent`}>
            {trailingContent ? trailingContent : null}
          </div>
        </>
      )}
    </div>
  );
};

ListItemContent.displayName = COMPONENT_NAME;
