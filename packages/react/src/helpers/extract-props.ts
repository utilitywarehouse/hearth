/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import clsx from 'clsx';
import { mergeStyles } from './merge-styles';
import { getClassNameStyles } from './get-classname-styles';
import { PropDef } from '../props/prop-def';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Extracts component-specific style props based on provided prop definitions and
 * returns remaining props with composed `className` and `style`.
 *
 * This helper reads values for keys declared in `propDefs`, converts them into
 * utility classes and CSS variables via `getClassNameStyles`, merges all resulting
 * class names and inline styles, and removes those handled props from the returned
 * object. Any original `className` and `style` passed in `props` are appended/merged
 * at the end.
 *
 * Generics
 * - `P`: The full props shape for the component. Must allow `className` and `style`.
 * - `T`: A tuple/array of dictionaries mapping prop names to `PropDef`.
 *
 * Example
 * ```ts
 * const {
 *   className,
 *   ...componentProps
 * } = extractProps(
 *   props,
 *   componentPropDefs,
 *   paddingPropDefs,
 *   marginPropDefs,
 *   colorPropDefs,
 *   backgroundColorPropDefs,
 * );
 * // => { className: "hearth-background-color hearth-r-height hearth-border-color hearth-r-border-style-solid hearth-r-border-width-1 hearth-r-border-radius-xs", style: {--h-background-color: "var(--h-color-grey-100)", --h-border-color: "var(--h-color-grey-200)" --h-r-height: "100%" }, ...otherProps}
 * ```
 *
 * @param props - Incoming props for the component, including potential style props.
 * @param propDefs - One or more maps of prop names to `PropDef` describing how to build classes/vars.
 * @returns The original props minus handled style props, with merged `className` and `style` applied.
 */
export function extractProps<
  P extends { className?: string; style?: React.CSSProperties; [key: string]: any },
  T extends Array<Record<string, PropDef>>,
>(props: P, ...propDefs: T) {
  const allPropDefs: Record<string, PropDef> = Object.assign({}, ...propDefs);
  const extractedProps = { ...props };
  let className: string | undefined;
  let style: ReturnType<typeof mergeStyles>;

  for (const key in allPropDefs) {
    const value = extractedProps[key];
    delete extractedProps[key];
    const tokens = allPropDefs[key]?.tokens;
    const prefix = allPropDefs[key]?.className;
    const isSingleClassNameTokens = allPropDefs[key]?.singleClassNameTokens;
    const transformValue = allPropDefs[key]?.transformValue;
    const styles = getClassNameStyles({
      value,
      prefix,
      defaultValue: allPropDefs[key]?.default,
      tokens,
      isResponsive: Boolean(allPropDefs[key]?.responsive),
      isSingleClassNameTokens,
      transformValue,
    });
    if (styles) {
      const { className: propClassName, style: propStyle } = styles;
      className = clsx(className, propClassName);
      style = mergeStyles(style, propStyle);
    }
  }
  console.log({ className, style });
  extractedProps.className = clsx(className, props.className);
  extractedProps.style = mergeStyles(style, props.style);
  console.log({ extractedProps });
  return extractedProps;
}
