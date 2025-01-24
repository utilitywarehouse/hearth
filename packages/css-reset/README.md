# Hearth CSS Reset

A bare-bones CSS reset for UW web development.

These styles are derived from the following CSS resets:

- https://www.joshwcomeau.com/css/custom-css-reset/
- https://andy-bell.co.uk/a-modern-css-reset/

## Getting started

Install the package.

```console
pnpm add @utilitywarehouse/hearth-css-reset
```

```console
yarn add @utilitywarehouse/hearth-css-reset
```

```console
npm install @utilitywarehouse/hearth-css-reset
```

Import into the root of your project.

```js
import '@utilitywarehouse/hearth-css-reset';
```


---

### Cascade layers

It is recommended to import this reset into the very first layer.

Ideally, you should predefine your layers as the first thing in the first stylesheet.

```css
@layer reset, page, overrides;
```

And then apply the first layer name while importing this reset.

```css
@import '@utilitywarehouse/hearth-css-reset' layer(reset);
```

### Visually hidden (aka SR only)

Every project needs "visually hidden" styles for screenreader-only text, so this reset has it built in.

It's available through the `.visually-hidden` class and all the declarations in it use `!important` so that they can't be overridden by a higher-priority layer.

When a visually-hidden element is focused or an element inside it is focused, then these styles will automatically be undone.



