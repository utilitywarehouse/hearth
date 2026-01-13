---
'@utilitywarehouse/hearth-react': minor
---

🌟 [FEATURE]: Display an open icon when links are set to open in a new tab.

This change enhances user experience by providing a visual cue for links that
open in new tabs. An open icon will now be displayed next to the link text when
`target` is set to `_blank`.

You can override this behaviour by setting the `hideOpenIcon` prop to true.

**Components affected**:

- `InlineLink`
- `Link`

**Developer changes**:

If you already have links that open in new tabs, you don't need to make any
changes. However, if you want to hide the open icon for specific links, you can
do so by adding the `hideOpenIcon` prop:

```tsx
<Link href="/faqs" target="_blank" hideOpenIcon>
  Visit FAQs
</Link>
```

```tsx
<InlineLink href="/faqs" target="_blank" hideOpenIcon>
  Visit FAQs
</InlineLink>
```

Remember, use `target="_blank"` sparingly! ([When to use target="\_blank"](https://css-tricks.com/use-target_blank/)).
