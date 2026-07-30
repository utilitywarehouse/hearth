// Pure helpers for the ordered-registration bookkeeping CardActions uses to work out
// which registered CardAction is "first" (see CardActions.tsx). Kept separate so the
// list-ordering logic itself can be unit tested without mounting the component.

/**
 * Adds an id to the end of the registration order, unless it's already present.
 * Returns a new array - the input is never mutated.
 */
export const addActionId = (order: string[], id: string): string[] =>
  order.includes(id) ? order : [...order, id];

/**
 * Removes an id from the registration order.
 * Returns a new array - the input is never mutated.
 */
export const removeActionId = (order: string[], id: string): string[] =>
  order.filter(currentId => currentId !== id);

/**
 * Returns the id currently at the front of the registration order, if any.
 */
export const getFirstActionId = (order: string[]): string | undefined => order[0];
