import type { NativeNode } from './types';

/** Marker for story-only scaffolding that shouldn't be checked (web and native). */
export const A11Y_IGNORE_SELECTOR = '[data-a11y-ignore]';

// Same internals addon-a11y excludes from its axe run.
const STORYBOOK_INTERNALS = ['.sb-wrapper', '#storybook-docs', '#storybook-highlights-root'];

// Minimal shape of the React internals we read. Relying on these is acceptable
// for an advisory check; keep all fiber access in this file.
interface Fiber {
  type: unknown;
  stateNode: unknown;
  memoizedProps: Record<string, unknown> | null;
  child: Fiber | null;
  sibling: Fiber | null;
  return: Fiber | null;
}

const fiberKey = (el: Element) => Object.keys(el).find(k => k.startsWith('__reactFiber$'));

const componentName = (type: unknown): string => {
  if (!type || typeof type === 'string') return '';
  const t = type as {
    displayName?: string;
    name?: string;
    render?: { displayName?: string; name?: string };
  };
  return t.displayName || t.name || t.render?.displayName || t.render?.name || '';
};

const snippet = (el: Element) => el.outerHTML.slice(0, 160);

/**
 * Walk the React tree that rendered `root` and return one node per DOM host
 * element, carrying the RN props of the components that rendered it. Portalled
 * content (Modal, BottomSheet) is part of the same tree, so it's included.
 */
export function collectNodes(root: Element, exclude: string[] = []): NativeNode[] {
  const first = root.querySelector('*');
  const key = first && fiberKey(first);
  if (!first || !key) return [];

  let fiber = (first as unknown as Record<string, Fiber>)[key];
  while (fiber.return) fiber = fiber.return;

  const pressIds = new WeakMap<object, number>();
  let nextPressId = 1;
  const pressIdOf = (handler: unknown) => {
    if (typeof handler !== 'function') return null;
    if (!pressIds.has(handler)) pressIds.set(handler, nextPressId++);
    return pressIds.get(handler) ?? null;
  };
  const excludeSelector = [...STORYBOOK_INTERNALS, A11Y_IGNORE_SELECTOR, ...exclude].join(',');

  const nodes: NativeNode[] = [];

  const visit = (start: Fiber | null, composites: Fiber[], interactiveAncestor: number | null) => {
    for (let f = start; f; f = f.sibling) {
      const el = f.stateNode;
      if (typeof f.type === 'string' && el instanceof Element) {
        if (el.closest(excludeSelector)) continue;
        const props = Object.assign({}, ...composites.map(c => c.memoizedProps ?? {})) as Record<
          string,
          unknown
        >;
        const handler = props.onPress ?? props.onLongPress;
        const interactive = typeof handler === 'function' && !props.disabled;
        const rect = el.getBoundingClientRect();
        const index = nodes.length;
        nodes.push({
          components: composites.map(c => componentName(c.type)).filter(Boolean),
          props,
          attrs: Object.fromEntries(Array.from(el.attributes, a => [a.name, a.value])),
          tagName: el.tagName,
          textContent: el.textContent ?? '',
          rect: { x: rect.left, y: rect.top, width: rect.width, height: rect.height },
          interactive,
          pressId: interactive ? pressIdOf(handler) : null,
          interactiveAncestor,
          hidden:
            props.accessible === false ||
            props['aria-hidden'] === true ||
            props.accessibilityElementsHidden === true ||
            props.importantForAccessibility === 'no-hide-descendants' ||
            !!el.closest('[aria-hidden="true"]'),
          html: snippet(el),
        });
        visit(f.child, [], interactive ? index : interactiveAncestor);
      } else {
        visit(f.child, [...composites, f], interactiveAncestor);
      }
    }
  };

  visit(fiber.child, [], null);
  return nodes;
}
