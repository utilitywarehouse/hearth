import { Children, isValidElement, type ReactNode } from 'react';

/**
 * Walks `children` (including through fragments/wrapper elements) and collects
 * the `value` of every element whose component `displayName` is `'Tab'`.
 * Mirrors the child-walk previously inlined in `Tabs`'s `tabValues` useMemo.
 */
export const collectTabValues = (children: ReactNode): string[] => {
  const values: string[] = [];
  const walk = (node: ReactNode) => {
    Children.forEach(node, child => {
      if (!isValidElement(child)) return;
      const props: any = child.props;
      const type: any = child.type;
      if (type?.displayName === 'Tab' && typeof props?.value === 'string') {
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
  tabValues: string[];
}

/**
 * Resolves the value `Tabs` should seed its uncontrolled state with on mount:
 * the controlled `value` prop wins if present, then `defaultValue`, then the
 * first known tab value.
 */
export const resolveInitialValue = ({
  controlledValue,
  defaultValue,
  tabValues,
}: ResolveInitialValueOptions): string | undefined => {
  if (controlledValue !== undefined) return controlledValue;
  if (defaultValue) return defaultValue;
  return tabValues[0];
};

export interface ResolveActiveValueOptions {
  controlledValue?: string;
  uncontrolledValue?: string;
}

/**
 * Resolves the value `Tabs` treats as "active" on every render: the
 * controlled `value` prop wins whenever it is defined, otherwise the
 * internally tracked uncontrolled value is used.
 */
export const resolveActiveValue = ({
  controlledValue,
  uncontrolledValue,
}: ResolveActiveValueOptions): string | undefined =>
  controlledValue !== undefined ? controlledValue : uncontrolledValue;

export interface ResolveValidValueOptions {
  prev: string | undefined;
  tabValues: string[];
}

/**
 * Keeps the uncontrolled value valid when the set of rendered tabs changes:
 * falls back to the first tab value when there is no previous value, or when
 * the previous value no longer matches any rendered tab.
 */
export const resolveValidValue = ({
  prev,
  tabValues,
}: ResolveValidValueOptions): string | undefined => {
  if (!prev) return tabValues[0];
  if (!tabValues.includes(prev)) return tabValues[0];
  return prev;
};

/** Fraction of the visible `TabsList` width scrolled per scroll-button press. */
export const SCROLL_STEP_RATIO = 0.6;

export interface ComputeScrollVisibilityOptions {
  containerWidth: number;
  contentWidth: number;
  scrollX: number;
}

export interface ScrollVisibility {
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

/**
 * Determines whether the left/right scroll buttons should be shown, given the
 * current scroll offset and the measured container/content widths. Mirrors
 * `TabsList`'s `updateScrollState`.
 */
export const computeScrollVisibility = ({
  containerWidth,
  contentWidth,
  scrollX,
}: ComputeScrollVisibilityOptions): ScrollVisibility => {
  const overflow = contentWidth > containerWidth + 1;
  return {
    canScrollLeft: overflow && scrollX > 0,
    canScrollRight: overflow && scrollX + containerWidth < contentWidth - 1,
  };
};

export interface ComputeScrollTargetOptions {
  containerWidth: number;
  contentWidth: number;
  currentScrollX: number;
  direction: 1 | -1;
  stepRatio?: number;
}

/**
 * Computes the clamped scroll-x target for a single scroll-button press.
 * Mirrors `TabsList`'s `scrollBy`, clamping to `[0, contentWidth - containerWidth]`.
 */
export const computeScrollTarget = ({
  containerWidth,
  contentWidth,
  currentScrollX,
  direction,
  stepRatio = SCROLL_STEP_RATIO,
}: ComputeScrollTargetOptions): number => {
  const step = containerWidth * stepRatio;
  const max = Math.max(0, contentWidth - containerWidth);
  return Math.max(0, Math.min(currentScrollX + direction * step, max));
};
