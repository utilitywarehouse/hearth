import type { ViewProps } from 'react-native';
import { SpaceValue, SpacingValues } from '../../types';

interface ContainerProps extends ViewProps {
  /**
   * The padding of the container.
   */
  padding?: SpaceValue;
  /**
   * The horizontal padding of the container.
   */
  paddingHorizontal?: SpaceValue;
  /**
   * The vertical padding of the container.
   */
  paddingVertical?: SpaceValue;
  /**
   * The top padding of the container.
   */
  paddingTop?: SpaceValue;
  /**
   * The bottom padding of the container.
   */
  paddingBottom?: SpaceValue;
  /**
   * The left padding of the container.
   */
  paddingLeft?: SpaceValue;
  /**
   * The right padding of the container.
   */
  paddingRight?: SpaceValue;
  /**
   * The margin of the container.
   */
  margin?: SpaceValue;
  /**
   * The horizontal margin of the container.
   */
  marginHorizontal?: SpaceValue;
  /**
   * The vertical margin of the container.
   */
  marginVertical?: SpaceValue;
  /**
   * The top margin of the container.
   */
  marginTop?: SpaceValue;
  /**
   * The bottom margin of the container.
   */
  marginBottom?: SpaceValue;
  /**
   * The left margin of the container.
   */
  marginLeft?: SpaceValue;
  /**
   * The right margin of the container.
   */
  marginRight?: SpaceValue;
  // Padding
  p?: SpaceValue;
  px?: SpaceValue;
  py?: SpaceValue;
  pt?: SpaceValue;
  pb?: SpaceValue;
  pl?: SpaceValue;
  pr?: SpaceValue;
  // Margin
  m?: SpaceValue;
  mx?: SpaceValue;
  my?: SpaceValue;
  mt?: SpaceValue;
  mb?: SpaceValue;
  ml?: SpaceValue;
  mr?: SpaceValue;
  /**
   * The spacing between child elements (gap).
   */
  spacing?: SpacingValues;
  /**
   * The space between child elements (gap).
   * @deprecated Use `spacing` instead. The `space` prop will be removed in a future release.
   */
  space?: SpacingValues;
  /**
   * The space between child elements.
   */
  gap?: SpaceValue;
  backgroundColor?: 'backgroundBrand' | 'backgroundPrimary' | 'backgroundSecondary' | 'transparent';
  bg?: 'backgroundBrand' | 'backgroundPrimary' | 'backgroundSecondary' | 'transparent';
}

export default ContainerProps;
