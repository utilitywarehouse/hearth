import { breakpoints, type Breakpoint, type Responsive } from '../types/responsive';

export function isResponsiveObject<Value extends string | number>(
  obj: Responsive<Value | Omit<string, Value>> | boolean | undefined
): obj is Record<Breakpoint, string> {
  if (typeof obj === 'boolean') return false;
  return (
    typeof obj === 'object' &&
    Object.keys(obj).some(key => (breakpoints as unknown as ReadonlyArray<string>).includes(key))
  );
}
