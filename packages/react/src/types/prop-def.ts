/**
 * Definition describing how a prop should be converted into utility classes and/or CSS variables.
 *
 * Generic
 * - `T`: Token value type for the prop (defaults to `string`).
 *
 * Example
 * ```ts
 * const colorProp: PropDef<string> = {
 *   className: 'color',
 *   responsive: false,
 *   tokens: ['grey-100', 'grey-200', 'blue-500'],
 * };
 * ```
 */
export type PropDef<T = string> = {
  /**
   * CSS class prefix to use.
   */
  className: string;
  /**
   * Whether responsive props are supported.
   */
  responsive: boolean;
  /**
   * Any token sets that can be used to create styles.
   */
  tokens?: ReadonlyArray<T>;
  /**
   * A default value if needed.
   */
  default?: string | number;
};
