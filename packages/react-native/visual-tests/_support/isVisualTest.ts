// Metro inlines `EXPO_PUBLIC_*`; this package has no Node types, so declare the one global used.
declare const process: { env: Record<string, string | undefined> };

/**
 * `true` when the Storybook app was built for visual regression (Chromatic).
 *
 * `EXPO_PUBLIC_*` variables are inlined by Metro at bundle time, so this is a
 * build-time constant. It must be read as `process.env.EXPO_PUBLIC_VISUAL_TESTS`
 * (no destructuring or dynamic access) for the inlining to work.
 */
export const isVisualTest = (): boolean => process.env.EXPO_PUBLIC_VISUAL_TESTS === 'true';
