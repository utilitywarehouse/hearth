import * as React from 'react';

import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import type { NavigationalCardProps } from './NavigationalCard.props';
import { Heading } from '../Heading/Heading';
import { BodyText } from '../BodyText/BodyText';
import { Link } from '../Link/Link';
import { Card } from '../Card/Card';
import type { CardProps } from '../Card/Card.props';

const componentName = 'NavigationalCard';
const componentClassName = withGlobalPrefix(componentName);

type NavigationalCardElement = ElementRef<'div'>;

export const NavigationalCard = React.forwardRef<NavigationalCardElement, NavigationalCardProps>(
  ({ className, title, content, children, href, linkLabel, ...navigationalCardProps }, ref) => {
    return (
      <Card
        ref={ref}
        className={clsx(componentClassName, className)}
        direction="column"
        gap="150"
        {...(navigationalCardProps as CardProps)}
      >
        {title ? <Heading size="sm">{title}</Heading> : null}
        {content ? <BodyText size="md">{content}</BodyText> : null}
        {children}
        {href && linkLabel ? <Link href={href}>{linkLabel}</Link> : null}
      </Card>
    );
  }
);

NavigationalCard.displayName = componentName;
