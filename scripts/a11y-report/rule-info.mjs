// Metadata for the rules the report shows: axe impact and native rule descriptions.

// Default impact of the axe rules we see most. axe's failure message doesn't carry
// the impact, and unknown rules just get a neutral bullet.
export const AXE_IMPACT = {
  'aria-allowed-attr': 'critical',
  'aria-required-attr': 'critical',
  'aria-required-children': 'critical',
  'aria-valid-attr': 'critical',
  'aria-valid-attr-value': 'critical',
  'button-name': 'critical',
  'image-alt': 'critical',
  'input-button-name': 'critical',
  label: 'critical',
  'select-name': 'critical',
  'aria-hidden-focus': 'serious',
  'aria-prohibited-attr': 'serious',
  'aria-toggle-field-name': 'serious',
  'autocomplete-valid': 'serious',
  'color-contrast': 'serious',
  dlitem: 'serious',
  'link-name': 'serious',
  list: 'serious',
  listitem: 'serious',
  'nested-interactive': 'serious',
  'scrollable-region-focusable': 'serious',
  'heading-order': 'moderate',
  'landmark-unique': 'moderate',
  'page-has-heading-one': 'moderate',
  region: 'moderate',
};

export const IMPACT_EMOJI = { critical: '🔴', serious: '🟠', moderate: '🟡', minor: '⚪' };

/** Bullet for a rule: axe impact colour, or 📱 for native rules. */
export const ruleEmoji = (source, rule) =>
  source === 'native' ? '📱' : (IMPACT_EMOJI[AXE_IMPACT[rule]] ?? '•');

// Mirrors the table in README.md.
export const NATIVE_RULE_HELP = {
  'pressable-has-role': 'Elements with onPress/onLongPress need a role/accessibilityRole',
  'pressable-has-name': 'Interactive elements need a label or text content',
  'image-has-label':
    'Images need accessibilityLabel/alt, or accessible={false} if they are decorative',
  'adjustable-has-value': 'adjustable/slider roles must expose a value',
  'toggle-has-state': 'checkbox/switch/radio roles must expose a checked state',
  'no-nested-pressables':
    'Interactive elements must not contain other interactive elements (TalkBack merges them)',
  'hint-without-label': 'accessibilityHint needs a label too',
  'touch-target-size': 'Touch targets must be at least 24×24, including hitSlop (WCAG 2.5.8)',
};
