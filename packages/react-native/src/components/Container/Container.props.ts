import type { ViewProps } from 'react-native';
import type {
  BackgroundColorProps,
  DisplayProps,
  FlexLayoutProps,
  GapProps,
  MarginProps,
  PaddingProps,
  SpacingValues,
} from '../../types';

interface ContainerProps
  extends
    ViewProps,
    MarginProps,
    PaddingProps,
    GapProps,
    BackgroundColorProps,
    FlexLayoutProps,
    DisplayProps {
  /**
   * The spacing between child elements (gap).
   */
  spacing?: SpacingValues;
  /**
   * The space between child elements (gap).
   * @deprecated Use `spacing` instead. The `space` prop will be removed in a future release.
   */
  space?: SpacingValues;
}

export default ContainerProps;
