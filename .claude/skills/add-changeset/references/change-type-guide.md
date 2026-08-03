# Change Type Guide

This guide explains each change type used in Hearth changesets, with examples for each.

## 🐛 [FIX]

Use for bug fixes, corrections, and patches that resolve issues without changing the API or adding new features.

**Examples:**
- Fixing incorrect prop types
- Correcting styling issues
- Resolving runtime errors
- Fixing accessibility issues

## 💅 [ENHANCEMENT]

Use for improvements to existing features that don't add new functionality or break existing APIs.

**Examples:**
- Performance optimisations
- Improved error messages
- Better TypeScript types
- Code refactoring without behaviour changes
- Minor UX improvements
- Minor API improvements

## 🌟 [FEATURE]

Use for new features, capabilities, or components that add functionality.

**Examples:**
- New components
- Additional props or configuration options
- New hooks or utilities
- New variants or modes

## 💔 [BREAKING CHANGE]

Use for changes that break backward compatibility and require consumers to update their code.

**Examples:**
- Removing deprecated APIs
- Renaming props or components
- Changing default behaviour
- Removing features
- Major API redesigns

## 📦 [DEPS]

Use for dependency updates, including adding, removing, or upgrading package dependencies.

**Examples:**
- Updating React Native to a new version
- Adding a new dependency for a feature
- Removing unused dependencies
- Upgrading TypeScript or other dev dependencies
- Security patches for dependencies

## 🧹 [HOUSEKEEPING]

Use for internal changes that don't directly affect consumers but are important for maintainability and internal improvements.

**Examples:**
- Improving ref handling in components
- Updating internal design tokens or styles
- Refactoring internal code for better readability
