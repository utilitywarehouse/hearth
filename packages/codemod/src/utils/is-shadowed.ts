import type { ASTPath } from 'jscodeshift';

interface Scope {
  isGlobal?: boolean;
  lookup: (name: string) => Scope | null;
}

/**
 * Whether `name` is declared in an inner scope at `path`, rather than only at module level
 * (where the Hearth import lives).
 */
export function isShadowed(path: ASTPath, name: string): boolean {
  const declaringScope = (path.scope as Scope | null | undefined)?.lookup(name);
  return !!declaringScope && !declaringScope.isGlobal;
}
