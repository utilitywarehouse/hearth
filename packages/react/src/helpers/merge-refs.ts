/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

/**
 * Merges multiple React refs into a single callback ref.
 * This is useful when you need to attach multiple refs to a single DOM element,
 * such as a local ref for DOM manipulation and a ref from a library like
 * React Hook Form or Framer Motion.
 *
 * @template T - The type of the element (e.g., HTMLInputElement).
 * @param {...(React.Ref<T> | undefined | null)} refs - An array of refs to be merged.
 * @returns {(value: T | null) => void} A callback ref that assigns the element to all provided refs.
 * @example
 * const { ref: rhfRef, ...field } = register('name');
 * const localRef = useRef<HTMLInputElement>(null);
 * <input {...field} ref={mergeRefs(rhfRef, localRef)} />
 */
export function mergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined | null>
): (value: T | null) => void {
  return value => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(value);
      } else {
        // According to modern React types, RefObject is read-only.
        // We cast to 'any' or a custom type only at the moment of assignment
        // to bypass the "read-only" restriction of the 'current' property.
        (ref as any).current = value;
      }
    });
  };
}
