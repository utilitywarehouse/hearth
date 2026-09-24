import { resolveStyleProps } from '../utils';
import useTheme from './useTheme';

/**
 * Type for the return value from useStyleProps
 */
interface StylePropsResult {
  /** The computed styles based on the input props */
  computedStyles: Record<string, any>;
  /** Props that are not style related and should be passed to the component */
  remainingProps: Record<string, any>;
}

/**
 * Hook to process utility style props and resolve theme values
 * @param props Component props to process
 * @returns Object containing computed styles and non-style props
 */
export const useStyleProps = (props: Record<string, any>): StylePropsResult => {
  const theme = useTheme();

  const remainingProps: Record<string, any> = {};
  const computedStyles = resolveStyleProps(props, theme, remainingProps);

  return { computedStyles, remainingProps };
};
