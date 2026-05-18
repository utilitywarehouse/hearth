const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

/**
 *
 * Many thanks to Radix for blazing the trail: https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/postcss-breakpoints.cjs
 *
 */

// Try a few variations to account for different monorepo structures, and Turbopack/Next.js 16 environment
const possiblePaths = [
  path.join(__dirname, 'src/styles/breakpoints.css'),
  path.join(__dirname, 'styles/breakpoints.css'),
  path.join(process.cwd(), '../../packages/react/src/styles/breakpoints.css'), // Up from app to root
];

let breakpointsFile;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    breakpointsFile = p;
    break;
  }
}

if (!breakpointsFile) {
  throw new Error(`Could not find breakpoints.css. Tried: ${possiblePaths.join(', ')}`);
}

const breakpointsCss = fs.readFileSync(breakpointsFile, 'utf-8');
const breakpoints = postcss
  .parse(breakpointsCss)
  .nodes.map(node => {
    if (node.type === 'atrule' && node.name === 'custom-media') {
      const [_match, name, params] = node.params.match(/--h-(\w+)\s+(.+)/);
      return { name, params };
    }

    return null;
  })
  .filter(Boolean);

const cache = new WeakMap();

module.exports = () => ({
  postcssPlugin: 'postcss-breakpoints',
  Rule(rule) {
    try {
      // Early return if parent doesn't exist or isn't a breakpoints rule
      if (!rule.parent || rule.parent.name !== 'breakpoints') {
        return;
      }

      const breakpointsRule = rule.parent;

      // when we first meet a given @breakpoints at-rule
      if (!cache.has(breakpointsRule)) {
        // create the final media rules for this @breakpoints at-rule
        const medias = breakpoints.reduce((breakpointsMedias, breakpoint) => {
          breakpointsMedias[breakpoint.name] = new postcss.AtRule({
            name: 'media',
            params: breakpoint.params,
          });
          return breakpointsMedias;
        }, {});

        // add an entry to the cache
        cache.set(breakpointsRule, medias);

        // add final media rules after the @breakpoints at-rule
        const mediaRules = Object.values(medias).reverse();
        mediaRules.forEach(media => {
          breakpointsRule.after(media);
        });
      }

      // move the rule itself before @breakpoints at-rule
      breakpointsRule.before(rule);

      // save clone of the rule before we modify it
      const originalRule = rule.clone();

      // clean up the extra indentation
      rule.selector = rule.selector.replace(/\n\s\s/g, '\n');
      rule.cleanRaws();

      // add breakpoint-level rules
      breakpoints.forEach(breakpoint => {
        const clone = originalRule.clone();
        updateClass(clone, breakpoint.name);
        cache.get(breakpointsRule)[breakpoint.name].append(clone);
      });

      // remove @breakpoints at-rule and clear cache if it has no rules
      if (breakpointsRule.nodes.length === 0) {
        breakpointsRule.remove();
        cache.delete(breakpointsRule);
      }
    } catch (error) {
      // React DevTools can interfere with PostCSS AST nodes during development
      // Silently skip processing if this happens
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `PostCSS breakpoints plugin skipped processing rule${rule && rule.selector ? ` "${rule.selector}"` : ''} due to DevTools interference. ` +
            `Consider disabling React DevTools during development if this persists.`
        );
        return;
      }
      // Re-throw in production
      throw error;
    }
  },
});

module.exports.postcss = true;

function updateClass(node, prefix) {
  if (node.type === 'atrule') {
    node.each(child => updateClass(child, prefix));
  }

  /**
   * Should match responsive classes (h-r- prefix):
   * ```
   * .h-r-size-1
   * .h-r-m-2
   * .-h-r-m-2
   * .h-Button.h-r-size-1 (captures "h-r-size-1")
   * ```
   *
   * Should not match:
   * .h-Button
   */
  const classNameRegexp = /\.(-?h-r-[a-z0-9-]+)/g;

  // Check for rules that use compound props on a component:
  // - a component name (prefixed with "h-" and pascal cased)
  // - followed by 2 or more prop selectors (lowercase, numbers, -)
  //
  // e.g. ".h-DialogContent.h-r-size-2.text-primary"
  if (/\.h-(?:[A-Z][a-z]+)+(?:\.[a-z0-9-]+){2,}/.test(node.selector)) {
    throw Error(`
      "${node.selector}" looks like it uses compound props on a component.
      "@breakpoints" does not support compound props yet.
    `);
  }

  if (classNameRegexp.test(node.selector)) {
    node.selector = node.selector.replace(classNameRegexp, `.${prefix}\\:$1`);
  }

  addPropertySuffixes(node, prefix);
}

function addPropertySuffixes(propertyNode, suffix) {
  propertyNode.nodes.map(node => {
    /**
     * Should match custom properties with responsive --h-r prefix:
     * ```
     * --h-r-padding
     * ```
     */
    const propertyNameRegexp = /(--h-r-[a-z0-9-]+)/g;
    if (propertyNameRegexp.test(node.value)) {
      node.value = node.value.replace(propertyNameRegexp, `$1-${suffix}`);
    }
  });
}
