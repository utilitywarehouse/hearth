import type { Breakpoints, Responsive } from '../types/responsive';
import { isResponsiveObject } from './is-responsive-object';
import { kebabCase } from './kebab-case';
import { GLOBAL_PREFIX } from './with-global-prefix';

/**
 * Options for `getClassNameStyles`.
 */
type GetClassNameStylesOptions = {
  /**
   * The input to map to className/style.
   * - Token or raw value: string | number
   * - Boolean: only `true` is meaningful and produces a bare class
   * - Responsive: per-breakpoint values keyed by breakpoint names
   */
  value: Responsive<string | number> | undefined;
  /**
   * The utility prefix segment used in the generated class(es), e.g. `color`, `gap`.
   */
  prefix: string | undefined;
  /**
   * Whitelist of token values that should become token classes instead of CSS variables.
   */
  tokens: ReadonlyArray<string | number> | undefined;
  /**
   * Whether to include the responsive segment (`-r`) and support responsive var naming.
   */
  isResponsive: boolean;
  /**
   * Default token/raw value to use when `value` is `undefined`.
   */
  defaultValue?: string | number;
  /**
   * If true and `value` is a string token, emit a single class and provide the value via CSS var
   * after applying `transformValue`.
   */
  isSingleClassNameTokens?: boolean;
  /**
   * Transform applied to string token values when `isSingleClassNameTokens` is true.
   */
  transformValue?: (value: string) => string;
};

/**
 * Build a className (and optional style object) for utility-first, token-aware styling.
 *
 * The function maps a provided value (token, raw value, boolean, or responsive object)
 * to a prefixed utility class name, and when necessary, emits CSS custom properties
 * to carry raw values that are not represented by tokens.
 *
 * Behavior summary:
 * - Token value: emits a single class (e.g. `h-r-color-red-500`).
 * - Non-token value: emits a base class (e.g. `h-r-width`) and a style object with a CSS var.
 * - Boolean true: emits a single non-responsive class (e.g. `h-hidden`).
 * - Responsive object: emits breakpoint-scoped classes and, for non-token values, breakpoint-scoped CSS vars.
 * - When `defaultValue` is provided and `value` is `undefined`, a default class is emitted.
 * - When `isSingleClassNameTokens` and `transformValue` are provided for string tokens, a single class is emitted
 *   with the transformed value passed via CSS var.
 *
 * Examples
 * ```ts
 * // 1) Token value → single token class
 * getClassNameStyles({
 *   value: 'grey-200',
 *   prefix: 'border-color',
 *   tokens: ['blue0', 'blue50', 'blue100', ... ],
 *   isResponsive: false,
 * });
 * // => { className: 'h-color-red-500' }
 *
 * // 2) Non-token value → base class + CSS variable
 * getClassNameStyles({
 *   value: 16,
 *   prefix: 'gap',
 *   tokens: [0, 4, 8, 12],
 *   isResponsive: false,
 * });
 * // => { className: 'h-gap', style: { '--h-gap': 16 } }
 *
 * // 3) Boolean true → simple class (non-responsive)
 * getClassNameStyles({
 *   value: true,
 *   prefix: 'hidden',
 *   tokens: undefined,
 *   isResponsive: false,
 * });
 * // => { className: 'h-hidden' }
 *
 * // 4) Responsive object with mixed token/non-token values
 * getClassNameStyles({
 *   value: { mobile: 'red-500', tablet: '#ff0000' },
 *   prefix: 'color',
 *   tokens: ['red-500'],
 *   isResponsive: true,
 * });
 * // => {
 * //   className: 'h-r-color-red-500 tablet:h-r-color',
 * //   style: { '--h-r-color-tablet': '#ff0000' }
 * // }
 *
 * // 5) Default value when value is undefined
 * getClassNameStyles({
 *   value: undefined,
 *   defaultValue: 'md',
 *   prefix: 'size',
 *   tokens: ['sm', 'md', 'lg'],
 *   isResponsive: false,
 * });
 * // => { className: 'h-size-md' }
 * ```
 *
 * @param value The styling value; may be a token, raw value, boolean true, or a responsive object.
 * @param prefix The utility prefix to use in the generated class name(s).
 * @param tokens List of acceptable token values; used to decide token vs raw handling.
 * @param isResponsive Whether this utility participates in responsive variants (adds the `-r` segment).
 * @param defaultValue Optional default token/raw value used when `value` is `undefined`.
 * @param isSingleClassNameTokens If true and `value` is a string token, emit a single class and pass transformed value via CSS var.
 * @param transformValue Optional transform for string token values when `isSingleClassNameTokens` is true.
 * @returns An object containing `className` and, when needed, a `style` map of CSS custom properties.
 */
export const getClassNameStyles = ({
  value,
  prefix,
  tokens,
  isResponsive,
  defaultValue,
  isSingleClassNameTokens,
  transformValue,
}: GetClassNameStylesOptions) => {
  const responsivePrefix = isResponsive ? '-r' : '';

  if (value === undefined && defaultValue === undefined) {
    return;
  }

  // If no explicit value is provided but a default exists, emit the default token class
  if (value === undefined && defaultValue) {
    return { className: `${GLOBAL_PREFIX}${responsivePrefix}-${prefix}-${defaultValue}` };
  }

  // Handle primitive (token/raw) values: decide between token class vs CSS var
  if (typeof value === 'string' || typeof value === 'number') {
    const isTokenValue = tokens?.includes(value);
    if (isTokenValue) {
      if (typeof value === 'string' && isSingleClassNameTokens && transformValue !== undefined) {
        // As we're currently only dealing with the colour tokens here,
        // we don't need to consider responsive objects because there is,
        // as yet, no reason to have the colour props responsive.
        return {
          className: `${GLOBAL_PREFIX}-${prefix}`,
          style: { [`--h-${prefix}`]: transformValue(value) },
        };
      }
      return {
        className: `${GLOBAL_PREFIX}${responsivePrefix}-${prefix}-${kebabCase(String(value))}`,
      };
    }
    return {
      className: `${GLOBAL_PREFIX}${responsivePrefix}-${prefix}`,
      style: { [`--h${responsivePrefix}-${prefix}`]: value || defaultValue },
    };
  }

  if (typeof value === 'boolean' && value === true) {
    // boolean values do not have any associated tokens and we currently don't support responsive boolean props
    return { className: `${GLOBAL_PREFIX}-${prefix}` };
  }

  // Handle responsive props: generate per-breakpoint classes and CSS variables.
  // - For token values: emit `${GLOBAL_PREFIX}${responsivePrefix}-${prefix}-${token}` with breakpoint prefix (except initial).
  // - For non-token values: emit `${GLOBAL_PREFIX}${responsivePrefix}-${prefix}` and attach a breakpoint-scoped CSS variable
  //   `--h${responsivePrefix}-${prefix}` or `--h${responsivePrefix}-${prefix}-${bp}` for non-initial breakpoints.
  if (isResponsiveObject(value)) {
    const initialBreakpoint = 'mobile';

    // Build per-breakpoint classes from the responsive value object:
    // - For each breakpoint, read its value and determine if it's a token.
    // - Token → `${GLOBAL_PREFIX}${responsivePrefix}-${prefix}-${token}`.
    // - Non-token → `${GLOBAL_PREFIX}${responsivePrefix}-${prefix}`.
    // - Prefix non-initial breakpoints with `${bp}:`.
    // - Result: one class string per defined breakpoint in `classes`.
    //
    // These classes will work in conjunction with PostCSS to implement
    // styles that are only valid at the determined breakpoint.
    const classes = (Object.keys(value) as Array<Breakpoints>).map(bp => {
      const breakpointValue = value[bp];
      if (breakpointValue !== undefined) {
        const isTokenValue = tokens?.includes(breakpointValue);
        let baseClassName: string;
        if (isTokenValue) {
          baseClassName = `${GLOBAL_PREFIX}${responsivePrefix}-${prefix}-${breakpointValue}`;
        } else {
          baseClassName = `${GLOBAL_PREFIX}${responsivePrefix}-${prefix}`;
        }
        const className = bp === initialBreakpoint ? baseClassName : `${bp}:${baseClassName}`;
        return className;
      }
    });

    // Build a map of CSS variables for non-token responsive values:
    // - Iterate over breakpoints and skip token values (tokens are handled by classes only).
    // - Use `--h${responsivePrefix}-${prefix}` for the initial breakpoint and append `-${bp}` for others.
    // - Assign the raw breakpoint value to the computed CSS variable name in the accumulator.
    const styles = (Object.keys(value) as Array<Breakpoints>).reduce(
      (acc: { [key: string]: string | number }, bp: Breakpoints) => {
        const breakpointValue = value[bp];
        const isTokenValue = tokens?.includes(breakpointValue);
        if (breakpointValue !== undefined && !isTokenValue) {
          const baseStyleName = `--h${responsivePrefix}-${prefix}`;
          const styleName = bp === initialBreakpoint ? baseStyleName : `${baseStyleName}-${bp}`;
          acc[styleName] = breakpointValue;
          return acc;
        }
        return acc;
      },
      {}
    );
    return { className: classes.join(' '), style: styles };
  }
};
