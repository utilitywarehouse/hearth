import { ViewStyle } from 'react-native';
import { describe, expect, it } from 'vitest';
import { isStyleProp, resolveStyleProps } from './resolveStyleProps';
import {
  propStyleMapping,
  semanticPropMapping,
  themeStyleFallbackMapping,
  themeStyleMapping,
  viewStyleProps,
} from './styleUtils';
import { resolveThemeKey, resolveThemeValue, resolveThemeValueWithFallback } from './themeValueHelpers';

const fakeTheme = {
  space: {
    none: 0,
    full: '100%',
    '1/2': '50%',
    '2xs': { base: 2, md: 3, lg: 4 },
    sm: { base: 4, md: 6, lg: 8 },
    md: { base: 8, md: 12, lg: 16 },
    lg: { base: 16, md: 20, lg: 24 },
  },
  borderRadius: { sm: 4, md: 8 },
  borderWidth: { default: 1, active: 2 },
  color: {
    white: '#ffffff',
    purple: { 100: '#efe5f5', 800: '#2e0053' },
    broadbandBlue: { 100: '#e3f2fd' },
    feedback: { danger: { surface: { default: '#ffd6d6' } } },
  },
  helpers: {
    semanticColor: {
      background: { brand: '#550091', primary: '#ffffff', secondary: '#f5f5f5' },
      border: { strong: '#111111', subtle: '#dddddd' },
      text: { primary: '#1d1d1d', muted: '#666666' },
      icon: { primary: '#2d2d2d' },
    },
  },
};

// A theme without the semantic helper mappings, to pin down the missing-mapping behaviour
const themeWithoutHelpers = {
  space: fakeTheme.space,
  color: fakeTheme.color,
};

const emptyTheme = {};

/**
 * Verbatim copy of the resolution loop from useStyleProps/Box prior to the
 * performance refactor. Kept as the behavioural reference: resolveStyleProps
 * must produce identical output for any input.
 */
const legacyResolveStyleProps = (props: Record<string, any>, theme: Record<string, any>) => {
  const computedStyles: Record<string, any> = {};
  const remainingProps: Record<string, any> = {};

  Object.entries(props).forEach(([propName, propValue]) => {
    if (propValue === undefined) return;

    const semanticMapping = semanticPropMapping[propName];
    if (semanticMapping) {
      const { styleProp, themeKey } = semanticMapping;
      const themeMapping = resolveThemeKey(theme, themeKey);
      const fallbackKey = themeStyleFallbackMapping[themeKey];
      const fallbackMapping = fallbackKey ? resolveThemeKey(theme, fallbackKey) : undefined;

      computedStyles[styleProp] = resolveThemeValueWithFallback(
        propValue,
        themeMapping,
        fallbackMapping
      );
      return;
    }

    let stylePropName: keyof ViewStyle | undefined;

    if (propStyleMapping[propName]) {
      stylePropName = propStyleMapping[propName];
    } else if (viewStyleProps.has(propName)) {
      stylePropName = propName as keyof ViewStyle;
    }

    if (stylePropName) {
      const themeKey = themeStyleMapping[stylePropName as string];

      if (themeKey) {
        const themeObj = resolveThemeKey(theme, themeKey);
        const fallbackKey = themeStyleFallbackMapping[themeKey];
        const fallbackMapping = fallbackKey ? resolveThemeKey(theme, fallbackKey) : undefined;

        if (themeObj) {
          computedStyles[stylePropName] = resolveThemeValueWithFallback(
            propValue,
            themeObj,
            fallbackMapping
          );
        } else {
          computedStyles[stylePropName] = propValue;
        }
      } else {
        computedStyles[stylePropName] = propValue;
      }
    } else {
      remainingProps[propName] = propValue;
    }
  });

  return { computedStyles, remainingProps };
};

const propsCorpus: Record<string, any>[] = [
  {},
  { p: 'md' },
  { p: 24 },
  { padding: 'md' },
  { px: 'lg', py: 'sm' },
  { m: 'none', mt: '2xs' },
  { w: '1/2', h: 'full' },
  { width: 120, minHeight: 'sm' },
  { bg: 'brand' },
  { bg: 'purple800' },
  { bg: 'feedbackDangerSurfaceDefault' },
  { bg: '#336699' },
  { bgColor: 'secondary' },
  { backgroundColor: 'primary' },
  { color: 'primary' },
  { color: 'white' },
  { color: 'notAToken' },
  { iconColor: 'primary' },
  { borderColor: 'subtle' },
  { borderTopColor: 'strong' },
  { shadowColor: 'purple100' },
  { shadowColor: 'broadbandBlue100' },
  { rounded: 'sm' },
  { borderRadius: 'md', borderWidth: 'default' },
  { spacing: 'md' },
  { space: 'lg' },
  { gap: 'sm', rowGap: 4 },
  { opacity: 0.5, flexDirection: 'row', alignItems: 'center' },
  { flex: 1, zIndex: 10, position: 'absolute' },
  { transform: [{ translateX: 5 }] },
  { testID: 'box', accessibilityLabel: 'a label' },
  { onLayout: () => {}, custom: { nested: true } },
  { p: undefined, bg: undefined, testID: undefined },
  { p: 'md', padding: 'lg' },
  {
    p: 'md',
    px: 'lg',
    bg: 'brand',
    color: 'primary',
    borderColor: 'subtle',
    rounded: 'sm',
    w: '1/2',
    flexDirection: 'row',
    opacity: 0.9,
    flex: 1,
    testID: 'kitchen-sink',
    accessibilityRole: 'button',
    onLayout: () => {},
  },
];

describe('resolveStyleProps', () => {
  describe.each([
    ['full theme', fakeTheme],
    ['theme without semantic helpers', themeWithoutHelpers],
    ['empty theme', emptyTheme],
  ])('matches the legacy implementation with %s', (_label, theme) => {
    it.each(propsCorpus.map((props, index) => [index, props] as const))(
      'produces identical output for corpus entry %#',
      (_index, props) => {
        const expected = legacyResolveStyleProps(props, theme);

        const remainingProps: Record<string, any> = {};
        const computedStyles = resolveStyleProps(props, theme, remainingProps);

        expect(computedStyles).toEqual(expected.computedStyles);
        expect(remainingProps).toEqual(expected.remainingProps);
      }
    );
  });

  it('resolves shorthand props against the theme', () => {
    expect(resolveStyleProps({ p: 'md' }, fakeTheme)).toEqual({
      padding: { base: 8, md: 12, lg: 16 },
    });
    expect(resolveStyleProps({ w: '1/2' }, fakeTheme)).toEqual({ width: '50%' });
    expect(resolveStyleProps({ rounded: 'sm' }, fakeTheme)).toEqual({ borderRadius: 4 });
    expect(resolveStyleProps({ spacing: 'md' }, fakeTheme)).toEqual({
      gap: { base: 8, md: 12, lg: 16 },
    });
  });

  it('passes through non-string values without theme resolution', () => {
    expect(resolveStyleProps({ p: 24, opacity: 0.5, flex: 1 }, fakeTheme)).toEqual({
      padding: 24,
      opacity: 0.5,
      flex: 1,
    });
  });

  it('resolves semantic color props with fallback to the full color object', () => {
    expect(resolveStyleProps({ color: 'primary' }, fakeTheme)).toEqual({ color: '#1d1d1d' });
    expect(resolveStyleProps({ iconColor: 'primary' }, fakeTheme)).toEqual({ color: '#2d2d2d' });
    // 'white' is not a semantic text token, so it falls back to theme.color.white
    expect(resolveStyleProps({ color: 'white' }, fakeTheme)).toEqual({ color: '#ffffff' });
  });

  it('resolves background colors semantically, then via the color fallback', () => {
    expect(resolveStyleProps({ bg: 'brand' }, fakeTheme)).toEqual({ backgroundColor: '#550091' });
    // numeric suffix pattern via the theme.color fallback
    expect(resolveStyleProps({ bg: 'purple800' }, fakeTheme)).toEqual({
      backgroundColor: '#2e0053',
    });
    // camelCase nested path via the theme.color fallback
    expect(resolveStyleProps({ bg: 'feedbackDangerSurfaceDefault' }, fakeTheme)).toEqual({
      backgroundColor: '#ffd6d6',
    });
    // unresolvable values pass through untouched
    expect(resolveStyleProps({ bg: '#336699' }, fakeTheme)).toEqual({
      backgroundColor: '#336699',
    });
  });

  it('collects non-style props into remainingProps and drops undefined values', () => {
    const onLayout = () => {};
    const remainingProps: Record<string, any> = {};
    const computedStyles = resolveStyleProps(
      { p: 'md', testID: 'box', onLayout, hidden: undefined, bg: undefined },
      fakeTheme,
      remainingProps
    );

    expect(computedStyles).toEqual({ padding: { base: 8, md: 12, lg: 16 } });
    expect(remainingProps).toEqual({ testID: 'box', onLayout });
  });

  it('returns identical results on repeated calls (cached resolution)', () => {
    const props = { bg: 'purple800', color: 'feedbackDangerSurfaceDefault', p: 'md' };
    const first = resolveStyleProps(props, fakeTheme);
    const second = resolveStyleProps(props, fakeTheme);

    expect(second).toEqual(first);
  });

  it('does not leak cached values between themes', () => {
    const themeA = {
      helpers: { semanticColor: { background: {} } },
      color: { purple: { 800: '#aaa' } },
    };
    const themeB = {
      helpers: { semanticColor: { background: {} } },
      color: { purple: { 800: '#bbb' } },
    };

    expect(resolveStyleProps({ bg: 'purple800' }, themeA)).toEqual({ backgroundColor: '#aaa' });
    expect(resolveStyleProps({ bg: 'purple800' }, themeB)).toEqual({ backgroundColor: '#bbb' });
    expect(resolveStyleProps({ bg: 'purple800' }, themeA)).toEqual({ backgroundColor: '#aaa' });
  });
});

describe('isStyleProp', () => {
  it('recognises semantic, shorthand and direct style props', () => {
    expect(isStyleProp('color')).toBe(true);
    expect(isStyleProp('iconColor')).toBe(true);
    expect(isStyleProp('p')).toBe(true);
    expect(isStyleProp('bg')).toBe(true);
    expect(isStyleProp('padding')).toBe(true);
    expect(isStyleProp('flexDirection')).toBe(true);
  });

  it('rejects props that are not style related', () => {
    expect(isStyleProp('testID')).toBe(false);
    expect(isStyleProp('onLayout')).toBe(false);
    expect(isStyleProp('children')).toBe(false);
    expect(isStyleProp('accessibilityLabel')).toBe(false);
  });

  it('agrees with the mapping tables for every known prop name', () => {
    Object.keys(semanticPropMapping).forEach(propName => {
      expect(isStyleProp(propName)).toBe(true);
    });
    Object.keys(propStyleMapping).forEach(propName => {
      expect(isStyleProp(propName)).toBe(true);
    });
    viewStyleProps.forEach(propName => {
      expect(isStyleProp(propName)).toBe(true);
    });
  });
});

describe('resolveThemeValue (cached slow path)', () => {
  it('keeps direct, camelCase, numeric-suffix and passthrough behaviour', () => {
    const mapping = fakeTheme.color;

    expect(resolveThemeValue('white', mapping)).toBe('#ffffff');
    expect(resolveThemeValue('feedbackDangerSurfaceDefault', mapping)).toBe('#ffd6d6');
    expect(resolveThemeValue('purple800', mapping)).toBe('#2e0053');
    expect(resolveThemeValue('missingToken', mapping)).toBe('missingToken');
    expect(resolveThemeValue(12, mapping)).toBe(12);
    expect(resolveThemeValue('anything', undefined)).toBe('anything');
  });

  it('returns stable results for repeated slow-path lookups', () => {
    const mapping = { deeply: { nested: { token: '#123456' } } };

    expect(resolveThemeValue('deeplyNestedToken', mapping)).toBe('#123456');
    expect(resolveThemeValue('deeplyNestedToken', mapping)).toBe('#123456');
    expect(resolveThemeValue('deeplyNestedMiss', mapping)).toBe('deeplyNestedMiss');
    expect(resolveThemeValue('deeplyNestedMiss', mapping)).toBe('deeplyNestedMiss');
  });
});
