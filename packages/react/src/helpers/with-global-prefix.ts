/* The global prefix, mostly used with component class names */
export const GLOBAL_PREFIX_CAPITALISED = 'Hearth';
export const GLOBAL_PREFIX = GLOBAL_PREFIX_CAPITALISED.toLowerCase();

/* returns a className prefixed with the global prefix */
export function withClassnameGlobalPrefix(name: string) {
  return `${GLOBAL_PREFIX}-${name}`;
}

/* returns a component name prefixed with the global prefix */
export function withComponentNameGlobalPrefix(name: string) {
  return `${GLOBAL_PREFIX_CAPITALISED}-${name}`;
}
