---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add generated LLM-friendly markdown docs (`public/llms/`)

`public/llms/` and a root `public/llms.txt` index are now generated from the
Storybook `.docs.mdx` files and published with the package, mirroring
`@utilitywarehouse/hearth-react`. This gives AI tools a markdown-based way to
discover component usage and props without parsing Storybook.

**Developer changes**:

Run `pnpm generate:llm-docs` after changing a public component API (props or
JSDoc) to keep the generated docs in sync. The root `pnpm generate:llm-docs`
command now regenerates docs for both `hearth-react` and
`hearth-react-native`.
