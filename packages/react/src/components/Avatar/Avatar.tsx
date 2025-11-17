import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { avatarPropDefs, AvatarProps } from './Avatar.props';
import { Avatar as RadixAvatar } from 'radix-ui';
import { UserMediumIcon, UserSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';
import { getInitials } from '../../helpers/get-initials';
import { BodyTextProps } from '../BodyText/BodyText.props';
import { Box } from '../Box/Box';
import type { BoxProps } from '../Box/Box.props';
import { getResponsiveTranslation } from '../../helpers/get-responsive-translation';

const COMPONENT_NAME = 'Avatar';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Avatar: React.FC<AvatarProps> = props => {
  const {
    className,
    src,
    name,
    delayMs = 0,
    ...avatarProps
  } = extractProps(props, avatarPropDefs, marginPropDefs);

  const initials = getInitials(name);

  const bodyTextSize = getResponsiveTranslation(props.size || 'md', { sm: 'md', md: 'lg' });
  const mediumIconDisplay = getResponsiveTranslation(props.size || 'md', {
    sm: 'none',
    md: 'block',
  });
  const smallIconDisplay = getResponsiveTranslation(props.size || 'md', {
    sm: 'block',
    md: 'none',
  });

  return (
    <RadixAvatar.Root className={clsx(componentClassName, className)}>
      {src ? (
        <RadixAvatar.Image
          className={`${componentClassName}Image`}
          src={src}
          alt={name}
          {...avatarProps}
        />
      ) : null}
      <RadixAvatar.Fallback className={`${componentClassName}Fallback`} delayMs={delayMs}>
        {name ? (
          <BodyText
            as="span"
            weight="semibold"
            size={bodyTextSize as BodyTextProps['size']}
            textTransform="uppercase"
          >
            {initials}
          </BodyText>
        ) : (
          <>
            <Box asChild display={smallIconDisplay as BoxProps['display']}>
              <UserSmallIcon />
            </Box>
            <Box asChild display={mediumIconDisplay as BoxProps['display']}>
              <UserMediumIcon />
            </Box>
          </>
        )}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

Avatar.displayName = COMPONENT_NAME;
