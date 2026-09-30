export const NATIVE_A11Y_RULE_IDS = [
  'pressable-has-role',
  'pressable-has-name',
  'image-has-label',
  'adjustable-has-value',
  'toggle-has-state',
  'no-nested-pressables',
  'hint-without-label',
  'touch-target-size',
] as const;

export type NativeA11yRuleId = (typeof NATIVE_A11Y_RULE_IDS)[number];

export type NativeA11ySeverity = 'error' | 'warn';

export type NativeA11yRuleSetting = NativeA11ySeverity | 'off';

/**
 * Per-story (or per-meta) overrides for the native accessibility checks, set via
 * `parameters.nativeA11y`. Mirrors the shape of `parameters.a11y` from addon-a11y.
 */
export interface NativeA11yParameters {
  /** Skip the native checks for this story entirely. Requires `reason`. */
  disable?: boolean;
  /** Change the severity of individual rules, or turn them off. `'off'` requires `reason`. */
  rules?: Partial<Record<NativeA11yRuleId, NativeA11yRuleSetting>>;
  /** CSS selectors; nodes inside a matching DOM subtree are not checked. */
  exclude?: string[];
  /** Why checks were disabled. Surfaced in the weekly report so opt-outs stay visible. */
  reason?: string;
}

export interface Rect {
  /** Viewport position of the top-left corner. */
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Insets {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

/** A host element with the RN props of the components that rendered it merged in. */
export interface NativeNode {
  /** Names of the RN components between this host element and the previous one, outermost first. */
  components: string[];
  /** Merged RN props of those components. */
  props: Record<string, unknown>;
  /** Attributes react-native-web rendered onto the DOM element. */
  attrs: Record<string, string>;
  tagName: string;
  textContent: string;
  rect: Rect;
  /** Has an enabled `onPress`/`onLongPress`. */
  interactive: boolean;
  /**
   * Identity of the press handler, so a wrapper forwarding the same handler to a
   * child isn't reported as a nested pressable.
   */
  pressId: number | null;
  /** Index of the nearest interactive ancestor node, if any. */
  interactiveAncestor: number | null;
  /** Hidden from assistive tech (self or an ancestor). */
  hidden: boolean;
  /** Short HTML snippet, for reporting. */
  html: string;
}

export interface NativeViolation {
  rule: NativeA11yRuleId;
  severity: NativeA11ySeverity;
  message: string;
  html: string;
}
