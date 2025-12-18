/* The global prefix, mostly used with component class names */
export const GLOBAL_PREFIX = 'h';

/* returns a name with the global prefix */
export function withGlobalPrefix(name: string) {
  return `${GLOBAL_PREFIX}-${name}`;
}
