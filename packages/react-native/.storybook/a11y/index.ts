import { collectNodes } from './collect';
import { setPendingNativeViolations } from './pending';
import { checkNodes, formatViolation, skippedRules } from './rules';
import type { NativeA11yParameters } from './types';

export { A11yIgnore } from './A11yIgnore';
export { A11Y_IGNORE_SELECTOR } from './collect';
export type { NativeA11yParameters } from './types';

/**
 * `VITE_A11Y_STRICT=true` is set by the weekly a11y workflow. It makes both axe
 * (addon-a11y) and the native checks fail the story instead of only reporting.
 */
export const A11Y_STRICT = import.meta.env.VITE_A11Y_STRICT === 'true';

interface AfterEachContext {
  id: string;
  canvasElement: Element;
  parameters: { nativeA11y?: NativeA11yParameters };
}

/**
 * Checks react-native-level accessibility props that axe can't see on the
 * react-native-web DOM (roles on pressables, touch target size, nested
 * pressables that Android merges, etc.). Fails the story in strict mode, warns otherwise.
 */
export function nativeA11yAfterEach({ id, canvasElement, parameters }: AfterEachContext) {
  const params = parameters.nativeA11y ?? {};
  const skipped = skippedRules(params);

  if (skipped.length && !params.reason?.trim()) {
    throw new Error(
      `[native-a11y] ${id}: parameters.nativeA11y disables ${skipped.join(
        ', '
      )} without a \`reason\`.`
    );
  }
  if (skipped.length) {
    console.info(`[native-a11y:skipped] ${id} ${skipped.join(',')} — ${params.reason}`);
  }

  const violations = checkNodes(collectNodes(canvasElement, params.exclude), params);
  const errors = violations.filter(v => v.severity === 'error');
  const warnings = violations.filter(v => v.severity === 'warn');

  if (warnings.length) console.warn(warnings.map(formatViolation).join('\n'));
  if (!errors.length) return;

  const message = errors.map(formatViolation).join('\n');
  if (A11Y_STRICT) {
    // Thrown later by the vitest afterEach, see ./pending.ts.
    setPendingNativeViolations(`${errors.length} native accessibility violation(s):\n${message}`);
  } else {
    console.warn(message);
  }
}
