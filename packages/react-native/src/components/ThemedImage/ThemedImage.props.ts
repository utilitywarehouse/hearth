import type { ComponentType, ReactElement } from 'react';
import type { ImageProps, ImageSourcePropType } from 'react-native';

interface ThemedImageProps extends Omit<ImageProps, 'source'> {
  /**
   * Image source or component to display in light mode
   */
  light: ImageSourcePropType | ReactElement | ComponentType<any>;
  /**
   * Image source or component to display in dark mode
   */
  dark: ImageSourcePropType | ReactElement | ComponentType<any>;
}

export default ThemedImageProps;
