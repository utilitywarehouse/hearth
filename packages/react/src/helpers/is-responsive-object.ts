import { breakpoints, type Breakpoint, type Responsive } from '../types/responsive';

/**
 * Type guard that checks whether a value is a responsive object keyed by known breakpoints.
 *
 * Accepts a candidate that may be a `Responsive<Value>` object, a boolean, or `undefined`.
 * - Returns `false` for boolean values (responsive booleans are not supported).
 * - Returns `true` only when the value is an object with at least one key that matches a
 *   known breakpoint from `breakpoints`.
 *
 * Example
 * ```ts
 * isResponsiveObject({ mobile: 'sm', tablet: 'md' }) // true
 * isResponsiveObject(true) // false
 * isResponsiveObject(undefined) // false
 * isResponsiveObject({ foo: 'bar' }) // false (no breakpoint keys)
 * ```
 *
 * @param obj Candidate value to test for responsive shape.
 * @returns `true` if `obj` is a record keyed by known breakpoints; otherwise `false`.
 */
export function isResponsiveObject<Value extends string | number>(
  obj: Responsive<Value | Omit<string, Value>> | boolean | undefined
): obj is Record<Breakpoint, string> {
  if (typeof obj === 'boolean') return false;
  return (
    typeof obj === 'object' &&
    Object.keys(obj).some(key => (breakpoints as unknown as ReadonlyArray<string>).includes(key))
  );
}
