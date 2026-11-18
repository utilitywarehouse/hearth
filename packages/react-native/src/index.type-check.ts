/**
 * Type-level check of the public API. It never runs: `tsc` is the test.
 *
 * Every line below uses only type positions (`typeof`), so TypeScript removes
 * them and no runtime code loads. Each `@ts-expect-error` must hide a real
 * error. If a removed name is exported again, `tsc` reports an unused
 * directive and fails.
 */
import type * as hearth from './index';

// Kept: these must exist.
export type KeptExports = [
  typeof hearth.StyleSheet,
  typeof hearth.themes,
  typeof hearth.lightTheme,
  typeof hearth.darkTheme,
  typeof hearth.breakpoints,
  typeof hearth.useTheme,
  typeof hearth.useColorMode,
  typeof hearth.useBreakpointValue,
  typeof hearth.useMedia,
  typeof hearth.useToken,
  typeof hearth.useStyleProps,
  hearth.AppThemes,
  hearth.AppBreakpoints,
];

// Removed values and helpers: these must not exist.
// @ts-expect-error UnistylesRuntime is no longer exported.
export type NoUnistylesRuntime = typeof hearth.UnistylesRuntime;
// @ts-expect-error useUnistyles is no longer exported.
export type NoUseUnistyles = typeof hearth.useUnistyles;
// @ts-expect-error withUnistyles is no longer exported.
export type NoWithUnistyles = typeof hearth.withUnistyles;
// @ts-expect-error createUnistylesElement is no longer exported.
export type NoCreateUnistylesElement = typeof hearth.createUnistylesElement;
// @ts-expect-error ScopedTheme is no longer exported.
export type NoScopedTheme = typeof hearth.ScopedTheme;
// @ts-expect-error Display is no longer exported.
export type NoDisplay = typeof hearth.Display;
// @ts-expect-error Hide is no longer exported.
export type NoHide = typeof hearth.Hide;
// @ts-expect-error mq is no longer exported.
export type NoMq = typeof hearth.mq;
// @ts-expect-error getServerUnistyles is no longer exported.
export type NoGetServerUnistyles = typeof hearth.getServerUnistyles;
// @ts-expect-error hydrateServerUnistyles is no longer exported.
export type NoHydrateServerUnistyles = typeof hearth.hydrateServerUnistyles;
// @ts-expect-error resetServerUnistyles is no longer exported.
export type NoResetServerUnistyles = typeof hearth.resetServerUnistyles;
// @ts-expect-error useServerUnistyles is no longer exported.
export type NoUseServerUnistyles = typeof hearth.useServerUnistyles;

// Removed hooks: these must not exist.
// @ts-expect-error usePrevious is no longer exported.
export type NoUsePrevious = typeof hearth.usePrevious;
// @ts-expect-error useFormFieldAccessibility is no longer exported.
export type NoUseFormFieldAccessibility = typeof hearth.useFormFieldAccessibility;

// Removed types: these must not exist.
// @ts-expect-error UnistylesThemes is no longer exported.
export type NoUnistylesThemes = hearth.UnistylesThemes;
// @ts-expect-error UnistylesBreakpoints is no longer exported.
export type NoUnistylesBreakpoints = hearth.UnistylesBreakpoints;
// @ts-expect-error UnistylesVariants is no longer exported.
export type NoUnistylesVariants = hearth.UnistylesVariants;
