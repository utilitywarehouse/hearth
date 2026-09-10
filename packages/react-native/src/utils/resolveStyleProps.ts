import {
  propStyleMapping,
  semanticPropMapping,
  themeStyleFallbackMapping,
  themeStyleMapping,
  viewStyleProps,
} from './styleUtils';
import { resolveThemeValueWithFallback } from './themeValueHelpers';

/**
 * Precomputed instructions for turning a single utility prop into a style entry.
 */
interface StylePropPlan {
  /** Target style property name (e.g. `p` -> `padding`) */
  styleProp: string;
  /** Pre-split path to the primary theme mapping (e.g. ['helpers', 'semanticColor', 'background']) */
  themePath?: string[];
  /** Pre-split path to the fallback theme mapping */
  fallbackPath?: string[];
  /** Semantic props consult the fallback mapping even when the primary mapping is missing */
  semantic: boolean;
}

const createPlan = (
  styleProp: string,
  themeKey: string | undefined,
  semantic: boolean
): StylePropPlan => {
  const fallbackKey = themeKey ? themeStyleFallbackMapping[themeKey] : undefined;

  return {
    styleProp,
    themePath: themeKey?.split('.'),
    fallbackPath: fallbackKey?.split('.'),
    semantic,
  };
};

/**
 * Every recognised style prop name mapped to its resolution plan, built once at
 * module load so the per-render cost is a single Map lookup per prop.
 * Insertion order mirrors the resolution precedence: semantic props, then
 * shorthand props, then direct ViewStyle props.
 */
const stylePropPlans = new Map<string, StylePropPlan>();

Object.entries(semanticPropMapping).forEach(([propName, { styleProp, themeKey }]) => {
  stylePropPlans.set(propName, createPlan(styleProp, themeKey, true));
});
Object.entries(propStyleMapping).forEach(([propName, styleProp]) => {
  if (!stylePropPlans.has(propName)) {
    stylePropPlans.set(propName, createPlan(styleProp, themeStyleMapping[styleProp], false));
  }
});
viewStyleProps.forEach(propName => {
  if (!stylePropPlans.has(propName)) {
    stylePropPlans.set(propName, createPlan(propName, themeStyleMapping[propName], false));
  }
});

/**
 * Whether a prop name is consumed as a style prop (semantic, shorthand or direct
 * ViewStyle prop) rather than forwarded to the underlying component.
 */
export const isStyleProp = (propName: string): boolean => stylePropPlans.has(propName);

const getThemeMapping = (theme: Record<string, any>, path: string[]): any => {
  let mapping: any = theme;

  for (let index = 0; index < path.length && mapping != null; index++) {
    mapping = mapping[path[index]];
  }

  return mapping;
};

/**
 * Resolve utility style props into a style object, translating shorthand names
 * and looking string values up against the theme.
 *
 * Props that are not style related are skipped, or collected into
 * `remainingProps` when provided. `undefined` values are dropped entirely.
 */
export const resolveStyleProps = (
  props: Record<string, any>,
  theme: Record<string, any>,
  remainingProps?: Record<string, any>
): Record<string, any> => {
  const computedStyles: Record<string, any> = {};

  for (const propName in props) {
    const propValue = props[propName];
    if (propValue === undefined) continue;

    const plan = stylePropPlans.get(propName);
    if (!plan) {
      if (remainingProps) {
        remainingProps[propName] = propValue;
      }
      continue;
    }

    // Only string values resolve against the theme
    if (!plan.themePath || typeof propValue !== 'string') {
      computedStyles[plan.styleProp] = propValue;
      continue;
    }

    const primaryMapping = getThemeMapping(theme, plan.themePath);

    if (!primaryMapping && !plan.semantic) {
      computedStyles[plan.styleProp] = propValue;
      continue;
    }

    const fallbackMapping = plan.fallbackPath
      ? getThemeMapping(theme, plan.fallbackPath)
      : undefined;

    computedStyles[plan.styleProp] = resolveThemeValueWithFallback(
      propValue,
      primaryMapping,
      fallbackMapping
    );
  }

  return computedStyles;
};
