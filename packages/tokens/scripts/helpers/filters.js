// Components that have device-specific variants (mobile, tablet, desktop)
const VALID_DEVICE_COMPONENTS = ['card', 'dialog', 'modal'];
// Component tokens to ignore because they are native only implmentations
const NATIVE_ONLY_COMPONENTS = ['bottom-navigation', 'top-navigation', 'indicator-icon-button'];

// Shared filters for gathering specific sets of tokens.
// These avoid using `token.attributes` as we can't rely that they'll always be
// available. Use `token.path` instead.
export const filters = {
  isStringToken: token => token.value && typeof token.alias === 'string',
  isFont: token =>
    token.path.includes('font') ||
    (token.filePath.includes('primitive') && token.path.includes('line-height')) ||
    (token.filePath.includes('primitive') && token.path.includes('letter-spacing')),
  isFontSize: token => token.attributes.category === 'font' && token.attributes.type === 'size',

  // Identifies colour tokens
  isColor: token => token.type === 'color',

  // Identifies primitive space tokens (spacing values from primitive tokens)
  isPrimitiveSpace: token => token.filePath.includes('primitive') && token.path.includes('space'),
  // Identifies layout space tokens
  isLayoutSpacing: token => token.path.includes('layout') && token.path.includes('spacing'),
  // Identifies combined spacing tokens
  isSpace: token =>
    (token.filePath.includes('primitive') && token.path.includes('space')) ||
    (token.path.includes('layout') && token.path.includes('spacing')),

  // Identifies primitive border tokens (border width and radius from primitive tokens)
  isPrimitiveBorder: token =>
    token.filePath.includes('primitive') &&
    (token.path.includes('border-width') || token.path.includes('border-radius')),
  isPrimitiveLineHeight: token =>
    token.filePath.includes('primitive') && token.path.includes('line-height'),
  isPrimitiveLetterSpacing: token =>
    token.filePath.includes('primitive') && token.path.includes('letter-spacing'),

  // Identifies primitive light color tokens (excludes dark theme colors)
  isPrimitiveLightColor: token => {
    if (token.type === 'color' && (token.path[1] === 'dark' || token.path[0] === 'dark')) {
      return false;
    }
    return token.filePath.includes('primitive') && token.type === 'color';
  },
  isOpacity: token => token.path.includes('opacity'),

  // Identifies component-specific pixel values for:
  // - Outline width
  // - Max/min width
  // - Width
  // - Height
  // - Size (excluding font size)
  isComponentPxValue: token => {
    return (
      (token.filePath.includes('component') && token.path.includes('outline-width')) ||
      (token.filePath.includes('component') && token.path.includes('max-width')) ||
      (token.filePath.includes('component') && token.path.includes('min-width')) ||
      (token.filePath.includes('component') && token.path.includes('heading-width')) ||
      (token.filePath.includes('component') && token.path.includes('width')) ||
      (token.filePath.includes('component') && token.path.includes('height')) ||
      (token.filePath.includes('component') &&
        token.path.includes('size') &&
        !token.path.includes('font'))
    );
  },

  // Identifies semantic tokens
  // Excludes dark theme tokens by checking both attributes and path.
  isSemantic: token => {
    // Exclude tokens where category is 'dark' or path includes 'dark'
    if (token.attributes && token.attributes.category === 'dark') {
      return false;
    }
    if (token.path && token.path.includes('dark')) {
      return false;
    }
    return token.filePath.includes('semantic');
  },
  isComponentToken: token => {
    // Include typography components
    // Identifies typography-related tokens with specific exclusions:
    // - Excludes font-family tokens (uses primitive tokens instead)
    // - Only includes mobile font-weight tokens (as they don't change across devices)
    // - Only includes mobile body-text tokens (as they don't change across devices)
    // - Only includes mobile detail-text tokens (as they don't change across devices)
    if (token.path.includes('typography')) {
      if (token.path.includes('font-family')) {
        // this is one alias too far, we can use primitive tokens for this
        return false;
      }
      // font-weight does not change across devices, so we only need one
      // instance of the font-weight per variant/size, in this case we'll use
      // the initial mobile value
      if (token.path.includes('font-weight') && !token.path.includes('mobile')) {
        return false;
      }
      // body-text values do not change across devices, so we only need one
      // instance of the font-weight per variant/size, in this case we'll use
      // the initial mobile value
      if (token.path.includes('body-text') && !token.path.includes('mobile')) {
        return false;
      }
      // detail-text values do not change across devices, so we only need one
      // instance of the font-weight per variant/size, in this case we'll use
      // the initial mobile value
      if (token.path.includes('detail-text') && !token.path.includes('mobile')) {
        return false;
      }
      return token;
    }
    // Exclude primitive tokens
    if (token.filePath.includes('primitive')) {
      return false;
    }
    // Exclude semantic tokens
    if (token.filePath.includes('semantic')) {
      return false;
    }
    // Only include valid device tokens
    if (
      token.filePath.includes('device') &&
      !token.path.some(el => VALID_DEVICE_COMPONENTS.includes(el))
    ) {
      return false;
    }

    // Exclude dark mode tokens
    if (token.path.includes('dark')) {
      return false;
    }

    // Exclude native only component tokens
    if (token.path.some(el => NATIVE_ONLY_COMPONENTS.includes(el))) {
      return false;
    }

    return token;
  },
};
