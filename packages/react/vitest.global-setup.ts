/**
 * Force process exit after tests complete.
 *
 * In CI (Linux/Docker), Playwright's pipe connection to the Chromium subprocess
 * holds native file descriptors that are invisible to Node's async handle
 * tracking, preventing a clean exit. This teardown fires after vitest has
 * collected all results and set process.exitCode, so the correct exit code
 * is preserved.
 */
export async function teardown() {
  process.exit(process.exitCode ?? 0);
}
