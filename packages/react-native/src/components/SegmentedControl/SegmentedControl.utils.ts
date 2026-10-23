import { Children, isValidElement, type ReactNode } from 'react';

/**
 * Walks `children` (including through fragments/wrapper elements) and collects
 * the `value` of every element whose component `displayName` is
 * `'SegmentedControlOption'`. Mirrors the child-walk previously inlined in
 * `SegmentedControl`'s `optionValues` useMemo.
 */
export const collectOptionValues = (children: ReactNode): string[] => {
  const values: string[] = [];
  const walk = (node: ReactNode) => {
    Children.forEach(node, child => {
      if (!isValidElement(child)) return;
      const props: any = child.props;
      const type: any = child.type;
      if (type?.displayName === 'SegmentedControlOption' && typeof props?.value === 'string') {
        values.push(props.value);
      }
      if (props?.children) walk(props.children);
    });
  };
  walk(children);
  return values;
};

export interface ResolveInitialValueOptions {
  controlledValue?: string;
  defaultValue?: string;
  optionValues: string[];
}

/**
 * Resolves the value `SegmentedControl` should seed its uncontrolled state
 * with on mount: the controlled `value` prop wins if present, then
 * `defaultValue`, then the first known option value.
 */
export const resolveInitialValue = ({
  controlledValue,
  defaultValue,
  optionValues,
}: ResolveInitialValueOptions): string | undefined => {
  if (controlledValue !== undefined) return controlledValue;
  if (defaultValue !== undefined) return defaultValue;
  return optionValues[0];
};

export interface ResolveActiveValueOptions {
  controlledValue?: string;
  uncontrolledValue?: string;
}

/**
 * Resolves the value `SegmentedControl` treats as "active" on every render:
 * the controlled `value` prop wins whenever it is defined, otherwise the
 * internally tracked uncontrolled value is used.
 */
export const resolveActiveValue = ({
  controlledValue,
  uncontrolledValue,
}: ResolveActiveValueOptions): string | undefined =>
  controlledValue !== undefined ? controlledValue : uncontrolledValue;

export interface ResolveValidValueOptions {
  prev: string | undefined;
  optionValues: string[];
}

/**
 * Keeps the uncontrolled value valid when the set of rendered options
 * changes: falls back to the first option value when there is no previous
 * value, or when the previous value no longer matches any rendered option.
 */
export const resolveValidValue = ({
  prev,
  optionValues,
}: ResolveValidValueOptions): string | undefined => {
  if (!prev) return optionValues[0];
  if (!optionValues.includes(prev)) return optionValues[0];
  return prev;
};

export interface OptionLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Computes the indicator's target layout from a registered option's measured
 * layout, offsetting `x`/`y` by the group border width (clamped to 0) so the
 * indicator sits flush inside the group's border. Mirrors the
 * `Math.max(0, layout.x - indicatorPositionOffset)` / `...layout.y...` maths
 * previously inlined at every `indicatorX`/`indicatorY` assignment site in
 * `SegmentedControl`.
 */
export const computeIndicatorLayout = (layout: OptionLayout, offset: number): OptionLayout => ({
  x: Math.max(0, layout.x - offset),
  y: Math.max(0, layout.y - offset),
  width: layout.width,
  height: layout.height,
});
