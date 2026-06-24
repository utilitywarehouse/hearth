'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { extractProps } from '../../helpers/extract-props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { AlertProps } from './Alert.props';
import {
  CloseSmallIcon,
  InfoMediumIcon,
  TickCircleMediumIcon,
  WarningMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';
import { marginPropDefs } from '../../props/margin.props';
import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import type { ComponentRef } from 'react';
import { flexItemPropDefs } from '../../props/flex-item.props';
import { gridItemPropDefs } from '../../props/grid-item.props';

const COMPONENT_NAME = 'Alert';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AlertElement = ComponentRef<'div'>;

export const Alert = forwardRef<AlertElement, AlertProps>((props, ref) => {
  const icons = {
    info: InfoMediumIcon,
    positive: TickCircleMediumIcon,
    warning: WarningMediumIcon,
    danger: WarningMediumIcon,
  };
  const {
    children,
    className,
    colorScheme = 'info',
    onClose,
    text,
    title,
    ...alertProps
  } = extractProps(props, marginPropDefs, flexItemPropDefs, gridItemPropDefs);

  const AlertIcon = icons[colorScheme];

  return (
    <div
      ref={ref}
      className={cn(componentClassName, className)}
      role="alert"
      data-colorscheme={colorScheme}
      data-testid={componentClassName}
      {...alertProps}
    >
      <AlertIcon aria-hidden="true" />
      <div className={`${componentClassName}Content`}>
        {title || text ? (
          <Flex direction="column">
            {title ? (
              <BodyText as="span" size="md" weight="semibold">
                {title}
              </BodyText>
            ) : null}
            {text ? <BodyText as="div">{text}</BodyText> : null}
          </Flex>
        ) : null}
        {children}
      </div>
      {onClose ? (
        <UnstyledIconButton
          onClick={onClose}
          className={`${componentClassName}CloseButton`}
          title="Close"
          label="Close alert"
        >
          <CloseSmallIcon />
        </UnstyledIconButton>
      ) : null}
    </div>
  );
});

Alert.displayName = COMPONENT_NAME;
