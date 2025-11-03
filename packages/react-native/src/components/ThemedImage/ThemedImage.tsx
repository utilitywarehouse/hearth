import { isValidElement } from 'react';
import { Image } from 'react-native';
import useColorMode from '../../hooks/useColorMode';
import type ThemedImageProps from './ThemedImage.props';

/**
 * ThemedImage component that displays different images or components based on the current theme
 * @param light - Image source or SVG component to display in light mode
 * @param dark - Image source or SVG component to display in dark mode
 * @param ...rest - All other Image props including width/height for SVG components
 */
const ThemedImage = ({ light, dark, ...props }: ThemedImageProps) => {
  const [colorMode] = useColorMode();

  const source = colorMode === 'light' ? light : dark;

  // If the source is a React element (like an SVG component), render it directly
  if (isValidElement(source)) {
    return source;
  }

  // If the source is a component type (function/class), instantiate it with props
  if (typeof source === 'function') {
    const Source = source as React.ComponentType<any>;
    return <Source {...props} />;
  }

  // Otherwise, render as a regular Image with the source
  return <Image source={source} {...props} />;
};

ThemedImage.displayName = 'ThemedImage';

export default ThemedImage;
