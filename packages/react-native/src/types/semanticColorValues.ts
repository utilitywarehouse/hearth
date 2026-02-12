import type semanticLight from '../tokens/semantic-light';

/**
 * Simplified background color values derived from the semantic token `background` keys.
 * e.g., 'brand' | 'primary' | 'secondary'
 */
export type BackgroundColorValue = keyof typeof semanticLight.background;

/**
 * Simplified border color values derived from the semantic token `border` keys.
 * e.g., 'strong' | 'subtle'
 */
export type BorderColorValue = keyof typeof semanticLight.border;

/**
 * Simplified text color values derived from the semantic token `text` keys.
 * e.g., 'affirmative' | 'brand' | 'inverted' | 'primary' | 'secondary'
 * Also accepts any raw color value or undefined.
 */
export type TextColorValue = keyof typeof semanticLight.text;

/**
 * Simplified icon color values derived from the semantic token `icon` keys.
 * e.g., 'inverted' | 'primary'
 */
export type IconColorValue = keyof typeof semanticLight.icon;
