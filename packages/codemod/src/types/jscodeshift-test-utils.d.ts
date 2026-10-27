declare module 'jscodeshift/dist/testUtils' {
  export function applyTransform(
    module: unknown,
    options: Record<string, unknown>,
    input: { source: string; path?: string },
    testOptions?: { parser?: string }
  ): string;
}
