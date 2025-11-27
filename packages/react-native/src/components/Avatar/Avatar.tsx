import { UserMediumIcon, UserSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { getInitials } from '../../utils';
import BodyText from '../BodyText/BodyText';
import AvatarProps, { AvatarLoadingStatus } from './Avatar.props';

const Avatar = ({
  src,
  name,
  size = 'md',
  delayMs = 0,
  onLoadingStatusChange,
  style,
  ...props
}: AvatarProps) => {
  const [status, setStatus] = useState<AvatarLoadingStatus>('idle');
  const [isDelayed, setIsDelayed] = useState(delayMs > 0);
  const { components } = useTheme();

  useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }

    setStatus('loading');
  }, [src]);

  useEffect(() => {
    onLoadingStatusChange?.(status);
  }, [status, onLoadingStatusChange]);

  useEffect(() => {
    if (delayMs <= 0) {
      setIsDelayed(false);
      return;
    }

    const timerId = setTimeout(() => {
      setIsDelayed(false);
    }, delayMs);
    return () => clearTimeout(timerId);
  }, [delayMs]);

  styles.useVariants({ size });

  const initials = getInitials(name);

  const handleLoad = () => setStatus('loaded');
  const handleError = () => setStatus('error');

  const showImage = src && status === 'loaded';
  const showFallback = !showImage && !isDelayed;

  const textSize = size === 'sm' ? 'md' : 'lg';
  const FallbackIcon = size === 'sm' ? UserSmallIcon : UserMediumIcon;

  return (
    <View
      {...props}
      style={[styles.container, style]}
      accessibilityRole={showImage && name ? 'image' : undefined}
      accessibilityLabel={showImage ? name : undefined}
    >
      {src && (
        <Image
          source={src}
          style={styles.image}
          onLoad={handleLoad}
          onError={handleError}
          accessibilityElementsHidden
        />
      )}
      {showFallback && (
        <View style={styles.fallback}>
          {name ? (
            <BodyText
              size={textSize}
              weight="semibold"
              textTransform="uppercase"
              style={styles.text}
            >
              {initials}
            </BodyText>
          ) : (
            <FallbackIcon />
          )}
        </View>
      )}
    </View>
  );
};

Avatar.displayName = 'Avatar';

const styles = StyleSheet.create(theme => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: theme.color.surface.pig.subtle,
    variants: {
      size: {
        sm: {
          width: theme.components.avatar.sm.width,
          height: theme.components.avatar.sm.height,
          borderRadius: theme.components.avatar.sm.borderRadius,
        },
        md: {
          width: theme.components.avatar.md.width,
          height: theme.components.avatar.md.height,
          borderRadius: theme.components.avatar.md.borderRadius,
        },
      },
    },
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  fallback: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.color.text.primary,
  },
}));

export default Avatar;
