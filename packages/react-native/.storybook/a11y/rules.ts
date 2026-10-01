import type {
  Insets,
  Rect,
  NativeA11yParameters,
  NativeA11yRuleId,
  NativeA11ySeverity,
  NativeNode,
  NativeViolation,
} from './types';

/** WCAG 2.5.8 (AA) minimum target size. Below this is an error. */
export const MIN_TARGET_SIZE = 24;
/** Apple HIG / WCAG 2.5.5 (AAA) recommended target size. Below this is a warning. */
export const RECOMMENDED_TARGET_SIZE = 44;

const TOGGLE_ROLES = new Set(['checkbox', 'switch', 'radio', 'menuitemcheckbox', 'menuitemradio']);
const ADJUSTABLE_ROLES = new Set(['adjustable', 'slider']);

const str = (value: unknown) => (typeof value === 'string' ? value : undefined);

const roleOf = (node: NativeNode) =>
  str(node.props.role) ?? str(node.props.accessibilityRole) ?? node.attrs.role;

const labelOf = (node: NativeNode) =>
  str(node.props['aria-label']) ??
  str(node.props.accessibilityLabel) ??
  str(node.props.alt) ??
  node.attrs['aria-label'] ??
  node.attrs['aria-labelledby'];

const hasName = (node: NativeNode) => !!labelOf(node)?.trim() || !!node.textContent.trim();

const hasCheckedState = (node: NativeNode) => {
  const state = node.props.accessibilityState as { checked?: unknown } | undefined;
  return (
    state?.checked != null ||
    node.props['aria-checked'] != null ||
    node.attrs['aria-checked'] != null ||
    node.tagName === 'INPUT'
  );
};

const hasValue = (node: NativeNode) =>
  node.props.accessibilityValue != null ||
  node.props['aria-valuenow'] != null ||
  node.props['aria-valuetext'] != null ||
  node.attrs['aria-valuenow'] != null ||
  node.attrs['aria-valuetext'] != null;

const toInsets = (hitSlop: unknown): Insets => {
  if (typeof hitSlop === 'number') {
    return { top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop };
  }
  return (hitSlop as Insets | undefined) ?? {};
};

/** The pressable area: the element's box grown by its hitSlop. */
const targetBox = (node: NativeNode): Rect => {
  const slop = toInsets(node.props.hitSlop);
  return {
    x: node.rect.x - (slop.left ?? 0),
    y: node.rect.y - (slop.top ?? 0),
    width: node.rect.width + (slop.left ?? 0) + (slop.right ?? 0),
    height: node.rect.height + (slop.top ?? 0) + (slop.bottom ?? 0),
  };
};

const centre = (r: Rect) => ({ x: r.x + r.width / 2, y: r.y + r.height / 2 });

/** Does a circle of `radius` around `c` overlap rectangle `r`? */
const circleHitsRect = (c: { x: number; y: number }, radius: number, r: Rect) => {
  const dx = c.x - Math.max(r.x, Math.min(c.x, r.x + r.width));
  const dy = c.y - Math.max(r.y, Math.min(c.y, r.y + r.height));
  return dx * dx + dy * dy < radius * radius;
};

const isAncestor = (nodes: NativeNode[], ancestor: number, index: number) => {
  for (let i = nodes[index].interactiveAncestor; i != null; i = nodes[i].interactiveAncestor) {
    if (i === ancestor) return true;
  }
  return false;
};

type Report = (rule: NativeA11yRuleId, severity: NativeA11ySeverity, message: string) => void;

type Rule = (node: NativeNode, report: Report) => void;

const rules: Record<NativeA11yRuleId, Rule> = {
  'pressable-has-role': (node, report) => {
    if (node.interactive && !roleOf(node)) {
      report(
        'pressable-has-role',
        'error',
        `${node.components.at(-1) ?? 'Element'} has onPress but no role`
      );
    }
  },
  'pressable-has-name': (node, report) => {
    if (node.interactive && !hasName(node)) {
      report('pressable-has-name', 'error', 'Interactive element has no label or text');
    }
  },
  'image-has-label': (node, report) => {
    if (node.components.includes('Image') && node.tagName !== 'IMG' && !labelOf(node)) {
      report(
        'image-has-label',
        'error',
        'Image has no accessibilityLabel/alt. Mark it decorative with accessible={false} if it is'
      );
    }
  },
  'adjustable-has-value': (node, report) => {
    const role = roleOf(node);
    if (role && ADJUSTABLE_ROLES.has(role) && !hasValue(node)) {
      report('adjustable-has-value', 'error', `${role} has no accessibilityValue`);
    }
  },
  'toggle-has-state': (node, report) => {
    const role = roleOf(node);
    if (role && TOGGLE_ROLES.has(role) && !hasCheckedState(node)) {
      report('toggle-has-state', 'error', `${role} has no checked state`);
    }
  },
  // Reported by `checkNodes` once per outer element, see below.
  'no-nested-pressables': () => {},
  'hint-without-label': (node, report) => {
    const hint = node.props.accessibilityHint ?? node.props['aria-description'];
    if (hint && !hasName(node)) {
      report('hint-without-label', 'warn', 'accessibilityHint set without a label');
    }
  },
  // Reported by `checkNodes`, which needs every target for the spacing exception.
  'touch-target-size': () => {},
};

/** Run every rule over the collected nodes, applying story-level overrides. */
export function checkNodes(
  nodes: NativeNode[],
  params: NativeA11yParameters = {}
): NativeViolation[] {
  if (params.disable) return [];
  const violations: NativeViolation[] = [];

  const makeReport =
    (node: NativeNode): Report =>
    (rule, severity, message) => {
      const setting = params.rules?.[rule];
      if (setting === 'off') return;
      violations.push({ rule, severity: setting ?? severity, message, html: node.html });
    };

  for (const node of nodes) {
    if (node.hidden) continue;
    const report = makeReport(node);
    for (const rule of Object.values(rules)) rule(node, report);
  }

  // Nested pressables: one violation per outer interactive element. Children that
  // share the outer element's press handler are forwarding wrappers, not a second target.
  const outerWithNested = new Set<number>();
  for (const node of nodes) {
    if (!node.interactive || node.hidden || node.interactiveAncestor == null) continue;
    const outer = nodes[node.interactiveAncestor];
    if (outer.hidden || (outer.pressId != null && outer.pressId === node.pressId)) continue;
    outerWithNested.add(node.interactiveAncestor);
  }
  for (const index of outerWithNested) {
    makeReport(nodes[index])(
      'no-nested-pressables',
      'error',
      'Contains another interactive element. Android merges these for TalkBack'
    );
  }

  // Touch target size (WCAG 2.5.8). An undersized target still passes the spacing
  // exception if a 24px circle centred on it overlaps no other target, and no other
  // undersized target's circle.
  const targets = nodes
    .map((node, index) => ({ node, index, box: targetBox(node) }))
    .filter(t => t.node.interactive && !t.node.hidden && t.box.width > 0 && t.box.height > 0);
  const undersized = (box: Rect) => box.width < MIN_TARGET_SIZE || box.height < MIN_TARGET_SIZE;
  const radius = MIN_TARGET_SIZE / 2;

  for (const t of targets) {
    const size = `${Math.round(t.box.width)}×${Math.round(t.box.height)}`;
    if (undersized(t.box)) {
      const c = centre(t.box);
      const crowded = targets.some(o => {
        // A forwarding wrapper and its child are one target; siblings are separate
        // targets even if they share a press handler.
        if (o === t || isAncestor(nodes, o.index, t.index) || isAncestor(nodes, t.index, o.index))
          return false;
        if (circleHitsRect(c, radius, o.box)) return true;
        const oc = centre(o.box);
        return undersized(o.box) && Math.hypot(c.x - oc.x, c.y - oc.y) < MIN_TARGET_SIZE;
      });
      if (crowded) {
        makeReport(t.node)(
          'touch-target-size',
          'error',
          `Touch target ${size} is below ${MIN_TARGET_SIZE}×${MIN_TARGET_SIZE} and too close to another target`
        );
        continue;
      }
    }
    if (t.box.width < RECOMMENDED_TARGET_SIZE || t.box.height < RECOMMENDED_TARGET_SIZE) {
      makeReport(t.node)(
        'touch-target-size',
        'warn',
        `Touch target ${size} is below the recommended ${RECOMMENDED_TARGET_SIZE}×${RECOMMENDED_TARGET_SIZE}`
      );
    }
  }

  return violations;
}

/** Rule ids turned off, or all checks disabled, for this story. */
export function skippedRules(params: NativeA11yParameters = {}): string[] {
  if (params.disable) return ['*'];
  return Object.entries(params.rules ?? {})
    .filter(([, setting]) => setting === 'off')
    .map(([rule]) => rule);
}

export function formatViolation(v: NativeViolation): string {
  return `[native-a11y] ${v.rule}: ${v.message}\n    ${v.html}`;
}
