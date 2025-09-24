/* The global prefix, mostly used with component class names */
export const GLOBAL_PREFIX_CAPITALISED = 'Hearth';
export const GLOBAL_PREFIX = GLOBAL_PREFIX_CAPITALISED.toLowerCase();

/* returns a component's displayName and className with the global prefix */
export function withGlobalPrefix(name: string) {
  return {
    displayName: `${GLOBAL_PREFIX_CAPITALISED}${name}`,
    componentClassName: `${GLOBAL_PREFIX}-${name}`,
  };
}
