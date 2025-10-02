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
 *   singleClassNameTokens: true,
 *   transformValue: token => `var(--h-color-${token})`,
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
  /**
   * When we have a set of options that are too big to create CSS classes for every option.
   * For example; colours. We can't reasonably create classes for every colour and every colour property,
   * especially when we know many won't be used. In this case, we will have a single colour class,
   * and set the colour using a custom property in the style attribute.
   *
   * If true and `value` is a string token, emit a single class and provide the value via CSS var
   * after applying `transformValue`.
   */
  singleClassNameTokens?: boolean;
  /**
   * Transform applied to string token values when `singleClassNameTokens` is true.
   */
  transformValue?: (value: string) => string;
};
