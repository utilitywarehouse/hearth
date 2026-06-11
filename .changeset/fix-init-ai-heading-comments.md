---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `init-ai` script adds h1 headings to markdown config files

The comment block appended by `npx @utilitywarehouse/hearth-react init-ai` used
`#`-prefixed lines, which render as h1 headings in any Markdown renderer. The
comments are now written as HTML comments (`<!-- ... -->`) so they remain
invisible in rendered output.
