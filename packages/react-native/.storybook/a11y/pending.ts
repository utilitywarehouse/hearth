// Storybook runs preview-level afterEach hooks *before* addon-a11y's, and the first
// hook to throw stops the rest. So in strict mode the story hook only records native
// violations here, and `throwPendingNativeViolations` (a vitest afterEach in
// vitest.setup.ts) throws them once the whole story, axe included, has run. A story
// that fails both then reports both. Kept dependency-free so vitest.setup.ts can
// import it before the Unistyles mocks are in place.
let pending: string | null = null;

export function setPendingNativeViolations(message: string) {
  pending = message;
}

/** Vitest afterEach: fail the story with any native violations recorded for it. */
export function throwPendingNativeViolations() {
  const message = pending;
  pending = null;
  if (message) throw new Error(message);
}
