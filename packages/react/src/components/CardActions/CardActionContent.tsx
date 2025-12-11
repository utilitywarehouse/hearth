import * as React from 'react';
import { HelperText } from '../HelperText/HelperText';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { CardActionContentProps } from './CardActionContent.props';
import clsx from 'clsx';
import { BodyText } from '../BodyText/BodyText';
import { IconContainer } from '../IconContainer/IconContainer';

const COMPONENT_NAME = 'CardActionContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CardActionContent = ({
  heading,
  leadingIcon,
  leadingIconContainerColorScheme,
  trailingIcon,
  helperText,
  className,
  badge,
  badgePlacement = 'bottom',
}: CardActionContentProps) => {
  return (
    <div className={clsx(componentClassName, className)}>
      {leadingIcon ? (
        leadingIconContainerColorScheme ? (
          <IconContainer
            colorScheme={leadingIconContainerColorScheme}
            size="md"
            fill="height"
            borderRadius="none"
          >
            {leadingIcon}
          </IconContainer>
        ) : (
          <div className={`${componentClassName}LeadingIcon`}>{leadingIcon}</div>
        )
      ) : null}

      <div className={`${componentClassName}MainWrapper`}>
        <div className={`${componentClassName}Main`} data-badge-placement={badgePlacement}>
          <BodyText size="md" weight="semibold" as="span">
            {heading}
          </BodyText>
          {badge && badgePlacement === 'middle' ? badge : null}
          {helperText ? <HelperText>{helperText}</HelperText> : null}
          {badge && badgePlacement === 'bottom' ? badge : null}
        </div>
        {badge && badgePlacement === 'right' ? badge : null}
        <div className={`${componentClassName}TrailingIcon`}>{trailingIcon}</div>
      </div>
    </div>
  );
};

CardActionContent.displayName = COMPONENT_NAME;
