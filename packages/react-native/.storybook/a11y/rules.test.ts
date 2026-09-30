import { describe, expect, it } from 'vitest';
import { checkNodes, skippedRules } from './rules';
import type { NativeNode } from './types';

const node = (overrides: Partial<NativeNode> = {}): NativeNode => ({
  components: ['View'],
  props: {},
  attrs: {},
  tagName: 'DIV',
  textContent: '',
  rect: { x: 0, y: 0, width: 48, height: 48 },
  interactive: false,
  pressId: null,
  interactiveAncestor: null,
  hidden: false,
  html: '<div>',
  ...overrides,
});

const pressable = (overrides: Partial<NativeNode> = {}) =>
  node({
    components: ['Pressable'],
    props: { role: 'button', 'aria-label': 'Save' },
    interactive: true,
    pressId: 1,
    ...overrides,
  });

const rulesOf = (nodes: NativeNode[], params = {}) => checkNodes(nodes, params).map(v => v.rule);

describe('checkNodes', () => {
  it('passes a labelled, role-bearing, large-enough pressable', () => {
    expect(checkNodes([pressable()])).toEqual([]);
  });

  it('flags a pressable without a role', () => {
    expect(rulesOf([pressable({ props: { 'aria-label': 'Save' } })])).toEqual([
      'pressable-has-role',
    ]);
  });

  it('accepts accessibilityRole or a DOM role attribute as the role', () => {
    expect(
      rulesOf([pressable({ props: { accessibilityRole: 'button', accessibilityLabel: 'Save' } })])
    ).toEqual([]);
    expect(
      rulesOf([pressable({ props: { 'aria-label': 'Save' }, attrs: { role: 'button' } })])
    ).toEqual([]);
  });

  it('flags a pressable with no label or text, but accepts text content', () => {
    expect(rulesOf([pressable({ props: { role: 'button' } })])).toEqual(['pressable-has-name']);
    expect(rulesOf([pressable({ props: { role: 'button' }, textContent: 'Save' })])).toEqual([]);
  });

  it('ignores disabled/non-interactive and hidden nodes', () => {
    expect(rulesOf([node({ props: {} })])).toEqual([]);
    expect(rulesOf([pressable({ props: {}, hidden: true })])).toEqual([]);
  });

  describe('touch-target-size', () => {
    const at = (x: number, y: number, width: number, height: number) =>
      pressable({ pressId: x * 1000 + y + 1, rect: { x, y, width, height } });

    it('errors when an undersized target is crowded by another target', () => {
      const violations = checkNodes([at(0, 0, 20, 20), at(20, 0, 48, 48)]);
      expect(violations.map(v => [v.rule, v.severity])).toContainEqual([
        'touch-target-size',
        'error',
      ]);
    });

    it('errors when two undersized targets are closer than 24px', () => {
      const errors = checkNodes([at(0, 0, 20, 20), at(20, 0, 20, 20)]).filter(
        v => v.severity === 'error'
      );
      expect(errors).toHaveLength(2);
    });

    it('passes the spacing exception when an undersized target has room, but still warns', () => {
      const [v] = checkNodes([at(0, 0, 20, 20), at(100, 0, 48, 48)]);
      expect(v).toMatchObject({ rule: 'touch-target-size', severity: 'warn' });
    });

    it('warns between 24 and 44', () => {
      const [v] = checkNodes([at(0, 0, 24, 24)]);
      expect(v).toMatchObject({ rule: 'touch-target-size', severity: 'warn' });
    });

    it('counts hitSlop towards the target size', () => {
      const props = { role: 'button', 'aria-label': 'Close', hitSlop: 12 };
      expect(rulesOf([pressable({ props, rect: { x: 0, y: 0, width: 20, height: 20 } })])).toEqual(
        []
      );
    });

    it('ignores a wrapper forwarding the same handler to its child', () => {
      const nodes = [
        pressable({ pressId: 1, rect: { x: 0, y: 0, width: 20, height: 20 } }),
        pressable({
          pressId: 1,
          interactiveAncestor: 0,
          rect: { x: 0, y: 0, width: 20, height: 20 },
        }),
      ];
      expect(checkNodes(nodes).filter(v => v.severity === 'error')).toEqual([]);
    });

    it('still checks spacing between siblings that share a press handler', () => {
      const nodes = [
        pressable({ pressId: 1, rect: { x: 0, y: 0, width: 20, height: 20 } }),
        pressable({ pressId: 1, rect: { x: 20, y: 0, width: 20, height: 20 } }),
      ];
      const errors = checkNodes(nodes).filter(
        v => v.rule === 'touch-target-size' && v.severity === 'error'
      );
      expect(errors).toHaveLength(2);
    });

    it('skips elements that are not laid out', () => {
      expect(rulesOf([pressable({ rect: { x: 0, y: 0, width: 0, height: 0 } })])).toEqual([]);
    });
  });

  it('flags images without a label', () => {
    expect(rulesOf([node({ components: ['Image'] })])).toEqual(['image-has-label']);
    expect(
      rulesOf([node({ components: ['Image'], props: { accessibilityLabel: 'Logo' } })])
    ).toEqual([]);
    expect(rulesOf([node({ components: ['Image'], hidden: true })])).toEqual([]);
  });

  it('flags toggles without checked state', () => {
    expect(rulesOf([node({ attrs: { role: 'radio' } })])).toEqual(['toggle-has-state']);
    expect(rulesOf([node({ attrs: { role: 'radio', 'aria-checked': 'false' } })])).toEqual([]);
    expect(
      rulesOf([node({ props: { role: 'switch', accessibilityState: { checked: true } } })])
    ).toEqual([]);
  });

  it('flags adjustable roles without a value', () => {
    expect(rulesOf([node({ props: { accessibilityRole: 'adjustable' } })])).toEqual([
      'adjustable-has-value',
    ]);
    expect(rulesOf([node({ props: { role: 'slider', 'aria-valuenow': 3 } })])).toEqual([]);
  });

  it('warns on a hint without a label', () => {
    const [v] = checkNodes([node({ props: { accessibilityHint: 'Opens settings' } })]);
    expect(v).toMatchObject({ rule: 'hint-without-label', severity: 'warn' });
  });

  describe('no-nested-pressables', () => {
    it('reports once per outer element, however many children are nested', () => {
      const nodes = [
        pressable({ pressId: 1 }),
        pressable({ pressId: 2, interactiveAncestor: 0 }),
        pressable({ pressId: 3, interactiveAncestor: 0 }),
      ];
      expect(rulesOf(nodes)).toEqual(['no-nested-pressables']);
    });

    it('ignores a child forwarding the same press handler', () => {
      const nodes = [pressable({ pressId: 1 }), pressable({ pressId: 1, interactiveAncestor: 0 })];
      expect(rulesOf(nodes)).toEqual([]);
    });
  });

  describe('overrides', () => {
    const bad = [pressable({ props: {}, rect: { x: 0, y: 0, width: 10, height: 10 } })];

    it('disable skips every rule', () => {
      expect(checkNodes(bad, { disable: true, reason: 'demo' })).toEqual([]);
    });

    it('turns individual rules off or down to warn', () => {
      const violations = checkNodes(bad, {
        rules: { 'pressable-has-role': 'off', 'touch-target-size': 'warn' },
        reason: 'demo',
      });
      expect(violations.map(v => [v.rule, v.severity])).toEqual([
        ['pressable-has-name', 'error'],
        ['touch-target-size', 'warn'],
      ]);
    });

    it('lists skipped rules for the report', () => {
      expect(skippedRules({ disable: true })).toEqual(['*']);
      expect(
        skippedRules({ rules: { 'image-has-label': 'off', 'touch-target-size': 'warn' } })
      ).toEqual(['image-has-label']);
      expect(skippedRules()).toEqual([]);
    });
  });
});
